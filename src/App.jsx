import Dashboard from "./dashboard/Dashboard";
import Pedidos from "./pages/Pedidos";
import Productos from "./pages/Productos";
import Galeria from "./pages/Galeria";
import Cupones from "./pages/Cupones";
import Pendientes from "./pages/Pendientes";
import Completados from "./pages/Completados";
import Cancelados from "./pages/Cancelados";
import { Routes, Route } from "react-router";
import { useApp } from "./Actions/ContextProvider";
import EditModal from "./components/EditModal";
import CouponModal from "./components/CouponModal";
const App = () => {
  const { selectedEditProduct, editModalOpen, couponModalOpen } = useApp();
  return (
    <Dashboard>
      <div className="container ml-56">
        <Routes>
          <Route path="/pedidos" element={<Pedidos />}>
            {/* Rutas anidadas */}
            <Route index element={<Pendientes />}></Route>
            <Route path="pendientes" element={<Pendientes />} />
            <Route path="completados" element={<Completados />} />
            <Route path="cancelados" element={<Cancelados />} />
          </Route>
          <Route path="/productos" element={<Productos />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/cupones" element={<Cupones />} />
        </Routes>
      </div>
      {editModalOpen && <EditModal product={selectedEditProduct} />}
      {couponModalOpen && <CouponModal />}
    </Dashboard>
  );
};

export default App;
