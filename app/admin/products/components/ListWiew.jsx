"use client";

import { useProducts } from "@/lib/firestore/products/read";
import { deleteProducts } from "@/lib/firestore/products/write";
import { Badge, Button } from "@nextui-org/react";
import { Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const ListView = () => {
    const { data: products, error, isLoading } = useProducts();

    if (isLoading) {
        return (
            <div className="text-lg font-medium text-gray-600 animate-pulse">
                Cargando ...
            </div>
        );
    }

    if (error) {
        toast.error(error?.message ?? "Error al cargar los productos");
        return null;
    }

    return (
        <div className="flex-1  flex flex-col gap-3 p-5 rounded-xl bg-white">
            <div className="flex justify-between items-center">
                <h1 className="font-semibold"> Lista de productos </h1>
                <Link href={`/admin/products/form`}>
                    <button className="bg-gray-200 py-2 px-4  border rounded-xl hover:bg-slate-100">Nuevo producto</button>
                </Link>
            </div>
            <table className="border-separate border-spacing-y-0">
                <thead>
                    <tr>
                        <th className="font-semibold border-t bg-gray-100 text-gray-500 px-3 py-3 border-l  rounded-tl-lg">ID</th>
                        <th className="font-semibold border-t bg-gray-100 text-gray-500 px-3 py-3">Imagen</th>
                        <th className="font-semibold border-t bg-gray-100 text-gray-500 px-3 py-3 text-left">Nombre</th>
                        <th className="font-semibold border-t bg-gray-100 text-gray-500 px-3 py-3 text-left">Precio</th>
                        <th className="font-semibold border-t bg-gray-100 text-gray-500 px-3 py-3 text-left">Stock</th>
                        <th className="font-semibold border-t bg-gray-100 text-gray-500 px-3 py-3 text-left">Ordenes</th>
                        <th className="font-semibold border-t bg-gray-100 text-gray-500 px-3 py-3 text-left">Estado</th>
                        <th className="font-semibold border-t bg-gray-100 text-gray-500 px-3 py-3 border-r flex text-center rounded-tr-lg">
                            Acciones
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products?.map((item, index) => {
                        return <Row index={index} item={item} key={item?.id} totalItems={products.length} />
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
        if (!confirm("¿Estás seguro de eliminar este producto?")) return;

        setIsDeleting(true);
        try {
            await deleteProducts({ id: item?.id });
            toast.success("Producto eliminado correctamente");
            router.push("/admin/products");
        } catch (error) {
            toast.error(error?.message ?? "Ocurrió un error");
        }
        setIsDeleting(false);
    }

    const handleUpdate = () => {
        router.push(`/admin/products?id=${item?.id}`);
    }

    return (
        <tr>
            <td className={`border-t text-sm bg-white px-3 py-2 border-l text-center ${index === totalItems - 1 ? 'rounded-bl-lg border-b' : ''} }`}>
                {index + 1}
            </td>
            <td className={`border-t bg-white px-3 py-2 ${index === totalItems - 1 ? 'border-b' : ''}`}>
                <div className="flex justify-center">
                    <img src={item?.featureImageUrl} alt="Categoria" className="w-10 h-10 object-cover rounded-lg" />
                </div>
            </td>
            <td className={`border-t text-sm bg-white px-3 py-2 ${index === totalItems - 1 ? 'border-b' : ''}`}>{item?.title}</td>
            <td className={`border-t text-sm bg-white px-3 py-2 ${index === totalItems - 1 ? 'border-b' : ''}`}>
                {item?.salePrice < item?.price && (
                    <span className="text-xs text-gray-500 line-through">
                        $ {item?.price}
                    </span>
                )}
                {" "}
                ${item?.salePrice}
            </td>
            <td className={`border-t text-sm bg-white px-3 py-2 ${index === totalItems - 1 ? 'border-b' : ''}`}>{item?.stock}</td>
            <td className={`border-t text-sm bg-white px-3 py-2 ${index === totalItems - 1 ? 'border-b' : ''}`}>{(item?.orders ?? 0)}</td>
            <td className={`border-t text-sm bg-white px-3 py-2 ${index === totalItems - 1 ? 'border-b' : ''}`}>
                <div className="flex">
                    {item?.stock - (item?.orders ?? 0) > 0 ?
                        <div className="text-xs font-semibold text-emerald-600 bg-emerald-100 py-1 px-2 rounded-2xl">Disponible</div>
                        :
                        <div className="text-xs font-semibold text-red-600 bg-red-100 py-1 px-2 rounded-2xl">Agotado</div>
                    }
                </div>
            </td>
            <td className={` border-t bg-w  hite px-3 py-2  border-r  items-center justify-center ${index === totalItems - 1 ? 'rounded-br-lg border-b' : ''}`}>
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

