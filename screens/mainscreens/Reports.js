import React, {useContext, useEffect} from 'react';
import {ScrollView, Text, ToastAndroid} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Box, Button, Divider} from "native-base"
import GlobalContext from "../../context/GlobalContext";

const Reports = ({navigation}) => {

    const {selectedStore} = useContext(GlobalContext)

    useEffect(() => {
        if (!selectedStore) {
            navigation.navigate("Home")
            ToastAndroid.show('Please select a store from the burger menu first!', ToastAndroid.SHORT);
        }
    }, [selectedStore])

    return (
        <SafeAreaView style={{padding: 16}}>
            <ScrollView>
                <Button mb={4} onPress={() => navigation.navigate("MostSoldProducts")}>Most sold products</Button>
                <Button mb={6} onPress={() => navigation.navigate("LeastSoldProducts")}>Least sold products</Button>
                <Divider mb={6}/>
                <Button mb={4} onPress={() => navigation.navigate("MostProductsThatMadeProfit")}>Most products that made profit</Button>
                <Button mb={6}>Least products that made profit</Button>
                <Divider mb={6}/>
                <Button mb={4}>Profits</Button>
                <Button>Expenses</Button>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Reports;
