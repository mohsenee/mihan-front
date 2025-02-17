import { FormikProps, Form } from "formik";
import Input from "../../shared/form/input";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

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
    name: "Data",
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

const InnerRegisterForm = (probs: FormikProps<RegisterFormValues>) => {
  return (
    <></>
    // <Form className="space-y-6">
    //   <div>
    //     <Input name="name" label="نام و نام خانوادگی" />
    //   </div>

    //   <div>
    //     <Input name="code" label="کدملی" />
    //   </div>

    //   <Listbox
    //     value={roles.find((role) => role.name === values.role)} // Find the role object based on the role name
    //     onChange={
    //       (selectedRole) => setFieldValue("role", selectedRole.name) // Store only the name in the form state
    //     }
    //   >
    //     <div className="relative mt-2">
    //       <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pl-3 pr-2 text-left text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm">
    //         <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
    //           <span className="block truncate">
    //             {/* Display the label for the currently selected role */}
    //             {roles.find((role) => role.name === values.role)?.label ||
    //               "انتخاب کنید"}
    //           </span>
    //         </span>
    //         <ChevronUpDownIcon
    //           aria-hidden="true"
    //           className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
    //         />
    //       </ListboxButton>

    //       <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
    //         {roles.map((role) => (
    //           <ListboxOption
    //             key={role.id}
    //             value={role} // Pass the entire role object as the value
    //             className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
    //           >
    //             <div className="flex items-center">
    //               <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
    //                 {role.label}
    //               </span>
    //             </div>
    //             <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-[&:not([data-selected])]:hidden group-data-[focus]:text-white">
    //               <CheckIcon aria-hidden="true" className="size-5" />
    //             </span>
    //           </ListboxOption>
    //         ))}
    //       </ListboxOptions>
    //     </div>
    //   </Listbox>

    //   <div>
    //     <Input name="email" type="email" label="ایمیل" />
    //   </div>

    //   <div>
    //     <Input name="phoneNumber" label="شماره تماس" />
    //   </div>

    //   <div>
    //     <Input name="password" type="password" label="رمز" />
    //   </div>

    //   <div>
    //     <Input name="confirmPassword" type="password" label="تایید رمز عبور" />
    //   </div>

    //   <div>
    //     <button
    //       type="submit"
    //       className="flex w-full justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    //     >
    //       ثبت‌ نام
    //     </button>
    //   </div>
    // </Form>
  );
};
