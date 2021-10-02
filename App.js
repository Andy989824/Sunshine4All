import * as React from 'react';
import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './HomeScreen';
import ParameterScreen from './ParameterScreen';

//Stack Navigator
const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name='Parameter' component={ParameterScreen} options={{headerTitleAlign: 'center', headerStyle:{backgroundColor: '#fff'}, headerTitleStyle:{fontFamily: 'Poppins_Medium', fontSize: 30, fontWeight: 'bold'}}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
