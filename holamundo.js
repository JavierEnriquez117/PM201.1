/* js del lado del servidor*/

console.log("Hola mundo JS con Node")

/*calculo*/
let edad1= 12
let edad2= 34

console.log("edad promedio:")
console.log((edad1 + edad2)/2)

/*medir tiempo de proceso*/
console.time("miProceso")

for(let i =0; i< 1000000000; i++){ }

console.timeEnd("miProceso")

/*objetos tipo tabla */
let usuarios=[
    {nombre:"Javier", edad:25},
    {nombre:"Javier", edad:25},
]

console.table(usuarios)