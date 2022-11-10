import React, {useState, useContext} from 'react';
import {Image, ScrollView, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import CurrencyIcon from "../../assets/icons/currency.png"
import {Box, Button, Select, Text, useToast} from "native-base";

import {currencies} from "../../utils/currency";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {MYGROCERYSTOREPAL_CURRENCY_KEY} from "../../utils/keys";
import GlobalContext from "../../context/GlobalContext";


const Settings = () => {

    const [currency, setCurrency] = useState("$")
    const {setCurrency: setGlobalCurrency} = useContext(GlobalContext)

    const toast = useToast();

    async function savePressed() {
        try {
            await AsyncStorage.setItem(MYGROCERYSTOREPAL_CURRENCY_KEY, currency)
            toast.show({
                render: () => {
                    return <Box bg="emerald.500" px="4" py="4" rounded="sm" mb={5}>
                        Settings saved successfully
                    </Box>;
                }
            });
        } catch (e) {
            console.log(e)
        }

        setGlobalCurrency(currency)
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View>

                    <View style={{padding: 12, flexDirection: "row", alignItems: "center"}}>
                        <Image source={CurrencyIcon}
                               style={{width: 24, height: 24, alignSelf: 'center'}}/>
                        <Text>Change currency</Text>

                    </View>

                    <Select selectedValue={currency} placeholder="Change currency"
                            onValueChange={itemValue => setCurrency(itemValue)} m={4} mt={0}>
                        {Object.entries(currencies).map(([key, value]) => ({key, value})).map((curr) => {
                            return <Select.Item label={curr.key} value={curr.value.symbol} key={curr.key}/>
                        })}
                    </Select>


                    <Button mx={4} mt={4} onPress={() => savePressed()}>Save</Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Settings;
