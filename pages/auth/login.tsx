import Input from "@/app/components/shared/form/input";
import { NextPage } from "next";
import { useState } from "react";

const Login: NextPage = () => {
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-blue-700">
            ورود به حساب کاربری
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              {/* <Input name="code" label="کدملی" /> */}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-blue-700 hover:text-blue-500"
                  >
                    رمز خود را فراموش کرده اید؟
                  </a>
                </div>
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900 text-right"
                >
                  رمز
                </label>
              </div>
              <div className="mt-2 relative">
                {/* Password Input */}
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"} // Dynamically change the type
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                {/* Eye Icon */}
                <span
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                ورود
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-blue-500">
            عضو سامانه نیستید؟{" "}
            <a
              href="/auth/register"
              className="font-semibold text-blue-700 hover:text-blue-500"
            >
              ساخت حساب کاربری
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
