import React, {useEffect, useState, useContext} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {Box, Button, Fab, FormControl, Icon, Input, Modal, Text, WarningOutlineIcon} from "native-base";
import {AntDesign} from "@expo/vector-icons";
import {FlatList} from "native-base"
import {Pressable} from "react-native";
import {getDatabase, onValue, push, ref, set} from "firebase/database";
import GlobalContext from "../../context/GlobalContext";
import {useAuthentication} from "../../utils/hooks/useAuthentication";

const Stores = ({navigation}) => {
    const [modalVisible, setModalVisible] = useState(false)
    const [newStoreName, setNewStoreName] = useState("")
    const [newStoreNameError, setNewStoreNameError] = useState("")

    const {user} = useAuthentication();
    const {stores} = useContext(GlobalContext)


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
        <SafeAreaView style={{flex: 1}}>
            <Box>
                {stores.length  === 0 ? <Text style={{padding: 16, textAlign: "center", color: "#cc0000"}}>You have no stores yet, please add one from the button bellow.</Text> : null}
                <FlatList data={stores} renderItem={({item}) => <Box key={item.key}
                                                                     style={{flexDirection: "row", justifyContent: "space-between"}} borderBottomWidth="1"
                                                                     borderColor="muted.800" pl={["4", "4"]} pr={["3", "3"]} py="2">
                    <Text fontSize="xs" color="coolGray.800" alignSelf="flex-start">
                        {item.value.name}
                    </Text>

                    <Pressable style={{paddingHorizontal: 6}} onPress={() => navigation.navigate("EditStore", {id: item.key, oldName: item.value.name})}><Text style={{fontWeight: "bold", color: "#F16B44"}}>Edit</Text></Pressable>
                </Box>} keyExtractor={item => item.id}/>
            </Box>

            <Fab renderInPortal={false} shadow={3} size="md" onPress={() => setModalVisible(true)}
                 icon={<Icon color="white" as={AntDesign} name="plus" size="sm"/>}/>

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

        </SafeAreaView>
    );
};

export default Stores;
