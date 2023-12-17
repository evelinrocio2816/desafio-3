const express = require("express");
const PORT = 8080
const fs = require('fs').promises;


const ProductManager =require("./productManager.js");


const app =express()

//app.get("/",(req, res)=>{
//  res.send("Mi primer servidor, pero con express")
//})
//const productManager = new ProductManager("./src/productos.json");







app.get("/products", async (req, res) => {
  try {
  const fileContent = await fs.readFile('./src/productos.json', 'utf-8');
    
    // Parsea el contenido del archivo a un array
    const myProducts = JSON.parse(fileContent);

    const limit = parseInt(req.query.limit);

    if (!isNaN(limit) && limit > 0) {
      // Si se proporciona un límite válido, devuelve los productos limitados
      const productos = myProducts.slice(0, limit);
      res.send(productos);
    } else {
      // Si no se proporciona un límite válido, devuelve todos los productos
      res.send(myProducts);
    }
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.send("Error interno del servidor");
  }
});



//busqueda por id

const filePath = './src/productos.json';

app.get("/products/:id", async (req, res) => {
  try {
    const idToFind = parseInt(req.params.id);
    
    if (isNaN(idToFind) || idToFind <= 0) {
      return res.status(400).json({ error: "ID de producto no válido" });
    }

    // Lee el contenido del archivo de productos
    const fileContent = await fs.readFile(filePath, 'utf-8');

    // Parseo el archivo a un array de productos
    const products = JSON.parse(fileContent);

    // Busca el producto por ID
    const foundProduct = products.find(product => product.id === idToFind);

    if (foundProduct) {
      res.json(foundProduct);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});



//INICIO EL SERVIDOR

app.listen(PORT, ()=>{
  console.log(`Escuchando en http://localhost:${PORT}`);
})



























