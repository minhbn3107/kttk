import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { addNewBikes } from "../bikesSlice";
import { Picker } from "@react-native-picker/picker";

const AddBikeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");

    const handleAddBike = () => {
        if (!name || !type || !price) {
            Alert.alert("Error", "Please fill out all fields.");
            return;
        }

        dispatch(
            addNewBikes({ name, type, price, isFavorite: false })
        ).unwrap();

        navigation.navigate("BikeList");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Bike Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter bike name"
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.label}>Bike Type</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter bike type"
                value={type}
                onChangeText={setType}
            />

            <Text style={styles.label}>Price</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter price"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
            />

            <Button title="Add Bike" onPress={handleAddBike} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 5,
        marginBottom: 15,
    },
});

export default AddBikeScreen;
