import {
    Text,
    View,
    SafeAreaView,
    StyleSheet,
    Image,
    TextInput,
    FlatList,
    Pressable,
    TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectBikes, fetchBikes } from "../bikesSlice";
import { useFocusEffect } from "@react-navigation/native";

export default function TodoList({ navigation }) {
    const dispatch = useDispatch();
    const bikes = useSelector(selectBikes);
    const [bikesList, setBikesList] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("All");
    const [filters, setFilters] = useState(["All", "Roadbike", "Mountain"]);

    const getImageSource = (index) => {
        const images = {
            0: require("../assets/no1.png"),
            1: require("../assets/no2.png"),
            2: require("../assets/no3.png"),
            3: require("../assets/no4.png"),
            4: require("../assets/no5.png"),
            5: require("../assets/no6.png"),
        };

        return images[index] || images[0];
    };

    let filteredBikes =
        selectedFilter === "ALL"
            ? bikes
            : bikes.filter((bike) => bike.type === selectedFilter);

    useFocusEffect(
        useCallback(() => {
            dispatch(fetchBikes());
            setBikesList(bikes || []);
        }, [bikes])
    );

    const navigateToAdd = (item) => {
        navigation.navigate("AddBike");
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innercontainer}>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Text style={styles.title}>The World's Best Bike</Text>
                    <TouchableOpacity onPress={navigateToAdd}>
                        <Text
                            style={{
                                backgroundColor: "red",
                                color: "#fff",
                                width: 40,
                                height: 30,
                                textAlign: "center",
                                borderRadius: 10,
                            }}
                        >
                            Add
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.categoryContainer}>
                    {filters.map((category) => (
                        <TouchableOpacity
                            key={category}
                            onPress={() => {
                                setSelectedFilter(category);
                                console.log(selectedFilter);
                            }}
                            style={[
                                styles.categoryButton,
                                selectedFilter === category &&
                                    styles.selectedCategory,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.categoryText,
                                    selectedFilter === category &&
                                        styles.selectedCategoryText,
                                ]}
                            >
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
            <FlatList
                data={filteredBikes.length === 0 ? bikes : filteredBikes}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <View>
                        <Image source={getImageSource(index)} />
                        <Text>{item.name}</Text>
                        <Text>${item.price}</Text>
                    </View>
                )}
                contentContainerStyle={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 20,
                    padding: 20,
                    justifyContent: "flex-start",
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ecf0f1",
        paddingHorizontal: 20,
        marginTop: 50,
    },
    innercontainer: {
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 16,
        color: "red",
    },
    categoryContainer: {
        flexDirection: "row",
        gap: 12,
        alignItems: "center",
    },
    categoryButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: "#f5f5f5",
        borderWidth: 1,
        borderColor: "#e0e0e0",
    },
    selectedCategory: {
        backgroundColor: "#ff4d4d",
        borderColor: "#ff4d4d",
    },
    categoryText: {
        fontSize: 14,
        color: "#666666",
        fontWeight: "500",
    },
    selectedCategoryText: {
        color: "#ffffff",
        fontWeight: "600",
    },
});
