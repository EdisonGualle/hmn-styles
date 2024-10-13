"use client";

import { getCategory } from "@/lib/firestore/categories/read_server";
import { createNewCategory, updateCategory } from "@/lib/firestore/categories/write";
import { Button, Input } from "@nextui-org/react";
import { AlertCircle, Upload } from "lucide-react";
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

    // Función para manejar los datos del formulario
    const handleData = (key, value) => {
        setData((prevData) => {
            return {
                ...(prevData ?? {}),
                [key]: value,
            };
        });
    };

    // Función para crear una nueva categoría
    const handleCreate = async () => {
        setIsLoading(true);
        try {
            await createNewCategory({ data: data, image: image });
            toast.success("Categoría creada correctamente");
            setData(null);
            setImage(null);
        } catch (error) {
            toast.error(error?.message ?? "Ocurrió un error");
        }
        setIsLoading(false);
    };

    // Función para actualizar una categoría
    const handleUpdate = async () => {
        setIsLoading(true);
        try {
            await updateCategory({ data: data, image: image ?? data.imageUrl });
            toast.success("Categoría actualizada correctamente");
            setData(null);
            setImage(null);
            router.push(`/admin/categories`);
        } catch (error) {
            toast.error(error?.message ?? "Ocurrió un error");
        }
        setIsLoading(false);
    };
    

    // Función para obtener la categoría
    const fetchCategory = async () => {
        try {
            const res = await getCategory({ id: id })
            setData(res);
            setImage(res.imageUrl);
        } catch (error) {
            toast.error(error?.message ?? "Ocurrió un error");
        }
    };

    // Obtener la categoría si el id existe
    useEffect(() => {
        if (id) {
            fetchCategory();
        }else{
            setData(null);
            setImage(null);
        }
    }, [id]);


    return (
        <div className="flex flex-col gap-3 bg-white rounded-xl p-5 w-full md:w-[480px]">
            <h1 className="font-semibold">{id ? "Editar categoría" : "Crear categoría"}</h1>
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
                    <label htmlFor="category-image" className="text-gray-500 text-sm">
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
                                id="category-image"
                                name="category-image"
                                accept="image/*"
                                type="file"
                                content="Subir imagen"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="category-name" className="text-gray-500 text-sm">
                        Nombre <span className="text-red-500"> *</span>
                    </label>
                    <Input
                        id="category-name"
                        name="category-name"
                        type="text"
                        placeholder="Ingrese el nombre"
                        autoFocus={false}
                        value={data?.name ?? ""}
                        onChange={(e) => handleData("name", e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="category-slug" className="text-gray-500 text-sm">
                        Slug <span className="text-red-500"> *</span>
                    </label>
                    <Input
                        id="category-slug"
                        name="category-slug"
                        type="text"
                        
                        placeholder="Ingrese el slug"
                        value={data?.slug ?? ""}
                        onChange={(e) => handleData("slug", e.target.value)}
                    />
                </div>
                <div className="p-4 border rounded-xl">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        <label className="font-semibold">Tip</label>
                    </div>
                    <div className="flex gap-4 ">
                        <p className=" ps-6 text-sm text-gray-500">
                            El slug es la parte de la URL que identifica la página de forma única.
                            Debe ser única y no debe contener espacios ni caracteres especiales.
                        </p>
                    </div>
                </div>
                <Button isLoading={isLoading} isDisabled={isLoading} type="submit">
                    {id ? "Editar" : "Crear"}
                </Button>
            </form>
        </div>
    );
};

export default Form;
