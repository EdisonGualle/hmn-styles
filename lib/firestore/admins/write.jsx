import { db, storage } from "@/lib/firebase";
import { collection, deleteDoc, doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const createNewAdmin = async ({ data, image }) => {
    if (!image) {
        throw new Error("La imagen es requerida");
    }
    if (!data?.name) {
        throw new Error("El nombre es requerido");
    }
    if (!data?.email) {
        throw new Error("El email es requerido");
    }


    const newId = data?.email;
    const imageRef = ref(storage, `admins/${newId}`);
    await uploadBytes(imageRef, image);

    const imageUrl = await getDownloadURL(imageRef);

    await setDoc(doc(db, `admins/${newId}`), {
        ...data,
        id: newId,
        imageUrl: imageUrl,
        timestampCreate: Timestamp.now(),
    });
};

export const updateAdmin = async ({ data, image }) => {

    if (!data?.id) {
        throw new Error("El id es requerido");
    }

    if (!data?.name) {
        throw new Error("El nombre es requerido");
    }

    if (!data?.email) {
        throw new Error("El email es requerido");
    }

    const id = data?.id;
    let imageUrl = data?.imageUrl;

    if (image && typeof image !== "string") {
        const imageRef = ref(storage, `admins/${id}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
    }

    if (id === data) {
        await updateDoc(doc(db, `admins/${id}`), {
            ...data,
            imageUrl: imageUrl,
            timestampCreate: Timestamp.now(),
        });
    }else{
        const  newId = data?.email;

        await deleteDoc(doc(db, `admins/${id}`));

        await setDoc(doc(db, `admins/${newId}`), {
            ...data,
            id: newId,
            imageUrl: imageUrl,
            timestampCreate: Timestamp.now(),
        });
    }
};

export const deleteAdmin = async ({ id }) => {
    if (!id) {
        throw new Error("El id es requerido");
    }

    await deleteDoc(doc(db, `admins/${id}`));
}