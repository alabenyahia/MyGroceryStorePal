import React, {useEffect, useState, useContext} from 'react';
import {Image, Pressable, ScrollView, ToastAndroid, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Button, Divider, Fab, Icon, Text} from "native-base";
import {AntDesign} from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {useAuthentication} from "../../utils/hooks/useAuthentication";
import GlobalContext from "../../context/GlobalContext";
import {getDatabase, onValue, ref} from "firebase/database";

const Sellings = ({navigation}) => {
    const [date, setDate] = useState(new Date())
    const [dateText, setDateText] = useState("")
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [sellingsProducts, setSellingsProducts] = useState([])
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
        const productsRef = ref(db, user?.uid + '/' + selectedStore + '/sellings/' + dt + '/products');
        onValue(productsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                let output = Object.entries(data).map(([key, value]) => ({key, value}));
                setSellingsProducts(output)
            } else {
                setSellingsProducts([])
            }
        });
    }, [date, user]);

    function renderProducts() {
        console.log("sellings products", sellingsProducts)
        if (!sellingsProducts || sellingsProducts.length === 0) {
            return (
                <Text style={{padding: 16, color: "#cc0000"}}>
                    {dateText} Sellings are still empty, please add more products.
                </Text>
            )
        }
        let counter = 0
        const all = []
        let part = []
        for (let i = 0; i < sellingsProducts.length; i++) {

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
                    navigation.navigate("EditProductFromSellings", {
                        id: sellingsProducts[i].key,
                        dt: date.getDate().toString().padStart(2, "0") + '-' + (date.getMonth() + 1).toString().padStart(2, "0") +
                            '-' + (date.getFullYear()).toString(),
                        name: sellingsProducts[i].value.name,
                        quantity: sellingsProducts[i].value.quantity.toString(),
                        price: sellingsProducts[i].value.price.toString(),
                        unity: sellingsProducts[i].value.unity,
                        category: sellingsProducts[i].value.category,
                        image: sellingsProducts[i].value.image,
                        maxQuantity: sellingsProducts[i].value.maxQuantity
                    })
                }}>
                    <Image source={{uri: sellingsProducts[i].value.image}}
                           style={{width: "100%", height: 80, alignSelf: 'center'}}/>
                    <View style={{padding: 6}}>
                        <Text>{sellingsProducts[i].value.name}</Text>
                        <Divider mt={1} mb={1}/>
                        <Text>X{sellingsProducts[i].value.quantity}</Text>
                        <Divider mt={1} mb={1}/>
                        <Text>{sellingsProducts[i].value.price}TND per {sellingsProducts[i].value.unity}</Text>
                    </View>
                </Pressable>
            )

            if (i === sellingsProducts.length - 1) {
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

                {renderProducts()}

                <Fab onPress={() => {
                    if (!selectedStore) {
                        ToastAndroid.show('Please select a store from the burger menu first!', ToastAndroid.SHORT);
                        return
                    }
                    navigation.navigate("AddProductToSellings", {date: date})
                }} renderInPortal={false} shadow={3}
                     size="md" icon={<Icon color="white" as={AntDesign} name="plus" size="sm"/>}/>


            </ScrollView>
        </SafeAreaView>
    );
};

export default Sellings;
