import { Input } from "@nextui-org/react";

const InventoryPricing = ({ data, handleData }) => {
    return (
        <section className="bg-white flex flex-col gap-3 p-4 border rounded-xl ">
            <h1 className="font-semibold ">Inventario y Precios </h1>

            <div className="flex flex-col gap-1">
                <label htmlFor="product-stock" className="text-gray-800 text-sm">
                    Stock
                    <span className="text-red-500">*</span>
                    {" "}</label>
                <Input
                    type="number"
                    placeholder="Ingrese la cantidad de stock"
                    id="product-stock"
                    name="product-stock"
                    value={data?.stock ?? ""}
                    onChange={(e) => {
                        handleData("stock", e.target.valueAsNumber);
                    }}
                    required
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="product-price" className="text-gray-800 text-sm">
                    Precio
                    <span className="text-red-500">*</span>
                    {" "}</label>
                <Input
                    type="number"
                    placeholder="Ingrese el precio del producto"
                    id="product-price"
                    name="product-price"
                    value={data?.price ?? ""}
                    onChange={(e) => {
                        handleData("price", e.target.valueAsNumber);
                    }}
                    required
                    startContent={
                        <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">$</span>
                        </div>
                    }
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="product-sale-price" className="text-gray-800 text-sm">
                    Precio de venta
                    <span className="text-red-500">*</span>
                    {" "}</label>
                <Input
                    type="number"
                    placeholder="Ingrese el precio de venta del producto"

                    id="product-sale-price"
                    name="product-sale-price"
                    value={data?.salePrice ?? ""}
                    onChange={(e) => {
                        handleData("salePrice", e.target.valueAsNumber);
                    }}
                    required
                    startContent={
                        <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">$</span>
                        </div>
                    }
                />
            </div>

        </section>
    )
}

export default InventoryPricing