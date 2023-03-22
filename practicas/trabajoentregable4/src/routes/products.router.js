import { Router } from "express";
import { uploader } from "../utils.js";

import ProductManager from '../productManagerMella.js';
// 1 - crea instancia de la clase
let products = new ProductManager();

// le damos las funciones de Router a nuestra variable router
const router = Router();





////////////////////////////////////////////////////////////////////////////////////////////////
/** Ejercicio usando req.params
  * Este endpoint nos permite retornar un producto con un id especifico
 */
router.get("/:pId", async (req, res) => {
 //console.log("entro a buscar por / reques.param");
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
router.get("/", async (req, res) => { 
 // console.log("entro a buscar por / ");
  const limit = req.query.limit;
 let productos =  await products.getProducts();
 
 if (!limit ){
      return res.send({ productos }); 
   }else{
    console.log("entor al rendersssssss");
     //retorno los limit primeros productos
   res.send(productos.slice(0, limit));
   
   }

});


/////////////////////////////////////////////////////////////////////////////////////
router.put("/:pId",async (req, res) => {
  console.log("entro al put de productos");
  const pIdparametro = req.params.pId;
  console.log(pIdparametro);
  const producto = req.body;
  producto.pId=parseInt(pIdparametro);
  let error =  await products.updateProducto(producto); 
 if ( (error === undefined) || (error === null)) {
  return res.send({ status: "No  existe el producto" });
}else{  

  return res.status(200).send({ status: "Success" , message: "Products succesfully update" });
}
});
/////////////////////////////////////////////////////////////////////////////////////////////
router.post("/", uploader.array("pThumbnail"), async (req, res) => {
  console.log("entro al post");

  const newproducto = req.body;
  const files = req.files;
  
  //console.log(files);
  newproducto.thumbnails=[];
  if (files){
     files.forEach( file =>{
       const imgUrl=`http://localhost:8080/img/${file.filename}`
       newproducto.thumbnails.push(imgUrl);
     });

  }
    let respuesta =  await products.addProduct(newproducto);
  if (respuesta === undefined)
      return res.send({ status: "No estan los campos completos" });
  else
   {
      if ((respuesta === null)) {
      
        return res.send({ status: "Ya existe el producto" });
      }else{
        return res.status(200).send({ status: "Success" , message: "Products succesfully add" });

      }
   }

});
//////////////////////////////////////////////////////////////////////////////////////////
router.delete("/:pId", async (req, res) => {
  const pId = req.params.pId;
  console.log("entro al delete " + pId);  
  let error =  await products.deleteProduct(pId);

  if ( (error === undefined) || (error === null)) { 
      return res.status(404).send({ status: "Error", message: "Product does not exist" });
     
      }else{
        return res.status(200).send({ status: "Sucess", message: "Products succesfully deleted" });
      }
    
});


export default router;