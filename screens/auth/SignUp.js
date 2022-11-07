import React, {useState} from 'react';
import {Button, Divider, FormControl, Heading, Input, Text, WarningOutlineIcon} from "native-base";
import {SafeAreaView} from "react-native-safe-area-context";
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from "../../config/firebase";
import {isEmailValid} from "../../utils/functions";
import {Image, Pressable, View} from "react-native";
import facebook from "../../assets/facebook-icon.png";
import google from "../../assets/google-icon.png";


const SignUp = ({navigation}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")


    async function signUp() {
        console.log("sdfsfs")
        setEmailError("")
        setPasswordError("")
        setConfirmPasswordError("")

        if (!isEmailValid(email)) {
            setEmailError("Email is invalid")
            return
        }

        if (password.length < 6) {
            setPasswordError("Password should be more than 6 characters")
            return
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError("passwords don't match")
            return
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigation.navigate("Login");
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <SafeAreaView style={{padding: 16}}>
            <ScrollView>
                <Heading style={{color: "#1F2937"}}>Welcome</Heading>
                <Text style={{color: "#1F2937"}}>Sign up to continue</Text>


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

                <FormControl isInvalid={passwordError.length > 0} mb={3}>
                    <FormControl.Label>Password</FormControl.Label>
                    <Input placeholder="Enter your password" value={password} type={"password"}
                           onChangeText={(value) => {
                               setPassword(value)
                           }}/>
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
                        {passwordError}
                    </FormControl.ErrorMessage>
                </FormControl>

                <FormControl isInvalid={confirmPasswordError.length > 0} mb={3}>
                    <FormControl.Label>Confirm Password</FormControl.Label>
                    <Input placeholder="Enter your password again" value={confirmPassword} type={"password"}
                           onChangeText={(value) => {
                               setConfirmPassword(value)
                           }}/>
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs"/>}>
                        {confirmPasswordError}
                    </FormControl.ErrorMessage>
                </FormControl>

                <Button mt={6} onPress={() => signUp()}>SIGN UP</Button>

            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUp;
