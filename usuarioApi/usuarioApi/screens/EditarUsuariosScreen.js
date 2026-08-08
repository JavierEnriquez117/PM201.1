import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";

import { useLocalSearchParams, useRouter } from "expo-router";
import { encode } from "base-64";

export default function EditarUsuarioScreen() {

    const router = useRouter();

    const { id, nombre, edad } = useLocalSearchParams();

    const [nuevoNombre, setNuevoNombre] = useState(nombre);
    const [nuevaEdad, setNuevaEdad] = useState(edad);

    const actualizarUsuario = async () => {

    if (
        nuevoNombre.trim() === "" ||
        nuevaEdad.trim() === ""
    ) {
        Alert.alert(
        "Campos vacíos",
        "Llena todos los datos."
        );
        return;
    }

    try {

        const respuesta = await fetch(
        `http://10.95.199.225:5000/v1/usuarios/${id}`,
        {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${encode("admin:1234")}`,
            },
            body: JSON.stringify({
            nombre: nuevoNombre,
            edad: Number(nuevaEdad),
            }),
        }
      );

        const datos = await respuesta.json();

        console.log(datos);

        Alert.alert(
        "Éxito",
        "Usuario actualizado correctamente.",
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
        "No fue posible actualizar."
        );

    }

    };

    return (

    <SafeAreaView style={styles.container}>

        <View style={styles.card}>

        <Text style={styles.titulo}>
            Editar Usuario
        </Text>

        <TextInput
            style={styles.input}
            value={nuevoNombre}
            onChangeText={setNuevoNombre}
            placeholder="Nombre"
        />

        <TextInput
            style={styles.input}
            value={String(nuevaEdad)}
            onChangeText={setNuevaEdad}
            keyboardType="numeric"
            placeholder="Edad"
        />

        <Pressable
            style={styles.boton}
            onPress={actualizarUsuario}
        >

            <Text style={styles.textoBoton}>
            Actualizar Usuario
            </Text>

        </Pressable>

        </View>

    </SafeAreaView>

    );

}

const styles = StyleSheet.create({

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
    color: "#1F2937",
    },

    input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 18,
    backgroundColor: "#F9FAFB",
    fontSize: 16,
    },

    boton: {
    backgroundColor: "#22C55E",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    },

    textoBoton: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    },

});