import React, {useState} from 'react';
import {Pressable, ScrollView, Text, View} from "react-native";

import {SafeAreaView} from "react-native-safe-area-context";
import {Button, FormControl, Icon, Input, Modal, Select, WarningOutlineIcon} from "native-base";

import * as ImagePicker from 'expo-image-picker';
import {AntDesign} from "@expo/vector-icons";
import {useAuthentication} from "../../utils/hooks/useAuthentication";

import {getDatabase, ref, set, push} from "firebase/database";
import {getStorage, ref as firebaseStorageRef, uploadBytes, getDownloadURL} from "firebase/storage";
import { Buffer } from "buffer";
import {getBlobFromUri} from "../../utils/functions";


const AddProductToInventory = () => {
    const [imageUri, setImageUri] = useState(null);
    const [imageBytes, setImageBytes] = useState(null);
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [unity, setUnity] = useState("");
    const [category, setCategory] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newCategoryNameError, setNewCategoryNameError] = useState("");
    const [addingProductError, setAddingProductError] = useState("");


    const {user} = useAuthentication();

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
            const  imageByte = new Buffer(result.base64, "base64")
            setImageBytes(imageByte.data)
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
        } else {
            setNewCategoryNameError("Name shouldn't be empty")
        }
    }

    const uploadImage = async () => {
        const imgName = "img-" + new Date().getTime();
        const storage = getStorage();

        try {
            const response = await fetch(imageUri)
            const blobFile = await response.blob()

            const reference = firebaseStorageRef(storage, `${imgName}.jpg`)
            const result = await uploadBytes(reference, blobFile)
            const url = await getDownloadURL(result.ref)

            return url
        } catch (err) {
            return Promise.reject(err)
        }

    };

    function addProduct() {
        setAddingProductError("")

        const uploadedImgUrl = uploadImage(getBlobFromUri(imageUri))
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
                <Input placeholder="Price" keyboardType="numeric" mb={4} value={price} onChangeText={(value) => {
                    setPrice(value)
                }}/>
                <Input placeholder="Unity" mb={4} value={unity} onChangeText={(value) => {
                    setUnity(value)
                }}/>

                <View style={{flexDirection: "row"}}>
                    <View style={{flex: 2, marginRight: 12}}>
                        <Select selectedValue={category} placeholder="Category"
                                onValueChange={itemValue => setCategory(itemValue)} mb={4}>
                            <Select.Item label="UX Research" value="ux"/>
                            <Select.Item label="Web Development" value="web"/>
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
