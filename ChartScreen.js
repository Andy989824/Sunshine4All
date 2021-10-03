import { View, Text, Button, Image, ScrollView, FlatList, addons } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Dimensions } from "react-native";
import Constants from "expo-constants";
import {
    LineChart,
} from "react-native-chart-kit";
import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect } from 'react';
import { useFonts } from 'expo-font';


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
