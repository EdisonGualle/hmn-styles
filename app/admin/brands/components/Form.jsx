"use client";

import { getBrand } from "@/lib/firestore/brands/read_server";
import { createNewBrand, updateBrand } from "@/lib/firestore/brands/write";
import { Button, Input } from "@nextui-org/react";
import { Upload } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Form = () => {
    const [data, setData] = useState(null);
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    // Función para obtener las marcas
    const fetchBrands = async () => {
        try {
            const res = await getBrand({ id: id })
            setData(res);
            setImage(res.imageUrl);
        } catch (error) {
            toast.error(error?.message ?? "Ocurrió un error");
        }
    };

    // Función para manejar los datos del formulario
    const handleData = (key, value) => {
        setData((prevData) => {
            return {
                ...(prevData ?? {}),
                [key]: value,
            };
        });
    };

    // Función para crear una nueva marca
    const handleCreate = async () => {
        setIsLoading(true);
        try {
            await createNewBrand({ data: data, image: image });
            toast.success("Marca creada correctamente");
            setData(null);
            setImage(null);
        } catch (error) {
            toast.error(error?.message ?? "Ocurrió un error");
        }
        setIsLoading(false);
    };

    // Función para actualizar una marca
    const handleUpdate = async () => {
        setIsLoading(true);
        try {
            await updateBrand({ data: data, image: image ?? data.imageUrl });
            toast.success("Marca actualizada correctamente");
            setData(null);
            setImage(null);
            router.push(`/admin/brands`);
        } catch (error) {
            toast.error(error?.message ?? "Ocurrió un error");
        }
        setIsLoading(false);
    };




    // Obtener la categoría si el id existe
    useEffect(() => {
        if (id) {
            fetchBrands();
        } else {
            setData(null);
            setImage(null);
        }
    }, [id]);


    return (
        <div className="flex flex-col gap-3 bg-white rounded-xl p-5 w-full md:w-[480px]">
            <h1 className="font-semibold">{id ? "Editar marca" : "Crear marca"}</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (id) {
                        handleUpdate();
                    } else {
                        handleCreate();
                    }
                }}
                className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label htmlFor="brand-image" className="text-gray-500 text-sm">
                        Imagen <span className="text-red-500"> *</span>
                    </label>
                    <div className="flex  items-center">
                        <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                            {image ? (
                                typeof image === "string" ? (
                                    <img src={image} alt="Imagen actual" className="w-full h-full object-cover" />
                                ) : (
                                    <img src={URL.createObjectURL(image)} alt="Preview" className="w-full h-full object-cover" />
                                )
                            ) : (
                                <Upload className="w-8 h-8 text-gray-400" />
                            )}
                        </div>
                        <div className="flex-1 ms-2">
                            <Input
                                onChange={(e) => {
                                    if (e.target.files.length > 0) {
                                        setImage(e.target.files[0]);
                                    }
                                }}
                                id="brand-image"
                                name="brand-image"
                                accept="image/*"
                                type="file"
                                content="Subir imagen"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="brand-name" className="text-gray-500 text-sm">
                        Nombre <span className="text-red-500"> *</span>
                    </label>
                    <Input
                        id="brand-name"
                        name="brand-name"
                        type="text"
                        placeholder="Ingrese el nombre"
                        autoFocus={false}
                        value={data?.name ?? ""}
                        onChange={(e) => handleData("name", e.target.value)}
                    />
                </div>
                <Button isLoading={isLoading} isDisabled={isLoading} type="submit">
                    {id ? "Editar" : "Crear"}
                </Button>
            </form>
        </div>
    );
};

export default Form;
