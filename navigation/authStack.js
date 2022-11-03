import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Welcome from "../screens/Welcome";
import Login from "../screens/auth/Login";
import SignUp from "../screens/auth/SignUp";


const Stack = createNativeStackNavigator()

export default function UserStack() {

    return (
        <Stack.Navigator
            screenOptions={{headerStyle: {backgroundColor: '#F16B44'}, headerTintColor: '#dcdcdc'}}>

            <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="SignUp" component={SignUp} options={{title: 'Sign Up'}}/>

        </Stack.Navigator>
    );
};

