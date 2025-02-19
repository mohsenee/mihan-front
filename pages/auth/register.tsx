import { Formik, Form } from "formik";
import * as yup from "yup";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Input from "@/app/components/shared/form/input";
import { useState } from "react";

interface RegisterFormValues {
  name: string;
  code: string;
  role: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

const roles = [
  {
    id: 1,
    label: "دیتا و سوییح",
    name: "Switch",
  },
  {
    id: 2,
    label: "انتقال",
    name: "Mux",
  },
  {
    id: 3,
    label: "فیبر",
    name: "Fiber",
  },
  {
    id: 4,
    label: "پاور",
    name: "Power",
  },
  {
    id: 5,
    label: "تاسیسات",
    name: "Facilities",
  },
];

const registerFormValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required()
    .min(4, "نام و نام خانوادگی باید حداقل 4 کاراکتر باشد"),
  code: yup
    .string()
    .matches(/^\d{10}$/, "کدملی باید 10 رقم باشد") // Regex: ensures 10 digits
    .required("کدملی ضروری است"),
  role: yup.string().required(),
  email: yup.string().email("لطفا ایمیل با فرمت صحیح وارد کنید"),
  phoneNumber: yup
    .string()
    .matches(/^\d{11}$/, "شماره تماس باید 11 رقم باشد") // Regex: ensures 11 digits
    .required("شماره تماس ضروری است"),
  password: yup.string().required().min(6, " رمز باید حداقل 6 کاراکتر باشد"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "رمز عبور و تایید رمز باید یکسان باشند") // Match with password
    .required("لطفا تایید رمز عبور را وارد کنید"),
});

const Register: NextPage = () => {
  const router = useRouter();

  const initialValues: RegisterFormValues = {
    name: "",
    code: "",
    role: roles[0].name,
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: RegisterFormValues) => {
    const checkUserUrl = `http://localhost:8000/users/getUserByCode?code=${values.code}`;
    const createUserUrl = "http://localhost:8000/users/createUser";

    try {
      // Step 1: Check if the user exists
      const checkResponse = await fetch(checkUserUrl, {
        method: "GET",
      });

      if (checkResponse.ok) {
        const userExists = await checkResponse.json(); // Assuming the API returns `true` or `false`

        if (userExists) {
          alert("کاربر با این کدملی پیدا شد"); // User already exists
          return; // Stop further execution if the user exists
        }
      } else {
        alert("خطا در بررسی کاربر");
        return; // Stop further execution if the check failed
      }

      // Step 2: Create the user if they do not exist
      const createResponse = await fetch(createUserUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await createResponse.json();
      console.log("Response:", result);

      if (createResponse.ok) {
        router.push("/home/home"); // Redirect if successful
      } else {
        alert("ثبت نام انجام نشد"); // Registration failed
      }
    } catch (error) {
      console.error("Error:", error);
      alert("خطا در سرور");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-3xl/9 font-bold tracking-tight text-blue-700 ">
            ساخت حساب کاربری در سامانه میهن
          </h2>

          <p className="mt-10 text-center text-sm/6 text-blue-500">
            عضو سامانه هستید؟{" "}
            <a
              href="/"
              className="font-semibold text-blue-700 hover:text-blue-500"
            >
              وارد شوید
            </a>
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={registerFormValidationSchema}
          >
            {({ values, setFieldValue }) => (
              <Form className="space-y-6">
                <div>
                  <Input name="name" label="نام و نام خانوادگی" />
                </div>

                <div>
                  <Input name="code" label="کدملی" />
                </div>

                <Listbox
                  value={roles.find((role) => role.name === values.role)} // Find the role object based on the role name
                  onChange={
                    (selectedRole) => setFieldValue("role", selectedRole.name) // Store only the name in the form state
                  }
                >
                  <div className="relative mt-2">
                    <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pl-3 pr-2 text-left text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm">
                      <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                        <span className="block truncate">
                          {/* Display the label for the currently selected role */}
                          {roles.find((role) => role.name === values.role)
                            ?.label || "انتخاب کنید"}
                        </span>
                      </span>
                      <ChevronUpDownIcon
                        aria-hidden="true"
                        className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                      />
                    </ListboxButton>

                    <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                      {roles.map((role) => (
                        <ListboxOption
                          key={role.id}
                          value={role} // Pass the entire role object as the value
                          className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
                        >
                          <div className="flex items-center">
                            <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                              {role.label}
                            </span>
                          </div>
                          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-[&:not([data-selected])]:hidden group-data-[focus]:text-white">
                            <CheckIcon aria-hidden="true" className="size-5" />
                          </span>
                        </ListboxOption>
                      ))}
                    </ListboxOptions>
                  </div>
                </Listbox>

                <div>
                  <Input name="email" type="email" label="ایمیل" />
                </div>

                <div>
                  <Input name="phoneNumber" label="شماره تماس" />
                </div>

                <div>
                  <Input name="password" type="password" label="رمز" />
                </div>

                <div>
                  <Input
                    name="confirmPassword"
                    type="password"
                    label="تایید رمز عبور"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    ثبت‌ نام
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Register;
