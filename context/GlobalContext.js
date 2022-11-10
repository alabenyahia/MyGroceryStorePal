import React, {useState, useEffect} from 'react'
import {getDatabase, onValue, ref} from "firebase/database";
import {useAuthentication} from "../utils/hooks/useAuthentication";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {MYGROCERYSTOREPAL_CURRENCY_KEY} from "../utils/keys";

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {
    const [selectedStore, setSelectedStore] = useState(null)
    const [stores, setStores] = useState([])
    const [currency, setCurrency] = useState("$")

    const {user} = useAuthentication();

    useEffect(() => {
        async function f() {
            try {
                const value = await AsyncStorage.getItem(MYGROCERYSTOREPAL_CURRENCY_KEY)
                if(value !== null) {
                    setCurrency(value)
                }
            } catch(e) {
            }
        }
    }, []);


    useEffect(() => {
        if (user) {
            const db = getDatabase();
            const storesRef = ref(db, user?.uid +'/stores');
            onValue(storesRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    let output = Object.entries(data).map(([key, value]) => ({key, value}));

                    setStores(output)
                } else {
                    setStores([])
                }
                console.log("stores", data)
            });
        }
    }, [user]);

    return <GlobalContext.Provider
        value={{selectedStore, setSelectedStore, stores, setStores, currency, setCurrency}}>
        {children}
    </GlobalContext.Provider>
}

export default GlobalContext