import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity, Platform } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as Location from 'expo-location';
import home from './assets/home-screen-img.png';

export default function HomeScreen({ navigation }) {
  const [loaded] = useFonts({
    Poppins_Medium: require('./assets/Poppins-Medium.ttf'),
    Poppins_Light: require('./assets/Poppins-Light.ttf')

  });

  //Get user's location
  const [location, setLocation] = useState();
  const [errorMsg, setErrorMsg] = useState();



  async function getLocation() {

    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    if (Platform.OS === 'web') {
      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      console.log(JSON.stringify(location.coords.latitude));
      console.log(JSON.stringify(location.coords.longitude));

      navigation.navigate('Parameter', {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
      //setLocation(location);
      
      
      
      console.log('web');
    }
    else {
      // let location = await Location.getLastKnownPositionAsync({
      //   accuracy: 6,
      // });
      // console.log(JSON.stringify(location.coords.latitude));
      // console.log(JSON.stringify(location.coords.longitude));

      // navigation.navigate('Parameter', {
      //   latitude: location.coords.latitude,
      //   longitude: location.coords.longitude
      // });

      await Location.enableNetworkProviderAsync().then().catch(_ => null);
      const status = await Location.hasServicesEnabledAsync();
      if (status) {
        const getCurrentPosition = async () => await Location.getCurrentPositionAsync()
          .then(loc => loc)
          .catch(_ => null)
        let location = await getCurrentPosition();
        while (location === null) {
          location = await getCurrentPosition();
        }
        console.log(JSON.stringify(location.coords.latitude));
        console.log(JSON.stringify(location.coords.longitude));

        navigation.navigate('Parameter', {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        });
        //return location;
      } else {
        throw new Error("Please activate the location");
      }

      console.log('android or ios');
    }



    // await Location.enableNetworkProviderAsync().then().catch(_ => null);
    // const status = await Location.hasServicesEnabledAsync();
    // if(status){
    //   const getCurrentPosition = async () => await Location.getCurrentPositionAsync()
    //                                     .then(loc => loc)
    //                                     .catch(_ => null)
    //   let location = await getCurrentPosition();
    //   while(location === null){
    //     location = await getCurrentPosition();
    //   }
    //   //return location;
    // }else{
    //   throw new Error("Please activate the location");
    // }



  }


  //Loading Screen
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();

        await new Promise(resolve => setTimeout(resolve, 2000));

      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }



  return (
    <View style={styles.container} onLayout={onLayoutRootView}>


      <Text style={styles.home_screen_title}>Welcome!</Text>
      <Image source={home} style={{ width: 350, height: 350 }} />
      <TouchableOpacity style={styles.home_button} onPress={() => getLocation()}>
        <Text style={styles.home_button_text}>Locate Yourself</Text>
      </TouchableOpacity>
      <View style={styles.home_screen_description}>
        <Text style={styles.home_screen_description_text}>To explore</Text>
        <Text style={styles.home_screen_description_text}>on the sunshine</Text>
        <Text style={styles.home_screen_description_text}>around you</Text>
      </View>


      <StatusBar style="auto" />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcd968',
    alignItems: 'center',
    justifyContent: 'center'
  },
  home_screen_title: {
    fontSize: 42,
    fontWeight: 'bold',
    fontFamily: 'Poppins_Medium'
  },
  home_button: {
    borderWidth: 3,
    borderRadius: 50,
    backgroundColor: '#fc8f68',
    paddingHorizontal: 10
  },
  home_button_text: {
    fontSize: 34,
    fontFamily: 'Poppins_Medium'
  },
  home_screen_description: {
    marginTop: 20,
    alignItems: 'center'
  },
  home_screen_description_text: {
    fontSize: 18,
    fontFamily: 'Poppins_Light'
  }

});