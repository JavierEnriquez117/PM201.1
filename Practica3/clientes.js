const readline = require("readline");

function menuClientes(rl, productos, pedidos, regresarMenu) {

    console.log("\nMenu de cliente");
    console.log("1 = Consultar productos");
    console.log("2 = Crear pedido");
    console.log("3 = Listar pedidos");
    console.log("4 = Regresar");

    rl.question("Seleccione una opcion: ", function(opcion) {

        switch (Number(opcion)) {

            case 1:

                console.table(productos);

                menuClientes(rl, productos, pedidos, regresarMenu);
                break;

            case 2:

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

                        menuClientes(rl, productos, pedidos, regresarMenu);
                    });
                });

                break;

            case 3:

                console.table(pedidos);

                menuClientes(rl, productos, pedidos, regresarMenu);
                break;

            case 4:

                regresarMenu();
                break;

            default:

                console.log("Opcion no valida");

                menuClientes(rl, productos, pedidos, regresarMenu);
        }
    });
}

module.exports = {
    menuClientes
};