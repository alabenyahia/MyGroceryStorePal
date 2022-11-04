import React from 'react';
import {ScrollView, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Box, Button, Divider} from "native-base"

const Reports = () => {
    return (
        <SafeAreaView style={{padding: 16}}>
            <ScrollView>
                <Button mb={4}>Most sold products</Button>
                <Button mb={6}>Least sold products</Button>
                <Divider mb={6}/>
                <Button mb={4}>Most products that made profit</Button>
                <Button mb={6}>Least products that made profit</Button>
                <Divider mb={6}/>
                <Button mb={4}>Profits</Button>
                <Button>Expenses</Button>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Reports;
