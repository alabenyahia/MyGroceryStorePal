import React, {useContext, useEffect, useState} from 'react';
import {Pressable, ScrollView, Text, View} from "react-native";
import {
    Alert, Box,
    Button, Collapse,
    Divider,
    FormControl,
    HStack,
    Icon,
    Input,
    Modal,
    Select, useToast,
    VStack,
    WarningOutlineIcon
} from "native-base";
import {AntDesign} from "@expo/vector-icons";
import {SafeAreaView} from "react-native-safe-area-context";
import GlobalContext from "../../context/GlobalContext";
import {useAuthentication} from "../../utils/hooks/useAuthentication";
import {getDatabase, onValue, push, ref, set, remove, update} from "firebase/database";
import * as ImagePicker from "expo-image-picker";
import {getDownloadURL, getStorage, ref as firebaseStorageRef, uploadBytes} from "firebase/storage";

const EditProductFromSellings = ({route, navigation}) => {
    const [quantity, setQuantity] = useState("");
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);

    const {id, dt, name: oldName, quantity: oldQuantity, price: oldPrice, unity: oldUnity, category: oldCategory, image, maxQuantity} = route.params

    const {selectedStore} = useContext(GlobalContext)
    const {user} = useAuthentication();

    const toast = useToast();

    useEffect(() => {
        setQuantity(oldQuantity)
    }, [oldQuantity]);


    async function editProduct() {

        if (quantity.length === 0 ) {
            toast.show({
                render: () => {
                    return <Box bg="error.500" px="4" py="4" rounded="sm" mb={5}>
                        Fill up all the data first!
                    </Box>;
                }
            });
            return
        }

        try {
            const db = getDatabase();
            let updates = {};
            if (parseInt(quantity) > maxQuantity) {
                updates = {
                    name: oldName,
                    price: oldPrice,
                    unity: oldUnity,
                    category: oldCategory,
                    image: image,
                    quantity: maxQuantity,
                    maxQuantity: maxQuantity
                }

            } else {
                updates =  {
                    name: oldName,
                    price: oldPrice,
                    unity: oldUnity,
                    category: oldCategory,
                    image: image,
                    quantity: quantity,
                    maxQuantity: maxQuantity
                }
            }

            updates[`${user?.uid}/${selectedStore}/sellings/${dt}/products/${id}`] = {
                quantity: parseFloat(quantity)
            };
            await update(ref(db), updates);

            toast.show({
                render: () => {
                    return <Box bg="emerald.500" px="4" py="4" rounded="sm" mb={5}>
                        Product updated successfully!
                    </Box>;
                }
            });

        } catch (err) {
            return Promise.reject(err)
        }


        setQuantity("")

    }

    async function deleteProduct() {
        console.log(selectedStore, dt, id)
        const db = getDatabase();
        const productRef = ref(db, user?.uid + '/' + selectedStore + '/sellings/' + dt + '/products/' + id);
        await remove(productRef)
        setShowDeleteAlert(false)
        navigation.navigate("Sellings")
    }

    return (
        <SafeAreaView style={{padding: 16}}>
            <ScrollView>
                <Input placeholder="Quantity" keyboardType="numeric" mb={4} value={quantity} onChangeText={(value) => {
                    setQuantity(value)
                }}/>

                <Button onPress={() => editProduct()}>Edit</Button>

                <Divider mt={6} mb={6}/>

                <Button colorScheme="danger" onPress={() => setShowDeleteAlert(true)}>Delete From Sellings</Button>

                <Modal isOpen={showDeleteAlert} onClose={() => setShowDeleteAlert(false)} avoidKeyboard
                       justifyContent="flex-end" bottom="4" size="lg">
                    <Modal.Content>
                        <Modal.CloseButton/>
                        <Modal.Body mt={10}>
                            <Text>Are you sure, you want to delete this product from {dt} sellings</Text>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button colorScheme="danger" flex="1" onPress={() => deleteProduct()} mr={4}>YES</Button>
                            <Button flex="1" onPress={() => setShowDeleteAlert(false)}>NO</Button>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
};

export default EditProductFromSellings;
