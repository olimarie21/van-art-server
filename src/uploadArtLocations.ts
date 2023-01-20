import { ArtLocation } from "./entity/ArtLocation"
import axios from "axios"
import { v2 as cloudinary } from 'cloudinary'
import * as dotenv from "dotenv"
import { AppDataSource } from './data-source'

dotenv.config()

cloudinary.config({
 cloud_name: process.env.CLOUDINARY_CLOUD,
 api_key: process.env.CLOUDINARY_API_KEY,
 api_secret: process.env.CLOUDINARY_API_SECRET,
 secure: true
})

async function uploadArtLocations() {
    try {
        const { data, status } = await axios.get(
            'https://opendata.vancouver.ca/api/records/1.0/search/?dataset=public-art&q=&rows=500&refine.status=In+place&refine.fields=geom',
            {
                headers: {
                    Accept: 'application/json',
                }
            }
        )

        console.log('response status is: ', status)

        const filteredData = data.records.filter((local) => local.fields.geom !== undefined)
        const artLocations: Array<object> = []


        for(let j = 0; j < filteredData.length; j++) {
            const artPiece = new ArtLocation()

            // add artist ids to array
            const artists = filteredData[j].fields.artists != null ? filteredData[j].fields.artists.split(';') : []
            const artistNames: Array<string> = []

            for(let i = 0; i < artists.length; i++) {

                // search cloudinary for img url based on img name
                const imgSearchTerm: string = filteredData[j].fields.photourl
                    ? (["L1.JPG", "L1.jpg", "L2.jpg", "L2.JPG", "L3", "l1", "l2"].includes(filteredData[j].fields.photourl.filename)
                        ? filteredData[j].fields.registryid.toString()
                        : filteredData[j].fields.photourl.filename.replace(/[^a-zA-Z0-9_.]/g, "_").replace(/\.jpg$/i, ""))
                    : "";


                const imgUrl = imgSearchTerm != "" ? await cloudinary.search
                    .expression(`filename=${imgSearchTerm}`)
                    .with_field('context')
                    .max_results(1)
                    .execute()
                    .then(result => {
                        const url: string = result.resources[0] ? result.resources[0].url : ""
                        return url
                    }) : ""


                // get artist names
                try {
                    const { data } = await axios.get(
                        `https://opendata.vancouver.ca/api/records/1.0/search/?dataset=public-art-artists&q=&refine.artistid=${artists[i]}`
                    )

                    if (data.records[0]) {
                        const name = data.records[0].fields.firstname + ' ' + data.records[0].fields.lastname;
                        artistNames.push(
                            name.includes('undefined')
                                ? name.replace('undefined ', '')
                                : name || 'Artist Name Unavailable'
                        )
                    }

                    artPiece.artists = artistNames
                } catch (error) {
                    if (axios.isAxiosError(error)) {
                        console.log('error message: ', error.message);
                        return error.message;
                    } else {
                        console.log('unexpected error: ', error);
                        return 'An unexpected error occurred';
                    }
                }
                
                // Set remaining object properties
                artPiece.id = filteredData[j].fields.registryid
                artPiece.locationTitle = filteredData[j].fields.sitename || null
                artPiece.locationDetail = filteredData[j].fields.locationonsite || null
                artPiece.geolocation = {type: "Point", coordinates: filteredData[j].fields.geom.coordinates}
                artPiece.address = filteredData[j].fields.siteaddress || "No address available."
                artPiece.type = filteredData[j].fields.type || "Unknown"
                artPiece.primaryMaterial = filteredData[j].fields.primarymaterial || "Unknown"
                artPiece.image = imgUrl || ""
                artPiece.userImages = []
                artPiece.artDescription = filteredData[j].fields.descriptionofwork || filteredData[j].fields.artistprojectstatement || 'No description available.'
            }

            // add to artLocation Array
            artLocations.push(artPiece)
              
            artPiece.id ? await AppDataSource
                .createQueryBuilder()
                .insert()
                .into(ArtLocation)
                .values(artPiece)
                .execute() : null
            } 

        console.log('loaded')
        return artLocations
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
} 

export default uploadArtLocations