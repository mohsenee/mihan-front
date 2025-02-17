import Input from "@/app/components/shared/form/input";
import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as yup from "yup";

interface FormValues {
  code: string;
  password: string;
}

export default function Home() {
  const [error, setError] = useState<string | null>(null); // Error message state
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = async (values: FormValues) => {
    const url = `http://localhost:8000/users/getUserByCodeAndPass?code=${values.code}&password=${values.password}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        console.log(data);
        alert("خوش آمدید");
        router.push("/home/home");
      } else {
        alert("کاربر پیدا نشد لطفا کدملی و رمز را چک کنید");
      }
    } catch (error) {
      setError("There was an error processing your request. Please try again.");
    }
  };

  const loginFormValidationSchema = yup.object().shape({
    code: yup
      .string()
      .matches(/^\d{10}$/, "کدملی باید 10 رقم باشد") // Regex: ensures 10 digits
      .required("کدملی ضروری است"),
    password: yup.string().required().min(6, " رمز باید حداقل 6 کاراکتر باشد"),
  });

  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
  });

  return (
    <div id="root">
      <div>
        <div className="notification-container notification-container-empty">
          <div></div>
        </div>
        <div className="w-full">
          <div className="mb-0 w-full card-group flex">
            <div className="w-full flex relative lg:max-w-md xl:max-w-xl h-screen justify-center bg-slate-50 dark:bg-[var(--color-echo)] dark:bg-[image:none] dark:border border-solid border-0 border-r border-[var(--border-color)]">
              <div className="flex relative h-screen w-full justify-center overflow-auto">
                <div className="p-8 login-card-top my-auto w-full max-w-sm">
                  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-blue-700">
                      ورود به حساب کاربری
                    </h2>
                  </div>

                  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <Formik
                      initialValues={{
                        code: "",
                        password: "",
                      }}
                      onSubmit={handleSubmit}
                      validationSchema={loginFormValidationSchema}
                    >
                      <Form className="space-y-6">
                        <div>
                          <Input name="code" label="کدملی" />
                        </div>

                        <div>
                          <div className="flex items-center justify-between">
                            <label
                              htmlFor="password"
                              className="block text-sm/6 font-medium text-gray-900 text-right"
                            >
                              رمز
                            </label>
                            <div className="text-sm">
                              <a
                                href="#"
                                className="font-semibold text-blue-700 hover:text-blue-500"
                              >
                                رمز خود را فراموش کرده اید؟
                              </a>
                            </div>
                          </div>
                          {/* <Input name="password" type="password" /> */}
                          <div className="mt-2 relative">
                            <span
                              onClick={togglePasswordVisibility}
                              className="absolute inset-y-0 left-3 flex items-center cursor-pointer text-gray-500"
                            >
                              👁️
                            </span>
                            <Field
                              id="password"
                              name="password"
                              type={showPassword ? "text" : "password"} // Dynamically change the type
                              required
                              autoComplete="current-password"
                              className="block w-full rounded-md bg-white px-5 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
                      </Form>
                    </Formik>

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
              </div>
            </div>

            <div className="text-white flex-1 bg-center login_box md:hidden lg:block card bg-slate-800">
              <div className="logo-wrapper flex items-center justify-center h-screen">
                <div className="flex items-center justify-between px-10">
                  <div className="logo-center flex items-center">
                  <img
                      src="/logo/TIC-Logo.png"
                      className="w-60 h-60 mr-4 ml-4"
                      alt="logo"
                    />
                    <div className="text-center card-body">
                      <h1 className="font-bold text-5xl mb-6">سامانه میهن</h1>
                      <h2 className="font-bold text-2xl mt-6">
                        مدیریت یکپارچه هوشمند نگهداری و نظارت
                      </h2>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
