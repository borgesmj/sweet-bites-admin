import {
  FaTag,
  FaCalendarAlt,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";
import { useApp } from "../Actions/ContextProvider";

const CouponCard = ({ coupon }) => {
  const {
    code,
    start_date,
    end_date,
    discount_value,
    conditions,
    is_valid,
    type,
    id,
  } = coupon;
  const { changeCouponStatus, deleteThisCoupon } = useApp();

  const handleDeleteCoupon = id => {
    const confirm = window.confirm("¿Estás seguro que quieres eliminar este cupon? Esta accion es ireversible")
    if (!confirm){
        return
    }
    deleteThisCoupon(id)
  }
  const setValidCoupon = (is_valid) => {
    if (is_valid) {
      return (
        <span className="text-green-600 font-bold bg-green-300 p-2 rounded-full flex gap-2 items-center ml-4">
          <FaCheckCircle />
          Válido
        </span>
      );
    } else {
      return (
        <span className="text-red-600 font-bold bg-red-300 p-2 rounded-full flex gap-2 items-center ml-4">
          <FaExclamationCircle />
          No válido
        </span>
      );
    }
  };

  const setTypeOfCoupon = (type) => {
    switch (type) {
      case "discount":
        return "Descuento";
        break;
      case "free-product":
        return "Producto Gratis";
        break;
      default:
        return "Descuento y Producto gratis";
        break;
    }
  };

  const { min_purchase, valid_products } = conditions;

  const formatConditions = () => {
    if (min_purchase === 0 && valid_products.length === 0) {
      return "Este cupon no aplica condiciones";
    } else {
      return (
        <ul className="list-disc ml-6">
          <li>
            <strong>Compra mínima:</strong> {min_purchase}
          </li>
          <li>
            <strong>¿Tiene productos asociados?</strong>{" "}
            {valid_products.length > 0 ? "Sí" : "No"}
          </li>
        </ul>
      );
    }
  };

  return (
    <li className="border rounded-lg shadow-lg p-6 bg-white max-w-md mx-auto flex flex-col">
      <div className="cupon-card-header flex w-full flex-row items-center justify-around">
        <span className="text-lg font-semibold text-gray-800 flex items-center">
          <FaTag className="text-green-500 mr-2" /> <strong>{code}</strong>
        </span>
        {setValidCoupon(is_valid)}
      </div>
      <div className="dates flex flex-row items-center justify-between my-2 gap-2">
        <FaCalendarAlt /> <strong>Desde:</strong> <span>{start_date}</span>{" "}
        <strong>Hasta:</strong> <span>{end_date}</span>
      </div>
      <div className="coupon-type my-2">
        <strong>Tipo de cupón:</strong> <span>{setTypeOfCoupon(type)}</span>
      </div>
      <p className="discount value my-2">
        <strong>Valor del descuento:</strong> <span>{discount_value}%</span>
      </p>

      <div className="my-2 w-full flex flex-col">
        <strong>Condiciones:</strong>
        {formatConditions()}
      </div>
      <div className="w-full flex justify-center items-center">
        {is_valid ? (
          <button
            type="button"
            onClick={() => {
              changeCouponStatus(id, is_valid);
            }}
            className="p-3 w-fit text-white font-bold rounded-lg bg-red-500 hover:bg-red-600 transition-colors mx-auto"
          >
            Cambiar Status
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={() => {
                changeCouponStatus(id, is_valid);
              }}
              className="p-3 w-fit text-white font-bold rounded-lg bg-green-500 hover:bg-green-600 transition-colors mx-auto"
            >
              Cambiar Status
            </button>
            <button className="p-3 w-fit text-white font-bold rounded-lg bg-red-500 hover:bg-red-600 transition-colors mx-auto" onClick={()=>{handleDeleteCoupon(id)}}> 
              Eliminar
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default CouponCard;
