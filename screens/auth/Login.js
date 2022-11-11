import React, {useState} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {Box, Button, Divider, FormControl, Heading, Input, Text, useToast, WarningOutlineIcon} from "native-base";
import {Image, Pressable, ScrollView, View} from "react-native";
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from "../../config/firebase";
import {isEmailValid} from "../../utils/functions";
import Spinner from 'react-native-loading-spinner-overlay';
import { sendPasswordResetEmail } from "firebase/auth";


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const [loginError, setLoginError] = useState("")
    const [isLoading, setIsLoading] = useState(false);

    const toast = useToast();

    auth.useDeviceLanguage();

    async function login() {
        setEmailError("")
        setPasswordError("")
        setLoginError("")

        if (!isEmailValid(email)) {
            setEmailError("Email is invalid")
            return
        }

        if (password.length < 6) {
            setPasswordError("Password should be more than 6 characters")
            return
        }

        setIsLoading(true)

        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            if (error.code === "auth/user-not-found") {
                setLoginError("User not found!")
            }

            if (error.code === "auth/wrong-password") {
                setLoginError("Invalid password!")
            }
            console.log(error.message)
        }

        setIsLoading(false)
    }

    function forgetPassword() {
        navigation.navigate("ForgetPassword")
    }

    return (
        <SafeAreaView style={{padding: 16}}>
            <ScrollView>
                <Heading style={{color: "#1F2937"}}>Welcome back,</Heading>
                <Text style={{color: "#1F2937"}}>Sign in to continue</Text>

                {loginError && <Text style={{color: "#cc0000", textAlign: "center"}} mt={4}>{loginError}</Text>}

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

                <Pressable onPress={() => forgetPassword()}>
                    <Text style={{textAlign: "right", color: "#F16B44", fontWeight: "bold"}}>Forgot Password?</Text>
                </Pressable>

                <Button mt={6} onPress={() => login()}>LOGIN</Button>
                <Spinner visible={isLoading}/>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Login;
