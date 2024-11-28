import { Link, Outlet } from "react-router";
import { useApp } from "../Actions/ContextProvider";
const Pedidos = () => {
  const { pendingOrders, completeOrders, canceledOrders } = useApp();
  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold mb-4 text-center">Pedidos</h1>
      <nav className="w-1/2 mx-auto flex justify-around items-center">
        <Link
          className="p-3 bg-yellow-200 uppercase font-semibold rounded-xl"
          to="pendientes" // Ruta relativa
        >
          Pendientes <span>({pendingOrders.length})</span>
        </Link>
        <Link
          className="p-3 bg-green-200 uppercase font-semibold rounded-xl"
          to="completados" // Ruta relativa
        >
          Completados <span>({completeOrders.length})</span>
        </Link>
        <Link
          className="p-3 bg-red-200 uppercase font-semibold rounded-xl"
          to="cancelados" // Ruta relativa
        >
          Cancelados <span>({canceledOrders.length})</span>
        </Link>
      </nav>
      {/* Aquí renderizamos las rutas anidadas */}
      <Outlet />
    </div>
  );
};

export default Pedidos;
