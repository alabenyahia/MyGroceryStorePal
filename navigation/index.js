import React from 'react';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import UserDrawer from './userDrawer';
import AuthStack from './authStack';

export default function RootNavigation() {
    const { user } = useAuthentication();

    return user ? <UserDrawer /> : <AuthStack />;
}