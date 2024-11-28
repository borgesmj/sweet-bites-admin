import React, { useEffect, useState } from "react";
import { ImNewTab } from "react-icons/im";
import { useApp } from "../Actions/ContextProvider";
import { IoAddCircleOutline } from "react-icons/io5";
import PriceCard from "./PriceCard";

const EditModal = ({ product }) => {
  const { setEditModalOpen, updateProductList, createNewProduct } = useApp();
  const editProduct = product.id ? true : false;
  //! Caracteristics del producto
  //* Nombre
  const [productName, setProductName] = useState(
    editProduct ? product.title || "" : ""
  );
  //* descripcion
  const [produuctDescription, setProductDescription] = useState(
    editProduct ? product.description || "" : ""
  );
  //* Categoria
  const [productCategory, setProductCategory] = useState(
    editProduct ? product.category || "" : ""
  );
  // * Imagenes
  const [producImageWebp, setproductImageWebp] = useState(
    editProduct ? product.images.webp || "" : ""
  );
  const [producImagePng, setproductImagePng] = useState(
    editProduct ? product.images.png || "" : ""
  );
  const [productAltText, setProductAltTaxt] = useState(
    editProduct ? product.images.alt || "" : ""
  );
  // * Producto especial
  const [specialProduct, setEspecialProduct] = useState(
    editProduct ? product.special_product || false : false
  );
  // *Precios
  const [productPrices, setProductPrices] = useState(
    editProduct ? product.productPrices || [] : []
  );

  /**
   * * Funcion para añadir un precio nuevo a la lista de precios
   * @returns
   */
  const addNewPrice = () => {
    const size = window.prompt("¿de que tamaño es el producto?");
    if (!size) {
      return;
    }
    const price = window.prompt("¿Cuanto cuesta?");
    if (!price) {
      return;
    }
    const newPrice = {
      size: size,
      price: Number(price),
    };
    setProductPrices([...productPrices, newPrice]);
  };
  /**
   * * Funcion para eliminar un precio de la lista de precios
   * @param {number} index
   * @returns
   */
  const handleDeletePrice = (index) => {
    const newPrices = [...productPrices];
    newPrices.splice(index, 1);
    setProductPrices(newPrices);
  };
  /**
   * * Funcion para actualizar un producto
   * @returns
   */
  const handleClick = () => {
    if ([productName, produuctDescription, productCategory, productAltText, producImagePng, producImageWebp].includes("")){
      window.alert("Por favor, completa todos los campos");
      return;
    }
    if (productPrices.length === 0) {
      window.alert("Por favor, añade al menos un precio");
      return;
    }
    const confirmMessage = editProduct
      ? "¿Estas seguro de que quieres actualizar este producto?"
      : "¿Estas seguro de que quieres crear este producto?";
    const confirm = window.confirm(confirmMessage);
    if (!confirm) {
      return;
    }
    if (editProduct) {
      const updatedProduct = {
        title: productName,
        description: produuctDescription,
        images: {
          webp: producImageWebp,
          png: producImagePng,
          alt: productAltText,
        },
        category: productCategory,
        special_product: specialProduct,
        productPrices: productPrices,
      };
      updateProductList(product.id, updatedProduct);
    } else {
      const newProduct = {
        title: productName,
        description: produuctDescription,
        images: {
          webp: producImageWebp,
          png: producImagePng,
          alt: productAltText,
        },
        category: productCategory,
        special_product: specialProduct,
        productPrices: productPrices,
      };
      createNewProduct(newProduct);
    }
    setEditModalOpen(false);
  };
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-dvw h-dvh bg-[#00000030] flex justify-center items-center">
      <form action="" className="bg-white p-4 w-1/2 flex flex-col gap-2">
        <h3 className="font-bold text-center text-2xl text-gray-800 w-full">
          Datos principales
        </h3>
        <p className="form-field w-full flex items-center gap-2">
          <label className="w-1/4" htmlFor="nombre">
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            className="w-3/4 px-2"
            value={productName}
            required
            onChange={(e) => {
              setProductName(e.target.value);
            }}
          />
        </p>
        <p className="form-field w-full flex items-center gap-2">
          <label className="w-1/4" htmlFor="descripcion">
            Descripción:
          </label>
          <textarea
            name=""
            id="descripcion"
            cols="30"
            rows="4"
            required
            className="w-3/4 px-2 resize-none"
            value={produuctDescription}
            onChange={(e) => {
              setProductDescription(e.target.value);
            }}
          ></textarea>
        </p>
        <p className="form-field w-full flex items-center gap-2">
          <label className="w-1/4" htmlFor="categoria">
            Categoría:
          </label>
          <input
            type="text"
            id="categoria"
            required
            className="w-3/4 px-2"
            value={productCategory}
            onChange={(e) => {
              setProductCategory(e.target.value);
            }}
          />
        </p>
        <h3 className="font-bold text-center text-2xl text-gray-800 w-full">
          Imagenes
        </h3>
        <p className="form-field w-full flex items-center gap-2">
          <label className="w-1/4" htmlFor="imagewebp">
            Imagen .webp:
          </label>
          <input
            type="text"
            id="imagewebp"
            className="w-3/4 px-2"
            value={producImageWebp}
            required
            onChange={(e) => {
              setproductImageWebp(e.target.value);
            }}
          />
          <a href={producImageWebp} target="_blank">
            <ImNewTab />
          </a>
        </p>
        <p className="form-field w-full flex items-center gap-2">
          <label className="w-1/4" htmlFor="imagepng">
            Imagen .png:
          </label>
          <input
            type="text"
            id="imagepng"
            className="w-3/4 px-2"
            value={producImagePng}
            required
            onChange={(e) => {
              setproductImagePng(e.target.value);
            }}
          />
          <a href={producImagePng} target="_blank">
            <ImNewTab />
          </a>
        </p>
        <p className="form-field w-full flex items-center gap-2">
          <label className="w-1/4" htmlFor="productimgalt">
            Texto imagen
          </label>
          <input
            type="text"
            id="productimgalt"
            required
            className="w-3/4 px-2"
            value={productAltText}
            onChange={(e) => {
              setProductAltTaxt(e.target.value);
            }}
          />
        </p>
        <p className="form-field w-full flex items-center gap-2">
          <label className="w-1/4" htmlFor="special-product">
            ¿Es un producto especial?
          </label>
          <input
            type="checkbox"
            name=""
            id="special-product"
            checked={specialProduct}
            onChange={(e) => {
              setEspecialProduct(e.target.checked);
            }}
          />
        </p>
        <h3 className="font-bold text-center text-2xl text-gray-800 w-full">
          Precios
        </h3>
        <div className="max-w-full overflow-x-auto scroll-snap-x flex flex-row gap-4 px-4 items-center">
          {productPrices.map((price, index) => (
            <PriceCard
              key={index}
              price={price}
              index={index}
              handleDeletePrice={handleDeletePrice}
              productPrices={productPrices}
            />
          ))}
          <div
            className="flex w-[200px] h-12 bg-red-100 justify-center items-center cursor-pointer"
            onClick={() => {
              addNewPrice();
            }}
          >
            <IoAddCircleOutline />
          </div>
        </div>

        <div className="flex justify-center items-center gap-8">
          <button
            type="button"
            className="p-3 w-24 text-white font-bold rounded-lg bg-green-500 hover:bg-green-600 transition-colors"
            onClick={() => {
              handleClick();
            }}
          >
            Guardar
          </button>
          <button
            className="p-3 w-24 text-white font-bold rounded-lg bg-red-500 hover:bg-red-600 transition-colors"
            type="button"
            onClick={() => {
              setEditModalOpen(false);
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditModal;
