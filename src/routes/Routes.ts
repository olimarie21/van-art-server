import { Request, Response } from 'express'
import { Middleware } from '../middleware/Middleware'

class Routes {
    private middleware: Middleware

    constructor() {
        this.middleware = new Middleware()
    }

    public routes(app): void {
        app.route('/') 
            .get((request: Request, response: Response) => {
                response.status(200)
                    .send({
                        message: "Get request success"
                    })
            })

        app.route('/artLocations')
            .get(this.middleware.getArtLocations)
    }
}

export { Routes } 