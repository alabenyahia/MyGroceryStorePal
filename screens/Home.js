import React from 'react';
import {ScrollView, Text, View} from "react-native";
import { useAuthentication } from '../utils/hooks/useAuthentication';
import {auth} from "../config/firebase";
import {Button} from "native-base";
import { signOut } from "firebase/auth";
import {SafeAreaView} from "react-native-safe-area-context";

const Home = () => {
    const { user } = useAuthentication();
    return (
        <SafeAreaView>
            <ScrollView>

            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
