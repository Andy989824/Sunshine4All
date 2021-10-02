import * as React from "react";
import { View, Text, Button, Image, ScrollView } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Dimensions } from "react-native";
import PoppinsItalic from "./assets/fonts/Poppins-Italic.ttf";
import Constants from "expo-constants";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
} from "react-native-chart-kit";
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';


const Tab = createMaterialTopTabNavigator();

function ChartScreen({ route, navigation }) {

    const [params, setParams] = React.useState([]);

    const { APILink, cloudChecked, UVChecked, solarIrradianceChecked, temperatureChecked, humidityChecked } = route.params;

    console.log(params)

    React.useEffect(() => {
        fetch(APILink)
            .then((response) => response.json())
            .then((json) => setParams(json.CLOUD_AMT))
            .catch((error) => console.error(error))
        // .finally(() => setLoading(false));

    }, []);
    console.log(APILink)
    console.log(cloudChecked)
    return (
        <React.Fragment>
            <View>
                <Text style={styles.title}>{params.map(el => el.type)}</Text>
            </View>
            <Tab.Navigator
                screenOptions={{
                    tabBarLabelStyle: {
                        fontFamily: "Poppins-Bold",
                        fontSize: 16,
                        color: "#000000",
                    },
                    tabBarStyle: { backgroundColor: "#ffa64d" },
                }}
                initialLayout={{
                    width: Dimensions.get("window").width,
                    height: Dimensions.get("window").height,
                }}
                tabBarPosition="top"
            >
                <Tab.Screen name="Charts" component={Charts} />
                <Tab.Screen name="Analysis" component={Analysis} />
            </Tab.Navigator>
        </React.Fragment>
    );
}
function Charts({ navigation }) {
    return (
        <React.Fragment stlye={{ backgroundColor: "#000000" }}>
            <ScrollView>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Text style={styles.title2}>You are here!</Text>
                    <Text style={styles.title3}>Miri, Sarawak</Text>
                </View>
                <View
                    style={{
                        marginTop: 10,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Image
                        source={require("./assets/asd.png")}
                        style={{ width: 300, height: 200 }}
                    />
                </View>
                <View style={{ alignItems: "center" }}>
                    <Text>Solar iiradiance against Time</Text>
                    <LineChart
                        data={line}
                        width={Dimensions.get("window").width} // from react-native
                        height={120}
                        yAxisLabel={"$"}
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 1,
                            },
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                        }}
                    />
                </View>
                <View style={{ alignItems: "center" }}>
                    <Text>Cloud amount against Time</Text>
                    <LineChart
                        data={line}
                        width={Dimensions.get("window").width} // from react-native
                        height={120}
                        yAxisLabel={"$"}
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 1,
                            },
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                        }}
                    />
                </View>
                <View style={{ alignItems: "center" }}>
                    <Text>Temperature against Time</Text>
                    <LineChart
                        data={line}
                        width={Dimensions.get("window").width} // from react-native
                        height={120}
                        yAxisLabel={"$"}
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 1,
                            },
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                        }}
                    />
                </View>

            </ScrollView>
        </React.Fragment>
    );
}
function Analysis({ navigation }) {

    const [selectedPanel, setSelectedPanel] = useState();

    return (
        <View style={{ backgroundColor: "yellow", flex: 1, justifyContent: "center" }}>
            {/* average parameter */}
            <View style={{ backgroundColor: "red", flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "space-around" }}>
                <View style={{ backgroundColor: "orange", width: "100%", alignItems: "center" }}>
                    <Text>Average Parameters</Text>
                </View>
                <View style={{ backgroundColor: "white", width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <View style={{ backgroundColor: "tomato", width: "40%" }}>
                        <Text style={{ backgroundColor: "cyan", flex: 1 }}> Solar Intensity</Text>
                        <Text style={{ backgroundColor: "brown", flex: 1 }}> Solar Irradiance </Text>
                        <Text style={{ backgroundColor: "cyan", flex: 1 }}> UVs Light</Text>
                        <Text style={{ backgroundColor: "brown", flex: 1 }}> Humidity</Text>
                        <Text style={{ backgroundColor: "cyan", flex: 1 }}> Cloud Cover</Text>
                        <Text style={{ backgroundColor: "brown", flex: 1 }}> Temperature</Text>
                    </View>
                    <View style={{ backgroundColor: "tomato", width: "40%", textAlign: "center" }}>
                        <Text style={{ backgroundColor: "purple", flex: 1 }}>123</Text>
                        <Text style={{ backgroundColor: "grey", flex: 1 }}>123</Text>
                        <Text style={{ backgroundColor: "purple", flex: 1 }}>123</Text>
                        <Text style={{ backgroundColor: "grey", flex: 1 }}>123</Text>
                        <Text style={{ backgroundColor: "purple", flex: 1 }}>123</Text>
                        <Text style={{ backgroundColor: "grey", flex: 1 }}>123</Text>
                    </View>
                </View>
            </View>

            {/* sunshine power */}
            <View style={{ backgroundColor: "green", flex: 1, alignItems: "center", justifyContent: "center" }}>
                <View style={{ backgroundColor: "lightblue", width: "80%", alignItems: "center" }}>
                    <Text style={{ textAlign: "center", fontSize: 20 }}>Average Sunshine Power</Text>
                    <Text style={{ textAlign: "center", fontSize: 40, fontWeight: "bold" }}>88%</Text>
                </View>

            </View>

            {/* Estimate Power Generation */}
            <View style={{ backgroundColor: "blue", flex: 1, alignItems: "center", justifyContent: "center" }}>
                <View style={{ backgroundColor: "lightgrey", flex: 0.3, width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
                    <Picker selectedValue={selectedPanel} onValueChange={(itemValue, itemIndex) => setSelectedPanel(itemValue)}>
                        <Picker.Item label="Solar Panel01" value="solarPanel01" />
                        <Picker.Item label="Solar Panel02" value="solarPanel02" />
                        <Picker.Item label="Solar Panel03" value="solarPanel03" />
                        <Picker.Item label="Solar Panel04" value="solarPanel04" />
                    </Picker>
                    <View style={{ backgroundColor: "white", height: 20 }}>Calculate</View>
                    <View style={{ backgroundColor: "black", width: 20, height: 20 }} />
                </View>
                <View style={{ backgroundColor: "lightgreen", flex: 0.7, width: "100%", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <View style={{ backgroundColor: "tomato", width: "80%" }}>
                        <Text style={{ backgroundColor: "cyan", flex: 1 }}>Estimated Power Generation</Text>
                        <Text style={{ backgroundColor: "brown", flex: 1 }}>1234 kJ/ day</Text>
                        <Text style={{ backgroundColor: "cyan", flex: 1 }}>1234 kJ/ week</Text>
                        <Text style={{ backgroundColor: "brown", flex: 1 }}>1234 kJ/ month</Text>
                        <Text style={{ backgroundColor: "cyan", flex: 1 }}>1234 kJ/ year</Text>
                    </View>
                </View>
            </View>
        </View >
    );
}
const line = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43],
            strokeWidth: 2, // optional
        },
    ],
};

const styles = {
    title: {
        fontSize: 25,
        fontFamily: "Poppins-Bold",
        color: "#000000",
        textAlign: "center",
        paddingTop: 10,
        paddingBottom: 5,
        backgroundColor: "#ff9933",
        marginTop: Constants.statusBarHeight,
    },
    title2: {
        marginTop: 10,
        fontSize: 20,
        fontFamily: PoppinsItalic,
    },
    title3: { fontSize: 21, fontWeight: "700", fontFamily: "Poppins-Bold" },
};
export default ChartScreen;
