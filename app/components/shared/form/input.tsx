import { ErrorMessage, Field } from "formik";
import { FC } from "react";

interface InputProps {
    name: string,
    type?: string,
    label?: string,
    inputClassName?: string,
    errorClassName?: string,
    labelClassName?: string
}

const Input: FC<InputProps> = ({
    name,
    type = 'text',
    label,
    inputClassName,
    errorClassName,
    labelClassName
}) => {
  return (
    <>
      <label
        htmlFor={name}
        className={`block text-sm/6 font-medium text-gray-900 text-right ${labelClassName ?? ''}`}
      >
        {label}
      </label>

      <Field
        id={name}
        name={name}
        type={type}
        className={`block w-full rounded-md bg-white mt-2 px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 sm:text-sm/6 ${inputClassName ?? ''}`}
      />
      <ErrorMessage name={name} className={`text-red-500 text-sm ${errorClassName ?? ''}`} component= 'div'/>
    </>
  );
};

export default Input;
