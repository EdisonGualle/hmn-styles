"use client"

import AuthContextProvider, { useAuth } from "@/contexts/AuthContext"
import AdminLayout from "./components/AdminLayout"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { CircularProgress } from "@nextui-org/react"

const layout = ({ children }) => {
    return (
        <AuthContextProvider>
            <AdminChecking>
                {children}
            </AdminChecking>
        </AuthContextProvider>
    )
}

export default layout

function AdminChecking({ children }) {
    const { user, isLoading  } = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (!isLoading && !user) {
            router.push("/login");
        }
    }, [user, isLoading]);

    if (isLoading) {
        return (
            <div className="h-screen  w-screen flex  items-center justify-center">
                <CircularProgress />
            </div>
        );
    };

    if (!user) {
        return (
            <div className="h-screen  w-screen flex  items-center justify-center">
                <h1>
                    Debe iniciar sesión primero.
                </h1>
            </div>
        );
    }


    return <AdminLayout> {children}</AdminLayout>
}