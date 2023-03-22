import { Router } from "express";
import ProductManager from '../productManagerMella.js';


const router = Router();

// 1 - crea instancia de la clase
let products = new ProductManager();

///////////////////////////////////////////////////////////////////////////

router.get("/", async (req, res) => {   
  let productos =  await products.getProducts();  
  res.render("home.handlebars", { productos: productos});
 });

 //////////////////////////////////////////////////////////////////////////


 router.get("/realtimeproducts", async (req, res) => {   
  //let productos =  await products.getProducts();  
  res.render("realTimeProducts.handlebars", {});
   
 
 });

export default router;