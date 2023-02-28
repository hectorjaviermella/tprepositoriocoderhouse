import ProductManager from './productManagerMella.js'


// 1 - crea instancia de la clase
let products = new ProductManager();


const env = async () => {

// 2 - llamado getproducts
   // let primeraConsulta = await products.getProducts();
   // console.log(primeraConsulta);

// 3 - llamado a metodo addproduct
const producto ={
             pTitle: "producto prueba",
             pDescription: "este es el producto prueba ",
             pCode: "abc123",             
             pPrice: 200,
             pThumbnail:"sin imagen",
             pStock: 25, 
};
//let tercerconsulta = await products.addProduct(producto);
//console.log(tercerconsulta);



// 4 - llamado a metodo getProduct
//let cuartaconsulta = await products.getProducts();
//console.log(cuartaconsulta);

// 5 - llamado metodo getproductById
//let quintaconsulta = await products.getProductsById(1);
//console.log(quintaconsulta);


// 6 - llamado metodo updateProduct 
/*const productoupdate ={
    pId: 1,      
    pCode: null,
    pTitle: "xxxxxxx",
    pDescription: "xxxxx",
    pPrice: 99999,
    pThumbnail:"xxxxxxxxxx",
    pStock: 99999, 
};
let sextaconsulta = await products.updateProducto(productoupdate);
console.log(sextaconsulta);
*/

///7 - llamado metodo deleteProduct 
let septimaconsulta = await products.deleteProduct(1);
console.log(septimaconsulta);


};

env();