import mongoose from "mongoose"



const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String },
    precio: { type: Number, required: true },
    cantidad: { type: Number, required: true },
    categoria: { type: String },
    fechaIngreso: {   type: Date, 
      default: Date.now,
      required: true  }
  });

  
  const ModelStock = mongoose.model("stock", productoSchema)
  export default ModelStock
