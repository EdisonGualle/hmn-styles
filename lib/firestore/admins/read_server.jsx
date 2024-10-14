import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getAdmin = async ({ id }) => {
    if (!id) {
        throw new Error("El id es requerido");
    }
    
    const data = await getDoc(doc(db, `admins/${id}`));
    
    if (data.exists) {
        return data.data();
    } else {
        throw new Error("El administrador no existe");
    }
};