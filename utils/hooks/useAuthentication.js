import React, {useEffect, useState} from 'react';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {auth} from "../../config/firebase";

export function useAuthentication() {
    const [user, setUser] = useState();

    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                setUser(user);
            } else {
                // User is signed out
                setUser(undefined);
            }
        });
    }, []);

    return {
        user
    };
}