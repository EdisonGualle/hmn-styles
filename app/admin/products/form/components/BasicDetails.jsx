"use client";

import { Input, Textarea } from "@nextui-org/react";

const BasicDetails = ({ data, handleData }) => {

    return (
        <section className=" flex-1 flex flex-col gap-3 bg-white rounded-xl p-4 border">
            <h1 className="font-semibold">Detalles básicos</h1>

            <div className="flex flex-col gap-1">
                <label htmlFor="product-title" className="text-gray-800 text-sm">
                    Nombre del producto{" "}
                    <span className="text-red-500 text-sm">*</span>
                    {" "}</label>
                <Input
                    type="text"
                    placeholder="Ingrese el nombre del producto"
                    id="product-title"
                    name="product-title"
                    value={data?.title ?? ""}
                    onChange={(e) => {
                        handleData("title", e.target.value);
                    }}
                    required
                    classNames={{
                        input: "placeholder: 12px" 
                        
                      }}
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="product-short-description" className="text-gray-800 text-sm">
                    Descripción breve{" "}
                    <span className="text-red-500 text-sm">*</span>
                    {" "}</label>
                <Input
                    type="text"
                    placeholder="Ingrese una descripción breve"
                    id="product-short-description"
                    name="product-short-description"
                    value={data?.shortDescription ?? ""}
                    onChange={(e) => {
                        handleData("shortDescription", e.target.value);
                    }}
                    required
                />
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="product-long-description" className="text-gray-800 text-sm">
                    Descripción detallada{" "}
                    <span className="text-red-500 text-sm">*</span>
                    {" "}</label>
                <Textarea
                    placeholder="Ingrese una descripción detallada"
                    id="product-long-description"
                    name="product-long-description"
                    value={data?.longDescription ?? ""}
                    onChange={(e) => {
                        handleData("longDescription", e.target.value);
                    }}
                    required
                    classNames={{
                        input: "min-h-[100px] max-h-[100px] resize-none",
                    }}
                />

            </div>
        </section>
    )
}

export default BasicDetails