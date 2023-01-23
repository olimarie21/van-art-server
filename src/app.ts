import * as express from 'express'
import bodyParser = require("body-parser")
import {Routes} from './routes/Routes'

class App {
    public app: express.Application
    public routePrv: Routes

    constructor() {
        this.app = express()
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))

        this.routePrv = new Routes()
        this.routePrv.routes(this.app)
    }
}

export default new App().app



