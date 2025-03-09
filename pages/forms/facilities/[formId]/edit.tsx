import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import Select, { OnChangeValue } from "react-select"; // Import OnChangeValue to type the onChange handler
import FacilitiesDynamicTable from "@/app/components/forms/dynamicTables/facilitiesDynamicTable";
import { useRouter } from "next/router";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import Breadcrumb from "@/app/components/Breadcrumbs/Breadcrumb";

const role = "Facilities";

interface NameOption {
  label: string;
  value: string;
}

interface FormState {
  reportDate: string;
  day: string;
  comments: string;
  names: string[];
}

const FacilitiesReportForm: NextPage = () => {
  const router = useRouter();
  if (!router.isReady) {
    return <span>page is loading</span>;
  }

  const [currentDate, setCurrentDate] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");
  const [initialNames, setInitialNames] = useState<string[]>([]);
  const [namesOptions, setNamesOptions] = useState<NameOption[]>([]);
  const [comment, setComment] = useState<string>("");
  const [createdBy, setCreatedBy] = useState<string>("");
  const [userName, setUserName] = useState<string | null>("");
  const [dynamicTableData, setDynamicTableData] = useState<any[]>([
    {
      centerName: "",
      floor: "",
      station: "",
      EMPM: "",
      code: "",
      equipmentName: "",
      equipmentCode: "",
      name: "",
      description: "",
      items: "",
      itemsType: "",
      itemsNumber: "",
    },
  ]);

  const daysOfWeek = [
    { value: "0", label: "یکشنبه" },
    { value: "1", label: "دوشنبه" },
    { value: "2", label: "سه‌شنبه" },
    { value: "3", label: "چهارشنبه" },
    { value: "4", label: "پنج‌شنبه" },
    { value: "5", label: "جمعه" },
    { value: "6", label: "شنبه" },
  ];

  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");

    if(localStorage.getItem("userName")){
      setUserName(localStorage.getItem("userName"))
    }
    else{
      alert("لطفا اول وارد سایت شوید");
      router.push("/");
      return;
    }

    const fetchForm = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/forms/getFormById?formId=${router.query.formId}&role=${role}`
        );
        const data = await response.json();
        setInitialNames(data.names.split(", "));
        setCurrentDate(data.reportDate);
        const day = daysOfWeek.find((d) => d.value === data.day.toString());
        setCurrentDay(day ? day.label : "Unknown");
        setComment(data.comments);
        setCreatedBy(data.createdBy);

        setDynamicTableData(data.reports);
      } catch (error) {
        console.error("Failed to fetch shift names:", error);
      }
    };

    fetchForm();

    const fetchNames = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/users/getUserByRole?role=${role}`
        );
        const data = await response.json();

        setNamesOptions(
          data
            .filter((name: string) => !initialNames.includes(name))
            ?.map((name: string) => ({ label: name, value: name }))
        ); // Map names to label and value
      } catch (error) {
        console.error("Failed to fetch shift names:", error);
      }
    };

    fetchNames();
  }, []);

  const handleSubmit = async (values: FormState) => {
    const findDayOfWeek = daysOfWeek.find((day) => day.label === values.day);
    const day = findDayOfWeek ? findDayOfWeek.value : "";

    const mappedValues: {
      [key: string]: string | number | boolean | any[] | null;
    } = {
      reportDate: values.reportDate,
      day: day,
      names: values.names.join(", "),
      comments: values.comments,
      reports: dynamicTableData,
      createdBy: createdBy,
      updatedBy: userName
    };

    const requestValue = {
      formId: router.query.formId,
      role: role,
      form: mappedValues,
    };

    try {
      console.log("Mapped Values:", mappedValues);
      const updateForm = await fetch(
        `http://localhost:8000/forms/updateFormById/${router.query.formId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestValue),
        }
      );

      const result = await updateForm.json();
      console.log("Response:", result);
      
      if (updateForm.ok) {
        alert("Data sent successfully!");
        router.push(`/forms/${role.toLowerCase()}/reports`);
      } else {
        alert("Failed to send data.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send data.");
    }
  };

  const validationSchema = Yup.object({
    reportDate: Yup.string().required("تاریخ گزارش الزامی است"),
    day: Yup.string().required("روز هفته الزامی است"),
    names: Yup.array().min(1, "اسامی شیفت الزامی است"),
  });

  return (
   <DefaultLayout>
    <Breadcrumb
        pages={[
          {
            name: "گزارشات روزانه",
            path: `/forms/${role.toLowerCase()}/reports`,
          },
          {
            name: "به روزرسانی گزارش ",
            path: `/forms/${role.toLowerCase()}/get`,
            disabled: true
          },
        ]}
      />
       <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/image/11.png')" }}
    >
      <div className="w-4/5 max-w-15xl bg-white p-6 rounded-lg shadow-lg opacity-95 my-10">
        <Formik
          initialValues={{
            reportDate: currentDate,
            day: currentDay,
            comments: comment,
            names: initialNames,
          }}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
          validateOnSubmit={true}
        >
          {({ setFieldValue, values, validateField, isValid }) => (
            <Form>
              <h4 className="text-center mb-4 font-bold text-lg">
                فــرم ثبت عملكـــرد كليـــه امور اجرايي PM و EM تاسیسات
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Report Date */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    تاریخ گزارش
                  </label>
                  <Field
                    value={currentDate}
                    className="w-full border rounded-md p-2"
                  />
                  <ErrorMessage
                    name="reportDate"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* Day of Week */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    روز هفته
                  </label>
                  <Field
                    value={currentDay}
                    className="w-full border rounded-md p-2"
                  />
                  <ErrorMessage
                    name="day"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* Shift Names */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    اسامی شیفت
                  </label>
                  <Select
                    isMulti
                    options={namesOptions}
                    value={values.names.map((name) => ({
                      label: name,
                      value: name,
                    }))}
                    onChange={(selected: OnChangeValue<any, any>) => {
                      setFieldValue(
                        "names",
                        selected ? selected.map((opt: any) => opt.value) : []
                      );
                    }}
                    className="w-full border rounded-md p-2"
                  />
                  <ErrorMessage
                    name="names"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              </div>

              {/* Checklist Section */}
              <div className="mt-6">
                <FacilitiesDynamicTable
                  onTableDataChange={setDynamicTableData}
                  initialData={dynamicTableData}
                  isReadOnly={false}
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium mb-1">
                  توضیحات
                </label>
                <Field
                  as="textarea"
                  name="comments"
                  rows={3}
                  className="w-full border rounded-md p-2"
                />
                <ErrorMessage
                  name="comments"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="mt-4 text-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  disabled={!isValid}
                >
                  به روز رسانی
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
   </DefaultLayout>
  );
};

export default FacilitiesReportForm;
