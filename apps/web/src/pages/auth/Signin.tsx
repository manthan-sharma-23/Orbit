import { INPUT_LOGIN_FORM } from "typings";
import { loginForm } from "../../features/functions/login.form";
import { useState } from "react";

const Signin = () => {
  const [formDetails, setFormDetails] = useState<INPUT_LOGIN_FORM>({});
  return (
    <div className="w-full h-[55vh] flex flex-col justify-center items-center font-sans ">
      <p className="text-4xl text-white font-extrabold">Orbit</p>
      <p className="text-xl text-white">
        Not a user want to{" "}
        <a href="/auth/signup" className="text-purple-300 underline">
          register
        </a>{" "}
        ?
      </p>
      <div className="h-[70%] w-full  flex flex-col justify-center gap-5 items-center">
        <input
          className="w-[18vw] h-10 pl-2 text-white bg-transparent border-white focus:outline-none border-b-2 "
          placeholder="Enter your email"
          onChange={(e) =>
            setFormDetails((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <input
          placeholder="Enter your password"
          onChange={(e) =>
            setFormDetails((prev) => ({ ...prev, password: e.target.value }))
          }
          aria-brailleroledescription=""
          className="w-[18vw] h-10 pl-2 text-white bg-transparent border-white focus:outline-none border-b-2 "
        />
        <button
          onClick={() => loginForm(formDetails)}
          className="border-white border-2 w-[8vw] h-12 flex justify-center items-center bg-purple-500 text-white font-extrabold rounded-xl"
        >
          Signin
        </button>
      </div>
    </div>
  );
};

export default Signin;
