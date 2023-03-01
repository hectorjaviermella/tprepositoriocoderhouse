function mostrarlista(array){
if (array.length===0)
 return "lista vacia";



array.forEach(elemento => console.log(elemento));
}

let arrayVacio = [];

let arregloPoblado = [1,2,3];

console.log(mostrarlista(arrayVacio));
//console.log(mostrarlista(arregloPoblado));
