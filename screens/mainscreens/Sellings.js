import React from 'react';
import {Image, Pressable, ScrollView, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Button, Divider, Fab, Icon} from "native-base";
import KitkatImg from "../../assets/kitkat.png";
import {AntDesign} from "@expo/vector-icons";

const Sellings = () => {
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{marginBottom: 32, padding: 16, paddingBottom: 0}}>
                    <Text bold style={{textAlign: "center"}}>Today</Text>
                    <Button mt={2} >Select date</Button>
                </View>

                <Divider/>

                <View style={{flexDirection: "row", justifyContent: "center", marginTop: 32, padding: 16, paddingTop: 0, paddingBottom: 0}}>
                    <Pressable style={{
                        width: "30%",
                        backgroundColor: "#ececec",
                        borderRadius: 8,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,

                        elevation: 3,
                    }}>
                        <Image source={KitkatImg}
                               style={{width: "100%", height: 80, alignSelf: 'center'}}/>
                        <View style={{padding: 6}}>
                            <Text>KitKat</Text>
                            <Divider mt={1} mb={1}/>
                            <Text>X16</Text>
                            <Divider mt={1} mb={1}/>
                            <Text>1.5TND</Text>
                        </View>
                    </Pressable>

                    <Pressable style={{
                        width: "30%",
                        backgroundColor: "#ececec",
                        borderRadius: 8,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },

                        marginHorizontal: 12,
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,

                        elevation: 3,
                    }}>
                        <Image source={KitkatImg}
                               style={{width: "100%", height: 80, alignSelf: 'center'}}/>
                        <View style={{padding: 6}}>
                            <Text>KitKat</Text>
                            <Divider mt={1} mb={1}/>
                            <Text>X16</Text>
                            <Divider mt={1} mb={1}/>
                            <Text>1.5TND</Text>
                        </View>
                    </Pressable>

                    <Pressable style={{
                        width: "30%",
                        backgroundColor: "#ececec",
                        borderRadius: 8,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,

                        elevation: 3,
                    }}>
                        <Image source={KitkatImg}
                               style={{width: "100%", height: 80, alignSelf: 'center'}}/>
                        <View style={{padding: 6}}>
                            <Text>KitKat</Text>
                            <Divider mt={1} mb={1}/>
                            <Text>X16</Text>
                            <Divider mt={1} mb={1}/>
                            <Text>1.5TND</Text>
                        </View>
                    </Pressable>
                </View>

                <Divider mb={8} mt={8}/>


                <View style={{flexDirection: "row", justifyContent: "center", padding: 16, paddingTop: 0}}>
                    <Pressable style={{
                        width: "30%",
                        backgroundColor: "#ececec",
                        borderRadius: 8,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,

                        elevation: 3,
                    }}>
                        <Image source={KitkatImg}
                               style={{width: "100%", height: 80, alignSelf: 'center'}}/>
                        <View style={{padding: 6}}>
                            <Text>KitKat</Text>
                            <Divider mt={1} mb={1}/>
                            <Text>X16</Text>
                            <Divider mt={1} mb={1}/>
                            <Text>1.5TND</Text>
                        </View>
                    </Pressable>

                    <Pressable style={{
                        width: "30%",
                        backgroundColor: "#ececec",
                        borderRadius: 8,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },

                        marginHorizontal: 12,
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,

                        elevation: 3,
                    }}>
                        <Image source={KitkatImg}
                               style={{width: "100%", height: 80, alignSelf: 'center'}}/>
                        <View style={{padding: 6}}>
                            <Text>KitKat</Text>
                            <Divider mt={1} mb={1}/>
                            <Text>X16</Text>
                            <Divider mt={1} mb={1}/>
                            <Text>1.5TND</Text>
                        </View>
                    </Pressable>

                    <Pressable style={{
                        width: "30%",
                        backgroundColor: "#ececec",
                        borderRadius: 8,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,

                        elevation: 3,
                    }}>
                        <Image source={KitkatImg}
                               style={{width: "100%", height: 80, alignSelf: 'center'}}/>
                        <View style={{padding: 6}}>
                            <Text>KitKat</Text>
                            <Divider mt={1} mb={1}/>
                            <Text>X16</Text>
                            <Divider mt={1} mb={1}/>
                            <Text>1.5TND</Text>
                        </View>
                    </Pressable>
                </View>
                <Fab renderInPortal={false} shadow={3} size="md" icon={<Icon color="white" as={AntDesign} name="plus" size="sm" />} />

            </ScrollView>
        </SafeAreaView>
    );
};

export default Sellings;
