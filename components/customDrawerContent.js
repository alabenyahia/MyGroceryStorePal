import React from 'react';
import {View} from "react-native";
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";

import {signOut} from "firebase/auth";
import {Avatar, Divider, Select} from "native-base";


const CustomDrawerContent = (props) => {
    return (
        <DrawerContentScrollView {...props}>
            <View style={{width: "100%", height: 180, backgroundColor: "#f99999", marginBottom: 16, padding: 16, justifyContent: "space-between"}}>
                <Avatar bg="cyan.500" size="lg" source={{
                    uri: "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                }} mb={4}/>
                <View >
                    <Select placeholder="Choose a store" mb={8}>
                        <Select.Item label="UX Research" value="ux" />
                        <Select.Item label="Web Development" value="web" />
                    </Select>
                </View>
            </View>
            <DrawerItemList {...props} activeTintColor="#ffffff"/>

            <Divider/>
            <DrawerItem
                label="Log Out"
                labelStyle={{ color: '#cc0000'}}
                onPress={() => { signOut() }}
            />
        </DrawerContentScrollView>
    );
};

export default CustomDrawerContent;
