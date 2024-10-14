"use client";

import { getAdmin } from "@/lib/firestore/admins/read_server";
import { createNewAdmin, updateAdmin } from "@/lib/firestore/admins/write";
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

    // Función para obtener el administador
    const fetchAdmin = async () => {
        try {
            const res = await getAdmin({ id: id })
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

    // Función para crear un nuevo administador
    const handleCreate = async () => {
        setIsLoading(true);
        try {
            await createNewAdmin({ data: data, image: image });
            toast.success("Administrador creado correctamente");
            setData(null);
            setImage(null);
        } catch (error) {
            toast.error(error?.message ?? "Ocurrió un error");
        }
        setIsLoading(false);
    };

    // Función para actualizar un administador
    const handleUpdate = async () => {
        setIsLoading(true);
        try {
            await updateAdmin({ data: data, image: image ?? data.imageUrl });
            toast.success("Administrador actualizado correctamente");
            setData(null);
            setImage(null);
            router.push(`/admin/admins`);
        } catch (error) {
            toast.error(error?.message ?? "Ocurrió un error");
        }
        setIsLoading(false);
    };

    // Obtener los datos del administador
    useEffect(() => {
        if (id) {
            fetchAdmin();
        } else {
            setData(null);
            setImage(null);
        }
    }, [id]);


    return (
        <div className="flex flex-col gap-3 bg-white rounded-xl p-5 w-full md:w-[480px]">
            <h1 className="font-semibold">{id ? "Editar administador" : "Crear administador"}</h1>
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
                    <label htmlFor="admin-image" className="text-gray-500 text-sm">
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
                                id="admin-image"
                                name="admin-image"
                                accept="image/*"
                                type="file"
                                content="Subir imagen"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="admin-name" className="text-gray-500 text-sm">
                        Nombre <span className="text-red-500"> *</span>
                    </label>
                    <Input
                        id="admin-name"
                        name="admin-name"
                        type="text"
                        placeholder="Ingrese el nombre"
                        value={data?.name ?? ""}
                        onChange={(e) => handleData("name", e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="admin-name" className="text-gray-500 text-sm">
                        Email <span className="text-red-500"> *</span>
                    </label>
                    <Input
                        id="admin-email"
                        name="admin-email"
                        type="email"
                        placeholder="Ingrese el email"
                        value={data?.email ?? ""}
                        isRequired
                        onChange={(e) => handleData("email", e.target.value)}
                    
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
