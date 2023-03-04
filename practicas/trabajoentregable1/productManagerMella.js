class ProductManager{  
    constructor(){
        this.products = [];    
    }
    
  //////////////////////////////////////////////////////////////////////////////////// 
  getProducts = () => {
    console.log(this.products);
    return this.products;    //devuelve array de productos    
}    

/////////////////////////////////////////////////////////////////////// 
  addProduct = (pTitle,pDescription,pPrice,pThumbnail,pCode,pStock) => {
    if (!pTitle  || !pDescription || !pPrice || !pThumbnail || !pCode || !pStock){
        console.log("error  es obligatorio")
        return;
    }
    const productIndex = this.products.findIndex((product) => product.pCode === pCode);
      if (productIndex === -1)  {   //no encuentra  el producto
          const product ={
             pId: this.products.length +1,
             pCode: pCode,
             pDescription: pDescription,
             pPrice:pPrice,
             pThumbnail:pThumbnail,
             pStock:pStock,             
        };
        this.products.push(product);
        console.log(`Product with code ${pCode} add succesfull`)
      }else{
        console.log(`Product with code ${pCode} already exists`)         
      }
};
////////////////////////////////////////////
 getProductsById = (pId) =>{
    const productsearch = this.products.findIndex((product) => product.pId === pId)

    if (productsearch === -1){
       console.log(`Product with id ${pId} was not found`)
    }else{
        console.log(`Product with id ${pId}  exist `)
        console.log(this.products[productsearch]);
    }
 };
}
//////////////////////////////////////////////
let products = new ProductManager();
products.getProducts();
products.addProduct("monitor", "monitor 23 pulgadas" , 23000, "sin imagen","abc123", 23);
products.getProducts();
products.addProduct("monitor", "monitor 23 pulgadas" , 23000, "sin imagen","abc123", 23);
products.getProductsById(1);