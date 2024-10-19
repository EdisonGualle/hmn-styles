"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Book, Layers2, LayoutDashboard, LibraryBig, LogOut, Package, ShieldCheck, ShoppingCart, Star, User } from "lucide-react"
import toast from "react-hot-toast"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"

const Sidebar = () => {
    const menuList = [
        {
            name: "Dashboard",
            link: "/admin",
            icon: <LayoutDashboard className="h-5 w-5" />
        },
        {
            name: "Productos",
            link: "/admin/products",
            icon: <Package className="h-5 w-5" />
        },
        {
            name: "Categorias",
            link: "/admin/categories",
            icon: <Layers2 className="h-5 w-5" />
        },
        {
            name: "Marcas",
            link: "/admin/brands",
            icon: <Book className="h-5 w-5" />
        },
        {
            name: "Ordenes",
            link: "/admin/orders",
            icon: <ShoppingCart className="h-5 w-5" />
        },
        {
            name: "Clientes",
            link: "/admin/customers",
            icon: <User className="h-5 w-5" />
        },
        {
            name: "Reseñas",
            link: "/admin/reviews",
            icon: <Star className="h-5 w-5" />
        },
        {
            name: "Colecciones",
            link: "/admin/collections",
            icon: <LibraryBig className="h-5 w-5" />
        },
        {
            name: "Administradores",
            link: "/admin/admins",
            icon: <ShieldCheck className="h-5 w-5" />
        }
    ]

    return (
        <section className="sticky top-' flex flex-col gap-10  bg-white border-r px-4 py-3 h-screen overflow-hidden w-[260px] z-50">
            <div className="flex justify-center pt-4">
                <img className="h-8" src="/logo.png" alt="logo" />
            </div>
            <ul className="flex-1 h-full overflow-y-auto flex flex-col gap-4  ">
                {menuList?.map((item, index) => {
                    return <Tab item={item} key={index} />
                })}
            </ul>
            <div className="flex justify-center">
                <button
                    onClick={async () => {
                        try {
                            await toast.promise(signOut(auth), {
                                error: (e) => e?.message || "Ocurrio un error",
                                loading: "Cerrando sesion...",
                                success: "Sesion cerrada correctamente"
                            })
                        } catch (error) {
                            toast.error(error?.message || "Ocurrio un error");
                        }
                    }}
                    className=" flex gap-2 items-center px-3 py-2 hover:bg-indigo-100 rounded-xl w-full font-semibold  ">
                    <LogOut className="h-5 w-5" /> Salir
                </button>
            </div>
        </section>
    )
}

function Tab({ item }) {
    const pathname = usePathname();
    const isSelect = pathname === item?.link;

    return (
        <Link href={item?.link}>
            <li className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold ease-soft-spring transition-all duration-300  
            ${isSelect ? "bg-indigo-400 text-white" : "bg-white text-black hover:bg-indigo-100"}`}>
                {item?.icon}
                {item?.name}
            </li>
        </Link>
    );
};

export default Sidebar


