import { Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { ArtLocation } from '../entity/ArtLocation'

class Middleware {
    constructor() {}

    public async getArtLocations(req: Request, res: Response) {
        const artLocations: ArtLocation[] = await AppDataSource.manager.find(ArtLocation)
        res.json(artLocations)
    } 
}

export {Middleware}