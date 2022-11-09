import React, {useContext, useEffect, useState} from 'react';
import {Image, Pressable, ScrollView, ToastAndroid, View} from "react-native";
import {Button, Divider, Text} from "native-base";
import {SafeAreaView} from "react-native-safe-area-context";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {getDatabase, onValue, ref} from "firebase/database";
import {useAuthentication} from "../../utils/hooks/useAuthentication";
import GlobalContext from "../../context/GlobalContext";

const LeastSoldProducts = () => {
    const [date, setDate] = useState(new Date())
    const [dateText, setDateText] = useState("")
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [sellingsProducts, setSellingsProducts] = useState([])
    const [inventoryProducts, setInventoryProducts] = useState([])
    const [sortedSellingsProducts, setSortedSellingsProducts] = useState([])
    const [filteredInventoryProducts, setFilteredInventoryProducts] = useState([])

    const {user} = useAuthentication();

    const {selectedStore} = useContext(GlobalContext)

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

    useEffect(() => {
        const copy = [...sellingsProducts]
        setSortedSellingsProducts(copy.sort((a, b) => a.value.quantity - b.value.quantity))
    }, [sellingsProducts]);

    useEffect(() => {
        const copy = [...inventoryProducts]
        setFilteredInventoryProducts(copy.filter((inventoryProduct) => {
            let isThere = false
            for (let i = 0; i < sellingsProducts.length; i++) {
                if (inventoryProduct.key === sellingsProducts[i].key) {
                    isThere = true
                    break
                }
            }

            return !isThere
        }))
    }, [inventoryProducts]);

    function renderZeroSoldProducts() {
        let counter0 = 0
        let part0 = []
        const all = []

        for (let i = 0; i < filteredInventoryProducts.length; i++) {

            if (counter0 > 1) {
                all.push(part0)
                counter0 = 0;
                part0 = []
            }
            part0.push(
                <View style={{
                    width: "45%",
                    backgroundColor: "#ececec",
                    borderRadius: 8,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    marginRight: counter0 === 0 ? 12 : 0,
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,

                    elevation: 3,
                }}>
                    <View style={{width: 42, height: 42, borderRadius: 999, padding: 8, backgroundColor: "#F16B44", justifyContent: "center", alignItems: "center", alignSelf: "center", marginVertical: 12}}>
                        <Text style={{fontWeight: "bold", color: "white"}}>{i+1}</Text>
                    </View>
                    <Pressable >
                        <Image source={{uri: filteredInventoryProducts[i].value.image}}
                               style={{width: "100%", height: 80, alignSelf: 'center'}}/>
                        <View style={{padding: 6}}>
                            <Text>{filteredInventoryProducts[i].value.name}</Text>
                            <Divider mt={1} mb={1}/>
                            <Text>X0</Text>
                            <Divider mt={1} mb={1}/>
                            <Text>{filteredInventoryProducts[i].value.price}TND per {filteredInventoryProducts[i].value.unity}</Text>
                        </View>
                    </Pressable>
                </View>

            )

            if (i === filteredInventoryProducts.length - 1) {
                all.push(part0)
            }
            counter0++
        }

        const res = all.map(productsRow => {
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

        if (res.length > 0) {
            res.unshift(<Text style={{textAlign: "center", fontWeight: "bold", marginBottom: 12}}>{dateText} Products that have zero sells</Text>)
            return res
        }
        else return []
    }


    function renderProducts() {
        if ((!sortedSellingsProducts || sortedSellingsProducts.length === 0) && (!filteredInventoryProducts || filteredInventoryProducts.length === 0)) {
            return (
                <Text style={{padding: 16, color: "#cc0000"}}>
                    {dateText} Sellings are still empty, please add more products.
                </Text>
            )
        }

        let counter1 = 0
        let part1 = []
        const all = []

        for (let i = 0; i < sortedSellingsProducts.length; i++) {

            if (counter1 > 1) {
                all.push(part1)
                counter1 = 0;
                part1 = []
            }
            part1.push(
                <View style={{
                    width: "45%",
                    backgroundColor: "#ececec",
                    borderRadius: 8,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 1,
                    },
                    marginRight: counter1 === 0 ? 12 : 0,
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,

                    elevation: 3,
                }}>
                    <View style={{width: 42, height: 42, borderRadius: 999, padding: 8, backgroundColor: "#F16B44", justifyContent: "center", alignItems: "center", alignSelf: "center", marginVertical: 12}}>
                        <Text style={{fontWeight: "bold", color: "white"}}>{i+1}</Text>
                    </View>
                    <Pressable >
                        <Image source={{uri: sortedSellingsProducts[i].value.image}}
                               style={{width: "100%", height: 80, alignSelf: 'center'}}/>
                        <View style={{padding: 6}}>
                            <Text>{sortedSellingsProducts[i].value.name}</Text>
                            <Divider mt={1} mb={1}/>
                            <Text>X{sortedSellingsProducts[i].value.quantity}</Text>
                            <Divider mt={1} mb={1}/>
                            <Text>{sortedSellingsProducts[i].value.price}TND per {sortedSellingsProducts[i].value.unity}</Text>
                        </View>
                    </Pressable>
                </View>

            )

            if (i === sortedSellingsProducts.length - 1) {
                all.push(part1)
            }
            counter1++
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
                {renderZeroSoldProducts()}
                {renderProducts()}

            </ScrollView>
        </SafeAreaView>
    );
};

export default LeastSoldProducts;
