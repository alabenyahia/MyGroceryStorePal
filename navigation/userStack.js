import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "../screens/Home";

const Stack = createNativeStackNavigator()

export default function UserStack() {
    return (
        <Stack.Navigator
            screenOptions={{headerStyle: {backgroundColor: '#F16B44'}, headerTintColor: '#dcdcdc'}}>
            <Stack.Screen name="Home" component={Home}/>

        </Stack.Navigator>
    );
}

