import app from './app'
import { AppDataSource } from './data-source'
import { ArtLocation } from './entity/ArtLocation'

const PORT = 4000

AppDataSource.initialize()
  .then(() => {
      console.log("Data Source has been initialized!")
      
      app.listen(PORT, () => {
        console.info('Express server listening on http://localhost:3000')
        console.log('connected')
      })
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })


// AppDataSource.initialize().then(async () => {

//     console.log('Inserting a new user into the database...')
//     const artLocation = new ArtLocation()
//     artLocation.id = 253
//     artLocation.locationTitle = 'Nelson Park, Mole Hill Greenway'
//     artLocation.locationDetail = null
//     artLocation.geolocation = {type: "Point", coordinates: [-123.129618, 49.282574]}
//     artLocation.address = '1030 Bute Street'
//     artLocation.type = 'Site-integrated work'
//     artLocation.artists = ['Nicole May']
//     artLocation.primaryMaterial = 'Unknown'
//     artLocation.artDescription = "A custom street light hosting four colourful cut glass panels situated at the heart of Mole Hill in Vancouver's West End."
//     artLocation.image = 'https://res.cloudinary.com/scave2021/image/upload/v1673824050/art-map/LNicole_May_31.jpg'

//     await AppDataSource.manager.save(artLocation)
//     console.log("Saved a new user with id: " + artLocation.id)

//     console.log("Loading art from the database...")
//     const artLocations = await AppDataSource.manager.find(ArtLocation)
//     console.log("Loaded art: ", artLocations)


// }).catch(error => console.log(error))



