
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";

import React, { useState, useEffect } from "react";
import { useRouter, useFocusEffect } from "expo-router";

export default function ConsultaUsuariosScreen() {

  const router = useRouter();

  const [usuarios, setUsuarios] = useState([]);

  const obtenerUsuarios = async () => {
    try {

      const respuesta = await fetch("http://10.95.199.225:5000/v1/usuarios/");

      const datos = await respuesta.json();

      console.log("Respuesta API:", datos);

      setUsuarios(datos.usuarios);

    } catch (error) {

      console.log("Error:", error);

    }
  };

  useEffect(() => {

    obtenerUsuarios();

  }, []);

  useFocusEffect(
    React.useCallback(() => {

      obtenerUsuarios();

    }, [])
  );

  const verDetalle = (usuario) => {

    router.push({
      pathname: "/detalles",
      params: {
        id: usuario.id,
        nombre: usuario.nombre,
        edad: usuario.edad,
      },
    });

  };

  const renderTarjeta = ({ item }) => (

    <View style={styles.card}>

      <Text style={styles.nombre}>
        {item.nombre}
      </Text>

      <View style={styles.linea}></View>

      <Text style={styles.info}>
        Edad: {item.edad} años
      </Text>

      <Pressable
        style={styles.boton}
        onPress={() => verDetalle(item)}
      >

        <Text style={styles.textoBoton}>
          Ver detalle
        </Text>

      </Pressable>

    </View>

  );

  return (

    <SafeAreaView style={styles.container}>

      <Text style={styles.titulo}>
        Lista de Usuarios
      </Text>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTarjeta}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1F2937",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 18,
    marginBottom: 15,
    elevation: 4,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  nombre: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2563EB",
  },

  linea: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 10,
  },

  info: {
    fontSize: 16,
    color: "#4B5563",
    marginBottom: 15,
  },

  boton: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  textoBoton: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },

});