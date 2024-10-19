import express from 'express'
import ModelStock from '../models/stockmodels.js'
import mongoose from 'mongoose'

const router = express()

//---------------------------------CRUD

router.post('/stock', async (req, res) => {
    const body = req.body
    try {
        const nuevoStock= await ModelStock.create(body)
        res.status(201).send(nuevoStock)
    } catch (error) {
       res.status(400).send(error) 
    }
})

router.get('/stock', async (req, res) => {
    try {
        const stock = await ModelStock.find()
        res.status(200).send(stock)
    } catch (error) {
       res.status(500).send({mensaje: 'Error al obtener los libros', error}) 
    }
})

router.get('/stock/:id', async (req, res) => {
    try {
        const stock = await ModelStock.findById(req.params.id)
        if (!stock) {
            return res.status(404).send({mensaje:"stock no encontrado"})
        }
        res.status(200).send(stock)
    } catch (error) {
       res.status(500).send({mensaje: 'Error al obtener los stock', error}) 
    }
})

  
router.put('/stock/:id',async(req,res)=> {
    try {
       const stockActualizado = await ModelStock.findByIdAndUpdate(req.params.id, req.body,{new:true, runValidators:true}) 
        if (!stockActualizado) {
            return res.status(404).send({mensaje:"stock no encontrado"})
        }
        res.status(200).send(stockActualizado)
    } catch (error) {
        res.status(400).send({mensaje:"error al actualizar",error})
    }
})

router.delete("/stock/:id", async (req,res) => {
    try {
        const stockEliminado = await ModelStock.findByIdAndDelete(req.params.id)
        if (!stockEliminado) {
            return res.status(404).send({mensaje:"stock no encontrado"})
        }
        res.status(200).send(stockEliminado)
    } catch (error) {
        res.status(400).send({mensaje:"error al eliminar",error})
    }
})

//-----------endpoints de negocio 
router.put('/api/stock/actualizar-stock', async (req, res) => {
    try {
      const productos = req.body
      if (!Array.isArray(productos) || productos.length === 0) {
        return res.status(400).send({ mensaje: 'Debe proporcionar un array de productos.' });
      }
      const actualizaciones = productos.map(async ({ _id, cantidad }) => {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
          throw new Error(`El ID ${_id} no es válido`);
        }
        const productoActualizado = await ModelStock.findByIdAndUpdate(
          _id,
          { cantidad },
          { new: true, runValidators: true }
        );
  
        if (!productoActualizado) {
          throw new Error(`Producto con ID ${_id} no encontrado`);
        }
  
        return productoActualizado;
      });
      const resultados = await Promise.all(actualizaciones);
  
      res.status(200).send({
        mensaje: 'Stock actualizado correctamente',
        productos: resultados,
      });
    } catch (error) {
      res.status(500).send({
        mensaje: 'Error al actualizar el stock',
        error: error.message || error,
      });
    }
});

router.get('/api/stock/busqueda', async (req, res) => {
    const {  categoria } = req.query
    try {
        const querry = {} 
        if (categoria) querry.categoria = categoria
        const stock = await ModelStock.find(querry)
        if (!stock.length) {
            return res.status(404).send({mensaje:'no se encontro stocks con los filtros proporcionados'})
        }
        res.status(200).send(stock)
    } catch (error) {
        res.status(500).send({mensaje:'error al obtener los stocks',error})
    }
})

router.get('/api/stock/bajo-stock', async (req, res) => {
    const minimoStock = 10; 
    try {
        const productosBajoStock = await ModelStock.find({ cantidad: { $lt: minimoStock } });
        if (!productosBajoStock.length) {
            return res.status(404).send({ mensaje: 'No se encontraron productos con bajo stock.' });
        }
        res.status(200).send(productosBajoStock);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener los productos con bajo stock.', error });
    }
});


//$lt sigifica menor que en la base de datos mongodb $gt: Mayor que, $gte: Mayor o igual que, $lt: Menor que, $lte: Menor o igual que, $eq: Igual a,$ne: No igual a.

export default router 