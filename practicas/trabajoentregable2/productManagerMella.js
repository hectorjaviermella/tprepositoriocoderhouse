import fs from "fs";

export default class ProductManager{

         constructor(){
           
            this.path = "./files/Productos.json";
         }
////////////////////////////////////////////////////////////////////
   getProducts = async () => {    //devuelve array de productos
         if (fs.existsSync(this.path)){
                const data = await fs.promises.readFile(this.path, "utf-8");
                const result = JSON.parse(data);
                //console.log(result);
                return result;
             } else {
                return [];
             }
          };




 ////////////////////////////////////////////////////////////////////
   addProduct = async(producto) => {
            console.log("entro al crear producto");
            const productos = await this.getProducts();
            if (productos.length === 0){               
                producto.pId = 1;
            }else {
               producto.pId = productos[productos.length - 1].pId +1;
            }

            productos.push(producto);            
            await fs.promises.writeFile(this.path, JSON.stringify(productos,null,"\t"));
            return producto;
          };


///////////////// ////////////////////////////////////////////////////////////////////
getProductsById= async(pId) => {

         if (fs.existsSync(this.path)){
           
           const productos = await this.getProducts();
            const indiceproducto = productos.findIndex(producto => producto.pId === pId);
                        
            
            if (indiceproducto === -1){ //no encontro el producto
               console.log(`Producto con  id ${pId} no existe`)
                return [];
            }else{ //encontro el  producto 
                console.log(`Producto con id ${pId}  existe `)
                return(productos[indiceproducto]);
            }           
         } else {   //archivo no existe
            return [];
         }
};
 ////////////////////////////////////////////////////////////////////
 //  eliminarProducto
 deleteProduct = async (pId) => {   
   if (fs.existsSync(this.path)){
          console.log("entro a eliminar un producto");
          const productos = await this.getProducts();
          const indiceproducto = productos.findIndex(producto => producto.pId === pId);          

          if (indiceproducto === -1){ //no encontro el producto
            console.log(`El producto con id  ${pId} no existe`)
             return [];
         }else{ //encontro el  producto 
       
            for( var i = 0; i < productos.length; i++){                                    
               if ( productos[i].pId === pId) { 
                  productos.splice(i, 1); 
                   i--; 
               }
           }
            await fs.promises.writeFile(this.path, JSON.stringify(productos,null,"\t"));            
            return productos;
         }               
      
                           };
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
               return [];
            }else{ //encontro el  producto 
               //preparar objeto a modificar
               
               productoudpate.pid ??= productos[indiceproducto].pid;
               productoudpate.pCode ??= productos[indiceproducto].pCode;
               productoudpate.pTitle ??= productos[indiceproducto].pTitle;
               productoudpate.pDescription ??= productos[indiceproducto].pDescription;
               productoudpate.pPrice ??= productos[indiceproducto].pPrice;
               productoudpate.pThumbnail ??= productos[indiceproducto].pThumbnail;
               productoudpate.pStock ??= productos[indiceproducto].pStock;

               productos[indiceproducto] = productoudpate;
               
               await fs.promises.writeFile(this.path, JSON.stringify(productos,null,"\t"));
               console.log(productos);
               return productos;
            }   
          

               };
};


}