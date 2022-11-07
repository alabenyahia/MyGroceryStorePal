import React from 'react';
import {Pressable, ScrollView, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

const Tutorial = ({navigation}) => {
    return (
        <SafeAreaView style={{padding: 16}}>
            <ScrollView>

                <Text style={{fontSize: 16, lineHeight: 24}}>
                    - First you add at least a <Text onPress={() => navigation.navigate("Stores")}
                                  style={{fontWeight: "bold", color: "#F16B44"}}>Store</Text>
                </Text>
                <Text style={{marginVertical: 24, fontSize: 16, lineHeight: 24}}>
                    - Each day before you open up your store you add all the products that you have in the store to the
                    today’s <Text onPress={() => navigation.navigate("Inventory")}
                                  style={{fontWeight: "bold", color: "#F16B44"}}>Inventory</Text>
                </Text>

                <Text style={{marginVertical: 24, fontSize: 16, lineHeight: 24}}>
                    - And each day before you close your store you add all the products that you have sold to your
                    today’s <Text style={{fontWeight: "bold", color: "#F16B44"}}
                                  onPress={() => navigation.navigate("Inventory")}>Sellings</Text>
                </Text>

                <Text style={{fontSize: 16, lineHeight: 24}}>
                    - That’s it from your part, the application will do all the work for you giving you all the <Text
                    style={{fontWeight: "bold", color: "#F16B44"}}
                    onPress={() => navigation.navigate("Reports")}>Reports</Text> that
                    you need to make your store more profitable and to allow you to monitor every single statistic of
                    your store
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Tutorial;
