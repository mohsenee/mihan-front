import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import MuxDynamicTable1 from "@/app/components/forms/dynamicTables/muxDynamicTable1";
import MuxDynamicTable2 from "@/app/components/forms/dynamicTables/muxDynamicTable2";
import { useRouter } from "next/router";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import Breadcrumb from "@/app/components/Breadcrumbs/Breadcrumb";
import domtoimage from "dom-to-image";
import jsPDF from "jspdf";

const role = 'Mux';

interface FormState {
  reportDate: string;
  day: string;
  comments: string;
  names: string[];
  createdBy: string;
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

const initialChecklistItems: ChecklistItem[] = [
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

const initialOtherItems: OtherItems[] = [
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
  const [names, setNames] = useState<string>("");
  const [createdBy, setCreatedBy] = useState<string>("");
  const [dynamicTableData1, setDynamicTableData1] = useState<TableRow1[]>([]);
  const [dynamicTableData2, setDynamicTableData2] = useState<TableRow2[]>([]);
  const [otherItems, setOtherItems] = useState(initialOtherItems);
  const [checklistItems, setChecklistItems] = useState(initialChecklistItems);
  const [comment, setComment] = useState<string>("");

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

    const fetchform = async () => {
      try {
        const token = localStorage.getItem("access_token");

        const response = await fetch(
          `http://localhost:8000/forms/getFormById?formId=${router.query.formId}&role=${role}`,
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
        setCurrentDate(data.reportDate);
        const day = daysOfWeek.find((d) => d.value === data.day.toString());
        setCurrentDay(day ? day.label : "Unknown");
        setComment(data.comments);
        setCreatedBy(data.createdBy)

        const updatedChecklistItems = checklistItems.map((item) => {
          const taskStatus = data[item.task]; // Access corresponding task data from `data`
          if (taskStatus) {
            // Check if the task exists in `data`, then assign corresponding status to each of the fields
            return {
              ...item,
              ENMS: taskStatus.ENMS,
              SMSW: taskStatus.SMSW,
              NM_Alcatel: taskStatus.NM_Alcatel,
              OTNM: taskStatus.OTNM,
              U2000_Huawei: taskStatus.U2000_Huawei,
              SDH2000: taskStatus.SDH2000,
              NEC700: taskStatus.NEC700,
            };
          }
          return item;
        });

        const updatedOtherItems = otherItems.map((item) => {
          if (data[item.task]) {
            // If the task exists in `data`, fill the quantity
            return {
              ...item,
              quantity: data[item.task],
            };
          }
          return item;
        });

        setChecklistItems(updatedChecklistItems);
        setOtherItems(updatedOtherItems);
        setDynamicTableData1(data.reports);
        setDynamicTableData2(data.missionReports);
      } catch (error) {
        console.error("Failed to fetch shift names:", error);
      }
    };

    fetchform();
  }, []);

  const router = useRouter();
    if (!router.isReady) {
      return <span>page is loading</span>;
    }

  const handleSubmit = async (values: FormState) => {
    const mappedValues: {
      [key: string]: string | number | boolean | ChecklistValues | TableRow1[] | TableRow2[];
    } = {
      reportDate: values.reportDate,
      day: values.day,
      names: values.names.join(", "),
      comments: values.comments,
      reports: dynamicTableData1,
      missionReports: dynamicTableData2,
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
      console.log("Mapped Values:", mappedValues);
      const createForm = await fetch(
        "http://localhost:8000/forms/createMuxForm",
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

  const handleDownloadPDF = async () => {
    const formElement = document.getElementById("form-container");
    if (!formElement) return console.error("Form not found!");
  
    try {
      const imgData = await domtoimage.toPng(formElement);
      const pdf = new jsPDF("p", "mm", "a4");
  
      const imgWidth = 190;
      const imgHeight = (formElement.clientHeight * imgWidth) / formElement.clientWidth;
  
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      document.querySelectorAll("input[type=checkbox]").forEach((checkbox) => {
        const inputElement = checkbox as HTMLInputElement;
        if (inputElement.checked) {
          inputElement.setAttribute("checked", "true");
        } 
      });
      pdf.save(`MuxReport${currentDate}.pdf`);
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
            disabled: true
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
            otherItems: otherItems,
          }}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
          validateOnSubmit={true}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <h4 className="text-center mb-4 font-bold text-lg">
                فرم گزارش روزانه انتقال
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

              {dynamicTableData1.length ? (
                <MuxDynamicTable1
                  onTableDataChange={setDynamicTableData1}
                  initialData={dynamicTableData1}
                  isReadOnly={true}
                />
              ) : (
                ""
              )}

              {dynamicTableData2.length ? (
                <MuxDynamicTable2
                  onTableDataChange={setDynamicTableData2}
                  initialData={dynamicTableData2}
                  isReadOnly={true}
                />
              ) : (
                ""
              )}

              <div className="mt-6">
                <label className="block text-sm font-medium mb-1">
                  توضیحات
                </label>
                <Field
                  as="textarea"
                  name="comments"
                  rows={3}
                  value={comment}
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

export default MuxReportForm;
