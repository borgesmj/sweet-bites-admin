import { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

const PriceCard = ({ price, index, handleDeletePrice, productPrices }) => {
  const [size, setSize] = useState(price.size);
  const [productPrice, setProductPrice] = useState(price.price);
  return (
    <div
      key={index}
      className="whitespace-nowrap flex flex-col w-[200px] bg-red-100 p-4 relative group"
    >
      <input
        type="text"
        value={size}
        required
        onChange={(e) => {
          setSize(Number(e.target.value));
          productPrices[index].size = Number(e.target.value);
        }}
        className="w-[150px] bg-transparent"
      />
      <input
        type="number"
        value={productPrice}
        required
        onChange={(e) => {
          setProductPrice(Number(e.target.value));
          productPrices[index].price = Number(e.target.value);
        }}
        className="w-[150px] bg-transparent"
      />
      <button
        type="button"
        className="absolute right-2 top-2 hidden group-hover:block"
        onClick={() => {
          handleDeletePrice(index);
        }}
      >
        <FaRegTrashAlt />
      </button>
    </div>
  );
};

export default PriceCard;
