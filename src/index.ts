import app from './app'
import { AppDataSource } from './data-source'
import { ArtLocation } from './entity/ArtLocation'
import cors from 'cors'

// const corsOptions = {
//   origin: 'https://vancouver-art-map.vercel.app/'
// }

const PORT = process.env.PORT || 4000
app.use(cors())

AppDataSource.initialize()
  .then( async () => {
      console.log("Data Source has been initialized!")
      const artLocations = await AppDataSource.manager.find(ArtLocation)
      console.log("Loaded art: ", artLocations.length)
      
      app.listen(PORT, () => {
        console.info(`Express server listening on ${PORT}`)
        console.log('connected')
      })
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

