import React from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {Box, Fab, Icon, Text} from "native-base";
import {AntDesign} from "@expo/vector-icons";
import {FlatList} from "native-base"
import {Pressable} from "react-native";

const Stores = () => {

    const data = [
        {id: 1, storeName: "Ala's store"},
        {id: 2, storeName: "Seif's store"},
        {id: 3, storeName: "Atef's store"}]
    return (
        <SafeAreaView style={{flex: 1}}>
            <Box>

                <FlatList data={data} renderItem={({item}) => <Box
                    style={{flexDirection: "row", justifyContent: "space-between"}} borderBottomWidth="1"
                    borderColor="muted.800" pl={["4", "4"]} pr={["3", "3"]} py="2">
                    <Text fontSize="xs" color="coolGray.800" alignSelf="flex-start">
                        {item.storeName}
                    </Text>

                    <Pressable style={{paddingHorizontal: 6}}><Text style={{fontWeight: "bold", color: "#F16B44"}}>Edit</Text></Pressable>
                </Box>} keyExtractor={item => item.id}/>
            </Box>

            <Fab renderInPortal={false} shadow={3} size="md"
                 icon={<Icon color="white" as={AntDesign} name="plus" size="sm"/>}/>

        </SafeAreaView>
    );
};

export default Stores;
