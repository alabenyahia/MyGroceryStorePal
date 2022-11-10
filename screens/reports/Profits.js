import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {getDatabase, onValue, ref} from "firebase/database";
import {useAuthentication} from "../../utils/hooks/useAuthentication";
import GlobalContext from "../../context/GlobalContext";
import {Button, Divider, Text} from "native-base";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Profits = () => {
    const [date, setDate] = useState(new Date())
    const [dateText, setDateText] = useState("")
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [sellingsProducts, setSellingsProducts] = useState([])

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

    function renderProfits() {
        const res = []
        let total = 0

        if (sellingsProducts.length > 0) {
            sellingsProducts.forEach(product => {
                total += product.value.quantity * product.value.profit
                res.push(<>
                        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 12}}>
                            <Text style={{fontWeight: "bold"}}>{product.value.name} :</Text>
                            <Text>Sold: X{product.value.quantity}</Text>
                            <Text style={{color: "green"}}>Total: {(product.value.quantity * product.value.profit).toFixed(2)} {currency}</Text>
                        </View>
                        <Divider/>
                    </>
                )
            })

            res.push(
                <View style={{flexDirection: "row", paddingVertical: 12, justifyContent: "flex-end"}}>
                    <Text style={{fontWeight: "bold", color: "green", textAlign: "right"}}>Total: {total.toFixed(2)} {currency}</Text>
                </View>
            )

            return res
        } else {
            return (
                <Text style={{color: "#cc0000", textAlign: "center"}}>You have no sellings made {dateText}</Text>
            )
        }

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

                <Divider mb={4}/>

                {renderProfits()}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profits;
