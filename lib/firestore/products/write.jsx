import { db, storage } from "@/lib/firebase";
import { collection, deleteDoc, doc, setDoc, Timestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const createProduct = async ({ data, featureImage, imageList }) => {
    if (!data.title) {
        throw new Error('El producto debe tener un título');
    }
    if (!featureImage) {
        throw new Error('El producto debe tener una imagen principal');
    }

    const featureImageRef = ref(storage, `products/${featureImage?.name}`);
    await uploadBytes(
        featureImageRef,
        featureImage
    );
    const featureImageUrl = await getDownloadURL(featureImageRef);

    const imageUrlList = [ ];

    for (let i = 0 ; i<imageList.length; i++) {
        const image = imageList[i];
        const imageRef = ref(storage, `products/${image?.name}`);
        await uploadBytes(
            imageRef,
            image
        );
        const imageUrl = await getDownloadURL(imageRef);
        imageUrlList.push(imageUrl);
    }

    const newId = doc(collection(db, 'ids')).id;

    const productRef = doc(db, 'products', newId);

    await setDoc(productRef, {
        ...data,
        id: newId,
        featureImageUrl: featureImageUrl,
        imageList: imageUrlList,
        timestampCreate: Timestamp.now(),
    });
};

export const deleteProducts = async ({ id }) => {
    if (!id) {
        throw new Error("El id es requerido");
    }

    await deleteDoc(doc(db, `products/${id}`));
}