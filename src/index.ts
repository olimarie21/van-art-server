import app from './app'
import { AppDataSource } from './data-source'
import { ArtLocation } from './entity/ArtLocation'

const PORT = 4000

AppDataSource.initialize()
  .then( async () => {
      console.log("Data Source has been initialized!")
      const artLocations = await AppDataSource.manager.find(ArtLocation)
      console.log("Loaded art: ", artLocations.length)
      // await AppDataSource.createQueryBuilder()
      // .delete()
      // .from(ArtLocation)
      // .where([])
      // .execute()
      
      app.listen(PORT, () => {
        console.info('Express server listening on http://localhost:3000')
        console.log('connected')
      })
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

