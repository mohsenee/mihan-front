import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import Select, { OnChangeValue } from "react-select"; // Import OnChangeValue to type the onChange handler
import DatePicker, { DateObject } from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/mobile.css";
import persian from "react-date-object/calendars/persian";
import fa from "react-date-object/locales/persian_fa";
import FacilitiesDynamicTable from "@/app/components/forms/dynamicTables/facilitiesDynamicTable";
import { useRouter } from "next/router";
import moment, { Moment } from "moment-jalaali";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import Breadcrumb from "@/app/components/Breadcrumbs/Breadcrumb";

const role = "Facilities";

const apiUrl = process.env.NEXT_PUBLIC_API_URL

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

interface TableRow {
  centerName: string;
  floor: string;
  station: string;
  EMPM: string;
  code: string;
  equipmentName: string;
  equipmentCode: string;
  name: string;
  description: string;
  items: string;
  itemsType: string;
  itemsNumber: string;
}

const FacilitiesReportForm: NextPage = () => {

  const [currentDate, setCurrentDate] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");
  const [namesOptions, setNamesOptions] = useState<NameOption[]>([]);
  const [dynamicTableData, setDynamicTableData] = useState<TableRow[]>([
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
  const [userName, setUserName] = useState<string | null>("");

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
    const persianDateString = router.query.date;

    const convertPersianDigitsToEnglish = (str: string): string => {
      const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
      return str.replace(/[۰-۹]/g, (match) =>
        persianDigits.indexOf(match).toString()
      );
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
      console.log("Formatted Date:", formattedDate); // Debugging log

      // Parse the date as a Jalaali date using the correct format
      const persianDate = moment(formattedDate, "jYYYY/jMM/jDD").locale("fa");
      console.log("Parsed Date:", persianDate.format("jYYYY/jMM/jDD")); // Debugging log

      setCurrentDate(persianDate.format("jYYYY/jMM/jDD"));
      const dayIndex = persianDate.day();
      setCurrentDay(dayIndex.toString());
    }

    const fetchNames = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/users/getUserByRole?role=${role}`
        );
        const data = await response.json(); // Assuming data is an array of names: ["John", "Doe"]
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

  const router = useRouter();
    if (!router.isReady) {
      return <span>page is loading</span>;
    }

  const handleSubmit = async (values: FormState) => {
    const mappedValues: {
      [key: string]: string | number | boolean | TableRow[] | null;
    } = {
      reportDate: values.reportDate,
      day: values.day,
      names: values.names.join(", "),
      comments: values.comments,
      reports: dynamicTableData,
      createdBy: userName,
    };

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

  const handleDateChange = (date: DateObject | null, setFieldValue: (field: string, value: string) => void) => {
    if (date) {
      // Convert DateObject to Moment
      const momentDate: Moment = moment(date.toString(), "YYYY/MM/DD");
  
      const formattedDate = momentDate.format("YYYY/MM/DD");
      setFieldValue("reportDate", formattedDate);
  
      // Get the day index from the selected date
      const dayIndex = momentDate.toDate().getDay(); // You can also use momentDate.day() if it's more accurate
      setFieldValue("day", dayIndex.toString());
    } else {
      setFieldValue("reportDate", "");
      setFieldValue("day", "");
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
            {({ setFieldValue, values, isValid }) => (
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
                    <Field name="reportDate">
                      {({ field }: FieldProps) => (
                        <DatePicker
                          {...field}
                          value={field.value || currentDate}
                          onChange={(date: DateObject | null) => handleDateChange(date, setFieldValue)}
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
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
                      onChange={(selected: OnChangeValue<NameOption, true>) => {
                        setFieldValue(
                          "names",
                          selected ? selected.map((opt: NameOption) => opt.value) : []
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
                    initialData={dynamicTableData} // Pass initial empty rows if needed
                    isReadOnly={false} // Set to false to allow editing
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

export default FacilitiesReportForm;
