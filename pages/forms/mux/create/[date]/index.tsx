import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage, FieldProps } from "formik";
import * as Yup from "yup";
import Select, { OnChangeValue } from "react-select";
import DatePicker, { DateObject } from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/mobile.css";
import persian from "react-date-object/calendars/persian";
import fa from "react-date-object/locales/persian_fa";
import MuxDynamicTable1 from "@/app/components/forms/dynamicTables/muxDynamicTable1";
import MuxDynamicTable2 from "@/app/components/forms/dynamicTables/muxDynamicTable2";
import { useRouter } from "next/router";
import moment, { Moment } from "moment-jalaali";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import Breadcrumb from "@/app/components/Breadcrumbs/Breadcrumb";

const role = "Mux";

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
  otherItems: OtherItems[];
}

interface ChecklistItem {
  id: number;
  task: string;
  label: string;
  ENMS: boolean;
  SMSW: boolean;
  NM_Alcatel: boolean;
  OTNM: boolean;
  U2000_Huawei: boolean;
  SDH2000: boolean;
  NEC700: boolean;
}

interface OtherItems {
  id: number;
  task: string;
  label: string;
  quantity: string;
}

interface ChecklistValues {
  ENMS: boolean;
  SMSW: boolean;
  NM_Alcatel: boolean;
  OTNM: boolean;
  U2000_Huawei: boolean;
  SDH2000: boolean;
  NEC700: boolean;
}

interface TableRow1 {
  reporter: string;
  systemType: string;
  operation: string;
  startTime: string;
  endTime: string;
  alarm: string;
  description: string;
}

interface TableRow2 {
  stationName: string;
  stationNumber: string;
  names: string;
  timeFromCenter: string;
  arriveTimeToStation: string;
  timeFromStation: string;
  workPermitNumber: string;
  reason: string;
  description: string;
}

