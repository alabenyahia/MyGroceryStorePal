import React, {useState, useEffect} from 'react'
import {getDatabase, onValue, ref} from "firebase/database";
import {useAuthentication} from "../utils/hooks/useAuthentication";

const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {
    const [selectedStore, setSelectedStore] = useState(null)
    const [stores, setStores] = useState([])

    const {user} = useAuthentication();

    useEffect(() => {
        const db = getDatabase();
        const storesRef = ref(db, user?.uid +'/stores');
        onValue(storesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                let output = Object.entries(data).map(([key, value]) => ({key, value}));
                console.log("stores", output)
                if (output.length === 1) {
                    setSelectedStore(output[0])
                }
                setStores(output)
            }
        });
    }, [user]);

    return <GlobalContext.Provider
        value={{selectedStore, setSelectedStore, stores, setStores}}>
        {children}
    </GlobalContext.Provider>
}

export default GlobalContext