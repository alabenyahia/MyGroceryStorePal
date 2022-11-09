import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {Image, Pressable, ScrollView, ToastAndroid, View} from "react-native";
import {Button, Divider, Fab, Icon, Input, Text} from "native-base";
import {AntDesign, FontAwesome, Fontisto} from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {getDatabase, ref, onValue} from "firebase/database";
import {useAuthentication} from "../../utils/hooks/useAuthentication";
import GlobalContext from "../../context/GlobalContext";


const Inventory = ({navigation}) => {
    const [date, setDate] = useState(new Date())
    const [dateText, setDateText] = useState("")
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [inventoryProducts, setInventoryProducts] = useState([])
    const [search, setSearch] = useState("")
    const [searchedProducts, setSearchProducts] = useState([])
    const [showSearshResult, setShowSearshResult] = useState(false)

    const {user} = useAuthentication();

    const {selectedStore} = useContext(GlobalContext)


    useEffect(() => {
        if (!selectedStore) {
            navigation.navigate("Home")
            ToastAndroid.show('Please select a store from the burger menu first!', ToastAndroid.SHORT);
        }
    }, [selectedStore])

    useEffect(() => {
        const dt = new Date()
        if (dt.getDate() === date.getDate() && dt.getMonth() === date.getMonth() && dt.getFullYear() === date.getFullYear()) {
            setDateText("Today")
        } else {
            setDateText(date.getDate().toString().padStart(2, "0") + '-' + (date.getMonth() + 1).toString().padStart(2, "0") +
                '-' + (date.getFullYear()).toString())
        }
        console.log(user)
    }, [date]);


    useEffect(() => {
        const db = getDatabase();

        const dt = date.getDate().toString().padStart(2, "0") + '-' + (date.getMonth() + 1).toString().padStart(2, "0") +
            '-' + (date.getFullYear()).toString()
        console.log(dt)
        const productsRef = ref(db, user?.uid + '/' + selectedStore + '/inventory/' + dt + '/products');
        onValue(productsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                let output = Object.entries(data).map(([key, value]) => ({key, value}));
                setInventoryProducts(output)
            } else {
                setInventoryProducts([])
            }
        });
    }, [date, user]);

    function renderProducts() {
        console.log("inventory products", inventoryProducts)
        const usedProducts = showSearshResult ? searchedProducts : inventoryProducts
        if (!usedProducts || usedProducts.length === 0) {
            if (showSearshResult) {
                return (
                    <Text style={{padding: 16, color: "#cc0000"}}>
                        No products containing the term "{search}" are found.
                    </Text>
                )
            } else {
                return (
                    <Text style={{padding: 16, color: "#cc0000"}}>
                        {dateText} Inventory is still empty, please add more products.
                    </Text>
                )
            }

        }
        let counter = 0
        const all = []
        let part = []
        for (let i = 0; i < usedProducts.length; i++) {

            if (counter > 2) {
                all.push(part)
                counter = 0;
                part = []
            }
            part.push(
                <Pressable style={{
                    width: "30%",
                    backgroundColor: "#ececec",
                    borderRadius: 8,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    marginHorizontal: counter === 1 ? 12 : 0,
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,

                    elevation: 3,
                }} onPress={() => {
                    if (!selectedStore) {
                        ToastAndroid.show('Please select a store from the burger menu first!', ToastAndroid.SHORT);
                        return
                    }
                    navigation.navigate("EditProductFromInventory", {
                        id: usedProducts[i].key,
                        dt: date.getDate().toString().padStart(2, "0") + '-' + (date.getMonth() + 1).toString().padStart(2, "0") +
                            '-' + (date.getFullYear()).toString(),
                        name: usedProducts[i].value.name,
                        quantity: usedProducts[i].value.quantity.toString(),
                        price: usedProducts[i].value.price.toString(),
                        unity: usedProducts[i].value.unity,
                        category: usedProducts[i].value.category,
                        image: usedProducts[i].value.image
                    })
                }}>
                    <Image source={{uri: usedProducts[i].value.image}}
                           style={{width: "100%", height: 80, alignSelf: 'center'}}/>
                    <View style={{padding: 6}}>
                        <Text>{usedProducts[i].value.name}</Text>
                        <Divider mt={1} mb={1}/>
                        <Text>X{usedProducts[i].value.quantity}</Text>
                        <Divider mt={1} mb={1}/>
                        <Text>{usedProducts[i].value.price}TND per {usedProducts[i].value.unity}</Text>
                    </View>
                </Pressable>
            )

            if (i === usedProducts.length - 1) {
                all.push(part)
            }
            counter++
        }

        return all.map(productsRow => {
            return (
                <>
                    <View style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        padding: 16,
                        paddingTop: 0,
                        paddingBottom: 0
                    }}>
                        {productsRow}
                    </View>

                    <Divider mb={8} mt={8}/>
                </>
            )
        })
    }


    function searchPressed() {
        if (search.length > 0) {
            setSearchProducts(inventoryProducts.filter(product => product.value.name.toUpperCase().includes(search.toUpperCase())))
            setShowSearshResult(true)
        } else {
            setSearchProducts([])
            setShowSearshResult(false)
        }
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{marginBottom: 32, padding: 16, paddingBottom: 0}}>
                    <Text bold style={{textAlign: "center"}}>{dateText}</Text>
                    <Button mt={2} onPress={() => setShowDatePicker(true)}>Select date</Button>

                    <DateTimePickerModal
                        isVisible={showDatePicker}
                        date={date}
                        mode="date"
                        onConfirm={(date) => {
                            setDate(date)
                            setShowDatePicker(false)
                        }}
                        onCancel={() => setShowDatePicker(false)}
                    />
                </View>

                <Divider mb={8}/>

                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", padding: 16, paddingTop: 0}}>

                    <View style={{flex: 1, marginRight: 12}}>
                        <Input style={{flex: 1}} placeholder="Search by name..."  value={search} onChangeText={(value) => {
                            if (value.length === 0) {
                                setShowSearshResult(false)
                            }
                            setSearch(value)
                        }}/>
                    </View>
                    <View>
                        <Pressable style={{padding: 12, backgroundColor: "#F16B44", borderRadius: 8}} onPress={() => searchPressed()}>
                            <Icon color="white" as={FontAwesome} name="search" size="md"/>
                        </Pressable>
                    </View>

                </View>

                <Divider mb={8}/>

                {renderProducts()}

                <Fab onPress={() => {
                    if (!selectedStore) {
                        ToastAndroid.show('Please select a store from the burger menu first!', ToastAndroid.SHORT);
                        return
                    }
                    navigation.navigate("AddProductToInventory", {
                        date: dateText === 'Today' ? date.getDate().toString().padStart(2, "0") + '-' + (date.getMonth() + 1).toString().padStart(2, "0") +
                            '-' + (date.getFullYear()).toString() : dateText
                    })
                }} renderInPortal={false} shadow={3}
                     size="md" icon={<Icon color="white" as={AntDesign} name="plus" size="sm"/>}/>


            </ScrollView>
        </SafeAreaView>
    );
};

export default Inventory;
