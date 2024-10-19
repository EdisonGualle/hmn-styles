import { useBrands } from "@/lib/firestore/brands/read";
import { useCategories } from "@/lib/firestore/categories/read";
import { Select, SelectItem } from "@nextui-org/react";

const ProductInfo = ({data, handleData}) => {
    const { data: brands } = useBrands();
    const { data: categories } = useCategories();
    return (
        <section className="bg-white rounded-xl p-4 border  flex  flex-col gap-3">
            <h1 className="font-semibold"> Información del Producto</h1>
            <div className="flex flex-col gap-1">
                <label htmlFor="product-brand" className="text-gray-800 text-sm">
                    Marca
                    <span className="text-red-500">*</span>
                    {" "}</label>
                <Select
                    placeholder="Seleccione una categoria"
                    id="product-brand"
                    name="product-brand"
                    value={data?.brands ?? ""}
                    onChange={(e) => {
                        handleData("brand", e.target.value);
                    }}
                >
                    {brands?.map((item) => (
                        <SelectItem key={item.id}>
                            {item.name}
                        </SelectItem>
                    ))}
                </Select>
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="product-category" className="text-gray-800 text-sm">
                    Categoria
                    <span className="text-red-500">*</span>
                    {" "}</label>
                <Select
                    placeholder="Seleccione una categoria"
                    id="product-category"
                    name="product-category"
                    value={data?.category ?? ""}
                    onChange={(e) => {
                        handleData("category", e.target.value);
                    }}
                >
                    {categories?.map((item) => (
                        <SelectItem key={item.id}>
                            {item.name}
                        </SelectItem>
                    ))}
                </Select>
            </div>
        </section>
    )
}

export default ProductInfo