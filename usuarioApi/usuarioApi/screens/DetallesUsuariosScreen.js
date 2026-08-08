import React, { useState } from "react";
import { SafeAreaView, View, Text, Pressable, StyleSheet, Modal } from "react-native";
import { encode } from "base-64";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function DetallesUsuarioScreen() {

    const router = useRouter();

    const [modalVisible, setModalVisible] = useState(false);

    const { id, nombre, edad } = useLocalSearchParams();

    const editarUsuario = () => {

    router.push({
        pathname: "/editar",
        params: {
            id,
            nombre,
            edad,
        },
    });

    };

    const eliminarUsuario = () => {
        setModalVisible(true);
    };

    const eliminar = async () => {

    try {

        const credenciales = encode("admin:1234");

        const respuesta = await fetch(
        `http://10.95.199.225:5000/v1/usuarios/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Basic ${credenciales}`,
            },
        }
        );

        const datos = await respuesta.json();

        console.log(datos);

        Alert.alert(
            "Éxito",
            "Usuario eliminado correctamente",
        [
            {
                text: "Aceptar",
                onPress: () => router.back(),
            },
        ]
        );

    } catch (error) {

        console.log(error);

        Alert.alert(
            "Error",
            "No fue posible eliminar el usuario"
        );

    }

    };

    return (

    <SafeAreaView style={styles.container}>

        <View style={styles.card}>

        <Text style={styles.titulo}>
            Detalle del Usuario
        </Text>

        <Text style={styles.texto}>
            Nombre:
        </Text>

        <Text style={styles.valor}>
            {nombre}
        </Text>

        <Text style={styles.texto}>
            Edad:
        </Text>

        <Text style={styles.valor}>
            {edad} años
        </Text>

        <Pressable
            style={styles.botonEditar}
            onPress={editarUsuario}
        >

            <Text style={styles.textoBoton}>
            Editar
            </Text>

        </Pressable>

        <Pressable
            style={styles.botonEliminar}
            onPress={eliminarUsuario}
        >

            <Text style={styles.textoBoton}>
            Eliminar
            </Text>

        </Pressable>

        <Modal
    animationType="fade"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => setModalVisible(false)}
>

    <View style={styles.fondoModal}>

        <View style={styles.modal}>

            <Text style={styles.titulo}>
                Eliminar usuario
            </Text>

            <Text style={styles.texto}>
                ¿Deseas eliminar este usuario?
            </Text>


            <View style={styles.botonesModal}>

                <Pressable
                    style={styles.botonCancelar}
                    onPress={() => setModalVisible(false)}
                >
                    <Text>
                        Cancelar
                    </Text>
                </Pressable>


                <Pressable
                    style={styles.botonEliminar}
                    onPress={() => {
                        setModalVisible(false);
                        eliminar();
                    }}
                >
                    <Text style={styles.textoBoton}>
                        Eliminar
                    </Text>
                </Pressable>

            </View>

        </View>

    </View>

</Modal>

        </View>

    </SafeAreaView>

    );

}

const styles = StyleSheet.create({
    fondoModal:{
    flex:1,
    backgroundColor:"rgba(0,0,0,0.5)",
    justifyContent:"center",
    alignItems:"center",
},

modal:{
    width:"80%",
    backgroundColor:"white",
    padding:20,
    borderRadius:10,
    alignItems:"center",
},

botonesModal:{
    flexDirection:"row",
    justifyContent:"space-between",
    marginTop:20,
    width:"100%",
},

botonCancelar:{
    backgroundColor:"#ddd",
    padding:10,
    borderRadius:5,
},

    container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    justifyContent: "center",
    padding: 20,
    },   

    card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 25,
    elevation: 5,
    },

    titulo: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    },

    texto: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 10,
    },

    valor: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#2563EB",
    },

    botonEditar: {
    backgroundColor: "#22C55E",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    },

    botonEliminar: {
    backgroundColor: "#DC2626",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
    },

    textoBoton: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "bold",
    },

});