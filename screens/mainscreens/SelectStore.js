import React, {useContext, useState} from 'react';
import {ScrollView, ToastAndroid, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import GlobalContext from "../../context/GlobalContext";
import {getDatabase, push, ref, set} from "firebase/database";
import {Button, Divider, Fab, FormControl, Icon, Input, Modal, Select, WarningOutlineIcon} from "native-base";
import {useAuthentication} from "../../utils/hooks/useAuthentication";
import {AntDesign} from "@expo/vector-icons";

const SelectStore = () => {
    const {stores, setSelectedStore, selectedStore} = useContext(GlobalContext)
    const [newStoreName, setNewStoreName] = useState("")
    const [newStoreNameError, setNewStoreNameError] = useState("")
    const [modalVisible, setModalVisible] = useState(false)

    const {user} = useAuthentication();

    function addStore() {
        setNewStoreNameError("")
        if (newStoreName.length > 0) {
            const db = getDatabase();
            const storesRef = ref(db, '/' + user?.uid + '/stores/');
            const newStoreRef = push(storesRef);
            set(newStoreRef, {name: newStoreName, color: "#F16B44"})

            setNewStoreName("")
            setModalVisible(false)
        } else {
            setNewStoreNameError("Name shouldn't be empty")
        }
    }

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{padding: 16, paddingBottom: 0}}>
                    <Select placeholder="Choose a store" value={selectedStore} onValueChange={itemValue => {
                        setSelectedStore(itemValue)
                        console.log("selected store", selectedStore)
                    }}>
                        {stores.map(store => <Select.Item label={store.value.name} value={store.key} key={store.key}/>)}
                    </Select>
                </View>

                <Divider mt={8} mb={8}/>

                <Fab onPress={() => setModalVisible(true)} renderInPortal={false} shadow={3}
                     size="md" icon={<Icon color="white" as={AntDesign} name="plus" size="sm"/>}/>

                <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} avoidKeyboard
                       justifyContent="flex-end" bottom="4" size="lg">
                    <Modal.Content>
                        <Modal.CloseButton/>
                        <Modal.Body mt={10}>

                            <FormControl isInvalid={newStoreNameError.length > 0} mb={3}>
                                <FormControl.Label>Store Name</FormControl.Label>
                                <Input placeholder="Enter Store Name" value={newStoreName}
                                       onChangeText={(value) => {
                                           setNewStoreName(value)
                                       }}/>
                                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
                                    {newStoreNameError}
                                </FormControl.ErrorMessage>
                            </FormControl>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button flex="1" onPress={() => addStore()}>Add</Button>
                        </Modal.Footer>
                    </Modal.Content>
                </Modal>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SelectStore;
