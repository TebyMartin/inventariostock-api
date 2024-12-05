import mongoose from "mongoose"

const dbconnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`URI: ${process.env.MONGO_URI}`);
        console.log("Conexion a la base de datos establecida");
        
        
    } catch (error) {
        console.error('error a la conexion a la base de datos:', error);
        process.exit(1)
        
    }
}

export default dbconnect