import { useEffect, useState } from "react";
import { useApp } from "../Actions/ContextProvider";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";
const CouponModal = () => {
  const { setCouponModalOpen, allProducts, createNewCoupon, allCoupons } =
    useApp();
  const [couponCode, setCouponCode] = useState("");
  const [couponType, setCouponType] = useState("discount");
  const [minDate, setMinDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [discount, setDiscount] = useState(0);
  const [minPurchase, setMinPurchase] = useState(0);
  const [freeProductId, setFreeProductId] = useState("");
  const [specialProducts, setSpecialProducts] = useState([]); // Todos los productos marcados como true en special_product
  const [freeProductsList, setFreeProductList] = useState([]);
  const [validProductsCards, setValidProductsCards] = useState([]);
  const [validProductsIds, setValidProductsIds] = useState([]);
  const [validProductsModalOpen, setValidProductsModalOpen] = useState(false);
  const handleNewCoupon = () => {
    if ([couponCode, startDate, endDate].includes("")) {
      window.alert("Todos los datos con asterisco deben estar completos");
      return;
    }
    const couponIndex = allCoupons.findIndex((coupon) => {
      return coupon.code === couponCode.toUpperCase();
    });
    if (couponIndex > -1) {
      window.alert("Ya existe un cupon con ese codigo");
      return;
    }
    if (couponType === "discount" || couponType === "discount_free-product") {
      if (discount < 10) {
        window.alert("Debe incluir un porcentaje de al menos 10%");
        return;
      }
    }
    if (
      couponType === "free-product" ||
      couponType === "discount_free-product"
    ) {
      if (freeProductId === "") {
        window.alert("Debe incluir un producto regalo");
        return;
      }
    }
    if (discount > 50) {
      window.alert("El descuento no puede ser mayor a 50%");
      return;
    }
    if (minPurchase === 0) {
      const confirm = window.confirm(
        "Este cupon no tiene monto de compra minima. ¿Continuar?"
      );
      if (!confirm) {
        return;
      }
    }

    if (validProductsIds.length < 1) {
      const confirm = window.confirm(
        "Este cupon no tiene productos de requisitos. ¿Continuar?"
      );
      if (!confirm) {
        return;
      }
    }
    const newCoupon = {
      code: couponCode.toUpperCase(),
      type: couponType,
      start_date: startDate,
      end_date: endDate,
      discount_value: Number(discount),
      product_id: freeProductId,
      conditions: {
        min_purchase: Number(minPurchase),
        valid_products: validProductsIds,
      },
      is_valid: true,
      created_at: new Date(),
    };
    createNewCoupon(newCoupon);
    setCouponModalOpen(false);
  };
  useEffect(() => {
    const today = new Date();
    // * extraer la fecha de hoy
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;
    setMinDate(formattedDate);
    const filteredProducts = allProducts.filter((product) => {
      return product.special_product === true;
    });
    setSpecialProducts(filteredProducts);
  }, []);
  const filterSpecialProducts = (text) => {
    if (!text) {
      setFreeProductList([]);
      return;
    }
    const filteredFreeProducts = specialProducts.filter((product) => {
      return product.title.toLowerCase().includes(text.toLowerCase());
    });
    setFreeProductList(filteredFreeProducts);
  };
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-dvw h-dvh bg-[#00000030] flex justify-center items-center">
      <form
        action=""
        className="bg-white p-4 w-1/2 flex flex-col gap-2 relative"
      >
        <p className="form-field w-full flex items-center gap-2">
          <label className="w-1/4" htmlFor="coupon-code">
            Codigo del cupón:<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="coupon-code"
            required
            className="w-3/4 px-2 uppercase"
            value={couponCode}
            onChange={(e) => {
              setCouponCode(e.target.value);
            }}
          />
        </p>
        <p className="form-field w-full flex items-center gap-2">
          <label htmlFor="coupon-type">Tipo de cupón:</label>
          <select
            name="coupon-type"
            id="coupon-type"
            onChange={(e) => {
              setCouponType(e.target.value);
            }}
            value={couponType}
          >
            <option value="discount" defaultValue>
              discount
            </option>
            <option value="free-product">free-product</option>
            <option value="discount_free-product">
              Discount + free product
            </option>
          </select>
        </p>
        <p className="form-field w-full flex items-center gap-2">
          <label htmlFor="start-date">
            Fecha de inicio:<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name=""
            id="start-date"
            min={minDate}
            value={startDate}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
          />
        </p>
        <p className="form-field w-full flex items-center gap-2">
          <label htmlFor="end-date">
            Fecha final:<span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            name=""
            id="end-date"
            min={minDate}
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          />
        </p>
        <p className="form-field w-full flex items-center gap-2">
          <label htmlFor="discount">Descuento:</label>
          <input
            type="text"
            className="w-3/4 px-2 uppercase"
            name=""
            id="discount"
            value={discount}
            onChange={(e) => {
              const value = e.target.value;
              const regex = /^[0-9]*$/; // Permite solo números
              if (regex.test(value)) {
                setDiscount(value);
              }
            }}
          />
        </p>
        <p className="form-field w-full flex items-center gap-2">
          <label htmlFor="min_purchase">Compra Minima:</label>
          <input
            type="text"
            className="w-3/4 px-2 uppercase"
            name=""
            id="min_purchase"
            value={minPurchase}
            onChange={(e) => {
              const value = e.target.value;
              const regex = /^[0-9]*$/; // Permite solo números
              if (regex.test(value)) {
                setMinPurchase(value);
              }
            }}
          />
        </p>
        <div className="form-field w-full flex items-center gap-2 ">
          <label htmlFor="">Producto regalo:</label>
          <input
            type="text"
            readOnly
            value={freeProductId}
            className="outline-none"
          />
          {freeProductId ? (
            <button
              type="button"
              onClick={() => {
                setFreeProductId("");
                setFreeProductList([]);
              }}
            >
              <FaRegTrashAlt />
            </button>
          ) : (
            <>
              <input
                type="text"
                id="serarchProductId"
                placeholder="Buscar producto"
                className="px-2 "
                onChange={(e) => {
                  filterSpecialProducts(e.target.value);
                }}
                autoComplete="off"
              />
              <div className="absolute -bottom-12 right-0">
                {freeProductsList.length > 0 && freeProductsList.length < 6 && (
                  <div className="w-48 bg-gray-200">
                    {freeProductsList.map((product_item) => (
                      <div
                        className="w-full p-2 flex justify-start items-center cursor-pointer"
                        key={product_item.id}
                        onClick={() => {
                          setFreeProductId(product_item.id);
                        }}
                      >
                        <img
                          src={product_item?.images?.png}
                          alt={product_item?.images?.alt}
                          width={50}
                          height={50}
                        />
                        <p className="text-xs font-bold">
                          {product_item.title}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className="form-field w-full flex items-start gap-2 flex-col">
          <label htmlFor="">Productos válidos:</label>
          <ul className="w-full list-disc text-xs pl-4 columns-3">
            {validProductsCards.map((product_item) => (
              <li
                className="p-2 rounded-lg cursor-pointer list-disc"
                key={product_item.id}
              >
                {product_item.name}
              </li>
            ))}
            <div
              className="w-12 h-12 p-2 flex justify-center items-center bg-blue-400 rounded-lg cursor-pointer"
              onClick={() => {
                setValidProductsModalOpen(true);
              }}
            >
              <IoAddOutline />
            </div>
          </ul>
        </div>
        <div className="flex justify-center items-center gap-8">
          <button
            type="button"
            className="p-3 w-24 text-white font-bold rounded-lg bg-green-500 hover:bg-green-600 transition-colors"
            onClick={() => {
              handleNewCoupon();
            }}
          >
            Guardar
          </button>
          <button
            className="p-3 w-24 text-white font-bold rounded-lg bg-red-500 hover:bg-red-600 transition-colors"
            type="button"
            onClick={() => {
              setCouponModalOpen(false);
            }}
          >
            Cancelar
          </button>
        </div>
      </form>
      {validProductsModalOpen && (
        <div className="absolute right-0 top-0 bottom-0 overflow-y-auto bg-slate-400 w-60 max-w-60 h-full flex flex-col gap-4 p-4">
          {allProducts.map((product) => (
            <div
              className="w-full flex flex-row transition-all hover:scale-105 cursor-pointer"
              onClick={() => {
                setValidProductsCards([
                  ...validProductsCards,
                  {
                    name: product.title,
                    image: product.images.png,
                    id: product.id,
                  },
                ]);
                setValidProductsIds([...validProductsIds, product.id]);
                setValidProductsModalOpen(false);
              }}
            >
              <img
                src={product.images.png}
                alt={product.images.alt}
                width="50px"
                height="50px"
                className="w-12"
              />
              <p>{product.title}</p>
            </div>
          ))}
          <button
            type="button"
            className="p-3 w-24 text-white font-bold rounded-lg bg-red-500 hover:bg-red-600 transition-colors mx-auto"
            onClick={() => {
              setValidProductsModalOpen(false);
            }}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};

export default CouponModal;
