
import { View, Text, Button, Image, ScrollView, TouchableOpacity } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Dimensions } from "react-native";

import Constants from "expo-constants";
import {
    LineChart,
} from "react-native-chart-kit";
import { useFonts } from 'expo-font';
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import CircularProgress from '@material-ui/core/CircularProgress';

const Tab = createMaterialTopTabNavigator();

function ChartScreen({ route, navigation }) {

    const [loaded] = useFonts({
        Poppins_Medium: require('./assets/fonts/Poppins-Medium.ttf'),
        Poppins_Light: require('./assets/fonts/Poppins-Light.ttf')

    });

    const [params, setParams] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const { APILink, cloudChecked, UVChecked, solarIrradianceChecked, temperatureChecked, humidityChecked } = route.params;
    
    useEffect(() => {
        fetch(APILink)
            .then((response) => response.json())
            .then((json) => setParams(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));

    }, []);

    let cloud_data = [];
    let uv_data = [];
    let solar_data = [];
    let temp_data = [];
    let humidity_data = [];


    if (params.length != 0) {
        if (cloudChecked) {
            delete params.properties.parameter.CLOUD_AMT.ANN;
            cloud_data = JSON.stringify(params.properties.parameter.CLOUD_AMT)
            cloud_data = cloud_data.replace(/([a-zA-Z])/g, "");
            cloud_data = cloud_data.replace(/:\s*/g, "");
            cloud_data = cloud_data.replace(/"/g, "");
            cloud_data = cloud_data.replace('{', '')
            cloud_data = cloud_data.replace('}', '')
            cloud_data = cloud_data.split(',').map(Number);
        }
        if (UVChecked) {
            uv_data = JSON.stringify(params.properties.parameter.ALLSKY_SFC_UVA)
            // data = data.splice(-1)
            uv_data = uv_data.replace(/([a-zA-Z])/g, "");
            uv_data = uv_data.replace(/:\s*/g, "");
            uv_data = uv_data.replace(/"/g, "");
            uv_data = uv_data.replace('{', '')
            uv_data = uv_data.replace('}', '')
            uv_data = uv_data.split(',').map(Number);
        }
        if (solarIrradianceChecked) {
            delete params.properties.parameter.SI_EF_TILTED_SURFACE_HORIZONTAL.ANN;
            solar_data = JSON.stringify(params.properties.parameter.SI_EF_TILTED_SURFACE_HORIZONTAL)
            solar_data = solar_data.replace(/([a-zA-Z])/g, "");
            solar_data = solar_data.replace(/:\s*/g, "");
            solar_data = solar_data.replace(/"/g, "");
            solar_data = solar_data.replace('{', '')
            solar_data = solar_data.replace('}', '')
            solar_data = solar_data.split(',').map(Number);
        }
        if (temperatureChecked) {
            delete params.properties.parameter.T2M.ANN;
            temp_data = JSON.stringify(params.properties.parameter.T2M)
            temp_data = temp_data.replace(/([a-zA-Z])/g, "");
            temp_data = temp_data.replace(/:\s*/g, "");
            temp_data = temp_data.replace(/"/g, "");
            temp_data = temp_data.replace('{', '')
            temp_data = temp_data.replace('}', '')
            temp_data = temp_data.split(',').map(Number);
        }
        if (humidityChecked) {
            delete params.properties.parameter.RH2M.ANN;
            humidity_data = JSON.stringify(params.properties.parameter.RH2M)
            humidity_data = humidity_data.replace(/([a-zA-Z])/g, "");
            humidity_data = humidity_data.replace(/:\s*/g, "");
            humidity_data = humidity_data.replace(/"/g, "");
            humidity_data = humidity_data.replace('{', '')
            humidity_data = humidity_data.replace('}', '')
            humidity_data = humidity_data.split(',').map(Number);
        }
    }
    else
        console.log('not yet')

    const cloud_line = {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [
            {
                data: cloud_data,
                strokeWidth: 2, // optional
            },
        ],
    };

    const uv_line = {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [
            {
                data: uv_data,
                strokeWidth: 2, // optional
            },
        ],
    };
    const solar_line = {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [
            {
                data: solar_data,
                strokeWidth: 2, // optional
            },
        ],
    };
    const temp_line = {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [
            {
                data: temp_data,
                strokeWidth: 2, // optional
            },
        ],
    };
    const humidity_line = {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [
            {
                data: humidity_data,
                strokeWidth: 2, // optional
            },
        ],
    };
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
                    {cloudChecked ?
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ fontFamily: 'Poppins_Medium' }}>Cloud against Time</Text>
                            <LineChart
                                data={cloud_line}
                                width={Dimensions.get("window").width} // from react-native
                                height={120}
                                yAxisLabel={""}
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
                        : <></>
                    }
                    {UVChecked ?
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ fontFamily: 'Poppins_Medium' }}>UV against Time</Text>
                            <LineChart
                                data={uv_line}
                                width={Dimensions.get("window").width} // from react-native
                                height={120}
                                yAxisLabel={""}
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
                        : <></>
                    }
                    {solarIrradianceChecked ?
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ fontFamily: 'Poppins_Medium' }}>Solar Irradiance against Time</Text>
                            <LineChart
                                data={solar_line}
                                width={Dimensions.get("window").width} // from react-native
                                height={120}
                                yAxisLabel={""}
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
                        : <></>
                    }
                    {temperatureChecked ?
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ fontFamily: 'Poppins_Medium' }}> Temperature against Time</Text>
                            <LineChart
                                data={temp_line}
                                width={Dimensions.get("window").width} // from react-native
                                height={120}
                                yAxisLabel={""}
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
                        : <></>
                    }
                    {humidityChecked ?
                        <View style={{ alignItems: "center" }}>
                            <Text style={{ fontFamily: 'Poppins_Medium' }}>Humidity against Time</Text>
                            <LineChart
                                data={humidity_line}
                                width={Dimensions.get("window").width} // from react-native
                                height={120}
                                yAxisLabel={""}
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
                        : <></>
                    }


                </ScrollView>
            </React.Fragment>
        );
    }

    return (
        <React.Fragment>
            {isLoading ? <Text>Loading...</Text> : (
                <View>
                    <View>
                        <Text style={styles.title}>Result</Text>
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
                </View>
            )}
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


const styles = {
    title: {
        fontSize: 25,
        fontFamily: "Poppins_Medium",
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
        fontFamily: 'Poppins_Medium',
    },
    title3: { fontSize: 21, fontWeight: "700", fontFamily: "Poppins_Medium" },
};
export default ChartScreen;
