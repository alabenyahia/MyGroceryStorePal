import React from 'react';
import {ScrollView} from "react-native";
import {Button, Divider, Text, View} from "native-base";
import {SafeAreaView} from "react-native-safe-area-context";

const About = () => {
    return (
        <SafeAreaView style={{padding: 16, flex: 1}}>
            <View style={{
                flexDirection: 'column', // inner items will be added vertically
                flexGrow: 1,            // all the available vertical space will be occupied by it
                justifyContent: 'space-between'
            }}>
                <Text>For any suggestions or bug reports, kindly send me an email on: <Text
                    style={{fontWeight: "bold"}}>pickurapps@gmail.com</Text></Text>
                <Text style={{textAlign: "right"}}>App made by: <Text style={{fontWeight: "bold"}}>Ala Ben Yahia</Text></Text>
            </View>
        </SafeAreaView>
    );
};

export default About;
