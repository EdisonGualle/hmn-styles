import { db, storage } from "@/lib/firebase";
import { collection, deleteDoc, doc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const createNewCategory = async ({ data, image }) => {
    if (!image) {
        throw new Error("La imagen es requerida");
    }
    if (!data?.name) {
        throw new Error("El nombre es requerido");
    }
    if (!data?.slug) {
        throw new Error("El slug es requerido");
    }

    const newId = doc(collection(db, `ids`)).id;
    const imageRef = ref(storage, `categories/${newId}`);
    await uploadBytes(imageRef, image);

    const imageUrl = await getDownloadURL(imageRef);

    await setDoc(doc(db, `categories/${newId}`), {
        ...data,
        id: newId,
        imageUrl: imageUrl,
        timestampCreate: Timestamp.now(),
    });
};

export const updateCategory = async ({ data, image }) => {
    if (!data?.name) {
        throw new Error("El nombre es requerido");
    }

    if (!data?.slug) {
        throw new Error("El slug es requerido");
    }

    if (!data?.id) {
        throw new Error("El id es requerido");
    }

    const id = data?.id;
    let imageUrl = data?.imageUrl;

    if (image && typeof image !== "string") {
        const imageRef = ref(storage, `categories/${id}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
    }

    await updateDoc(doc(db, `categories/${id}`), {
        ...data,
        imageUrl: imageUrl,
        timestampCreate: Timestamp.now(),
    });
};

export const deleteCategory = async ({ id }) => {
    if (!id) {
        throw new Error("El id es requerido");
    }

    await deleteDoc(doc(db, `categories/${id}`));
}