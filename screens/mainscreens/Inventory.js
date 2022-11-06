import React, {useEffect, useState} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {Image, Pressable, ScrollView, View} from "react-native";
import {Button, Divider, Fab, Icon, Text} from "native-base";
import {AntDesign} from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {getDatabase, ref, onValue} from "firebase/database";
import {useAuthentication} from "../../utils/hooks/useAuthentication";


const Inventory = ({navigation}) => {
    const [date, setDate] = useState(new Date())
    const [dateText, setDateText] = useState("")
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [inventoryProducts, setInventoryProducts] = useState([])
    const {user} = useAuthentication();

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
        const productsRef = ref(db, user?.uid +'/inventory/' + dt + '/products');
        onValue(productsRef, (snapshot) => {
            const data = snapshot.val();
            setInventoryProducts(data)
        });
    }, [date]);

    function renderProducts() {
        if (!inventoryProducts || inventoryProducts.length === 0) {
            return (
                <Text style={{padding: 16, color: "#cc0000"}}>
                    {dateText} Inventory is still empty, please add more products.
                </Text>
            )
        }
        let counter = 0
        const all = []
        let part = []
        for (let i = 0; i < inventoryProducts.length; i++) {

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
                }}>
                    <Image source={{uri: inventoryProducts[i].img}}
                           style={{width: "100%", height: 80, alignSelf: 'center'}}/>
                    <View style={{padding: 6}}>
                        <Text>{inventoryProducts[i].name}</Text>
                        <Divider mt={1} mb={1}/>
                        <Text>X{inventoryProducts[i].quantity}</Text>
                        <Divider mt={1} mb={1}/>
                        <Text>{inventoryProducts[i].price}TND</Text>
                    </View>
                </Pressable>
            )

            if (i === inventoryProducts.length - 1) {
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

                <Fab onPress={() => navigation.navigate("AddProductToInventory", {date: dateText})} renderInPortal={false} shadow={3}
                     size="md" icon={<Icon color="white" as={AntDesign} name="plus" size="sm"/>}/>


            </ScrollView>
        </SafeAreaView>
    );
};

export default Inventory;
