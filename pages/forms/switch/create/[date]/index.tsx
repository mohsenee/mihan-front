import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import Select, { OnChangeValue } from "react-select";
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/mobile.css";
import persian from "react-date-object/calendars/persian";
import fa from "react-date-object/locales/persian_fa";
import { useRouter } from "next/router";
import moment from "moment-jalaali";
import Breadcrumb from "@/app/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import FileUpload from "@/app/components/FileUpload";

const role = "Switch";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface NameOption {
  label: string;
  value: string;
}

interface FormState {
  reportDate: string;
  day: string;
  comments: string;
  names: string[];
  checklistItems: ChecklistItem[];
  capacityItems: CapacityItem[];
  files: string[];
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
  const router = useRouter();

  if (!router.isReady) {
    return <span>page is loading</span>;
  }

  const [currentDate, setCurrentDate] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");
  const [namesOptions, setNamesOptions] = useState<NameOption[]>([]);
  const [userName, setUserName] = useState<string | null>("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadedBase64, setUploadedBase64] = useState<string[]>([]);

  const checklistItems: ChecklistItem[] = [
    {
      id: 1,
      task: "switch_status",
      label: "وضعیت تجهیزات سوئیچ",
      selected: false,
    },
    {
      id: 2,
      task: "data_status",
      label: "وضعیت تجهیزات دیتا",
      selected: false,
    },
    { id: 3, task: "log_review", label: "بررسی LOG سیستم", selected: false },
    {
      id: 4,
      task: "network_traffic",
      label: "وضعیت ترافیک شبکه و UpLinks",
      selected: false,
    },
    {
      id: 5,
      task: "sensor_status",
      label: "وضعیت سنسور های شرایط پیرامونی",
      selected: false,
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

  const capacityItems: CapacityItem[] = [
    { id: 1, task: "temperature", label: "دما", quantity: "" },
    { id: 2, task: "humidity", label: "رطوبت", quantity: "" },
    { id: 3, task: "bandwidth", label: "میزان پهنای باند مصرفی", quantity: "" },
    { id: 4, task: "hf_archive", label: "HF.ARCHIVE", quantity: "" },
    { id: 5, task: "sg_oper", label: "SG.OPER", quantity: "" },
    { id: 6, task: "tm_mnt_port", label: "TM.MNT.PORT", quantity: "" },
    { id: 7, task: "tm_mnt_pcm", label: "TM.MNT.PCM", quantity: "" },
  ];

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
    
    const persianDateString = router.query.date;

    const convertPersianDigitsToEnglish = (str: string): string => {
      const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      return str.replace(/[۰-۹]/g, (match) => persianDigits.indexOf(match).toString());
    };
    
    if (persianDateString) {
      const dateStr = Array.isArray(persianDateString)
        ? persianDateString[0]
        : persianDateString;
    
      // Convert Persian digits to English and replace hyphens with slashes
      const formattedDate = convertPersianDigitsToEnglish(dateStr).replace(
        /-/g,
        "/"
      );
      console.log("Formatted Date:", formattedDate);  // Debugging log
    
      // Parse the date as a Jalaali date using the correct format
      const persianDate = moment(formattedDate, "jYYYY/jMM/jDD").locale("fa");
      console.log("Parsed Date:", persianDate.format("jYYYY/jMM/jDD"));  // Debugging log
    
      setCurrentDate(persianDate.format("jYYYY/jMM/jDD"));
      const dayIndex = persianDate.day(); 
      setCurrentDay(dayIndex.toString()); 
    }

    const fetchNames = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/users/getUserByRole?role=${role}`
        );
        const data = await response.json();
        setNamesOptions(
          data.map((name: string) => ({ label: name, value: name }))
        ); // Map names to label and value
      } catch (error) {
        console.error("Failed to fetch shift names:", error);
      }
    };

    fetchNames();

    if (localStorage.getItem("userName")) {
      setUserName(localStorage.getItem("userName"));
    } else {
      alert("لطفا اول وارد سایت شوید");
      router.push("/");
      return;
    }
  }, []);


  const handleSubmit = async (values: FormState) => {
    const mappedValues: { [key: string]: string | boolean | number | null | File[] } = {
      reportDate: values.reportDate,
      day: values.day,
      names: values.names.join(", "),
      comments: values.comments,
      createdBy: userName,

    };

    values.checklistItems.forEach((item) => {
      mappedValues[item.task] = item.selected;
    });

    values.capacityItems.forEach((item) => {
      mappedValues[item.task] = item.quantity;
    });

    mappedValues.files = uploadedFiles;
  

    try {
      const checkExistForm = await fetch(
        `${apiUrl}/forms/getFormsByRoleAndDate?role=${role}&reportDate=${values.reportDate}`
      );
      const data = await checkExistForm.json();

      if (data) {
        alert("قبلا در این تاریخ گزارش ثبت شده است");
      } else {
        const createdForm = await fetch(
          `${apiUrl}/forms/createForm`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Include the JWT token in the headers
            },
            body: JSON.stringify({ role: role, form: mappedValues }),
          }
        );

        if (createdForm.ok) {
          alert("Data sent successfully!");
          router.push(`/forms/${role.toLowerCase()}/reports`);
        } else {
          alert("Failed to send data.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send data.");
    }
  };

  const handleDateChange = (date: any, setFieldValue: any) => {
    const formattedDate = date ? date.format("YYYY/MM/DD") : "";
    setFieldValue("reportDate", formattedDate);

    // Get the day index from the selected date
    const dayIndex = date ? date.toDate().getDay() : new Date().getDay();
    setFieldValue("day", dayIndex.toString());
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

  const handleFilesUploaded = (files: File[]) => {
    setUploadedFiles(files);
  
    // Convert files to Base64 and update the Base64 state
    const base64List: string[] = [];
    files.forEach((file, index) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        base64List[index] = reader.result as string;
        if (base64List.length === files.length) {
          setUploadedBase64(base64List);  // Update base64 only after all files are converted
        }
      };
      reader.readAsDataURL(file);
    });
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
            name: "گزارش جدید",
            path: `/forms/${role.toLowerCase()}/create`,
            disabled: true,
          },
        ]}
      />

      <div
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
              checklistItems: checklistItems,
              capacityItems: capacityItems,
              files: []
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Report Date */}
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      تاریخ گزارش
                    </label>
                    <Field name="reportDate">
                      {({ field, form }: FieldProps) => (
                        <DatePicker
                          {...field}
                          value={field.value || currentDate}
                          onChange={(date: any) =>
                            handleDateChange(date, setFieldValue)
                          }
                          format="YYYY/MM/DD"
                          placeholder="تاریخ را انتخاب کنید"
                          className="w-full border rounded-md p-2"
                          locale={fa}
                          calendar={persian}
                        />
                      )}
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
                      name="day"
                      value={values.day || currentDay}
                      onChange={(e: any) =>
                        setFieldValue("day", e.target.value)
                      }
                      className="w-full border rounded-md p-2"
                    >
                      {daysOfWeek.map((day) => (
                        <option key={day.value} value={day.value}>
                          {day.label}
                        </option>
                      ))}
                    </Field>
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

                <FileUpload onFilesUploaded={handleFilesUploaded} />

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
                            <Field
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
                    ثبت
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

export default SwitchReportForm;
