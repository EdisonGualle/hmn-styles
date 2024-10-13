
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { auth } from "@/lib/firebase";
import { Button } from "@nextui-org/react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Login() {
    const {user} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(user){
            router.push('/dashboard');
        }
    }, [user]);  

    return (
        <main className="w-full flex justify-center items-center bg-gray-300 md:p-24 p-10 min-h-screen">
            <section className="flex flex-col gap-3">
                <div className="flex justify-center">
                    <img className="h-12" src="/logo.png" alt="Logo" />
                </div>
                <div className="flex flex-col gap-3 bg-white md:p-10 p-5 rounded-xl md:min-w-[440px] w-full">
                    <h1 className="font-bold text-xl"> Login with Email</h1>
                    <form className="flex flex-col gap-3">
                        <input
                            type="email"
                            placeholder="Enter Your Email"
                            name="user-email"
                            id="user-email"
                            className="px-3 py-2 border rounded-xl focus:outline-none w-full"
                        />
                        <input
                            type="password"
                            placeholder="Enter Your Password"
                            name="user-password"
                            id="user-password"
                            className="px-3 py-2 border rounded-xl focus:outline-none w-full"
                        />
                        <Button color="primary">Login</Button>
                    </form>
                    <div className="flex justify-between">
                        <Link href={'/forget-password'}>
                            <button className="font-semibold text-sm text-blue-700">
                                Forgot Password
                            </button>
                        </Link>
                        <Link href={'/sign-up'}>
                            <button className="font-semibold text-sm text-blue-700">
                                New? Create Account
                            </button>
                        </Link>
                    </div>
                    <hr />
                    <SingInWithGoogleComponent />
                </div>
            </section>
        </main>
    );
};
function SingInWithGoogleComponent() {
    const [isLoading, setIsLoading] = useState(false); 
    const handleLogin = async () => {
        setIsLoading(true);
        try {
            const user = await signInWithPopup(auth, new GoogleAuthProvider());
        } catch (err) {
            toast.error(err?.message || "Se produjo un error");
        }
        setIsLoading(false);
    };

    return (
        <Button  isLoading={isLoading} isDisabled={isLoading} onClick={handleLogin}>
            Sign In with Google
        </Button>
    );
}
