import * as express from 'express'
import bodyParser = require("body-parser")

class App {
    public app: express.Application

    constructor() {
        this.app = express()
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))
    }
}

export default new App().app



