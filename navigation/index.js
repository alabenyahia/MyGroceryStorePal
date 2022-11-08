import React, {useContext} from 'react';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import UserDrawer from './userDrawer';
import AuthStack from './authStack';
import GlobalContext from "../context/GlobalContext";
import SelectStoreStack from "./selectStoreStack";


export default function RootNavigation() {
    const {selectedStore} = useContext(GlobalContext)
    console.log("selected store", selectedStore)
    const { user } = useAuthentication();

    return user ? !selectedStore ? <SelectStoreStack/> : <UserDrawer /> : <AuthStack />;
}