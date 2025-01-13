import { NextPage } from "next";

const Login: NextPage = () => {
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
              <label
                htmlFor="code"
                className="block text-sm/6 font-medium text-gray-900 text-right"
              >
                کدملی
              </label>
              <div className="mt-2">
                <input
                  id="code"
                  name="code"
                  type="text"
                  required
                  autoComplete="code"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
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
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
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
              href="http://localhost:3000/auth/register"
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
