import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SelectStore from "../screens/mainscreens/SelectStore";

const Stack = createNativeStackNavigator()

const SelectStoreStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{headerStyle: {backgroundColor: '#F16B44'}, headerTintColor: '#dcdcdc'}}>

            <Stack.Screen name="SelectStore" component={SelectStore} options={{
                title: "Select Store"
            }}/>

        </Stack.Navigator>
    );
};

export default SelectStoreStack;
