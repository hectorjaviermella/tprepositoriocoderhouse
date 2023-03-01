const objetos=[
    {
   manzanas:3,
   peras: 2,
   carne: 1,
   jugos: 5,
   dulces: 2
},
{
    manzanas:1,
    sandias:1,
    huevos:6,
    jugos:1,
    panes:4

}]
console.log(objetos);


let array1 = {...objetos[0],...objetos[1]}
console.log("array1: ",array1);

let  arraytipos =Object.keys(array1);
console.log("arraytipos: ",arraytipos);

let arrayvalores=Object.values(array1);
console.log("arrayvalores: ",arrayvalores);

