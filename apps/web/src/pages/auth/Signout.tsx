import React from "react";

const Signout = () => {
  const signout = () => {
    localStorage.removeItem("token");
    window.location.assign("/auth/signin");
  };
  return (
    <div className="h-[30vh] w-full  flex justify-center items-center flex-col font-sans">
      <div className="w-full h-1/2 text-4xl text-white  font-medium flex justify-center items-end">
        Surely want to Logout ?
      </div>
      <div className="w-full h-1/2 flex items-center justify-evenly">
        <button
          onClick={() => {
            window.location.assign("/");
          }}
          className="hover:bg-purple-400 transition-all hover:border-white hover:text-white w-[12vw] h-[6vh] text-xl p-2 bg-white rounded-xl text-purple-600 font-black border-2 border-purple-500"
        >
          Continue to Home
        </button>
        <button
          onClick={() => signout()}
          className="w-[12vw] h-[6vh] bg-purple-400 rounded-xl font-black text-white text-xl border-2 border-white hover:bg-white hover:text-purple-400 hover:border-purple-400"
        >
          Signout
        </button>
      </div>
    </div>
  );
};

export default Signout;
