import { useEffect, useState } from "react";
import { useApp } from "../Actions/ContextProvider";
const Login = () => {
  const { handleLoginUser, username, setUsername, password, setPassword } =
    useApp();
  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      username,
      password,
    };
    handleLoginUser(data);
  };
  return (
    <div className="w-dvw h-dvh flex flex-row justify-center items-center">
      <div className="w-1/3 h-full bg-blue-400 flex justify-center items-center px-4">
        <h3 className="text-2xl text-left text-white w-full">
          Bienvenida de vuelta
        </h3>
      </div>
      <div className="w-2/3 h-full  flex justify-center items-center">
        <form
          onSubmit={(e) => {
            handleLogin(e);
          }}
          method="post"
          className="shadow-xl p-4 flex flex-col items-center gap-4"
        >
          <input
            type="text"
            id="nombre"
            name="nombre"
            className="w-full px-2 text-xl"
            required
            placeholder="Nombre de usuario o correo"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
            autoComplete="off"
          />
          <input
            type="password"
            name=""
            id=""
            className="w-full px-2 text-xl"
            required
            placeholder="Contraseña"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            autoComplete="off"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
