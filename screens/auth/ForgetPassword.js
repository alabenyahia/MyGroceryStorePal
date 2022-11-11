import React, {useState} from 'react';
import {Pressable, ScrollView} from "react-native";
import {Box, Button, FormControl, Heading, Input, Text, useToast, WarningOutlineIcon} from "native-base";
import {SafeAreaView} from "react-native-safe-area-context";
import {sendPasswordResetEmail} from "firebase/auth";
import {auth} from "../../config/firebase";
import {isEmailValid} from "../../utils/functions";

const ForgetPassword = () => {

    const [email, setEmail] = useState("")

    const [emailError, setEmailError] = useState("")

    const toast = useToast();

    function forgetPassword() {
        setEmailError("")
        if (!isEmailValid(email)) {
            setEmailError("Email is invalid")
            return
        }

        sendPasswordResetEmail(auth, email)
            .then(() => {
                toast.show({
                    render: () => {
                        return <Box bg="emerald.500" px="4" py="4" rounded="sm" mb={5}>
                            Password link sent successfully
                        </Box>;
                    }
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                toast.show({
                    render: () => {
                        return <Box bg="error.500" px="4" py="4" rounded="sm" mb={5}>
                            {errorMessage}
                        </Box>;
                    }
                });
            });
    }

    return (
        <SafeAreaView style={{padding: 16}}>
            <ScrollView>
                <FormControl isInvalid={emailError.length > 0} mt={8} mb={3}>
                    <FormControl.Label>Email</FormControl.Label>
                    <Input placeholder="Enter your email" value={email}
                           onChangeText={(value) => {
                               setEmail(value)
                           }}/>
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
                        {emailError}
                    </FormControl.ErrorMessage>
                </FormControl>

                <Button mt={6} onPress={() => forgetPassword()}>Send</Button>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ForgetPassword;
