const fs = require("fs");
const { json } = require("stream/consumers");
const {Blob}  = require("buffer");


const operaciones = async () => {
  
   const data =  await fs.promises.readFile("./package.json", "utf-8");

  const contenidoStr = data;
  const contenidoObj = JSON.parse(data);
  const tamano = new Blob([data]).size;

  const info ={
      contenidoStr,
      contenidoObj,
      tamano,

  };

  
  console.log(info);

  await fs.promises.writeFile("./info.json", JSON.stringify(info,null , "\t"));
  
};

operaciones();