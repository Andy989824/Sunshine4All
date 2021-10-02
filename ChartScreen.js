// In App.js in a new project

import * as React from "react";
import { View, Text, Button, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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

function Charts({ navigation }) {
  return (
    <React.Fragment stlye={{ backgroundColor: "#000000" }}>
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
    </React.Fragment>
  );
}

function Analysis({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Analysis Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function App() {
  return (
    // Stack Navigation
    // <NavigationContainer  >
    //   <Stack.Navigator screenOptions={{title:'Testing Navigation'}} >
    //     <Stack.Screen name="Home" component={HomeScreen}  />
    //     <Stack.Screen name="Details" component={DetailsScreen}  />
    //   </Stack.Navigator>
    // </NavigationContainer>

    // Tab Navigation
    <React.Fragment>
      <View>
        <Text style={styles.title}>Result</Text>
      </View>
      <NavigationContainer>
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
      </NavigationContainer>
    </React.Fragment>
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
export default App;
