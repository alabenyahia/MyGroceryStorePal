import React, {useContext, useEffect, useState} from 'react';
import {Pressable, ScrollView, Text, View} from "react-native";
import {
    Box,
    Button,
    Divider,
    FormControl,
    Icon,
    Input,
    Modal,
    Select, useToast,
    WarningOutlineIcon
} from "native-base";
import {AntDesign} from "@expo/vector-icons";
import {SafeAreaView} from "react-native-safe-area-context";
import GlobalContext from "../../context/GlobalContext";
import {useAuthentication} from "../../utils/hooks/useAuthentication";
import {getDatabase, onValue, push, ref, set, remove, update} from "firebase/database";

const EditProductFromInventory = ({route, navigation}) => {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [unity, setUnity] = useState("");
    const [category, setCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);
    const [newCategoryNameError, setNewCategoryNameError] = useState("");

    const {id, dt, name: oldName, quantity: oldQuantity, price: oldPrice, unity: oldUnity, category: oldCategory, image} = route.params

    const {selectedStore} = useContext(GlobalContext)
    const {user} = useAuthentication();

    const toast = useToast();

    useEffect(() => {
        console.log(oldName)
        setName(oldName)
        setQuantity(oldQuantity)
        setPrice(oldPrice)
        setUnity(oldUnity)
        setCategory(oldCategory)
    }, []);


    useEffect(() => {
        const db = getDatabase();
        const categoriesRef = ref(db, user?.uid + '/categories');
        onValue(categoriesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                let output = Object.entries(data).map(([value, label]) => ({value, label}));
                console.log("categories", output)
                setCategories(output)
            }
        });
    }, [user]);


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

    async function editProduct() {
        if (name.length === 0 || quantity.length === 0 || price.length === 0 || unity.length === 0 || category.length === 0) {
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
            const updates = {};
            updates[`${user?.uid}/${selectedStore}/inventory/${dt}/products/${id}`] = {
                name: name,
                quantity: parseFloat(quantity),
                price: parseFloat(price),
                unity: unity,
                category: category,
                image: image
            };
            await update(ref(db), updates);

            toast.show({
                render: () => {
                    return <Box bg="emerald.500" px="4" py="4" rounded="sm" mb={5}>
                        Product updated successfully
                    </Box>;
                }
            });

        } catch (err) {
            return Promise.reject(err)
        }

        setName("")
        setQuantity("")
        setPrice("")
        setUnity("")
        setCategory("")

    }

    async function deleteProduct() {
        console.log(selectedStore, dt, id)
        const db = getDatabase();
        const productRef = ref(db, user?.uid + '/' + selectedStore + '/inventory/' + dt + '/products/' + id);
        await remove(productRef)
        setShowDeleteAlert(false)
        navigation.navigate("Inventory")
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

                <Input placeholder="Price per unit" keyboardType="numeric" mb={4} value={price}
                       onChangeText={(value) => {
                           setPrice(value)
                       }}/>

                <View style={{flexDirection: "row"}}>
                    <View style={{flex: 2, marginRight: 12}}>
                        <Select selectedValue={category} placeholder="Category"
                                onValueChange={itemValue => setCategory(itemValue)} mb={4}>
                            {categories.map(category => <Select.Item label={category.label} value={category.value}
                                                                     key={category.value}/>)}
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

                <Button onPress={() => editProduct()}>Edit</Button>

                <Divider mt={6} mb={6}/>

                <Button colorScheme="danger" onPress={() => setShowDeleteAlert(true)}>Delete From Inventory</Button>

                <Modal isOpen={showDeleteAlert} onClose={() => setShowDeleteAlert(false)} avoidKeyboard
                       justifyContent="flex-end" bottom="4" size="lg">
                    <Modal.Content>
                        <Modal.CloseButton/>
                        <Modal.Body mt={10}>
                            <Text>Are you sure, you want to delete this product from {dt} inventory</Text>
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

export default EditProductFromInventory;
