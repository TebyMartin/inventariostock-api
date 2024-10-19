import mongoose from "mongoose"

const dbconnect = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/dbinventariostock")
        console.log("Conexion a la base de datos establecida");
        
    } catch (error) {
        console.error('error a la conexion a la base de datos:', error);
        process.exit(1)
        
    }
}

export default dbconnect