import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Home from "../screens/Home";
import Inventory from "../screens/Inventory";

const Drawer = createDrawerNavigator();

export default function UserDrawer() {
    return (
        <NavigationContainer independent={true} >
            <Drawer.Navigator initialRouteName="Home" screenOptions={{headerStyle: {backgroundColor: '#F16B44'}, headerTintColor: '#dcdcdc'}}>
                <Drawer.Screen name="Home" component={Home}/>
                <Drawer.Screen name="Inventory" component={Inventory}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

