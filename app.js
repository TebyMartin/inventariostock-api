import express from "express";
import dbconnect from "./config/db.js"
import router from "./routes/stock.js"
import cors from 'cors'
import corsOptions from "./config/corsOptions.js"
import dotenv from "dotenv"


const app = express()
app.use(cors(corsOptions));
dotenv.config();
app.use(express.json())


app.use("/api",router)
app.get("/api/test", (req, res) => {
    res.send('la aplicacion esta funcionando')
})

dbconnect().then(() => {
   
    console.log("el servidor esta corriendo ");
        
    
}).catch(() => {
    console.error("no se pudo iniciar el servidor ");
    
})

export default app //exportamos para delegarle control a vercel