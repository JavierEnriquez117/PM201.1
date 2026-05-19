const readline = require("readline");

// Crear interfaz
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Productos
const productos = [
    { id: 1, nombre: "Laptop", precio: 15000 },
    { id: 2, nombre: "Mouse", precio: 300 },
    { id: 3, nombre: "Teclado", precio: 700 }
];

// Pedidos
let pedidos = [];

// Mostrar menú
function mostrarMenu() {

    console.log("\nMenu de cliente");
    console.log("1 = Consultar productos");
    console.log("2 = Crear pedido");
    console.log("3 = Listar pedidos");
    console.log("4 = Salir");

    rl.question("Seleccione una opcion: ", function(opcion) {

        switch (Number(opcion)) {

            case 1:
                consultarProductos();
                break;

            case 2:
                crearPedido();
                break;

            case 3:
                listarPedidos();
                break;

            case 4:
                console.log("Programa terminado");
                rl.close();
                break;

            default:
                console.log("Opcion no valida");
                mostrarMenu();
        }
    });
}

// Consultar productos
function consultarProductos() {

    console.log("\nPRODUCTOS:");

    console.table(productos);

    mostrarMenu();
}

// Crear pedido
function crearPedido() {

    rl.question("Ingrese ID del producto: ", function(idProducto) {

        rl.question("Ingrese cantidad: ", function(cantidad) {

            let producto = productos.find(
                p => p.id === Number(idProducto)
            );

            if (producto) {

                let total = producto.precio * Number(cantidad);

                pedidos.push({
                    producto: producto.nombre,
                    cantidad: Number(cantidad),
                    total: total
                });

                console.log("Pedido creado");

            } else {
                console.log("Producto no encontrado");
            }

            mostrarMenu();
        });
    });
}

// Listar pedidos
function listarPedidos() {

    console.log("\nPedidos:");

    if (pedidos.length === 0) {

        console.log("No hay pedidos");

    } else {

        console.table(pedidos);

    }

    mostrarMenu();
}

// Iniciar programa
mostrarMenu();