const MuxReportForm: NextPage = () => {

  const [currentDate, setCurrentDate] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");
  const [namesOptions, setNamesOptions] = useState<NameOption[]>([]);
  const [userName, setUserName] = useState<string | null>("");
  const [dynamicTableData1, setDynamicTableData1] = useState<TableRow1[]>([
    {
      reporter: "",
      systemType: "",
      operation: "",
      startTime: "",
      endTime: "",
      alarm: "",
      description: "",
    },
  ]);
  const [dynamicTableData2, setDynamicTableData2] = useState<TableRow2[]>([
    {
      stationName: "",
      stationNumber: "",
      names: "",
      timeFromCenter: "",
      arriveTimeToStation: "",
      timeFromStation: "",
      workPermitNumber: "",
      reason: "",
      description: "",
    },
  ]);
  
  const checklistItems: ChecklistItem[] = [
    {
      id: 1,
      task: "alarms",
      label: " بررسی خلاصه آلارم ها",
      ENMS: false,
      SMSW: false,
      NM_Alcatel: false,
      OTNM: false,
      U2000_Huawei: false,
      SDH2000: false,
      NEC700: false,
    },
    {
      id: 2,
      task: "network",
      label: "وضعیت کلی شبکه",
      ENMS: false,
      SMSW: false,
      NM_Alcatel: false,
      OTNM: false,
      U2000_Huawei: false,
      SDH2000: false,
      NEC700: false,
    },
    {
      id: 3,
      task: "NE",
      label: "ارتباط با NE ها",
      ENMS: false,
      SMSW: false,
      NM_Alcatel: false,
      OTNM: false,
      U2000_Huawei: false,
      SDH2000: false,
      NEC700: false,
    },
    {
      id: 4,
      task: "controlCenter",
      label: "ارتباط با مرکز کنترل",
      ENMS: false,
      SMSW: false,
      NM_Alcatel: false,
      OTNM: false,
      U2000_Huawei: false,
      SDH2000: false,
      NEC700: false,
    },
    {
      id: 5,
      task: "routers",
      label: "وضعیت نمایشگرهای روتر",
      ENMS: false,
      SMSW: false,
      NM_Alcatel: false,
      OTNM: false,
      U2000_Huawei: false,
      SDH2000: false,
      NEC700: false,
    },
    {
      id: 6,
      task: "speakerBuzzer",
      label: "روشن بودن speaker و buzzer",
      ENMS: false,
      SMSW: false,
      NM_Alcatel: false,
      OTNM: false,
      U2000_Huawei: false,
      SDH2000: false,
      NEC700: false,
    },
    {
      id: 7,
      task: "antiVirous",
      label: "به روزبودن آنتی ویروس",
      ENMS: false,
      SMSW: false,
      NM_Alcatel: false,
      OTNM: false,
      U2000_Huawei: false,
      SDH2000: false,
      NEC700: false,
    },
    {
      id: 8,
      task: "Ur",
      label: "پیگیری UR ها",
      ENMS: false,
      SMSW: false,
      NM_Alcatel: false,
      OTNM: false,
      U2000_Huawei: false,
      SDH2000: false,
      NEC700: false,
    },
    {
      id: 9,
      task: "UPS",
      label: "وضعیت UPS",
      ENMS: false,
      SMSW: false,
      NM_Alcatel: false,
      OTNM: false,
      U2000_Huawei: false,
      SDH2000: false,
      NEC700: false,
    },
  ];

  const otherItems: OtherItems[] = [
    {
      id: 1,
      task: "dailyReportChecking",
      label: " بررسی دفتر گزارش روزانه",
      quantity: "",
    },
    {
      id: 2,
      task: "phoneLineChecking",
      label: "کنترل خط تلفن اختصاصی مرکز کنترل",
      quantity: "",
    },
    {
      id: 3,
      task: "temperature",
      label: "درجه حرارت سالن سوپروایزری",
      quantity: "",
    },
    {
      id: 4,
      task: "cleaning",
      label: "نظافت سالن سوپروایزری",
      quantity: "",
    },
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
    // Only run on the client
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
        const data = await response.json(); // Assuming data is an array of names: ["John", "Doe"]
        setNamesOptions(
          data.map((name: string) => ({ label: name, value: name }))
        ); // Map names to label and value
      } catch (error) {
        console.error("Failed to fetch shift names:", error);
      }
    };

    fetchNames();

    if(localStorage.getItem("userName")){
      setUserName(localStorage.getItem("userName"))
    }
    else{
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
      [key: string]: string | number | boolean | ChecklistValues | TableRow1[] | TableRow2[] | null;
    } = {
      reportDate: values.reportDate,
      day: values.day,
      names: values.names.join(", "),
      comments: values.comments,
      reports: dynamicTableData1,
      missionReports: dynamicTableData2,
      createdBy: userName
    };

    values.checklistItems.forEach((item) => {
      mappedValues[item.task] = {
        ENMS: item.ENMS,
        SMSW: item.SMSW,
        NM_Alcatel: item.NM_Alcatel,
        OTNM: item.OTNM,
        U2000_Huawei: item.U2000_Huawei,
        SDH2000: item.SDH2000,
        NEC700: item.NEC700,
      };
    });

    values.otherItems.forEach((item) => {
      mappedValues[item.task] = item.quantity;
    });

    try {
      const checkExistForm = await fetch(
        `${apiUrl}/forms/getFormsByRoleAndDate?role=${role}&reportDate=${values.reportDate}`
      );
      const data = await checkExistForm.json();
      
      if(data){
        alert('قبلا در این تاریخ گزارش ثبت شده است')
      }else{
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
            disabled: true
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
            otherItems: otherItems,
          }}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
          validateOnSubmit={true}
        >
          {({ setFieldValue, values, isValid }) => (
            <Form>
              <h4 className="text-center mb-4 font-bold text-lg">
                فرم گزارش روزانه انتقال
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("day", e.target.value)}
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
                <h5 className="font-bold mb-2">
                  فرم بررسی روزانه سیتمهای مدیریت شبکه و لوازم جانبی
                </h5>
                <table className="w-full table-auto border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        خلاصه وضعیت سیستم
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        ENMS
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        SMSW
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        NM(Alcatel)
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        OTNM 2000(FiberHome)
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        U2000(Huawei)
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        SDH2000
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        NEC700
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
                            checked={item.ENMS}
                            onChange={() =>
                              setFieldValue(
                                `checklistItems[${index}].ENMS`,
                                !item.ENMS
                              )
                            }
                            className="w-5 h-5"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <input
                            type="checkbox"
                            checked={item.SMSW}
                            onChange={() =>
                              setFieldValue(
                                `checklistItems[${index}].SMSW`,
                                !item.SMSW
                              )
                            }
                            className="w-5 h-5"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <input
                            type="checkbox"
                            checked={item.NM_Alcatel}
                            onChange={() =>
                              setFieldValue(
                                `checklistItems[${index}].NM_Alcatel`,
                                !item.NM_Alcatel
                              )
                            }
                            className="w-5 h-5"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <input
                            type="checkbox"
                            checked={item.OTNM}
                            onChange={() =>
                              setFieldValue(
                                `checklistItems[${index}].OTNM`,
                                !item.OTNM
                              )
                            }
                            className="w-5 h-5"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <input
                            type="checkbox"
                            checked={item.U2000_Huawei}
                            onChange={() =>
                              setFieldValue(
                                `checklistItems[${index}].U2000_Huawei`,
                                !item.U2000_Huawei
                              )
                            }
                            className="w-5 h-5"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <input
                            type="checkbox"
                            checked={item.SDH2000}
                            onChange={() =>
                              setFieldValue(
                                `checklistItems[${index}].SDH2000`,
                                !item.SDH2000
                              )
                            }
                            className="w-5 h-5"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <input
                            type="checkbox"
                            checked={item.NEC700}
                            onChange={() =>
                              setFieldValue(
                                `checklistItems[${index}].NEC700`,
                                !item.NEC700
                              )
                            }
                            className="w-5 h-5"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <table className="w-full table-auto border-collapse border border-gray-300">
                  <tbody>
                    {values.otherItems.map((item, index) => (
                      <tr
                        key={item.id}
                        className="odd:bg-gray-50 even:bg-gray-100"
                      >
                        <td className="border border-gray-300 p-2">
                          {item.label}
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <input
                            type="text"
                            value={item.quantity}
                            onChange={(e) =>
                              setFieldValue(
                                `otherItems[${index}].quantity`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <MuxDynamicTable1
                onTableDataChange={setDynamicTableData1}
                initialData={dynamicTableData1} // Pass initial empty rows if needed
                isReadOnly={false} // Set to false to allow editing
              />
              <MuxDynamicTable2
                onTableDataChange={setDynamicTableData2}
                initialData={dynamicTableData2} // Pass initial empty rows if needed
                isReadOnly={false} // Set to false to allow editing
              />

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

export default MuxReportForm;
