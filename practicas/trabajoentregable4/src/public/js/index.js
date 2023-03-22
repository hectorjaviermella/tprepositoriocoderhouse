const socket = io();
const list = document.getElementById("listproducts")
socket.on("sprod", (products) => {    
   console.log(products)    
       let listProducts = "";
    products.forEach((prod) => {     
        listProducts += `<br>`+`-`+`pId : ${prod.pId} / pTitle: ${prod.pTitle}  / pCode : ${prod.pCode} / pDescription : ${prod.pDescription} / pPrice: ${prod.pPrice}</br>`;
    });
    
    list.innerHTML = `${listProducts}`
 
});



