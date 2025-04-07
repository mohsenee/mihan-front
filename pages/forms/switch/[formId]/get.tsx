import { NextPage } from "next";
import React, { CSSProperties, useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { useRouter } from "next/router";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import Breadcrumb from "@/app/components/Breadcrumbs/Breadcrumb";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";

const role = "Switch";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface FormState {
  reportDate: string;
  day: string;
  comments: string;
  names: string[];
  createdBy: string;
  checklistItems: ChecklistItem[];
  capacityItems: CapacityItem[];
}

interface ChecklistItem {
  id: number;
  task: string;
  label: string;
  selected: boolean;
}

interface CapacityItem {
  id: number;
  task: string;
  label: string;
  quantity: string;
}

const initialCapacityItems: CapacityItem[] = [
  { id: 1, task: "temperature", label: "دما", quantity: "" },
  { id: 2, task: "humidity", label: "رطوبت", quantity: "" },
  { id: 3, task: "bandwidth", label: "میزان پهنای باند مصرفی", quantity: "" },
  { id: 4, task: "hf_archive", label: "HF.ARCHIVE", quantity: "" },
  { id: 5, task: "sg_oper", label: "SG.OPER", quantity: "" },
  { id: 6, task: "tm_mnt_port", label: "TM.MNT.PORT", quantity: "" },
  { id: 7, task: "tm_mnt_pcm", label: "TM.MNT.PCM", quantity: "" },
];

const initialChecklistItems = [
  {
    id: 1,
    task: "switch_status",
    label: "وضعیت تجهیزات سوئیچ",
    selected: true,
  },
  { id: 2, task: "data_status", label: "وضعیت تجهیزات دیتا", selected: true },
  { id: 3, task: "log_review", label: "بررسی LOG سیستم", selected: true },
  {
    id: 4,
    task: "network_traffic",
    label: "وضعیت ترافیک شبکه و UpLinks",
    selected: true,
  },
  {
    id: 5,
    task: "sensor_status",
    label: "وضعیت سنسور های شرایط پیرامونی",
    selected: true,
  },
  {
    id: 6,
    task: "RCVTrafficFile",
    label: "دریافت فایل ترافیکی",
    selected: false,
  },
  {
    id: 7,
    task: "ProcessTrafficFile",
    label: "پردازش فایل ترافیکی",
    selected: false,
  },
  {
    id: 8,
    task: "RCVChargingFile",
    label: "دریافت فایل شارژینگ",
    selected: false,
  },
];

const SwitchReportForm: NextPage = () => {
  const router = useRouter();

  if (!router.isReady) {
    return <span>page is loading</span>;
  }

  const [currentDate, setCurrentDate] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");
  const [names, setNames] = useState<string>("");
  const [createdBy, setCreatedBy] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [capacityItems, setCapacityItems] = useState(initialCapacityItems);
  const [checklistItems, setChecklistItems] = useState(initialChecklistItems);

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

    const fetchForm = async () => {
      try {
        const token = localStorage.getItem("access_token");

        const response = await fetch(
          `${apiUrl}/forms/getFormById?formId=${router.query.formId}&role=${role}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`, // Attach the JWT token
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        setNames(data.names);
        setComment(data.comments);
        setCurrentDate(data.reportDate);
        const day = daysOfWeek.find((d) => d.value === data.day.toString());
        setCurrentDay(day ? day.label : "Unknown");
        setCreatedBy(data.createdBy);

        const updatedCapacityItems = capacityItems.map((item) => ({
          ...item,
          quantity: data[item.task] || "0", // Use "0" as a default if missing
        }));

        setCapacityItems(updatedCapacityItems);

        const updatedChecklistItems = checklistItems.map((item) => ({
          ...item,
          selected: data[item.task],
        }));

        setChecklistItems(updatedChecklistItems);
      } catch (error) {
        console.error("Failed to fetch shift names:", error);
      }
    };

    fetchForm();
  }, []);

  const handleSubmit = async (values: FormState) => {
    const mappedValues: { [key: string]: string | boolean | number } = {
      reportDate: values.reportDate,
      day: values.day,
      names: values.names.join(", "), // Join names into a string
      comments: values.comments,
    };

    values.checklistItems.forEach((item) => {
      mappedValues[item.task] = item.selected;
    });

    values.capacityItems.forEach((item) => {
      mappedValues[item.task] = item.quantity;
    });

    try {
      console.log("Mapped Values:", mappedValues);
      const createForm = await fetch(
        `${apiUrl}/forms/createSwithForm`,
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
    capacityItems: Yup.array()
      .of(
        Yup.object({
          quantity: Yup.number()
            .typeError("مقدار باید عدد باشد") // Show error if not a number
            .positive("مقدار باید بزرگتر از صفر باشد") // Show error if negative or zero
            .required("این فیلد الزامی است"), // Show error if empty
        })
      )
      .required("ظرفیت‌ها الزامی هستند")
      .min(1, "باید حداقل یک ظرفیت وارد شود"), // Show error if the array is empty
  });

  const handleDownloadPDF = async () => {
    const formElement = document.getElementById("form-container");
    if (!formElement) return console.error("Form not found!");

    try {
      const imgData = await domtoimage.toPng(formElement);
      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 190;
      const imgHeight =
        (formElement.clientHeight * imgWidth) / formElement.clientWidth;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save(`SwitchReport${currentDate}.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    }
  };
  return (
    <DefaultLayout>
      <Breadcrumb
        pages={[
          {
            name: "گزارشات روزانه",
            path: `/forms/${role.toLowerCase()}/reports`,
          },
          {
            name: "مشاهده گزارش ",
            path: `/forms/${role.toLowerCase()}/get`,
            disabled: true,
          },
        ]}
      />

      <div className="text-center mt-4">
        <button
          onClick={handleDownloadPDF}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600"
        >
          دانلود PDF
        </button>
      </div>

      <div
        id="form-container"
        className="flex justify-center items-center min-h-screen bg-cover bg-center"
        // style={{ backgroundImage: "url('/image/11.png')" }}
      >
        <div className="w-3/5 max-w-4xl bg-white p-6 rounded-lg shadow-lg opacity-95 my-10">
          <Formik
            initialValues={{
              reportDate: currentDate,
              day: currentDay,
              comments: "",
              names: [],
              createdBy: createdBy,
              checklistItems: checklistItems,
              capacityItems: capacityItems,
            }}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={handleSubmit}
            validateOnSubmit={true}
          >
            {({ setFieldValue, values, validateField, isValid }) => (
              <Form>
                <h4 className="text-center mb-4 font-bold text-lg">
                  فرم گزارش روزانه دیتا و سوئیچ
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {/* Report Date */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      تاریخ گزارش
                    </label>
                    <Field
                      name="reportDate"
                      value={currentDate}
                      className={`w-full border rounded-md p-2`}
                    ></Field>
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
                      name="day"
                      value={currentDay}
                      className="w-full border rounded-md p-2"
                    ></Field>
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

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      نوشته شده توسط:
                    </label>
                    <Field
                      value={createdBy}
                      className="w-full border rounded-md p-2"
                    />
                    <ErrorMessage
                      name="createdBy"
                      component="div"
                      className="text-red-500 text-xs mt-1"
                    />
                  </div>
                </div>

                {/* Checklist Section */}
                <div className="mt-6">
                  <h5 className="font-bold mb-2">
                    چک لیست وضعیت سخت افزاری و نرم افزاری
                  </h5>
                  <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 p-2 text-center bg-gray-200">
                          خلاصه وضعیت سیستم
                        </th>
                        <th className="border border-gray-300 p-2 text-center bg-gray-200">
                          نرمال
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {values.checklistItems.map((item, index) => (
                        <tr
                          key={item.id}
                          className="odd:bg-gray-50 even:bg-gray-100"
                        >
                          <td className="border border-gray-300 p-2">
                            {item.label}
                          </td>
                          <td className="border border-gray-300 p-2 text-center">
                            <input
                              type="checkbox"
                              checked={item.selected}
                              onChange={() =>
                                setFieldValue(
                                  `checklistItems[${index}].selected`,
                                  !item.selected
                                )
                              }
                              className="w-5 h-5"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Capacity Section */}

                <div className="mt-6">
                  <h5 className="font-bold mb-2">شرایط محیطی و ظرفیت فایل</h5>
                  <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 p-2 text-center bg-gray-200">
                          شرایط محیطی
                        </th>
                        <th className="border border-gray-300 p-2 text-center bg-gray-200">
                          مقدار
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {values.capacityItems.map((item, index) => (
                        <tr
                          key={item.id}
                          className="odd:bg-gray-50 even:bg-gray-100"
                        >
                          <td className="border border-gray-300 p-2">
                            {item.label}
                          </td>
                          <td className="border border-gray-300 p-2">
                            <Field
                              name={`capacityItems[${index}].quantity`}
                              type="text"
                              value={item.quantity}
                              onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                const value = e.target.value;
                                setFieldValue(
                                  `capacityItems[${index}].quantity`,
                                  value
                                );
                                validateField(
                                  `capacityItems[${index}].quantity`
                                );
                              }}
                              className="w-full border rounded-md p-2"
                            />
                            <ErrorMessage
                              name={`capacityItems[${index}].quantity`}
                              component="div"
                              className="text-red-500 text-xs mt-1"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium mb-1">
                    گزارش
                  </label>
                  <Field
                    as="textarea"
                    name="comments"
                    value={comment}
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
    </DefaultLayout>
  );
};

export default SwitchReportForm;
