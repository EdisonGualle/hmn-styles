import { Input } from "@nextui-org/react";
import { Plus } from "lucide-react";

const Images = ({ featureImage, setFeatureImage, imageList, setImageList }) => {
  const MAX_IMAGES = 3;

  const filledImageList = [...imageList];
  while (filledImageList.length < MAX_IMAGES) {
    filledImageList.push(null);
  }

  const handleImageUpload = (e, index) => {
    if (e.target.files.length > 0) {
      const newImage = e.target.files[0];
      const updatedList = [...imageList];
      updatedList[index] = newImage;
      setImageList(updatedList);
    }
  };

  return (
    <section className="flex flex-col gap-3 bg-white border p-4 rounded-xl">
      <h1 className="font-semibold  ">Imágenes</h1>
      <div className="grid grid-cols-2 gap-3 md:flex p-2 md:gap-3 border rounded-xl ">
        {/* Imagen principal */}
        <div className="flex flex-col gap-1 items-center">
          <div className="flex items-center">
            <div
              className="w-36 h-36 md:w-28 md:h-28 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center overflow-hidden cursor-pointer"
              onClick={() => document.getElementById("product-feature-image").click()}
            >
              {featureImage ? (
                <img
                  src={URL.createObjectURL(featureImage)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="bg-indigo-400 rounded-full">
                  <Plus className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
            <Input
              onChange={(e) => {
                if (e.target.files.length > 0) {
                  setFeatureImage(e.target.files[0]);
                }
              }}
              id="product-feature-image"
              name="product-feature-image"
              accept="image/*"
              type="file"
              className="hidden"
            />
          </div>
        </div>

        {/* Primera imagen adicional */}
        <div className="flex flex-col gap-1 items-center">
          <div
            className=" w-36 h-36 md:w-28 md:h-28 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center overflow-hidden cursor-pointer"
            onClick={() => document.getElementById(`image-upload-0`).click()}
          >
            {filledImageList[0] ? (
              <img
                src={URL.createObjectURL(filledImageList[0])}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="bg-indigo-400 rounded-full">
                <Plus className="w-4 h-4 text-white" />
              </div>
            )}
            <Input
              onChange={(e) => handleImageUpload(e, 0)}
              id={`image-upload-0`}
              name={`image-upload-0`}
              accept="image/*"
              type="file"
              className="hidden"
            />
          </div>
        </div>

        {/* Segunda imagen adicional */}
        <div className="flex flex-col gap-1 items-center">
          <div
            className="w-36 h-36 md:w-28 md:h-28 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center overflow-hidden cursor-pointer"
            onClick={() => document.getElementById(`image-upload-1`).click()}
          >
            {filledImageList[1] ? (
              <img
                src={URL.createObjectURL(filledImageList[1])}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="bg-indigo-400 rounded-full">
                <Plus className="w-4 h-4 text-white" />
              </div>
            )}
            <Input
              onChange={(e) => handleImageUpload(e, 1)}
              id={`image-upload-1`}
              name={`image-upload-1`}
              accept="image/*"
              type="file"
              className="hidden"
            />
          </div>
        </div>

        {/* Tercera imagen adicional */}
        <div className="flex flex-col gap-1 items-center">
          <div
            className="w-36 h-36 md:w-28 md:h-28 border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center overflow-hidden cursor-pointer"
            onClick={() => document.getElementById(`image-upload-2`).click()}
          >
            {filledImageList[2] ? (
              <img
                src={URL.createObjectURL(filledImageList[2])}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="bg-indigo-400 rounded-full">
                <Plus className="w-4 h-4 text-white" />
              </div>
            )}
            <Input
              onChange={(e) => handleImageUpload(e, 2)}
              id={`image-upload-2`}
              name={`image-upload-2`}
              accept="image/*"
              type="file"
              className="hidden"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Images;
