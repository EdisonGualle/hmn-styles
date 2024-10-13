"use client";

import { useBrands } from "@/lib/firestore/brands/read";
import { deleteBrand } from "@/lib/firestore/brands/write";
import { Button } from "@nextui-org/react";
import { Edit2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const ListView = () => {
    const { data: brands, error, isLoading } = useBrands();

    if (isLoading) {
        return (
            <div className="text-lg font-medium text-gray-600 animate-pulse">
                Cargando ...
            </div>
        );
    }

    if (error) {
        toast.error(error?.message ?? "Error al cargar las marcas");
        return null;
    }

    return (
        <div className="flex-1  flex flex-col gap-3 p-5 rounded-xl bg-white">
            <h1 className="font-semibold"> Lista de marcas </h1>
            <table className="border-separate border-spacing-y-0">
                <thead>
                    <tr>
                        <th className="font-semibold border-t bg-gray-100 text-gray-500 px-3 py-3 border-l  rounded-tl-lg">ID</th>
                        <th className="font-semibold border-t bg-gray-100 text-gray-500 px-3 py-3">Imagen</th>
                        <th className="font-semibold border-t bg-gray-100 text-gray-500 px-3 py-3 text-left">Nombre</th>
                        <th className="font-semibold border-t bg-gray-100 text-gray-500 px-3 py-3 border-r flex text-center rounded-tr-lg">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {brands?.map((item, index) => {
                        return <Row index={index} item={item} key={item?.id} totalItems={brands.length} />
                    })}
                </tbody>
            </table>
        </div>
    );
};

function Row({ item, index, totalItems }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm("¿Estás seguro de eliminar esta marca?")) return;

        setIsDeleting(true);
        try {
            await deleteBrand({ id: item?.id });
            toast.success("Marca eliminada correctamente");
            router.push("/admin/brands");
        } catch (error) {
            toast.error(error?.message ?? "Ocurrió un error");
        }
        setIsDeleting(false);
    }

    const handleUpdate = () => {
        router.push(`/admin/brands?id=${item?.id}`);
    }

    return (
        <tr>
            <td className={`border-t bg-white px-3 py-2 border-l text-center ${index === totalItems - 1 ? 'rounded-bl-lg border-b' : ''} }`}>
                {index + 1}
            </td>
            <td className={`border-t bg-white px-3 py-2 ${index === totalItems - 1 ? 'border-b' : ''}`}>
                <div className="flex justify-center">
                    <img src={item?.imageUrl} alt="Categoria" className="w-10 h-10 object-cover rounded-lg" />
                </div>
            </td>
            <td className={`border-t bg-white px-3 py-2 ${index === totalItems - 1 ? 'border-b' : ''}`}>{item?.name}</td>
            <td className={` border-t bg-w  hite px-3 py-2  border-r  ${index === totalItems - 1 ? 'rounded-br-lg border-b' : ''}`}>
                <div className=" flex gap-2 items-center">
                    <Button
                        onClick={handleUpdate}
                        isIconOnly
                        size="sm"
                        aria-label="Editar"
                        title="Editar">
                        <Edit2 size={13} />
                    </Button>
                    <Button
                        onClick={handleDelete}
                        isLoading={isDeleting}
                        isDisabled={isDeleting}
                        isIconOnly
                        size="sm"
                        color="danger"
                        aria-label="Eliminar"
                        title="Eliminar"
                    >
                        <Trash2 size={13} />
                    </Button>
                </div>
            </td>
        </tr>
    );
}

export default ListView;

