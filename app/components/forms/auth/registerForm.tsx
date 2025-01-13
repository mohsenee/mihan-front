import { FormikProps, Form } from "formik";
import Input from "../../shared/form/input";

interface RegisterFormValues {
    name: string;
    code: string;
    role: string;
    email: string;
    phoneNumber: string;
    password: string;
  }

  const InnerRegisterForm = (probs : FormikProps<RegisterFormValues>) => {
    return (
        <></>
    )
  }