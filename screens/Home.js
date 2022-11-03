import React from 'react';
import {Text, View} from "react-native";
import { useAuthentication } from '../utils/hooks/useAuthentication';
import {auth} from "../config/firebase";
import {Button} from "native-base";
import { signOut } from "firebase/auth";

const Home = () => {
    const { user } = useAuthentication();
    return (
        <View>
            <Text>Welcome {user?.email}!</Text>

            <Button title="Sign Out" onPress={() => signOut(auth)} />
        </View>
    );
};

export default Home;
