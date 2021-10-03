
import { View, Text, Button, Image, ScrollView, TouchableOpacity } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Dimensions } from "react-native";

import Constants from "expo-constants";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
} from "react-native-chart-kit";
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import CircularProgress from '@material-ui/core/CircularProgress';

const Tab = createMaterialTopTabNavigator();

function ChartScreen({ route, navigation }) {

    const [params, setParams] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const { APILink, cloudChecked, UVChecked, solarIrradianceChecked, temperatureChecked, humidityChecked } = route.params;

    console.log(params)

    useEffect(() => {
        fetch(APILink)
            .then((response) => response.json())
            .then((json) => setParams(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
        
    }, []);
    console.log(APILink);
    console.log(params)
    //console.log(cloudChecked)
    
    return (
        
        <React.Fragment>
            {isLoading ? <View style={{flex: 1,justifyContent:'center', alignItems:'center'}} ></View> : (
                <>
                    <View>
                        <Text style={styles.title}>Result</Text>
                    </View>
                    <Tab.Navigator
                        screenOptions={{
                            tabBarLabelStyle: {
                                //fontFamily: "Poppins-Bold",
                                fontSize: 16,
                                color: "#000000",
                            },
                            tabBarStyle: { backgroundColor: "#ffa64d" },
                        }}
                        initialLayout={{
                            width: Dimensions.get("screen").width,
                            height: Dimensions.get("screen").height,
                        }}
                        tabBarPosition="top"
                    >
                        <Tab.Screen name="Charts" component={Charts} />
                        <Tab.Screen name="Analysis" component={Analysis} />
                    </Tab.Navigator>
                </>
                
            )}
            
        </React.Fragment>
    );
}
function Charts({ navigation }) {
    return (
        <React.Fragment>
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
        <View style={{ backgroundColor: "#fcd968", flex: 1, justifyContent: "center" }}>
        {/* average parameter */}
        <View style={{ flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "space-around" }}>
            <View style={{ width: "100%", alignItems: "center" }}>
                <Text style={{ fontSize: 30, fontWeight: "20%" }}>Average Parameters</Text>
            </View>
            <View style={{ borderRadius: 10, width: "80%", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                <View style={{ width: "49%" }}>
                    <Text> Solar Intensity</Text>
                    <Text> Solar Irradiance </Text>
                    <Text> UVs Light</Text>
                    <Text> Humidity</Text>
                    <Text> Cloud Cover</Text>
                    <Text> Temperature</Text>
                </View>
                <View style={{ width: "49%", textAlign: "center" }}>
                    <Text>88 %</Text>
                    <Text>88 W/m2</Text>
                    <Text>88 mW/cm2</Text>
                    <Text style={{ flex: 1 }}>88 %</Text>
                    <Text style={{ flex: 1 }}>88 % </Text>
                    <Text>88 Â°C</Text>
                </View>
            </View>
        </View>

        {/* sunshine power */}
        <View style={{ backgroundColor: "#ffcb59", flex: 0.7, alignItems: "center", justifyContent: "center" }}>
            <View style={{
                borderRadius: 10, width: "80%", alignItems: "center"
            }}>
                <Text style={{ textAlign: "center" }}>Average Sunshine Power</Text>
                <Text style={{ textAlign: "center", fontSize: 40, fontWeight: "bold" }}>88%</Text>
            </View>

        </View>

        {/* Estimate Power Generation */}
        <View style={{ flex: 1.3, alignItems: "center", justifyContent: "space-evenly" }}>
            <View style={{ width: "80%" }}>
                <View style={{ width: "100%", alignItems: "center" }}>
                    <Text style={{ color: "red", fontWeight: "50%" }}>*Please select a solar panel</Text>
                </View>
                <View style={{ width: "100%", alignItems: "center", flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ borderWidth: 1, borderColor: 'black', borderRadius: 4 }}>
                        <Picker style={{ width: 200, height: 25 }} itemStyle={{ height: 25 }} selectedValue={selectedPanel} onValueChange={(itemValue, itemIndex) => setSelectedPanel(itemValue)}>
                            <Picker.Item label="Solar Panel 01" value="solarpanel01" />
                            <Picker.Item label="Solar Panel AA" value="solarpanel02" />
                            <Picker.Item label="Solar Panel Z1" value="solarpanel03" />
                            <Picker.Item label="Solar Panel 2A" value="solarpanel04" />
                        </Picker>
                    </View>
                    
                    <View style={{ height: 20, alignItems: "center", justifyContent: "center" }}>
                        <TouchableOpacity style={{ borderWidth: 1, borderRadius: 50, backgroundColor: '#fc8f68', paddingHorizontal: 10 }}>
                            <Text style={{}}>Calculate</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={{ alignItems: "center", justifyContent: "center" }} >
                        <TouchableOpacity style={{ borderWidth: 1, borderRadius: 50, backgroundColor: '#fc8f68', paddingHorizontal: 10 }}>
                            <Text>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={{ width: "100%", alignItems: "center" }}>
                <Text style={{ fontSize: 30, fontWeight: "20%" }}>Estimated Power Generation</Text>
            </View>
            <View style={{ width: "100%", flexDirection: "column", alignItems: "center", justifyContent: "space-around" }}>
                <View style={{ backgroundColor: "#fcd968", borderRadius: 10, width: "80%" }}>
                    <Text> 1234 kJ/ day</Text>
                    <Text> 1234 kJ/ week</Text>
                    <Text> 1234 kJ/ month</Text>
                    <Text> 1234 kJ/ year</Text>
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
        // fontFamily: "Poppins-Bold",
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
        //fontFamily: PoppinsItalic,
    },
    title3: { fontSize: 21, fontWeight: "700"},
};
export default ChartScreen;
