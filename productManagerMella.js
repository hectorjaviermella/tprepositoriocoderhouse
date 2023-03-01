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
findCod = async(pCode) => {
            const productos = await this.getProducts();
            const indiceproducto = productos.findIndex(producto => producto.pCode === pCode);
            if (indiceproducto === -1){ //no encontro el producto
               //console.log(`Producto con  pcode ${pCode} no existe`)
                return null;
            }else{ //encontro el  producto 
                //console.log(`Producto cofindCodn id ${pCode}  existe `)
                return(productos[indiceproducto]);
            }     
   };

   addProduct = async(producto) => {
            console.log("entro al crear producto");
            if (!producto.pTitle  || !producto.pDescription || !producto.pPrice || !producto.pThumbnail || !producto.pCode || !producto.pStock){
               console.log("Error: es obligatorio ingresar todo los campos")
               return;
           }
            const productos = await this.getProducts();
            //devuelve si esta  el pcode ya inserto 
            const encontro = await this.findCod(producto.pCode);
            if (!encontro){
                  if (productos.length === 0){               
                     producto.pId = 1;
                  }else {
                     producto.pId = productos[productos.length - 1].pId +1;
                  }

                  productos.push(producto);            
                  await fs.promises.writeFile(this.path, JSON.stringify(productos,null,"\t"));
                  return producto;
               }else{
                  console.log(`El codigo del producto  ${producto.pCode}  ya esta inserto `)
               }
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