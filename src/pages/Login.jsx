import { useEffect } from "react";
import { useApp } from "../Actions/ContextProvider";
const Login = () => {
  const { loginUser, handleLoginResult } = useApp();
  const handleLoginClck = async () => {
    await loginUser();
  };

  useEffect(() => {
    handleLoginResult();
  }, []);
  return (
    <div className="w-dvw h-dvh flex flex-row justify-center items-center">
      <div className="w-1/3 h-full bg-blue-400 flex justify-center items-center px-4">
        <h3 className="text-2xl text-left text-white w-full">
          Bienvenida de vuelta
        </h3>
      </div>
      <div className="w-2/3 h-full  flex justify-center items-center">
        <button
          type="button"
          className="login-with-google-btn  bg-no-repeat bg-white border-none rounded-[3px] text-[#757575] text-[14px] font-[500] py-3 pr-4 pl-11 shadow-md transition-all hover:shadow-lg active:bg-[#eeeeee]"
          onClick={() => {
            handleLoginClck();
          }}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
