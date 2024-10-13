"use client";

import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        const  unsubscribe = onAuthStateChanged(auth, (user) => {
            if(user){
                setUser(user);
            }else{
                setUser(null);
            }
        });
        // Desmontar la suscripción al desmontar el componente
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            isLoading: user === undefined,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);