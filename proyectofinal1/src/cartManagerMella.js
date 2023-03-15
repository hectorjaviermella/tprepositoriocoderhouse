import { error } from "console";
import fs from "fs";

export default class CartManager{

         constructor(){
           
            this.path = "./src/files/Carts.json";
         }

////////////////////////////////////////////////////////////////////
getCarts = async () => {    //devuelve array de carts
    if (fs.existsSync(this.path)){
           const data = await fs.promises.readFile(this.path, "utf-8");
         //  console.log("data" + data);
           const result = JSON.parse(data);
           //console.log(result);
           return result;
        } else {
           return [];
        }
     };


////////////////////////////////////////////////////////////////////////////////////
addCartVacio = async() => {
   console.log("agregaar carrito vacio");
  // if (fs.existsSync(this.path)){  
      console.log("agregaar carrito vacio1");
           let cart = {};
           const carts = await this.getCarts();
            if (carts.length === 0){               
                  cart.cId = 1;
                  cart.products=[];
               }else {
                  cart.cId = carts[carts.length - 1].cId +1;
                  cart.products=[];
               }

               carts.push(cart);            
          await fs.promises.writeFile(this.path, JSON.stringify(carts,null,"\t"));
          return cart;

 //  }
}
 ///////////////// ////////////////////////////////////////////////////////////////////

getCartsById= async(cId) => {
    if (fs.existsSync(this.path)){         
            console.log("entro al getcartbyid " + cId);  
            const carts = await this.getCarts();    
          //  console.log( carts);
            let cart = carts.find((cart) => cart.cId == cId);
           // console.log("cart " + cart);  
            if (cart){
               try {
               console.log(`Carrito con id ${cId}  existe `)
               return(cart);

               } catch (error) {
               console.log("entro al cathc");
                  console.log(error);
               }

            }
       } else {   //archivo no existe
       console.log(`Cart con  id ${cId} no existe`)
           return null;
         }       
};
////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
 //update carts
 updatedCart= async (cartudpate) => {
   if (fs.existsSync(this.path)){
      console.log("entro a modificar un carrito");
      const carts = await this.getCarts();
      const indicecart = carts.findIndex(cart => cart.cId === cartudpate.cId); 
      if (indicecart === -1){ //no encontro el cart
      console.log(`El cart con id ${cartudpate.cId} no existe`)
         return [];
      }else{ //encontro el  producto 
         //preparar objeto a modificar               
         cartudpate.cId ??= carts[indicecart].cId;
         cartudpate.products ??= carts[indicecart].products;         
         carts[indicecart] = cartudpate;               
         await fs.promises.writeFile(this.path, JSON.stringify(carts,null,"\t"));         
         return carts;
      }           

         };
};

//////////////////////////////////////////////////////////////////
addProductToCart = async(cId,pId,pquantity) => {
   console.log("entro al crear agregar producto a un carrito");
   if ((!cId) ||  (!pId)){           
     return "Error: es obligatorio ingresar todo los campos";
  }
  if ((cId<1) ||  (pId<1)){    
   return "No pueden ser los id negativos";
}
   const cart = await this.getCartsById(cId);   
   if (cart=== undefined){
      return  "No existe el carrito";
   }
   
   try {
      console.log("lista de productos del carrito");    
      let productstocart = cart.products; 
      let indexproduct = productstocart.findIndex((product) => product.pId == pId);   
      if (indexproduct === -1){ //no encontro el producto
        // console.log(`El Producto con id ${productstocart.pId} no existe en el carrito`)
            
        const productagregar = {"pId" : Number(pId) , "quantity" : Number(pquantity.quantity)};
        productstocart.push(productagregar);
        cart.products=productstocart; 
        const cartsactualizado = await this.updatedCart(cart); 
        //return cartsactualizado;
        return "Add Product to Cart " 

         }else{ //encontro el  producto en mi carrito
            //preparar objeto a modificar         
             productstocart[indexproduct].quantity=productstocart[indexproduct].quantity +  Number(pquantity.quantity);
           cart.products=productstocart;           
           const cartsactualizado = await this.updatedCart(cart); 
             //return cartsactualizado;
             return "Add Product to Cart " 
         }           
      
   } catch (error) {
      console.log(error);
   }

 };



}
///////////////////////////////////////////////////////////////////