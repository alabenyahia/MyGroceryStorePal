import React, {useState} from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {Button, Divider, FormControl, Heading, Input, Text, WarningOutlineIcon} from "native-base";
import {Image, Pressable, ScrollView, View} from "react-native";
import {signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {auth} from "../../config/firebase";
import {isEmailValid} from "../../utils/functions";
import facebook from "../../assets/facebook-icon.png";
import google from "../../assets/google-icon.png";


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")

    const [loginError, setLoginError] = useState("")

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

        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            if (error.code === "auth/user-not-found") {
                setLoginError("User not found!")
            }
            console.log(error.message)
        }
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

                <Pressable>
                    <Text style={{textAlign: "right", color: "#F16B44", fontWeight: "bold"}}>Forgot Password?</Text>
                </Pressable>

                <Button mt={6} onPress={() => login()}>LOGIN</Button>

                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 56, marginBottom: 40}}>
                    <Divider style={{width: "30%"}}/>
                    <Text style={{marginHorizontal: 12, color: "#9CA3AF"}}>or</Text>
                    <Divider style={{width: "30%"}}/>
                </View>

                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                    <Pressable>
                        <Image source={facebook}
                               style={{width: 32, height: 32, alignSelf: 'center', marginRight: 16}}/>
                    </Pressable>
                    <Pressable>
                        <Image source={google}
                               style={{width: 32, height: 32, alignSelf: 'center'}}/>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Login;
