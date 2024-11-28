import ProductsList from "./ProductsList";
import OrderButtons from "./OrderButtons";
const OrderCard = ({ order }) => {
  const {
    address,
    createdAt,
    deliveryDate,
    discountPercent,
    homeDelivery,
    id,
    message,
    name,
    paymentMethod,
    phonenumber,
    products,
    status,
    subtotal,
    total,
  } = order;
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("es-CO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
  return (
    <div className="border rounded-lg shadow p-4 bg-white w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-2 text-center">Pedido #{id}</h2>
      <ul className="text-sm space-y-2">
        <li>
          <strong>Fecha de creación:</strong> {formatDate(createdAt)}
        </li>
        <li>
          <strong>Cliente:</strong> {name}
        </li>
        <li>
          <strong>Teléfono:</strong> {phonenumber}
        </li>
        <li>
          <strong>Entrega:</strong> {deliveryDate}
        </li>
        <li>
          <strong>Entrega a domicilio:</strong>{" "}
          {homeDelivery === "true" ? "Sí" : "No"}
        </li>{" "}
        <li>
          <strong>Dirección:</strong> {address || "No aplica"}
        </li>
        <strong>Productos: </strong>
        {products ? (
          <>
            <table className="table-fixed w-full">
              <thead className="bg-gray-400">
                <tr>
                  <th className="text-center">Nombre</th>
                  <th className="text-center">Tamaño</th>
                  <th className="text-center">Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, index) => (
                  <ProductsList item={item} key={`item-${index}-${item.id}`} />
                ))}
              </tbody>
            </table>
          </>
        ) : (
          "No existen productos en esta orden"
        )}
        <li>
          <strong>Subtotal:</strong> ${parseInt(subtotal).toLocaleString()}
        </li>
        <li>
          <strong>Descuento:</strong> {discountPercent}%
        </li>
        <li>
          <strong>Total:</strong> ${parseInt(total).toLocaleString()}
        </li>
        <li>
          <strong>Método de pago:</strong> {paymentMethod}
        </li>
        <li>
          <strong>Mensaje:</strong> {message || "Sin mensaje"}
        </li>
      </ul>
      <OrderButtons status={status} orderId={id}/>
    </div>
  );
};

export default OrderCard;
