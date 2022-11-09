import React, {useEffect, useState, useContext} from 'react';
import {Image, Pressable, ScrollView, Text, View} from "react-native";
import {Box, Button, Divider, Fab, Icon, Input, useToast} from "native-base";
import {useAuthentication} from "../../utils/hooks/useAuthentication";
import {getDatabase, ref, onValue, update} from "firebase/database";
import GlobalContext from "../../context/GlobalContext";
import {SafeAreaView} from "react-native-safe-area-context";


const AddProductToSellings = ({route}) => {
    const {user} = useAuthentication();

    const {selectedStore} = useContext(GlobalContext)

    const [inventoryProducts, setInventoryProducts] = useState([])
    const [dateText, setDateText] = useState("")
    const [quantities, setQuantities] = useState({})

    const {date} = route.params

    const toast = useToast();

    useEffect(() => {
        console.log("inventoryproducts", inventoryProducts)
        if (inventoryProducts.length > 0) {
            inventoryProducts.forEach(product => {
                setQuantities({
                    ...quantities, [product.key]: {
                        name: product.value.name,
                        price: product.value.price,
                        unity: product.value.unity,
                        category: product.value.category,
                        image: product.value.image,
                        quantity: 0
                    }
                })
            })

        }
    }, [inventoryProducts])

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

            if (counter > 1) {
                all.push(part)
                counter = 0;
                part = []
            }
            part.push(
                <Pressable style={{
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
                    <Image source={{uri: inventoryProducts[i].value.image}}
                           style={{width: "100%", height: 80, alignSelf: 'center'}}/>
                    <View style={{padding: 6}}>
                        <Text>{inventoryProducts[i].value.name}</Text>
                        <Divider mt={1} mb={1}/>
                        <Text>X{inventoryProducts[i].value.quantity}</Text>
                        <Divider mt={1} mb={1}/>
                        <Text>{inventoryProducts[i].value.price}TND per {inventoryProducts[i].value.unity}</Text>
                    </View>

                    <View style={{paddingHorizontal: 6}}>
                        <Input placeholder="Quantity" keyboardType="numeric" mb={4}
                               value={quantities[inventoryProducts[i].key]} onChangeText={(value) => {
                            if (parseInt(value) > parseInt(inventoryProducts[i].value.quantity)) {
                                setQuantities({
                                    ...quantities,
                                    [inventoryProducts[i].key]: {
                                        name: inventoryProducts[i].value.name,
                                        price: inventoryProducts[i].value.price,
                                        profit: inventoryProducts[i].value.profit,
                                        unity: inventoryProducts[i].value.unity,
                                        category: inventoryProducts[i].value.category,
                                        image: inventoryProducts[i].value.image,
                                        quantity: inventoryProducts[i].value.quantity,
                                        maxQuantity: inventoryProducts[i].value.quantity
                                    }
                                })

                            } else {
                                setQuantities({...quantities, [inventoryProducts[i].key]: {
                                        name: inventoryProducts[i].value.name,
                                        price: inventoryProducts[i].value.price,
                                        profit: inventoryProducts[i].value.profit,
                                        unity: inventoryProducts[i].value.unity,
                                        category: inventoryProducts[i].value.category,
                                        image: inventoryProducts[i].value.image,
                                        quantity: parseInt(value),
                                        maxQuantity: inventoryProducts[i].value.quantity
                                    }})
                            }
                        }}/>
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

    function isUserNotAddedAnyProduct() {
        let test = true
        for (const key of Object.keys(quantities)) {
            if (parseInt(quantities[key].quantity) !== 0) {
                test = false
                return test
            }
        }

        return test
    }

    function getOnlyQuantityNotZero() {
        const arr = []
        for (const key of Object.keys(quantities)) {
            if (parseInt(quantities[key].quantity) !== 0)
                arr.push({key: key, value: quantities[key]})
        }
        return arr
    }

     function addProducts() {
        if (isUserNotAddedAnyProduct()) {
            toast.show({
                render: () => {
                    return <Box bg="error.500" px="4" py="4" rounded="sm" mb={5}>
                        You need to add at least one product!
                    </Box>;
                }
            });
            return
        }
        const db = getDatabase();

        getOnlyQuantityNotZero().forEach(product => {
            const updates = {};

            const dt = date.getDate().toString().padStart(2, "0") + '-' + (date.getMonth() + 1).toString().padStart(2, "0") +
                '-' + (date.getFullYear()).toString()

            updates[user?.uid + '/' + selectedStore + '/sellings/' + dt + '/products/' + product.key] = product.value;

            update(ref(db), updates);
        })

         toast.show({
             render: () => {
                 return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                     Product added to sellings successfully!
                 </Box>;
             }
         });
    }

    return (
        <SafeAreaView style={{paddingTop: 24}}>
            <ScrollView>
                {renderProducts()}

                <View style={{paddingHorizontal: 16}}>
                    <Button onPress={() => addProducts()}>Add</Button>
                </View>
            </ScrollView>
        </SafeAreaView>

    );
};

export default AddProductToSellings;
