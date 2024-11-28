import React from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useApp } from "../Actions/ContextProvider";

const Cupones = () => {
  const {setCouponModalOpen} = useApp();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Cupones</h1>
      <ul className="grid grid-cols-3 auto-rows-auto gap-2">
        <li className="border rounded-lg shadow p-4 bg-white w-full max-w-md mx-auto flex justify-center items-center cursor-pointer min-h-[300px] hover:scale-105 transition-all" onClick={()=> 
        {setCouponModalOpen(true)}
        }>
          {" "}
          <CiCirclePlus size={64} />
        </li>
      </ul>
    </div>
  );
};

export default Cupones;
