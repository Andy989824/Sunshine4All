// In App.js in a new project

import * as React from "react";
import { View, Text, Button, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Dimensions } from "react-native";
import PoppinsItalic from "./assets/fonts/Poppins-Italic.ttf";
import img from "./assets/icon.png";

function Charts({ navigation }) {
  return (
    <React.Fragment>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={styles.title2}>You are here!</Text>
        <Text style={styles.title3}>Miri, Sarawak</Text>
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Charts Screen</Text>
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
      <View>
        <Image
          source={require("./assets/cart.jpg")}
          style={{ width: 200, height: 200 }}
        />
      </View>
    </React.Fragment>
  );
}

const styles = {
  title: {
    fontSize: 25,
    fontFamily: "Poppins-Bold",
    color: "#000000",
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: "#ff9933",
  },
  title2: {
    fontSize: 20,
    fontFamily: PoppinsItalic,
  },
  title3: { fontSize: 21, fontWeight: "700", fontFamily: "Poppins-Bold" },
};
export default App;
