import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Home from "../screens/Home";
import Inventory from "../screens/mainscreens/Inventory";
import Sellings from "../screens/mainscreens/Sellings";
import Reports from "../screens/mainscreens/Reports";
import Stores from "../screens/mainscreens/Stores";
import Tutorial from "../screens/mainscreens/Tutorial";
import Settings from "../screens/mainscreens/Settings";
import CustomDrawerContent from "../components/customDrawerContent";
import EditStore from "../screens/edit/EditStore";
import AddProductToInventory from "../screens/add/AddProductToInventory";
import EditProductFromInventory from "../screens/edit/EditProductFromInventory";
import AddProductToSellings from "../screens/add/AddProductToSellings";
import EditProductFromSellings from "../screens/edit/EditProductFromSellings";

const Drawer = createDrawerNavigator();

export default function UserDrawer() {
    return (
        <NavigationContainer independent={true} >
            <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawerContent {...props} />}
                              screenOptions={{headerStyle: {backgroundColor: '#F16B44'}, headerTintColor: '#dcdcdc'}}>
                <Drawer.Screen name="Home" component={Home}/>
                <Drawer.Screen name="Inventory" component={Inventory}/>
                <Drawer.Screen name="Sellings" component={Sellings}/>
                <Drawer.Screen name="Reports" component={Reports}/>
                <Drawer.Screen name="Stores" component={Stores}/>
                <Drawer.Screen name="Tutorial" component={Tutorial}/>
                <Drawer.Screen name="Settings" component={Settings}/>

                <Drawer.Screen
                    name="EditStore"
                    component={EditStore}
                    options={{
                        drawerItemStyle: { display: "none" },
                        title: "Edit Store"
                    }}
                />

                <Drawer.Screen
                    name="AddProductToInventory"
                    component={AddProductToInventory}
                    options={{
                        drawerItemStyle: { display: "none" },
                        title: "Add Inventory Product",
                    }}
                />

                <Drawer.Screen
                    name="AddProductToSellings"
                    component={AddProductToSellings}
                    options={{
                        drawerItemStyle: { display: "none" },
                        title: "Add Sellings Product",
                    }}
                />

                <Drawer.Screen
                    name="EditProductFromSellings"
                    component={EditProductFromSellings}
                    options={{
                        drawerItemStyle: { display: "none" },
                        title: "Edit Sellings Product",
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

