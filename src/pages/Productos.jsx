import ProductCard from "../components/ProductCard";
import { CiCirclePlus } from "react-icons/ci";
import { useApp } from "../Actions/ContextProvider";

const Productos = () => {
  const {allProducts, isLoading, setEditModalOpen, setSelectedEditProduct} = useApp()
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const handleAddNewProduct = () => {
    setSelectedEditProduct({})
    setEditModalOpen(true)
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Productos</h1>
        <ul className="grid grid-cols-3 auto-rows-auto gap-2 ">
          <li className="border rounded-lg shadow p-4 bg-white w-full max-w-md mx-auto flex justify-center items-center cursor-pointer min-h-[300px] hover:scale-105 transition-all" onClick={handleAddNewProduct}> <CiCirclePlus size={64} /></li>
          {allProducts.map((product) => (
            <ProductCard key={product.id} product={product}/>
          ))}
        </ul>
     
    </div>
  );
};

export default Productos;
