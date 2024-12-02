import { createContext, useContext, useEffect, useState } from "react";
import {
  fetchProducts,
  deleteProduct,
  updateProduct,
  updateNewProduct,
  fetchOrders,
  cancelOrder,
  completeOrder,
  fetchCoupons,
  addCoupon,
  updateCoupon,
  deleteCoupon,
  loginUser
} from "../Actions/firebase";
import { useLocation, useNavigate } from "react-router";

const appContext = createContext();

export const ContextProvider = ({ children }) => {
  //*  Producto para editar
  const [selectedEditProduct, setSelectedEditProduct] = useState({});
  //* Variable que controla si el modal de editar/agregar está abierto
  const [editModalOpen, setEditModalOpen] = useState(false);
  // * Variable que controla si el modal de agregar un cupon
  const [couponModalOpen, setCouponModalOpen] = useState(false);
  // * la cantidad de productos para pasar a la navbar
  const [productsLength, setProductsLength] = useState(0);
  // * LA cantidad de ordenes para pasar a la navbar
  const [ordersLength, setOrdersLength] = useState(0);
  // * La cantidad de cupones para pasar a la navbar
  const [couponsLength, setCouponsLength] = useState(0)
  //* Todos los productos
  const [allProducts, setAllProducts] = useState([]);
  // * Estado de carga
  const [isLoading, setIsLoading] = useState(true);
  // * Lista de orderenes
  const [allOrders, setAllOrders] = useState([]);
  // * Lista de ordenes pendientes, completadas y canceladas
  const [pendingOrders, setPendingOrders] = useState([]);
  const [completeOrders, setCompleteOrders] = useState([]);
  const [canceledOrders, setCancelOrders] = useState([]);
  // * Lista de cupones
  const [allCoupons, setAllCoupons] = useState([]);
  // * usuario loggeado
  const [user, setUser] = useState(null)
  // * datos del usuario
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const pathname = useLocation().pathname;
  // !!!! Carga Inicial
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        const orders = await fetchOrders();
        const coupons = await fetchCoupons();
        setAllOrders(orders);
        setAllProducts(products);
        setAllCoupons(coupons);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, []);
  useEffect(() => {
    const userLS = localStorage.getItem('user')
    if (userLS){
      setUser(JSON.parse(userLS))
      console.log()
    navigate(pathname)
      
    }
  }, [])
  // * Longitud de los productos para colocar el numero en la dashboard
  useEffect(() => {
    setProductsLength(allProducts.length);
    setOrdersLength(allOrders.length);
    setCouponsLength(allCoupons.length)
    const filterOrders = async () => {
      let pendingOrdersList = await allOrders
        .filter((order) => {
          return order.status === 1;
        })
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const completeOrdersList = await allOrders
        .filter((order) => {
          return order.status === 2;
        })
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      const cancelOrdersList = await allOrders
        .filter((order) => {
          return order.status === 3;
        })
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPendingOrders(pendingOrdersList);
      setCompleteOrders(completeOrdersList);
      setCancelOrders(cancelOrdersList);
    };
    filterOrders();
  }, [allProducts, allOrders, allCoupons]);
  // * Eliminar un producto
  const updateDeleteProduct = async (id) => {
    const newList = await deleteProduct(id);
    setAllProducts(newList);
  };
  // * Actualizar un producto
  const updateProductList = async (id, newProduct) => {
    const newList = await updateProduct(id, newProduct);
    setAllProducts(newList);
  };
  // * crear un producto nuevo
  const createNewProduct = async (newProduct) => {
    updateNewProduct(newProduct);
    const newList = await fetchProducts();
    setAllProducts(newList);
  };
  // * Cancelar una orden
  const cancelNewOrder = async (id) => {
    await cancelOrder(id);
    const newList = await fetchOrders();
    setAllOrders(newList);
  };

  // * Completar una orden
  const completeNewOrder = async (id) => {
    await completeOrder(id);
    const newList = await fetchOrders();
    setAllOrders(newList);
  };
  // * Crear un pupon nuevo
  const createNewCoupon = async (coupon) => {
    await addCoupon(coupon);
    const couponList = await fetchCoupons();
    setAllCoupons(couponList);
  };

  const changeCouponStatus = async (id, currentCouponStatus) => {
    await updateCoupon(id, currentCouponStatus);
    const couponList = await fetchCoupons();
    setAllCoupons(couponList);
  };

  const deleteThisCoupon = async (id) => {
    deleteCoupon(id);
    const couponList = await fetchCoupons();
    setAllCoupons(couponList);
  };

  const handleLoginUser = async (data) => {
    const currentUser = await loginUser(data)
    setUser(currentUser)
    navigate("/pedidos")
  }

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  const handleLogOutUser = () => {
    setUser(null)
    localStorage.removeItem('user')
    navigate("/login")
  }
  return (
    <appContext.Provider
      value={{
        selectedEditProduct,
        setSelectedEditProduct,
        editModalOpen,
        setEditModalOpen,
        allProducts,
        productsLength,
        isLoading,
        updateDeleteProduct,
        updateProductList,
        createNewProduct,
        ordersLength,
        pendingOrders,
        completeOrders,
        canceledOrders,
        cancelNewOrder,
        completeNewOrder,
        couponModalOpen,
        setCouponModalOpen,
        allCoupons,
        createNewCoupon,
        changeCouponStatus,
        deleteThisCoupon,
        couponsLength,
        handleLoginUser,
        user,
        username,
        setUsername,
        password,
        setPassword,
        handleLogOutUser 
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export function useApp() {
  return useContext(appContext);
}
