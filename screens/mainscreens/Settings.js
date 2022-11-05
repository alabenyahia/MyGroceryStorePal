import React from 'react';
import {Image, ScrollView, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import LanguageIcon from "../../assets/icons/language.png"
import CurrencyIcon from "../../assets/icons/currency.png"
import {Switch} from "native-base";

const Settings = () => {
    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <View style={{padding: 12, flexDirection: "row", alignItems: "center", borderBottomColor: "#D4D4D4", borderBottomWidth: 1}}>
                        <Image source={LanguageIcon}
                               style={{width: 24, height: 24, alignSelf: 'center'}}/>

                        <Text style={{marginLeft: 12}}>Language</Text>
                    </View>

                    <View style={{padding: 12, flexDirection: "row", alignItems: "center", borderBottomColor: "#D4D4D4", borderBottomWidth: 1}}>
                        <Image source={CurrencyIcon}
                               style={{width: 24, height: 24, alignSelf: 'center'}}/>

                        <Text style={{marginLeft: 12}}>Currency</Text>
                    </View>

                    <View style={{paddingLeft: 12, flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderBottomColor: "#D4D4D4", borderBottomWidth: 1}}>
                        <Text>Dark Mode</Text>
                        <Switch colorScheme="emerald" />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Settings;
