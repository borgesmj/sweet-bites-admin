import { Link } from "react-router";
import { useApp } from "../Actions/ContextProvider";
import { FaPowerOff } from "react-icons/fa6";
const Navlinks = () => {
    const links = [
        { name: "Pedidos", href: "/pedidos", quantity: ""},
        { name: "Productos", href: "/productos", quantity: "" },
        { name: "Cupones", href: "/cupones", quantity: "" },
        { name: "Galería", href: "/galeria", quantity: "" },
      ];
  const {productsLength, ordersLength} = useApp()
  links[1].quantity = productsLength;
  links[0].quantity = ordersLength;
  return (
    <nav className="nav w-56 h-dvh bg-blue-100 flex flex-col  justify-between py-8 px-4 fixed top-0 left-0 bottom-0">
      <div className="flex flex-col gap-5">
      {
        links.map((link, index) => (
            <Link className="w-full text-xl" to={link.href} key={`${link.name}-${index}`}>{link.name} {link.quantity ? `(${link.quantity})` : ""}</Link>
        ))
        }
      </div>
      <div className="w-full text-xl cursor-pointer flex justify-start gap-4 items-center">Salir <FaPowerOff /></div>
    </nav>
  );
};

export default Navlinks;
