import { useApp } from "../Actions/ContextProvider";
import { FaRegCopy } from "react-icons/fa6";
const ProductCard = ({ product }) => {
  const { setSelectedEditProduct, setEditModalOpen, updateDeleteProduct } =
    useApp();
  const handleEditProducts = () => {
    setSelectedEditProduct(product);
    setEditModalOpen(true);
  };

  const handleDeleteProduct = () => {
    const confirm = window.confirm("¿Desea eliminar este producto?");
    if (!confirm) {
      return;
    }
    updateDeleteProduct(product.id);
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(product.id);
    window.alert("Id del producto copiado. Puedes usarlo en los cupones");
  };
  return (
    <li className="border rounded-lg shadow p-4 bg-white w-full max-w-md mx-auto hover:scale-105 transition-all">
      {/* Título del producto */}
      <p className="font-bold text-center text-2xl text-gray-800 w-full">
        {product.title}
      </p>

      {/* Descripción */}
      <p className="text-gray-600 text-sm">{product.description}</p>

      {/* Imágenes */}
      <div className="w-full flex justify-around items-center">
        <a
          href={product.images.webp}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          <img
            src={product.images.webp}
            alt={product.images.alt}
            className="w-20 h-20 object-contain rounded-lg"
          />
        </a>
        <a
          href={product.images.png}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity"
        >
          <img
            src={product.images.png}
            alt={product.images.alt}
            className="w-20 h-20 object-contain rounded-lg"
          />
        </a>
      </div>

      {/* Precios */}
      <div className="w-full">
        <p className="font-bold text-lg text-gray-800 mb-2">Precios</p>
        <ul className="space-y-2 text-gray-600 text-sm">
          {product.productPrices.map((price, index) => (
            <li key={`precio-${index}`}>
              <strong>Tamaño:</strong> {price.size}, <strong>Precio:</strong>{" "}
              {price.price}
            </li>
          ))}
        </ul>
      </div>

      {/* Producto especial */}
      <p className="text-gray-600 text-sm">
        <strong>¿Es un producto especial?</strong>{" "}
        <span className="font-medium">
          {product.special_product ? "Sí" : "No"}
        </span>
      </p>
      {/** ID del producto para incluir al cupon */}
      <p className="text-gray-600 text-sm w-full flex items-center justify-start gap-4">
        <strong>Copiar ID producto:</strong>

        <span className="cursor-pointer" onClick={handleCopyId}>
          <FaRegCopy />
        </span>
      </p>
      {/* Botones */}
      <div className="w-full flex justify-around mt-4">
        <button
          className="p-3 w-24 text-white font-bold rounded-lg bg-green-500 hover:bg-green-600 transition-colors"
          onClick={() => handleEditProducts(product.id)}
        >
          Editar
        </button>
        <button
          className="p-3 w-24 text-white font-bold rounded-lg bg-red-500 hover:bg-red-600 transition-colors"
          onClick={() => {
            handleDeleteProduct();
          }}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default ProductCard;
