import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export const getBrand = async ({ id }) => {
    if (!id) {
        throw new Error("El id es requerido");
    }
    
    const data = await getDoc(doc(db, `brands/${id}`));
    
    if (data.exists) {
        return data.data();
    } else {
        throw new Error("La marca no existe");
    }
};