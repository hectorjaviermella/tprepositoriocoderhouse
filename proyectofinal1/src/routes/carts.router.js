import { Router } from "express";
import CartManager from '../cartManagerMella.js';

// le damos las funciones de Router a nuestra variable router
const router = Router();
// 1 - crea instancia de la clase
let carts = new CartManager();


////////////////////////////////////////////////////////////////

router.get("/:cId", async (req, res) => {
  console.log("entro a buscar por reques.param cId");
  const cId = req.params.cId;
  const cart =  await carts.getCartsById(cId);
    if (!cart) {
      return res.send({ error: "Carrito no encontrado en el archivo" });
      }else{
        res.send(cart);
      }
  
});

/////////////////////////////////////////////////////////////////////////////////////////////
router.post("/",async (req, res) => {
  console.log("entro al post carts");
  const cart = req.body;
  //let error =  await carts.addCart(cart);
  let error =  await carts.addCartVacio();
  console.log(error);
 if ( (error === undefined) || (error === null)) {
 
  return res.send({ status: "Ya existe el carrito" });
}else{
  return res.status(200).send({ status: "Success" , message: "Cart succesfully Create" });

}
});


/////////////////////////////////////////////////////////////////////////////////////////////
router.post("/:cId/product/:pId",async (req, res) => {
  console.log("entro al post carts incremetar");
  const pquantity = req.body;
  console.log(pquantity.quantity);
  const cId = req.params.cId;
  const pId = req.params.pId;   
  let error =  await carts.addProductToCart(cId,pId,pquantity);  
  console.log(error);
  return res.send(error);
  /*
    if ( (error === undefined) || (error === null)) { 
      return res.send({ status: "Ya existe el carrito" });
    }else{
      return res.status(200).send({ status: "Success" , message: "Add Product to Cart " });
    }*/

});


export default router;