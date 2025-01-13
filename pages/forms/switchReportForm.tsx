import { NextPage } from "next";
import React, { useEffect } from "react";
import { Formik, Field, Form, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/mobile.css";
import persian from "react-date-object/calendars/persian";
import fa from "react-date-object/locales/persian_fa";

interface FormState {
  reportDate: string;
  dayOfWeek: string;
  comments: string;
  shiftName: string;
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

const SwitchReportForm: NextPage = () => {
  const checklistItems: ChecklistItem[] = [
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
  ];

  const capacityItems: CapacityItem[] = [
    { id: 1, task: "temperature", label: "دما", quantity: "" },
    { id: 2, task: "humidity", label: "رطوبت", quantity: "" },
    { id: 3, task: "bandwidth", label: "میزان پهنای باند مصرفی", quantity: "" },
    { id: 4, task: "hf_archive", label: "HF.ARCHIVE", quantity: "" },
    { id: 5, task: "sg_oper", label: "SG.OPER", quantity: "" },
    { id: 6, task: "tm_mnt_port", label: "TM.MNT.PORT", quantity: "" },
    { id: 7, task: "tm_mnt_pcm", label: "TM.MNT.PCM", quantity: "" },
  ];

  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
  }, []);

  const handleSubmit = async (values: FormState) => {
    const mappedValues = {
      reportDate: values.reportDate,
      dayOfWeek: values.dayOfWeek,
      shiftName: values.shiftName,
      comments: values.comments,
      checklistItems: values.checklistItems.map((item) => ({
        id: item.id,
        task: item.task,
        selected: item.selected,
      })),
      capacityItems: values.capacityItems.map((item) => ({
        id: item.id,
        task: item.task,
        quantity: item.quantity,
      })),
    };

    try {
      console.log("Mapped Values:", mappedValues);
      alert("Data sent successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send data.");
    }
  };

  const validationSchema = Yup.object({
    reportDate: Yup.string().required("تاریخ گزارش الزامی است"),
    dayOfWeek: Yup.string().required("روز هفته الزامی است"),
    shiftName: Yup.string().required("اسامی شیفت الزامی است"),
    comments: Yup.string().required("گزارش الزامی است"),
  });

  const daysOfWeek = [
    { label: "شنبه", value: "Saturday" },
    { label: "یک‌شنبه", value: "Sunday" },
    { label: "دوشنبه", value: "Monday" },
    { label: "سه‌شنبه", value: "Tuesday" },
    { label: "چهارشنبه", value: "Wednesday" },
    { label: "پنج‌شنبه", value: "Thursday" },
    { label: "جمعه", value: "Friday" },
  ];

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/image/11.png')",
      }}
    >
      <div className="w-3/5 max-w-4xl bg-white p-6 rounded-lg shadow-lg opacity-95 my-10">
        <Formik
          initialValues={{
            reportDate: "",
            dayOfWeek: "",
            comments: "",
            shiftName: "",
            checklistItems: checklistItems,
            capacityItems: capacityItems,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <h4 className="text-center mb-4 font-bold text-lg">
                فرم گزارش روزانه دیتا و سوئیچ
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Report Date */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    تاریخ گزارش
                  </label>
                  <Field name="reportDate">
                    {({ field, form }: FieldProps) => {
                      // Handle value properly
                      const selectedDate = field.value;
                       
                      return (
                        <DatePicker
                          {...field}
                          value={selectedDate} // Ensure the Date object is passed to DatePicker
                          onChange={(date: any) => {
                            const formattedDate = date
                              ? date.format("YYYY/MM/DD")
                              : "";
                            form.setFieldValue("reportDate", formattedDate); // Update Formik with the formatted date string
                          }}
                          format="YYYY/MM/DD" // Use Persian date format
                          placeholder="تاریخ را انتخاب کنید"
                          className="w-full border rounded-md p-2"
                          locale={fa} // Set locale to Persian
                          calendar={persian} // Use Persian calendar
                        />
                      );
                    }}
                  </Field>
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
                    as="select"
                    name="dayOfWeek"
                    className="w-full border rounded-md p-2"
                  >
                    <option value="" label="انتخاب روز هفته" />
                    {daysOfWeek.map((day) => (
                      <option
                        key={day.value}
                        value={day.value}
                        label={day.label}
                      />
                    ))}
                  </Field>
                  <ErrorMessage
                    name="dayOfWeek"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                {/* Shift Name */}
                <div>
                  <label className="block text-sm font-medium mb-1">
                    اسامی شیفت
                  </label>
                  <Field
                    type="text"
                    name="shiftName"
                    className="w-full border rounded-md p-2"
                  />
                  <ErrorMessage
                    name="shiftName"
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
                              setFieldValue(
                                `capacityItems[${index}].quantity`,
                                e.target.value
                              );
                            }}
                            className="w-full border rounded-md p-2"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Comments Section */}
              <div className="mt-6">
                <label className="block text-sm font-medium mb-1">گزارش</label>
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

              {/* Submit Button */}
              <div className="mt-4 text-center">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  ثبت
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SwitchReportForm;
