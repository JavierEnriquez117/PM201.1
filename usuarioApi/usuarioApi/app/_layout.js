import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen 
                name="index" 
                options={{
                    title: "Usuarios"
                }}
            />

            <Stack.Screen 
                name="detalles" 
                options={{
                    title: "Detalles Usuario"
                }}
            />

            <Stack.Screen 
                name="editar" 
                options={{
                    title: "Editar Usuario"
                }}
            />
        </Stack>
    );
}