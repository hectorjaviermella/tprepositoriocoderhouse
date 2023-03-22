import { Server } from "socket.io";
import ProductManager from './productManagerMella.js';
 const socket={};
 
 socket.connect = (server) =>{
     const  productManager = new ProductManager();
     socket.io = new Server(server);

     socket.io.on("connection", async(socket) => {
       console.log(`${socket.id} client connected`);      
      const productos = await productManager.getProducts();
     // console.log(productos);

      socket.emit("sprod", productos);     

     });
 };
 export default socket;