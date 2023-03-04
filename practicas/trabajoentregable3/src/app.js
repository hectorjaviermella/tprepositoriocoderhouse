import ProductManager from './productManagerMella.js';

//const express = require("express");
import  Express  from 'express';
const app = Express();
app.use(Express.urlencoded({extended:true}));


// 1 - crea instancia de la clase
let products = new ProductManager();


////////////////////////////////////////////////////////////////////////////////////////////////
/** Ejercicio usando req.params
  * Este endpoint nos permite retornar un producto con un id especifico
 */
app.get("/products/:pId", async (req, res) => {
  console.log("entro a buscar por reques.param");
  const pId = req.params.pId;
  const producto =  await products.getProductsById(pId);
    if (!producto) {
      return res.send({ error: "Producto no encontrado en el archivo" });
      }else{
        res.send(producto);
      }
  
});
 
////////////////////////////////////////////////////////////////////
/** Ejercicio usando usando req.query
 *
 * Sí la propiedad "limit" no se introdujo en el query",
 * entonces no se emplea ningun filtro y retorna el array producto completo
 * 
 */
app.get("/products", async (req, res) => {
  console.log("entro a buscar por req.query");
  const limit = req.query.limit;
 let productos =  await products.getProducts();
 //console.log(productos.slice(0, limit));  
 if (!limit ){
      return res.send({ productos }); 
   }else{
     //retorno los limit primeros productos
    res.send(productos.slice(0, limit));
   }

});



app.listen(8080, () => {
  console.log("Servidor escuchando en el puerto 8080");
  
});
