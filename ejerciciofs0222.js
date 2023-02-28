/*const fs = require("fs");


fs.writeFile("ejerciciofsfecha.txt","",(error) => {
    
    
        const fechaactual =new Date().toString;
        
       
        fs.writeFile("ejerciciofsfecha.txt", fechaactual ,(error) => {
            if (error) return console.log("error al crear el archivo");

            fs.readFile("ejerciciofsfecha.txt","utf-8",(error,resultado) => {
                if (error) return console.log("error al leer el archivo");
                console.log(resultado);
            });
        });
    
*/

const promise = new Promise((resolve, reject) => {
    if (true) {
      resolve("Funcionó");
    } else {
      reject("Error!");
    }
  });
  
  //promise.then((result) => console.log(result));
  


  // Hagamos algo más interesante con esta promesa!
promise
.then((result) => result + "!")
.then((result2) => result2 + "?")
.then((result3) => console.log(result3 + "!"))
.catch((error) => console.log(error));

