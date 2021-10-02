import { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';
import React, {useCallback, useEffect, useState} from 'react';
import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity, ListViewBase } from 'react-native';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import RNPickerSelect from 'react-native-picker-select';
import Checkbox from 'expo-checkbox';
import * as SplashScreen from 'expo-splash-screen';
import * as Location from 'expo-location';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import cover from './assets/cover-screen-img.png';
import home from './assets/home-screen-img.png';
import button_icon from './assets/select-location-icon.png';



export default function ParameterScreen({ route, navigation }) {
    const [loaded] = useFonts({
      Poppins_Medium: require('./assets/Poppins-Medium.ttf'),
      Poppins_Light: require('./assets/Poppins-Light.ttf')
  
    });
  
    const [startYear, setStartYear] = useState('test');
    const [endYear, setEndYear] = useState();
    
    const [UVChecked, setUVChecked] = useState();
    const [solarIrradianceChecked, setSolarIrradianceChecked] = useState();
    const [temperatureChecked, setTemperatureChecked] = useState();
    const [humidityChecked, setHumidityChecked] = useState();
    const [cloudChecked, setCloudChecked] = useState();
  
    
    //Get the Latitude & Longitude from Home Screen
    const { latitude, longitude } = route.params;

    //Validate Start Year & End Year

    //Form API link
    function formAPI() {
        console.log(startYear);
        console.log(endYear);
        console.log(UVChecked);
        console.log(solarIrradianceChecked);
        console.log(temperatureChecked);
        console.log(humidityChecked);
        console.log(cloudChecked);


        let APIPrefix = 'https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=';
        const parameterArray = [];

        if (UVChecked) {
            parameterArray.push('ALLSKY_SFC_UVA');
        }
        if (solarIrradianceChecked) {
            parameterArray.push('SI_EF_TILTED_SURFACE');
        }
        if (temperatureChecked) {
            parameterArray.push('T2M');
        }
        if (humidityChecked) {
            parameterArray.push('RH2M');
        }
        if (cloudChecked) {
            parameterArray.push('CLOUD_AMT');
        }

        let parameterStr = parameterArray.join(',');

        const APIPostFix = ['&community=RE'];
        APIPostFix.push('longitude=' + longitude);
        APIPostFix.push('latitude=' + latitude);
        APIPostFix.push('format=JSON');
        APIPostFix.push('start=' + startYear);
        APIPostFix.push('end=' + endYear);

        let postfixStr = APIPostFix.join('&');
        
        let APILink = APIPrefix + parameterStr + postfixStr;

        console.log(APILink);
    }

    return (
      <View style={styles.container}>
        {/* <Text style={styles.parameter_screen_title}>Parameters</Text> */}
  
        <View style={styles.parameter_description_view}>
          <Text style={styles.parameter_description_text}>Select and submit the parameter(s) {'\n'}to inspect the sunshine</Text>
        </View>
  
        <View style={styles.parameter_time_view}>
          <Text style={styles.parameter_time_view_text}>Time Extent (Year)</Text>
          <View style={styles.parameter_time_view_picker}>
            <Text style={styles.parameter_time_view_text}>From </Text>
            <RNPickerSelect placeholder={{label: 'Start Year', value: null}}
                onValueChange={(value) => setStartYear(value)}
                items={[
                    { label: '2010', value: '2010' },
                    { label: '2011', value: '2011' },
                    { label: '2012', value: '2012' },
                    { label: '2013', value: '2013' },
                    { label: '2014', value: '2014' },
                    { label: '2015', value: '2015' },
                    { label: '2016', value: '2016' },
                    { label: '2017', value: '2017' },
                    { label: '2018', value: '2018' },
                    { label: '2019', value: '2019' }
                ]}
            />
            <Text style={styles.parameter_time_view_text}> To </Text>
            <RNPickerSelect placeholder={{label: 'End Year', value: null}}
                onValueChange={(value) => setEndYear(value)}
                items={[
                    { label: '2011', value: '2011' },
                    { label: '2012', value: '2012' },
                    { label: '2013', value: '2013' },
                    { label: '2014', value: '2014' },
                    { label: '2015', value: '2015' },
                    { label: '2016', value: '2016' },
                    { label: '2017', value: '2017' },
                    { label: '2018', value: '2018' },
                    { label: '2019', value: '2019' },
                    { label: '2020', value: '2020' }
                ]}
            />
          </View>
        </View>
  
        <View style={styles.parameter_view}>
          <View style={styles.parameter_checkbox}>
            <Text style={styles.parameter_text}>UV Irradiance for All Sky Surface</Text>
            <Checkbox value={UVChecked} onValueChange={setUVChecked} />
          </View>
          <View style={styles.parameter_checkbox}>
            <Text style={styles.parameter_text}>Solar Irradiance for Titled Surface</Text>
            <Checkbox value={solarIrradianceChecked} onValueChange={setSolarIrradianceChecked} />
          </View>
          <View style={styles.parameter_checkbox}>
            <Text style={styles.parameter_text}>Air Temperature at 2 Meters above   {'\n'}Earth Surface</Text>
            <Checkbox value={temperatureChecked} onValueChange={setTemperatureChecked} />
          </View>
          <View style={styles.parameter_checkbox}>
            <Text style={styles.parameter_text}>Relative Humidity at 2 Meters above   {'\n'}Earth Surface</Text>
            <Checkbox value={humidityChecked} onValueChange={setHumidityChecked} />
          </View>
          <View style={styles.parameter_checkbox}>
            <Text style={styles.parameter_text}>Cloud Amount</Text>
            <Checkbox value={cloudChecked} onValueChange={setCloudChecked} />
          </View>
          
        </View>
  
        <View>
          <TouchableOpacity style={styles.submit_btn} onPress={() => formAPI()}>
            <Text style={styles.submit_btn_text}>Submit</Text>
          </TouchableOpacity>
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
  
    parameter_screen_title: {
      fontSize: 30,
      fontWeight: 'bold',
      fontFamily: 'Poppins_Medium'
    },
  
    parameter_description_view: {
      marginTop: 10,
      marginBottom: 20,
      alignItems: 'center',
      justifyContent: 'center'
      
    },
    parameter_description_text: {
      fontSize: 16,
      fontFamily: 'Poppins_Medium'
    },
  
    parameter_time_view: {
      marginVertical: 10,
      paddingVertical: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderTopWidth: 2,
      borderBottomWidth: 2
    },
    parameter_time_view_text: {
      fontSize: 18,
      fontFamily: 'Poppins_Medium'
    },
    parameter_time_view_picker: {
      //flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    parameter_view: {
      borderWidth: 2,
      borderRadius: 30,
      marginVertical: 10,
      paddingHorizontal: 10
    },
    parameter_checkbox: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: 8
    },
    parameter_text: {
      fontFamily: 'Poppins_Medium'
    },
  
    submit_btn: {
      borderWidth: 3,
      borderRadius: 50,
      paddingHorizontal: 20,
      backgroundColor: '#fc8f68'
    },
    submit_btn_text: {
      fontSize: 28,
      fontFamily: 'Poppins_Medium'
    }
    
    
  });