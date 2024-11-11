import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BikeList from "./components/BikeList";
import AddBike from "./components/AddBike";
import { Text, View, StyleSheet, Image } from "react-native";
import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store";

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="BikeList"
                        component={BikeList}
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen
                        name="AddBike"
                        component={AddBike}
                        options={{
                            headerShown: false,
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 15,
        textAlign: "center",
        fontWeight: "700",
    },
    text: {
        fontSize: 12,
        textAlign: "center",
        fontWeight: "600",
    },
});
