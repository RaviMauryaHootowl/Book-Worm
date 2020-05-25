import React, {createContext, useEffect, useState} from 'react';
import firebase from '../firebase';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(setCurrentUser);
    }, []);

    return (
        <AuthContext.Provider value={{currentUser}}>
            {props.children}
        </AuthContext.Provider>
    );
}