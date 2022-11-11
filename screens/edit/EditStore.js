import React, {useLayoutEffect, useState, useContext} from 'react';
import {Pressable, ScrollView, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Box, Button, Divider, FormControl, Icon, Input, Text, useToast, WarningOutlineIcon} from "native-base";
import ColorPicker from "react-native-wheel-color-picker";
import {AntDesign} from "@expo/vector-icons";
import GlobalContext from "../../context/GlobalContext";
import { getDatabase, ref, child, push, update } from "firebase/database";
import {useAuthentication} from "../../utils/hooks/useAuthentication";
import Spinner from "react-native-loading-spinner-overlay";

const EditStore = ({route, navigation}) => {
    const {id, oldName} = route.params;
    const [storeName, setStoreName] = useState("")
    const [storeColor, setStoreColor] = useState("")
    const [newStoreNameError, setNewStoreNameError] = useState("")
    const [successMsg, setSuccessMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const {selectedStore} = useContext(GlobalContext)
    const {user} = useAuthentication();

    const toast = useToast();

    useLayoutEffect(() => {
        setSuccessMsg("")
        setNewStoreNameError("")
        setStoreName(oldName)
    }, [])

    async function editStore() {
        setSuccessMsg("")
        if (storeName.length === 0) {
            setNewStoreNameError("Store name shouldn't be empty")
            return
        }
        setIsLoading(true)
        const db = getDatabase();
        let newStoreData
        if (storeColor) {
            newStoreData = {
                name: storeName,
                color: storeColor
            }
        } else {
            newStoreData = {
                name: storeName,
                color: selectedStore.value.color
            }
        }

        const updates = {};
        updates[user?.uid + '/stores/' + id] = newStoreData;
        await update(ref(db), updates);
        setIsLoading(false)
        toast.show({
            render: () => {
                return <Box bg="emerald.500" px="4" py="4" rounded="sm" mb={5}>
                    Store updated successfully!
                </Box>;
            }
        });
        setStoreName("")
    }

    return (
        <SafeAreaView >
            <ScrollView>
                {successMsg && <Text style={{marginTop: 16, textAlign: "center", color: "#22bb33"}}>{successMsg}</Text>}
                <View style={{padding: 16, paddingBottom: 0}}>
                    <FormControl isInvalid={newStoreNameError.length > 0} mb={3}>
                        <FormControl.Label>Store Name</FormControl.Label>
                        <Input value={storeName} onChangeText={(value) => setStoreName(value)} placeholder="New store name" />
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
                            {newStoreNameError}
                        </FormControl.ErrorMessage>
                    </FormControl>

                </View>

                <Divider mt={6} mb={6}/>
                <View style={{padding: 16, paddingTop: 0}}>
                    <Text style={{textAlign: "center"}}>Choose a store color</Text>
                    <ColorPicker
                        color={storeColor}
                        onColorChangeComplete={(color) => setStoreColor(color)}
                        thumbSize={40}
                        sliderSize={40}
                        noSnap={true}
                        row={false}
                    />
                </View>

                <Divider mt={6} mb={6}/>

                <Button mx={4} onPress={() => editStore()}>Edit</Button>
                <Spinner visible={isLoading}/>
            </ScrollView>
        </SafeAreaView>
    );
};

export default EditStore;
