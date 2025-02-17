import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import Select, { OnChangeValue } from "react-select"; // Import OnChangeValue to type the onChange handler
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/mobile.css";
import persian from "react-date-object/calendars/persian";
import fa from "react-date-object/locales/persian_fa";
import FacilitiesDynamicTable from "@/app/components/forms/dynamicTables/facilitiesDynamicTable";
import { useRouter } from "next/router";


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
  const [names, setNames] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [dynamicTableData, setDynamicTableData] = useState<any[]>([{centerName: "", floor: "", station: "", EMPM: "", code: "", equipmentName:'', equipmentCode: "" , name: "", description: "", items: "", itemsType: "", itemsNumber: ""}]);

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
    // Only run on the client
    document.documentElement.setAttribute("dir", "rtl");

    const fetchForm = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/forms/getFormById?formId=${router.query.formId}&role=Facilities`
        );
        const data = await response.json();
        setNames(data.names);
        setCurrentDate(data.reportDate);
        const day = daysOfWeek.find((d) => d.value === data.day.toString());
        setCurrentDay(day ? day.label : "Unknown");
        setComment(data.comments);
        setDynamicTableData(data.reports);
      } catch (error) {
        console.error("Failed to fetch shift names:", error);
      }
    };

    fetchForm();
  }, []);


  const handleSubmit = async (values: FormState) => {
    const mappedValues: {
      [key: string]: string | number | boolean | any[];
    } = {
      reportDate: values.reportDate,
      day: values.day,
      names: values.names.join(", "),
      comments: values.comments,
      reports: dynamicTableData,
    };

    try {
      console.log("Mapped Values:", mappedValues);
      const createForm = await fetch(
        "http://localhost:8000/forms/createFacilitiesForm",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(mappedValues),
        }
      );

      const result = await createForm.json();
      console.log("Response:", result);
      alert("Data sent successfully!");
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
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/image/11.png')" }}
    >
      <div className="w-4/5 max-w-15xl bg-white p-6 rounded-lg shadow-lg opacity-95 my-10">
        <Formik
          initialValues={{
            reportDate: currentDate,
            day: currentDay,
            comments: "",
            names: [],
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
                  <Field
                    value={names}
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
              {dynamicTableData.length ? (
                  <FacilitiesDynamicTable
                    onTableDataChange={setDynamicTableData}
                    initialData={dynamicTableData}
                    isReadOnly={true}
                  />
                ) : (
                  ""
                )}
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium mb-1">
                  توضیحات
                </label>
                <Field
                  as="textarea"
                  name="comments"
                  value= {comment}
                  rows={3}
                  className="w-full border rounded-md p-2"
                />
                <ErrorMessage
                  name="comments"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default FacilitiesReportForm;
