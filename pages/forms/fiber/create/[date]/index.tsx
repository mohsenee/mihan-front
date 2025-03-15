import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import Select, { OnChangeValue } from "react-select"; // Import OnChangeValue to type the onChange handler
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/mobile.css";
import persian from "react-date-object/calendars/persian";
import fa from "react-date-object/locales/persian_fa";
import FiberDynamicTable1 from "@/app/components/forms/dynamicTables/fiberDynamicTable1";
import FiberDynamicTable2 from "@/app/components/forms/dynamicTables/fiberDynamicTable2";
import FiberDynamicTable3 from "@/app/components/forms/dynamicTables/fiberDynamicTable3";
import { useRouter } from "next/router";
import moment from "moment-jalaali";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import Breadcrumb from "@/app/components/Breadcrumbs/Breadcrumb";

const role = "Fiber";

// Define the type for names
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

const FiberReportForm: NextPage = () => {
  const router = useRouter();

  if (!router.isReady) {
    return <span>page is loading</span>;
  }

  const [currentDate, setCurrentDate] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");
  const [namesOptions, setNamesOptions] = useState<NameOption[]>([]);
  const [dynamicTableData1, setDynamicTableData1] = useState<any[]>([
    {
      name: "",
      OCDF_plan: "",
      GIS: "",
      fiber_plan: "",
      response: "",
      continuityTest: "",
      route: "",
      Long_UTM: "",
      LAT_UTM: "",
      improvment_security: "",
      fix_failure: "",
      door_cementing: "",
    },
  ]);
  const [dynamicTableData2, setDynamicTableData2] = useState<any[]>([
    {
      routeName: "",
      name: "",
      driver: "",
      startTime: "",
      endTime: "",
      km: "",
      excavation: "",
      excavatorName: "",
      license: "",
      startDate: "",
      endDate: "",
      LONG_UTM: "",
      LAT_UTM: "",
      description: "",
    },
  ]);
  const [dynamicTableData3, setDynamicTableData3] = useState<any[]>([
    {
      contractorName: "",
      status: "",
      phoneContractor: "",
      fromKm: "",
      toKm: "",
      bridgesCount: "",
      polesCount: "",
      pondsCount: "",
      routeLength: "",
      suggestions: "",
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
          `http://localhost:8000/users/getUserByRole?role=${role}`
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
    const mappedValues: {
      [key: string]: string | number | boolean | any[] | null;
    } = {
      reportDate: values.reportDate,
      day: values.day,
      names: values.names.join(", "),
      comments: values.comments,
      table1: dynamicTableData1,
      table2: dynamicTableData2,
      table3: dynamicTableData3,
      createdBy: userName,
    };

    try {
      const checkExistForm = await fetch(
        `http://localhost:8000/forms/getFormsByRoleAndDate?role=${role}&reportDate=${values.reportDate}`
      );
      const data = await checkExistForm.json();

      if (data) {
        alert("قبلا در این تاریخ گزارش ثبت شده است");
      } else {
        const createdForm = await fetch(
          "http://localhost:8000/forms/createForm",
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
        <div className="w-4.5/5 max-w-20xl bg-white p-6 rounded-lg shadow-lg opacity-95 my-10">
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
                  گزارش روزانه فیبرنوری
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

                {/* Checklist Section */}
                <div className="mt-6">
                  <FiberDynamicTable1
                    onTableDataChange={setDynamicTableData1}
                    initialData={dynamicTableData1}
                    isReadOnly={false}
                  />
                  <FiberDynamicTable2
                    onTableDataChange={setDynamicTableData2}
                    initialData={dynamicTableData2}
                    isReadOnly={false}
                  />
                  <FiberDynamicTable3
                    onTableDataChange={setDynamicTableData3}
                    initialData={dynamicTableData3}
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

export default FiberReportForm;
