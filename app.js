import express from "express";
import dbconnect from "./config/db.js";
import router from "./routes/stock.js";
import cors from 'cors'
import corsOptions from "./config/corsOptions.js";

const app = express()
app.use(cors(corsOptions));
app.use(express.json())


app.use(router)

dbconnect().then(() => {
    app.listen(3000, () => {
        console.log("el servidor esta corriendo en el puerto 3000");
        
    })
}).catch(() => {
    console.error("no se pudo iniciar el servidor ");
    
})