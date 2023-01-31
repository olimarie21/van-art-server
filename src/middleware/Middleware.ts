import { Request, Response, NextFunction } from 'express'
import { AppDataSource } from '../data-source'
import { ArtLocation } from '../entity/ArtLocation'

class Middleware {
    constructor() {}

    public async getArtLocations(req: Request, res: Response, next: NextFunction) {
        try {
            const artLocations: ArtLocation[] = await AppDataSource.manager.find(ArtLocation)
            res.json(artLocations)
        } catch (err) {
            next(err)
        }
    } 

    public async getArtLocationsByType(req: Request, res: Response, next: NextFunction) {
        try {
            const type = req.params.type
              const artLocations = await AppDataSource
                .getRepository(ArtLocation)
                .createQueryBuilder("artLocation")
                .where(`artLocation.type IN (:...types)`, { types: type.split(',') })
                .getMany()
      
            res.locals.artLocations = artLocations
            res.json(artLocations)

        } catch(err) {
            next(err)
        }
    } 
}

export {Middleware}