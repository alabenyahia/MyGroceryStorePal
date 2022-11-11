import React, {useContext, useEffect, useState} from 'react';
import {Image, Pressable, ScrollView, ToastAndroid, View} from "react-native";
import {Button, Divider, Text} from "native-base";
import {SafeAreaView} from "react-native-safe-area-context";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {getDatabase, onValue, ref} from "firebase/database";
import {useAuthentication} from "../../utils/hooks/useAuthentication";
import GlobalContext from "../../context/GlobalContext";

const MostProductsThatMadeProfit = () => {
    const [date, setDate] = useState(new Date())
    const [dateText, setDateText] = useState("")
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [sellingsProducts, setSellingsProducts] = useState([])
    const [sortedSellingsProducts, setSortedSellingsProducts] = useState([])

    const {user} = useAuthentication();

    const {selectedStore, currency} = useContext(GlobalContext)

    useEffect(() => {
        const dt = new Date()
        if (dt.getDate() === date.getDate() && dt.getMonth() === date.getMonth() && dt.getFullYear() === date.getFullYear()) {
            setDateText("Today")
        } else {
            setDateText(date.getDate().toString().padStart(2, "0") + '-' + (date.getMonth() + 1).toString().padStart(2, "0") +
                '-' + (date.getFullYear()).toString())
        }

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

    useEffect(() => {
        const copy = [...sellingsProducts]
        setSortedSellingsProducts(copy.sort((a, b) => (a.value.profit * a.value.quantity ) - (b.value.profit * b.value.quantity)))
    }, [sellingsProducts]);


    function renderProducts() {
        if (!sortedSellingsProducts || sortedSellingsProducts.length === 0) {
            return (
                <Text style={{padding: 16, color: "#cc0000"}}>
                    {dateText} Sellings are still empty, please add more products.
                </Text>
            )
        }
        let counter = 0
        const all = []
        let part = []
        for (let i = 0; i < sortedSellingsProducts.length; i++) {

            if (counter > 1) {
                all.push(part)
                counter = 0;
                part = []
            }
            console.log("profit", sortedSellingsProducts[i])
            part.push(
                <View style={{
                    width: "45%",
                    backgroundColor: "#ececec",
                    borderRadius: 8,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    marginRight: counter === 0 ? 12 : 0,
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,

                    elevation: 3,
                }}>
                    <View style={{padding: 8, backgroundColor: "#F16B44", justifyContent: "center", alignItems: "center", alignSelf: "center", marginBottom: 12}}>
                        <Text style={{fontWeight: "bold", color: "white"}}>Profit made: {(sortedSellingsProducts[i].value.profit * sortedSellingsProducts[i].value.quantity).toFixed(2)} {currency}</Text>
                    </View>
                    <Pressable >
                        <Image source={{uri: sortedSellingsProducts[i].value.image}}
                               style={{width: "100%", height: 80, alignSelf: 'center'}}/>
                        <View style={{padding: 6}}>
                            <Text>{sortedSellingsProducts[i].value.name}</Text>
                            <Divider mt={1} mb={1}/>
                            <Text>X{sortedSellingsProducts[i].value.quantity}</Text>
                            <Divider mt={1} mb={1}/>
                            <Text>{sortedSellingsProducts[i].value.price}{currency} per {sortedSellingsProducts[i].value.unity}</Text>
                        </View>
                    </Pressable>
                </View>

            )

            if (i === sortedSellingsProducts.length - 1) {
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
        <SafeAreaView style={{padding: 16}}>
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

            </ScrollView>
        </SafeAreaView>
    );
};

export default MostProductsThatMadeProfit;
