import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from "react-native-safe-area-context";
import {StatusBar} from "react-native";
import {extendTheme, NativeBaseProvider} from "native-base";
import RootNavigation from './navigation';
import {GlobalProvider} from "./context/GlobalContext";


export default function App() {
    const theme = extendTheme({
        colors: {
            // Add new color
            primary: {
                50: "#F16B44",
                100: "#F16B44",
                200: "#F16B44",
                300: "#F16B44",
                400: "#F16B44",
                500: "#F16B44",
                600: "#F16B44",
                700: "#F16B44",
                800: "#F16B44",
                900: "#F16B44",
            },
            danger: {
                50: "#cc0000",
                100: "#cc0000",
                200: "#cc0000",
                300: "#cc0000",
                400: "#cc0000",
                500: "#cc0000",
                600: "#cc0000",
                700: "#cc0000",
                800: "#cc0000",
                900: "#cc0000",
            }
        }
    });
    return (
        <>
            <StatusBar backgroundColor={"#F16B44"}/>
            <GlobalProvider>
                <NavigationContainer>
                    <SafeAreaProvider>
                        <NativeBaseProvider theme={theme}>
                            <RootNavigation/>
                        </NativeBaseProvider>
                    </SafeAreaProvider>
                </NavigationContainer>
            </GlobalProvider>
        </>

    );
}


