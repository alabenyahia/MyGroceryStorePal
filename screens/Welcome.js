import React from 'react';
import {Image, Text, Pressable, ScrollView} from "react-native";
import {SafeAreaView} from 'react-native-safe-area-context'
import logo from "../assets/logo.png";


const Welcome = ({navigation}) => {

    return (
        <SafeAreaView style={{backgroundColor: "#F16B44", flex: 1, padding: 16}}>
            <ScrollView>


                <Image source={logo}
                       style={{width: 120, height: 120, alignSelf: 'center', marginTop: 120, marginBottom: 80}}/>

                <Pressable style={{
                    backgroundColor: "#F3F4F6", borderRadius: 4,
                    paddingVertical: 16, marginBottom: 12
                }} onPress={() => navigation.navigate("Login")}>
                    <Text style={{color: "#F16B44", textAlign: "center"}}>LOGIN</Text>
                </Pressable>

                <Pressable style={{
                    backgroundColor: "transparent", borderRadius: 4,
                    paddingVertical: 16, marginBottom: 8, borderWidth: 1, borderColor: "#E5E7EB"
                }}
                           onPress={() => navigation.navigate("SignUp")}>
                    <Text style={{color: "#E5E7EB", textAlign: "center"}}>SIGN UP</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Welcome;
