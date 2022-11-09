import React, {useEffect, useState, useContext} from 'react';
import {Pressable, ScrollView, Text, View} from "react-native";

import {SafeAreaView} from "react-native-safe-area-context";
import {Box, Button, FormControl, Icon, Input, Modal, Select, useToast, WarningOutlineIcon} from "native-base";

import * as ImagePicker from 'expo-image-picker';
import {AntDesign} from "@expo/vector-icons";
import {useAuthentication} from "../../utils/hooks/useAuthentication";

import {getDatabase, ref, set, push, onValue} from "firebase/database";
import {getStorage, ref as firebaseStorageRef, uploadBytes, getDownloadURL} from "firebase/storage";
import GlobalContext from "../../context/GlobalContext";


const AddProductToInventory = ({route}) => {
    const [imageUri, setImageUri] = useState(null);
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [profit, setProfit] = useState("");
    const [unity, setUnity] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newCategoryNameError, setNewCategoryNameError] = useState("");


    const {date} = route.params

    const {selectedStore} = useContext(GlobalContext)
    const {user} = useAuthentication();

    const toast = useToast();

    useEffect(() => {
        const db = getDatabase();
        const categoriesRef = ref(db, user?.uid +'/categories');
        onValue(categoriesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                let output = Object.entries(data).map(([value, label]) => ({value, label}));
                console.log("categories", output)
                setCategories(output)
            }
        });
    }, [user]);


    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 0.5,
            base64: true
        });

        console.log(result);

        if (!result.cancelled) {
            setImageUri(result.uri);
        }
    };

    function addCategory() {
        setNewCategoryNameError("")
        if (newCategoryName.length > 0) {
            const db = getDatabase();
            const postListRef = ref(db, user?.uid + '/categories');
            const newPostRef = push(postListRef);
            set(newPostRef, newCategoryName)

            setNewCategoryName("")
            setModalVisible(false)
        } else {
            setNewCategoryNameError("name shouldn't be empty!")
            toast.show({
                render: () => {
                    return <Box bg="error.500" px="4" py="4" rounded="sm" mb={5}>
                        Name shouldn't be empty!
                    </Box>;
                }
            });
        }
    }

    async function addProduct() {
        if (name.length === 0 || !imageUri || quantity.length === 0 || price.length === 0 || unity.length === 0 || category.length === 0 || !imageUri ||profit.length === 0) {
            toast.show({
                render: () => {
                    return <Box bg="error.500" px="4" py="4" rounded="sm" mb={5}>
                        Fill up all the data first!
                    </Box>;
                }
            });
            return
        }

        const imgName = "img-" + new Date().getTime();
        const storage = getStorage();

        try {
            const response = await fetch(imageUri)
            const blobFile = await response.blob()

            const reference = firebaseStorageRef(storage, `${user?.uid}/${imgName}.jpg`)
            const result = await uploadBytes(reference, blobFile)
            const imgUrl = await getDownloadURL(result.ref)

            const db = getDatabase();
            const productsRef = ref(db, `${user?.uid}/${selectedStore}/inventory/${date}/products`);
            const newProductRef = push(productsRef);
            await set(newProductRef, {
                name: name,
                quantity: parseFloat(quantity),
                price: parseFloat(price),
                profit: parseFloat(profit),
                unity: unity,
                category: category,
                image: imgUrl
            });

            toast.show({
                render: () => {
                    return <Box bg="emerald.500" px="4" py="4" rounded="sm" mb={5}>
                        Product added to inventory successfully
                    </Box>;
                }
            });

        } catch (err) {
            return Promise.reject(err)
        }

        setName("")
        setQuantity("")
        setPrice("")
        setProfit("")
        setUnity("")
        setCategory("")
        setImageUri(null)

    }

    return (
        <SafeAreaView style={{padding: 16}}>
            <ScrollView>
                <Input placeholder="Product name" mb={4} value={name} onChangeText={(value) => {
                    setName(value)
                }}/>
                <Input placeholder="Quantity" keyboardType="numeric" mb={4} value={quantity} onChangeText={(value) => {
                    setQuantity(value)
                }}/>

                <Select selectedValue={unity} placeholder="Unit"
                        onValueChange={itemValue => setUnity(itemValue)} mb={4}>
                    <Select.Item label="1" value="1" key={1}/>
                    <Select.Item label="100g" value="100g" key={1}/>
                    <Select.Item label="1kg" value="1kg" key={1}/>
                </Select>

                <Input placeholder="Price per unit" keyboardType="numeric" mb={4} value={price} onChangeText={(value) => {
                    setPrice(value)
                }}/>

                <Input placeholder="Profit per unit" keyboardType="numeric" mb={4} value={profit} onChangeText={(value) => {
                    setProfit(value)
                }}/>


                <View style={{flexDirection: "row"}}>
                    <View style={{flex: 2, marginRight: 12}}>
                        <Select selectedValue={category} placeholder="Category"
                                onValueChange={itemValue => setCategory(itemValue)} mb={4}>
                            {categories.map(category => <Select.Item label={category.label} value={category.value} key={category.value}/>)}
                        </Select>
                    </View>


                    <Pressable onPress={() => setModalVisible(true)} style={{
                        flexDirection: "row",
                        backgroundColor: "#e0e0e0",
                        paddingVertical: 16,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 16,
                        flex: 1
                    }}>
                        <Text style={{textAlign: "center", marginRight: 4}}>Add New</Text>
                        <Icon color="black" as={AntDesign} name="plus" size="sm"/>
                    </Pressable>
                </View>

                <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} avoidKeyboard
                       justifyContent="flex-end" bottom="4" size="lg">
                    <Modal.Content>
                        <Modal.CloseButton/>
                        <Modal.Body mt={10}>


                            <FormControl isInvalid={newCategoryNameError.length > 0} mb={3}>
                                <FormControl.Label>Category Name</FormControl.Label>
                                <Input placeholder="Enter Category Name" value={newCategoryName}
                                       onChangeText={(value) => {
                                           setNewCategoryName(value)
                                       }}/>
                                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
                                    {newCategoryNameError}
                                </FormControl.ErrorMessage>
                            </FormControl>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button flex="1" onPress={() => addCategory()}>Add</Button>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>


                <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
                    <Pressable onPress={pickImage} style={{
                        flexDirection: "row",
                        backgroundColor: "#e0e0e0",
                        paddingVertical: 16,
                        borderRadius: 8,
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 16,
                        flex: 1,
                        marginRight: imageUri ? 16 : 0
                    }}>
                        <Text style={{textAlign: "center", marginRight: 4}}>Product image </Text>
                        <Icon color="black" as={AntDesign} name="caretdown" size="sm"/>
                    </Pressable>

                    {imageUri !== null ? <Icon color="#22bb33" as={AntDesign} name="checkcircle" size="lg"/> : null}
                </View>

                <Button onPress={() => addProduct()}>Add</Button>

            </ScrollView>
        </SafeAreaView>
    );
};

export default AddProductToInventory;
