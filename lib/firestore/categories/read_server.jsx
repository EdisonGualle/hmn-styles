import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getCategory = async ({ id }) => {
    if (!id) {
        throw new Error("El id es requerido");
    }
    
    const data = await getDoc(doc(db, `categories/${id}`));
    
    if (data.exists) {
        return data.data();
    } else {
        throw new Error("La categoría no existe");
    }
};