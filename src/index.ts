import app from './app'
import { AppDataSource } from './data-source'
import { ArtLocation } from './entity/ArtLocation'

const PORT = process.env.PORT || 6000

AppDataSource.initialize()
  .then( async () => {
      console.log("Data Source has been initialized!")

    await AppDataSource
      .createQueryBuilder()
      .update(ArtLocation)
      .set({ id: 221, image: "https://res.cloudinary.com/scave2021/image/upload/v1673823989/art-map/LAW221-1.jpg" })
      .where("id = :id", { id: 221 })
      .execute()
      
      app.listen(PORT, () => {
        console.info(`Express server listening on ${PORT}`)
        console.log('connected')
      })
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })

