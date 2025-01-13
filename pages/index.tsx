import Input from "@/app/components/shared/form/input";
import { Formik, Form } from "formik";
import { useState } from "react";
import { useRouter } from "next/router";
import * as yup from "yup";

interface FormValues {
  code: string;
  password: string;
}

export default function Home() {
  const [error, setError] = useState<string | null>(null); // Error message state
  const router = useRouter();

  const handleSubmit = async (values: FormValues) => {
    const url = `http://localhost:8000/users/getUserByCodeAndPass?code=${values.code}&password=${values.password}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        console.log(data);
        alert("خوش آمدید");
        router.push("http://localhost:3000/home/home");
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
                          <Input name="password" type="password" />
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
                        href="http://localhost:3000/auth/register"
                        className="font-semibold text-blue-700 hover:text-blue-500"
                      >
                        ساخت حساب کاربری
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="text-white flex-1 bg-center login_box md:hidden lg:block card bg-slate-800">
              <div className="logo-wrapper flex items-center justify-center h-screen">
                <div className="logo-center pl-24">
                  <img src="/logo/logo.jpg" className="mx-auto" alt="logo" />
                  <div className="text-center card-body">
                    <div className="logo-bottom-txt mt-5">
                      <h1 className="bold text-5xl">سامانه میهن</h1>
                      <br></br>
                      <h2 className="bold text-3xl">
                        {" "}
                        مدیریت یکپارچه هوشمند با رویکرد نگهداری و نظارت
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}

            <div className="text-white flex-1 bg-center login_box md:hidden lg:block card bg-slate-800">
              <div className="logo-wrapper flex items-center justify-center h-screen">
                <div className="flex items-center justify-between px-10">
                  <div className="logo-center flex items-center">
                    <div className="text-center card-body">
                      <h1 className="font-bold text-5xl mb-4">سامانه میهن</h1>
                      <h2 className="font-bold text-3xl mt-2">
                        مدیریت یکپارچه هوشمند با رویکرد نگهداری و نظارت
                      </h2>
                    </div>
                    <img
                      src="/logo/logo.jpg"
                      className="w-24 h-24 mr-4 ml-4"
                      alt="logo"
                    />
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
