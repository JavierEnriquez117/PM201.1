function menuClientes(rl, productos, promociones, pedidos, regresarMenu) {

    console.log("\nMenu de clientes");
    console.log("1 = Ver productos");
    console.log("2 = Ver promociones");
    console.log("3 = Productos baratos");
    console.log("4 = Productos caros");
    console.log("5 = Bebidas");
    console.log("6 = Crear pedido");
    console.log("7 = Ver pedidos");
    console.log("8 = Regresar");

    rl.question("Seleccione una opcion: ", function(opcion) {

        switch(Number(opcion)) {

            case 1:

                productos.forEach(function(producto) {

                    console.log(
                        producto.id +
                        " - " +
                        producto.nombre +
                        " - $" +
                        producto.precio
                    );

                });

                menuClientes(
                    rl,
                    productos,
                    promociones,
                    pedidos,
                    regresarMenu
                );

                break;

            case 2:

                console.table(promociones);

                menuClientes(
                    rl,
                    productos,
                    promociones,
                    pedidos,
                    regresarMenu
                );

                break;

            case 3:
                let baratos = productos.filter(
                    p => p.precio < 100
                );

                console.table(baratos);

                menuClientes(
                    rl,
                    productos,
                    promociones,
                    pedidos,
                    regresarMenu
                );

                break;

            case 4:

                let caros = productos.filter(
                    p => p.precio >= 100
                );

                console.table(caros);

                menuClientes(
                    rl,
                    productos,
                    promociones,
                    pedidos,
                    regresarMenu
                );

                break;

            case 5:

                let bebidas = productos.filter(
                    p => p.categoria === "Bebida"
                );

                console.table(bebidas);

                menuClientes(
                    rl,
                    productos,
                    promociones,
                    pedidos,
                    regresarMenu
                );

                break;

            case 6:

                rl.question("Ingrese ID del producto: ", function(idProducto) {

                    rl.question("Ingrese cantidad: ", function(cantidad) {
                        
                        let producto = productos.find(
                            p => p.id === Number(idProducto)
                        );

                        if (producto) {

                            let { nombre, precio } = producto;

                            let subtotal = precio * Number(cantidad);
                            let iva = subtotal * 0.16;
                            let total = subtotal + iva;

                            let nuevoPedido = {
                                producto: nombre,
                                cantidad: Number(cantidad),
                                subtotal: subtotal,
                                iva: iva,
                                total: total,
                                estado: "Pedido recibido"
                            };

                            pedidos.push(nuevoPedido);

                            console.log("\nPedido creado");
                            console.log("Estado actual: Pedido recibido");

                            setTimeout(function() {

                                nuevoPedido.estado = "Preparando";

                                console.log(
                                    "\nEl pedido de " +
                                    nuevoPedido.producto +
                                    " ahora esta: PREPARANDO"
                                );

                            }, 3000);

                            setTimeout(function() {

                                nuevoPedido.estado = "Empaquetando";

                                console.log(
                                    "\nEl pedido de " +
                                    nuevoPedido.producto +
                                    " ahora esta: EMPAQUETANDO"
                                );

                            }, 6000);

                            setTimeout(function() {

                                nuevoPedido.estado = "Pedido entregado";

                                console.log(
                                    "\nEl pedido de " +
                                    nuevoPedido.producto +
                                    " fue ENTREGADO"
                                );

                            }, 9000);

                        } else {

                            console.log("Producto no encontrado");

                        }

                        menuClientes(
                            rl,
                            productos,
                            promociones,
                            pedidos,
                            regresarMenu
                        );

                    });

                });

                break;

            case 7:

                console.table(pedidos);

                menuClientes(
                    rl,
                    productos,
                    promociones,
                    pedidos,
                    regresarMenu
                );

                break;

            case 8:

                regresarMenu();

                break;

            default:

                console.log("Opcion no valida");

                menuClientes(
                    rl,
                    productos,
                    promociones,
                    pedidos,
                    regresarMenu
                );
        }
    });
}

module.exports = {
    menuClientes
};

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let productos = [
    {
        id: 1,
        nombre: "Cafe Americano",
        precio: 50,
        categoria: "Bebida"
    },
    {
        id: 2,
        nombre: "Capuchino",
        precio: 80,
        categoria: "Bebida"
    },
    {
        id: 3,
        nombre: "Sandwich",
        precio: 120,
        categoria: "Comida"
    }
];

let promociones = [
    {
        nombre: "2x1 en Cafe",
        descuento: "50%"
    }
];

let pedidos = [];

function regresarMenu() {

    menuClientes(
        rl,
        productos,
        promociones,
        pedidos,
        salir
    );

}

function salir() {

    console.log("Programa terminado");
    rl.close();

}

// INICIAR PROGRAMA
menuClientes(
    rl,
    productos,
    promociones,
    pedidos,
    salir
);