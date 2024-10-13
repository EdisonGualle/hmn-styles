"use client"

import { useState, useEffect, useRef } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar"
import { usePathname } from "next/navigation";


export default function AdminLayout({ children }) {
    const [isOpen, setIsOpent] = useState(false);
    const pathname = usePathname();
    const sidebarRef = useRef(null);

    const toggleSidebar = () => {
        setIsOpent(prevState => !prevState);
    };

    useEffect(() => {
        toggleSidebar();
    }, [pathname]);

    useEffect(() => {
        function handleClickOutSideEvent(event) {
            if (sidebarRef.current && !sidebarRef?.current?.contains(event.target)) {
                setIsOpent(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutSideEvent);

        return () => {
            document.removeEventListener("mousedown", handleClickOutSideEvent);
        };
    }, []);

    return (
        <main className=" relative flex ">
            <div className="hidden md:block ">
                <Sidebar />
            </div>
            <div
                ref={sidebarRef}
                className={`fixed md:hidden ease-soft-spring transition-all duration-400 z-50
                ${isOpen ? 'translate-x-0' : '-translate-x-[260px]'}
                `}>
                <Sidebar />
            </div>
            <section className="flex-1  flex flex-col min-h-screen">
                <Header toggleSidebar={toggleSidebar} />
                <section className="flex-1 bg-[#eff3f4]">
                    {children}
                </section>
            </section>
        </main>
    );
}


