import React, {useContext} from 'react';
import {Image, Pressable, ScrollView, Text, ToastAndroid, View} from "react-native";
import {useAuthentication} from '../utils/hooks/useAuthentication';
import {Divider, Select} from "native-base";
import {SafeAreaView} from "react-native-safe-area-context";
import InventoryIcon from "../assets/icons/inventory.png";
import SellingsIcon from "../assets/icons/sellings.png";
import ReportsIcon from "../assets/icons/reports.png";
import StoresIcon from "../assets/icons/stores.png";
import TutorialIcon from "../assets/icons/tutorial.png";
import SettingsIcon from "../assets/icons/settings.png";
import GlobalContext from "../context/GlobalContext";

const Home = ({navigation}) => {
    const {user} = useAuthentication();
    const {selectedStore, stores} = useContext(GlobalContext)
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{flexDirection: "row", justifyContent: "center", paddingHorizontal: 16, marginTop: 32}}>
                    <Pressable style={{
                        width: "30%",
                        aspectRatio: 1,
                        backgroundColor: "#ececec",
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,

                        elevation: 3,
                    }} onPress={() => {
                        console.log("selectedstore", selectedStore)
                        if (stores.length === 0) {
                            ToastAndroid.show('Please add a store first!', ToastAndroid.SHORT);
                        }
                        else if (!selectedStore) {
                            ToastAndroid.show('Please select a store from the burger menu first!', ToastAndroid.SHORT);
                        } else {
                            navigation.navigate("Inventory")
                        }
                    }}>
                        <View>
                            <View>
                                <Image source={InventoryIcon}
                                       style={{width: 32, height: 32, alignSelf: 'center'}}/>
                                <Text style={{marginTop: 4, color: "#1F2937"}}>Inventory</Text>
                            </View>
                        </View>
                    </Pressable>

                    <Pressable style={{
                        width: "30%",
                        aspectRatio: 1,
                        backgroundColor: "#ececec",
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        marginHorizontal: 12,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,

                        elevation: 3,
                    }} onPress={() => {
                        if (stores.length === 0) {
                            ToastAndroid.show('Please add a store first!', ToastAndroid.SHORT);
                        }
                        else if (!selectedStore) {
                            ToastAndroid.show('Please select a store from the burger menu first!', ToastAndroid.SHORT);
                        } else {
                            navigation.navigate("Sellings")
                        }
                    }}>
                        <View>
                            <View>
                                <Image source={SellingsIcon}
                                       style={{width: 32, height: 32, alignSelf: 'center'}}/>
                                <Text style={{marginTop: 4, color: "#1F2937"}}>Sellings</Text>
                            </View>
                        </View>
                    </Pressable>

                    <Pressable style={{
                        width: "30%",
                        aspectRatio: 1,
                        backgroundColor: "#ececec",
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,

                        elevation: 3,
                    }} onPress={() => {
                        if (stores.length === 0) {
                            ToastAndroid.show('Please add a store first!', ToastAndroid.SHORT);
                        }
                        else if (!selectedStore) {
                            ToastAndroid.show('Please select a store from the burger menu first!', ToastAndroid.SHORT);
                        } else {
                            navigation.navigate("Reports")
                        }
                    }}>
                        <View>
                            <View>
                                <Image source={ReportsIcon}
                                       style={{width: 32, height: 32, alignSelf: 'center'}}/>
                                <Text style={{marginTop: 4, color: "#1F2937"}}>Reports</Text>
                            </View>
                        </View>
                    </Pressable>
                </View>

                <Divider mb={8} mt={8}/>

                <View style={{flexDirection: "row", justifyContent: "center", paddingHorizontal: 16}}>
                    <Pressable style={{
                        width: "30%",
                        aspectRatio: 1,
                        backgroundColor: "#ececec",
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,

                        elevation: 3,
                    }} onPress={() => navigation.navigate("Stores")}>
                        <View>
                            <View>
                                <Image source={StoresIcon}
                                       style={{width: 32, height: 32, alignSelf: 'center'}}/>
                                <Text style={{marginTop: 4, color: "#1F2937"}}>Stores</Text>
                            </View>
                        </View>
                    </Pressable>

                    <Pressable style={{
                        width: "30%",
                        aspectRatio: 1,
                        backgroundColor: "#ececec",
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        marginHorizontal: 12,
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,

                        elevation: 3,
                    }} onPress={() => navigation.navigate("Tutorial")}>
                        <View>
                            <View>
                                <Image source={TutorialIcon}
                                       style={{width: 32, height: 32, alignSelf: 'center'}}/>
                                <Text style={{marginTop: 4, color: "#1F2937"}}>Tutorial</Text>
                            </View>
                        </View>
                    </Pressable>

                    <Pressable style={{
                        width: "30%",
                        aspectRatio: 1,
                        backgroundColor: "#ececec",
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,

                        elevation: 3,
                    }} onPress={() => navigation.navigate("Settings")}>
                        <View>
                            <View>
                                <Image source={SettingsIcon}
                                       style={{width: 32, height: 32, alignSelf: 'center'}}/>
                                <Text style={{marginTop: 4, color: "#1F2937"}}>Settings</Text>
                            </View>
                        </View>
                    </Pressable>
                </View>

                <View style={{marginTop: 24}}></View>

            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
