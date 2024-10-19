"use client";

import { useState } from "react";
import BasicDetails from "./components/BasicDetails";
import Images from "./components/Images";
import ProductInfo from "./components/ProductInfo";
import InventoryPricing from "./components/InventoryPricing";
import { Button } from "@nextui-org/react";
import toast from "react-hot-toast";
import { createProduct } from "@/lib/firestore/products/write";

const page = () => {
    const [data, setData] = useState(null);
    const [featureImage, setFeatureImage] = useState(null);
    const [imageList, setImageList] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const handleData = (key, value) => {
        setData((prevData) => {
            return {
                ...prevData,
                [key]: value,
            };
        });
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            await createProduct({ data: data, featureImage: featureImage, imageList: imageList });
            setData(null);
            setFeatureImage(null);
            setImageList([]);
            toast.success("Producto creado correctamente");
        } catch (error) {
            toast.error(error?.message);
        }
        setIsLoading(false);
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}
            className="flex flex-col gap-4 px-5 py-2"
        >
            <div className="flex items-center  w-full justify-between">
                <h1 className="font-semibold"> Crear nuevo producto</h1>
                <Button isLoading={isLoading} isDisabled={isLoading} type="submit">Crear</Button>
            </div>
            <div className="flex flex-col md:flex-row gap-5">
                <div className="flex-1 flex flex-col gap-4">
                    <BasicDetails data={data} handleData={handleData} />
                    <ProductInfo data={data} handleData={handleData} />
                </div>
                <div className="flex flex-col gap-4  ">
                    <Images
                        data={data}
                        featureImage={featureImage}
                        setFeatureImage={setFeatureImage}
                        imageList={imageList}
                        setImageList={setImageList}
                    />
                    <InventoryPricing data={data} handleData={handleData} />
                </div>
            </div>
        </form>
    );
};

export default page;
