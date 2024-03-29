import fs from "fs";
import { Blob } from "buffer";
import __dirname from "./utils.js";
import socket from "./socket.js";

export default class ProductManager{

         constructor(){
            this.pathfiles = "./files";
           // this.path = "./src/files/Productos.json";
           this.path =`${__dirname}/files/Productos.json`;
         }
////////////////////////////////////////////////////////////////////
   getProducts = async () => {    //devuelve array de productos
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




///////////////// ////////////////////////////////////////////////////////////////////
getProductsById= async(pId) => {
         if (fs.existsSync(this.path)){         
            console.log("entro al getprodubyid " + pId);  
           const productos = await this.getProducts();      
            let producto = productos.find((producto) => producto.pId == pId);
       
           if (producto){
              try {
               console.log(`Producto con id ${pId}  existe `)
               return(producto);

              } catch (error) {
               console.log("entro al cathc");
                 console.log(error);
              }

           }
         } else {   //archivo no existe
            console.log(`Producto con  id ${pId} no existe`)
            return null;
         }            
};
 
//////////////////////////////////////////////////////////////////////////////////////////////////////////
 //update producto
    updateProducto= async (productoudpate) => {
         if (fs.existsSync(this.path)){
            console.log("entro a modificar un producto");
            const productos = await this.getProducts();
            const indiceproducto = productos.findIndex(producto => producto.pId === productoudpate.pId); 

            if (indiceproducto === -1){ //no encontro el producto
            console.log(`El Producto con id ${productoudpate.pId} no existe`)
               return null;
            }else{ //encontro el  producto          
             
               (productoudpate.pCode!=null) ? (productos[indiceproducto].pCode=productoudpate.pCode) : "";
               (productoudpate.pTitle!=null) ? (productos[indiceproducto].pTitle=productoudpate.pTitle) : "";
               (productoudpate.pDescription!=null) ? (productos[indiceproducto].pDescription=productoudpate.pDescription) : "";
               (productoudpate.pPrice!=null) ? (productos[indiceproducto].pPrice=productoudpate.pPrice) : "";
               (productoudpate.pThumbnail!=null) ? (productos[indiceproducto].pThumbnail=productoudpate.pThumbnail) : "";
               (productoudpate.pStock!=null) ? (productos[indiceproducto].pStock=productoudpate.pStock) : "";
               (productoudpate.pCategory!=null) ? (productos[indiceproducto].pCategory=productoudpate.pCategory) : "";
               (productoudpate.pStatus!=null) ? (productos[indiceproducto].pStatus=productoudpate.pStatus) : "";
               
               console.log(productos[indiceproducto]);
               await fs.promises.writeFile(this.path, JSON.stringify(productos,null,"\t"));
               
               return productos;
            }      
                 

               };
};

////////////////////////////////////////////////////////////////////

addProduct = async(producto) => {
   console.log("entro al crear producto");
   if (!producto.pTitle  || !producto.pDescription || !producto.pPrice || !producto.pStatus===null  
      || !producto.pCode ||  !producto.pStock===null  || !producto.pCategory){
                              
        return undefined;
  }           
   const productos = await this.getProducts();             
  let encontro=false;
  const indiceproducto = productos.findIndex(productox => productox.pCode === producto.pCode);
  
   if (indiceproducto === -1){ //no encontro el producto              
      encontro=false;
     
   }else{ //encontro el  producto                
       encontro=true;
   }   
          
  if (!encontro){
         if (producto.pStock===0){
            producto.pStatus=false;
         }else{
            producto.pStatus=true;
         }
       
         if (productos.length === 0){               
            producto.pId = 1;
         }else {
            producto.pId = productos[productos.length - 1].pId +1;
         }      
          

         productos.push(producto); 
         await fs.promises.writeFile(this.path, JSON.stringify(productos,null,"\t"));
         console.log("antes de enviar a los clientes");
         socket.io.emit("sprod",productos);        
          return true;
      }else{
        // socket.io.emit("producto no agregado" , producto);
         console.log(`El codigo del producto  ${producto.pCode}  ya esta inserto `);
         return null;
      }
 };

 ////////////////////////////////////////////////////////////////////
 //  eliminarProducto
 deleteProduct = async (pId) => {   
   if (fs.existsSync(this.path)){
       console.log("entro a eliminar un producto");        
       const productos = await this.getProducts();          
       //const producto = productos.find((producto) => producto.pId === pId);  
       let producto = productos.find((producto) => producto.pId == pId);  
      if (producto){
         try {
           
            for( var i = 0; i < productos.length; i++){                                    
               if ( productos[i].pId == pId) { 
                  productos.splice(i, 1); 
                   i--; 
               }
            }               
            await fs.promises.writeFile(this.path, JSON.stringify(productos,null,"\t"));   
            socket.io.emit("sprod",productos);         
           return true; 
         } catch (error) {
            console.log(error);
         }
      }else{
         console.log(`Producto con  id ${pId} no existe`)
          return null;
      }     
   
                   };
};


}