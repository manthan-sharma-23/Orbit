import { Link, useNavigate } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import { SERVER_URL } from "../../lib/constants/config";
import { FormType, InitialFormState } from "../../utils/typings/types";
interface AuthProps {
  page: string;
}
import { useLoginUserMutation } from "../../lib/store/reducers/slice/user.slice";

const Auth: React.FC<AuthProps> = ({ page }) => {
  const [form, setForm] = useState<FormType | null>(InitialFormState);
  const navigate = useNavigate();

  const [loginUser] = useLoginUserMutation();
  const [loading, setLoading] = useState<boolean>(false);
  const isRegister = page === "/register";

  const submit = async () => {
    if (!form || !form?.email || !form.password) {
      alert("Please Enter Complete Credentials");
    }
    setLoading(true);
    if (isRegister) {
      fetch(`${SERVER_URL}/api/user/register`, {
        method: "POST",
        body: JSON.stringify({
          ...form,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data: { message: string; token: string }) => {
          setForm(InitialFormState);
          setLoading(false);
          window.localStorage.setItem("token", data.token);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      loginUser({ email: form!.email, password: form!.password })
        .then((res) => {
          if (res) {
            console.log(res);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  return (
    <section className="h-screen w-screen flex justify-center items-center ">
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24 h-full w-full">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
            <p className="text-5xl font-mono text-black font-black">Orbit</p>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            {isRegister ? "Sign up your account" : "Sign in to your account"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 ">
            {isRegister
              ? "Already have an account! "
              : "Don't have an account? "}
            <Link
              to={isRegister ? "/login" : "/register"}
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              {isRegister ? "Login here" : "Create a free account"}
            </Link>
          </p>
          <form action="#" method="POST" className="mt-8">
            <div className="space-y-5">
              {isRegister && (
                <div>
                  <label className="text-base font-medium text-gray-900">
                    Full Name
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      placeholder="Name (optional)"
                      value={form?.name}
                      onChange={(e) =>
                        setForm((form) => {
                          return { ...form, name: e.target.value } as FormType;
                        })
                      }
                    />
                  </div>
                </div>
              )}
              <div>
                <label className="text-base font-medium text-gray-900">
                  {" "}
                  Email address{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    value={form?.email}
                    onChange={(e) =>
                      setForm((form) => {
                        return {
                          ...form,
                          email: e.target.value,
                        } as FormType;
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-base font-medium text-gray-900">
                    {" "}
                    Password{" "}
                  </label>
                  {!isRegister && (
                    <Link
                      to="#"
                      title=""
                      className="text-sm font-semibold text-black hover:underline"
                    >
                      {" "}
                      Forgot password?{" "}
                    </Link>
                  )}
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    value={form?.password}
                    onChange={(e) =>
                      setForm((form) => {
                        return {
                          ...form,
                          password: e.target.value,
                        } as FormType;
                      })
                    }
                  />
                </div>
              </div>
              <div>
                <button
                  type="button"
                  onClick={submit}
                  className={
                    loading
                      ? "bg-black/65"
                      : "bg-black" +
                        " inline-flex w-full items-center justify-center rounded-md  px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                  }
                >
                  {loading
                    ? "Processing..."
                    : isRegister
                      ? "Register"
                      : "Login"}
                </button>
              </div>
            </div>
          </form>
          <div className="mt-3 space-y-3">
            <button
              type="button"
              className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
            >
              <FaGithub className="mx-4 text-[1.7rem] text-black" />
              {isRegister ? "Sign up with Github" : "Sign in with Github"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
