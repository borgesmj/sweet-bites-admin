import { useApp } from "../Actions/ContextProvider";

const OrderButtons = ({ status, orderId }) => {
  const { cancelNewOrder, completeNewOrder } = useApp();
  const handleCancelClick = () => {
    const confirm = window.confirm(
      `¿Confirmar cancelación de la orden #${orderId}? Esta acción no se puede deshacer.}`
    );
    if (!confirm) {
      return;
    }
    cancelNewOrder(orderId);
  };
  const handleCompleteClick = () => {
    const confirm = window.confirm(
      `¿La orden #${orderId}? fué entregada con exito? Esta acción no se puede deshacer.}`
    );
    if (!confirm) {
      return;
    }
    completeNewOrder(orderId);
  };
  if (status === 1) {
    return (
      <div className="p-4 my-2 w-full flex justify-around gap-4 items-center ">
        <button
          type="button"
          className="p-4 bg-green-400 rounded-xl font-semibold"
          onClick={() => {
            handleCompleteClick();
          }}
        >
          Completar
        </button>
        <button
          type="button"
          className="p-4 bg-red-400 rounded-xl font-semibold"
          onClick={() => {
            handleCancelClick();
          }}
        >
          Cancelar
        </button>
      </div>
    );
  } else if (status === 3) {
    return (
      <div className="p-4 my-2 w-full flex justify-center gap-4 items-center text-red-900 font-bold
       text-xl">
        Esta orden fue cancelada 😖
      </div>
    );
  } else {
    return (
      <div className="p-4 my-2 w-full flex justify-center gap-4 items-center text-green-900 font-bold 
       text-xl">
        Esta orden fue completada 🎉
      </div>
    );
  }
};

export default OrderButtons;
