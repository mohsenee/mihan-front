import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import FiberDynamicTable1 from "@/app/components/forms/dynamicTables/fiberDynamicTable1";
import FiberDynamicTable2 from "@/app/components/forms/dynamicTables/fiberDynamicTable2";
import FiberDynamicTable3 from "@/app/components/forms/dynamicTables/fiberDynamicTable3";
import { useRouter } from "next/router";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import Breadcrumb from "@/app/components/Breadcrumbs/Breadcrumb";
import domtoimage from "dom-to-image";
import jsPDF from "jspdf";

const role = "Fiber";

const apiUrl = process.env.NEXT_PUBLIC_API_URL

interface FormState {
  reportDate: string;
  day: string;
  comments: string;
  names: string[];
  createdBy: string;
}

interface TableRow1 {
  name: string;
  OCDF_plan: string;
  GIS: string;
  fiber_plan: string;
  response: string;
  continuityTest: string;
  route: string;
  Long_UTM: string;
  LAT_UTM: string;
  improvment_security: string;
  fix_failure: string;
  door_cementing: string;
}

interface TableRow2 {
  routeName: string;
  name: string;
  driver: string;
  startTime: string;
  endTime: string;
  km: string;
  excavation: string;
  excavatorName: string;
  license: string;
  startDate: string;
  endDate: string;
  LONG_UTM: string;
  LAT_UTM: string;
  description: string;
}

interface TableRow3 {
  contractorName: string;
  status: string;
  phoneContractor: string;
  fromKm: string;
  toKm: string;
  bridgesCount: string;
  polesCount: string;
  pondsCount: string;
  routeLength: string;
  suggestions: string;
}

const FiberReportForm: NextPage = () => {

  const [currentDate, setCurrentDate] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");
  const [names, setNames] = useState<string>("");
  const [createdBy, setCreatedBy] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [dynamicTableData1, setDynamicTableData1] = useState<TableRow1[]>([
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
  const [dynamicTableData2, setDynamicTableData2] = useState<TableRow2[]>([
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
  const [dynamicTableData3, setDynamicTableData3] = useState<TableRow3[]>([
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
        setCurrentDate(data.reportDate);
        const day = daysOfWeek.find((d) => d.value === data.day.toString());
        setCurrentDay(day ? day.label : "Unknown");
        setComment(data.comments);
        setCreatedBy(data.createdBy);

        setDynamicTableData1(data.table1);
        setDynamicTableData2(data.table2);
        setDynamicTableData3(data.table3);
      } catch (error) {
        console.error("Failed to fetch shift names:", error);
      }
    };

    fetchForm();
  }, []);

  const router = useRouter();
    if (!router.isReady) {
      return <span>page is loading</span>;
    }

  const handleSubmit = async (values: FormState) => {
    const mappedValues: {
      [key: string]: string | number | boolean | TableRow1[] | TableRow2[] | TableRow3[];
    } = {
      reportDate: values.reportDate,
      day: values.day,
      names: values.names.join(", "),
      createdBy: createdBy,
      comments: values.comments,
      table1: dynamicTableData1,
      table2: dynamicTableData2,
      table3: dynamicTableData3,
    };

    try {
      console.log("Mapped Values:", mappedValues);
      const createForm = await fetch(
        `${apiUrl}/forms/createFiberForm`,
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
      const imgHeight =
        (formElement.clientHeight * imgWidth) / formElement.clientWidth;

      pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
      pdf.save(`FiberReport${currentDate}.pdf`);
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
        <div className="w-4.5/5 max-w-20xl bg-white p-6 rounded-lg shadow-lg opacity-95 my-10">
          <Formik
            initialValues={{
              reportDate: currentDate,
              day: currentDay,
              comments: "",
              names: [],
              createdBy: createdBy,
            }}
            validationSchema={validationSchema}
            enableReinitialize
            onSubmit={handleSubmit}
            validateOnSubmit={true}
          >
            {() => (
              <Form>
                <h4 className="text-center mb-4 font-bold text-lg">
                  گزارش روزانه فیبرنوری
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
                  {dynamicTableData1.length ? (
                    <FiberDynamicTable1
                      onTableDataChange={setDynamicTableData1}
                      initialData={dynamicTableData1}
                      isReadOnly={true}
                    />
                  ) : (
                    ""
                  )}

                  {dynamicTableData2.length ? (
                    <FiberDynamicTable2
                      onTableDataChange={setDynamicTableData2}
                      initialData={dynamicTableData2}
                      isReadOnly={true}
                    />
                  ) : (
                    ""
                  )}

                  {dynamicTableData3.length ? (
                    <FiberDynamicTable3
                      onTableDataChange={setDynamicTableData3}
                      initialData={dynamicTableData3}
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

export default FiberReportForm;
