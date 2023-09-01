import express from "express"
import bodyParser from "body-parser"
import viewEngine from "./config/viewEngine"
import initWebRoutes from "./route/web"
require("dotenv").config()


let app = express()

//config app

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))



viewEngine(app)
initWebRoutes(app)


let port = process.env.PORT || 6060


app.listen(port, () => {
    console.log(`Server is running on ${port}`)
})