import React, {useLayoutEffect, useState} from 'react';
import {Pressable, ScrollView, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Button, Divider, Icon, Input, Text} from "native-base";
import ColorPicker from "react-native-wheel-color-picker";
import {AntDesign} from "@expo/vector-icons";

const EditStore = ({route, navigation}) => {
    const {id} = route.params;
    const [storeName, setStoreName] = useState("")
    const [storeColor, setStoreColor] = useState("")

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Pressable style={{padding: 16, justifyContent: "center", alignItems: "center"}}
                    onPress={() => console.log("Edit")}>
                    <Icon color="white" as={AntDesign} name="check" size="md" />
                </Pressable>
            )
        })
    }, [])
    return (
        <SafeAreaView >
            <ScrollView>
                <View style={{padding: 16, paddingBottom: 0}}>
                    <Input value={storeName} onChangeText={(value) => setStoreName(value)} placeholder="New store name" />
                </View>

                <Divider mt={6} mb={6}/>
                <View style={{padding: 16, paddingTop: 0}}>
                    <Text style={{textAlign: "center"}}>Choose a store color</Text>
                    <ColorPicker
                        color={storeColor}
                        onColorChangeComplete={(color) => setStoreColor(color)}
                        thumbSize={40}
                        sliderSize={40}
                        noSnap={true}
                        row={false}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default EditStore;
