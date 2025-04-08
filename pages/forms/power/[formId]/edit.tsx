import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select, { OnChangeValue } from "react-select"; // Import OnChangeValue to type the onChange handler
import { useRouter } from "next/router";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import Breadcrumb from "@/app/components/Breadcrumbs/Breadcrumb";

const role = "Power";

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
  checklistItems1: ChecklistItem[];
  checklistItems2: ChecklistItem[];
  checklistItems3: ChecklistItem[];
  checklistItems4: ChecklistItem[];
  checklistItems5: ChecklistItem[];
  checklistItems6: ChecklistItem[];
}

interface ChecklistItem {
  id: number;
  task: string;
  label: string;
  selected1: string;
  selected2: string;
  selected3: string;
  selected4: string;
  selected5: string;
  selected6: string;
  selected7: string;
  selected8: string;
  selected9: string;
  indicators_keys: string;
  appearance: string;
  temperature: string;
  status: string;
  descriptions: string;
}

const initialChecklistItems1: ChecklistItem[] = [
  {
    id: 1,
    task: "diesel_generator_1",
    label: "دیزل ژنراتور 1",
    selected1: "",
    selected2: "",
    selected3: "",
    selected4: "",
    selected5: "",
    selected6: "",
    selected7: "",
    selected8: "",
    selected9: "",
    indicators_keys: "",
    appearance: "",
    temperature: "",
    status: "",
    descriptions: "",
  },
  {
    id: 2,
    task: "diesel_generator_2",
    label: "دیزل ژنراتور 2",
    selected1: "",
    selected2: "",
    selected3: "",
    selected4: "",
    selected5: "",
    selected6: "",
    selected7: "",
    selected8: "",
    selected9: "",
    indicators_keys: "",
    appearance: "",
    temperature: "",
    status: "",
    descriptions: "",
  },
];

const initialChecklistItems2: ChecklistItem[] = [
  {
    id: 1,
    task: "EMP1",
    label: "تابلو EMP1",
    selected1: "",
    selected2: "",
    selected3: "",
    selected4: "",
    selected5: "",
    selected6: "",
    selected7: "",
    selected8: "",
    selected9: "",
    indicators_keys: "",
    appearance: "",
    temperature: "",
    status: "",
    descriptions: "",
  },
  {
    id: 2,
    task: "EMP2",
    label: "تابلو EMP2",
    selected1: "",
    selected2: "",
    selected3: "",
    selected4: "",
    selected5: "",
    selected6: "",
    selected7: "",
    selected8: "",
    selected9: "",
    indicators_keys: "",
    appearance: "",
    temperature: "",
    status: "",
    descriptions: "",
  },
  {
    id: 3,
    task: "MP",
    label: "تابلو MP",
    selected1: "",
    selected2: "",
    selected3: "",
    selected4: "",
    selected5: "",
    selected6: "",
    selected7: "",
    selected8: "",
    selected9: "",
    indicators_keys: "",
    appearance: "",
    temperature: "",
    status: "",
    descriptions: "",
  },
];

const initialChecklistItems3: ChecklistItem[] = [
  {
    id: 1,
    task: "capacitor",
    label: "بانک خازن",
    selected1: "",
    selected2: "",
    selected3: "",
    selected4: "",
    selected5: "",
    selected6: "",
    selected7: "",
    selected8: "",
    selected9: "",
    indicators_keys: "",
    appearance: "",
    temperature: "",
    status: "",
    descriptions: "",
  },
];

const initialChecklistItems4: ChecklistItem[] = [
  {
    id: 1,
    task: "REC1",
    label: "REC.1(psp112)",
    selected1: "",
    selected2: "",
    selected3: "",
    selected4: "",
    selected5: "",
    selected6: "",
    selected7: "",
    selected8: "",
    selected9: "",
    indicators_keys: "",
    appearance: "",
    temperature: "",
    status: "",
    descriptions: "",
  },
  {
    id: 2,
    task: "REC2",
    label: "REC.2(psp112)",
    selected1: "",
    selected2: "",
    selected3: "",
    selected4: "",
    selected5: "",
    selected6: "",
    selected7: "",
    selected8: "",
    selected9: "",
    indicators_keys: "",
    appearance: "",
    temperature: "",
    status: "",
    descriptions: "",
  },
  {
    id: 3,
    task: "REC3",
    label: "REC.3(psp100)",
    selected1: "",
    selected2: "",
    selected3: "",
    selected4: "",
    selected5: "",
    selected6: "",
    selected7: "",
    selected8: "",
    selected9: "",
    indicators_keys: "",
    appearance: "",
    temperature: "",
    status: "",
    descriptions: "",
  },
  {
    id: 4,
    task: "REC4",
    label: "REC.4(psp100)",
    selected1: "",
    selected2: "",
    selected3: "",
    selected4: "",
    selected5: "",
    selected6: "",
    selected7: "",
    selected8: "",
    selected9: "",
    indicators_keys: "",
    appearance: "",
    temperature: "",
    status: "",
    descriptions: "",
  },
];

const initialChecklistItems5: ChecklistItem[] = [
  {
    id: 1,
    task: "UPS_Newave",
    label: "UPS Newave",
    selected1: "",
    selected2: "",
    selected3: "",
    selected4: "",
    selected5: "",
    selected6: "",
    selected7: "",
    selected8: "",
    selected9: "",
    indicators_keys: "",
    appearance: "",
    temperature: "",
    status: "",
    descriptions: "",
  },
  {
    id: 2,
    task: "UPS_Riello",
    label: "UPS Riello",
    selected1: "",
    selected2: "",
    selected3: "",
    selected4: "",
    selected5: "",
    selected6: "",
    selected7: "",
    selected8: "",
    selected9: "",
    indicators_keys: "",
    appearance: "",
    temperature: "",
    status: "",
    descriptions: "",
  },
];

const initialChecklistItems6: ChecklistItem[] = [
  {
    id: 1,
    task: "CONVERTOR",
    label: "CONVERTOR",
    selected1: "",
    selected2: "",
    selected3: "",
    selected4: "",
    selected5: "",
    selected6: "",
    selected7: "",
    selected8: "",
    selected9: "",
    indicators_keys: "",
    appearance: "",
    temperature: "",
    status: "",
    descriptions: "",
  },
  {
    id: 2,
    task: "INVERTOR",
    label: "INVERTOR",
    selected1: "",
    selected2: "",
    selected3: "",
    selected4: "",
    selected5: "",
    selected6: "",
    selected7: "",
    selected8: "",
    selected9: "",
    indicators_keys: "",
    appearance: "",
    temperature: "",
    status: "",
    descriptions: "",
  },
];

const PowerReportForm: NextPage = () => {

  const [currentDate, setCurrentDate] = useState<string>("");
  const [currentDay, setCurrentDay] = useState<string>("");
  const [initialNames, setInitialNames] = useState<string[]>([]);
  const [namesOptions, setNamesOptions] = useState<NameOption[]>([]);
  const [comment, setComment] = useState<string>("");
  const [createdBy, setCreatedBy] = useState<string>("");
  const [userName, setUserName] = useState<string | null>("");
  const [checklistItems1, setChecklistItems1] = useState(
    initialChecklistItems1
  );
  const [checklistItems2, setChecklistItems2] = useState(
    initialChecklistItems2
  );
  const [checklistItems3, setChecklistItems3] = useState(
    initialChecklistItems3
  );
  const [checklistItems4, setChecklistItems4] = useState(
    initialChecklistItems4
  );
  const [checklistItems5, setChecklistItems5] = useState(
    initialChecklistItems5
  );
  const [checklistItems6, setChecklistItems6] = useState(
    initialChecklistItems6
  );

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
          `${apiUrl}/forms/getFormById?formId=${router.query.formId}&role=${role}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Attach the JWT token
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setInitialNames(data.names.split(", "));
        setCurrentDate(data.reportDate);
        const day = daysOfWeek.find((d) => d.value === data.day.toString());
        setCurrentDay(day ? day.label : "Unknown");
        setComment(data.comments);
        setCreatedBy(data.createdBy);

        const updatedChecklistItems1 = checklistItems1.map((item) => {
          const taskStatus = data[item.task]; // Access corresponding task data from `data`
          if (taskStatus) {
            // Check if the task exists in `data`, then assign corresponding status to each of the fields
            return {
              ...item,
              selected1: taskStatus.VBATT,
              selected2: taskStatus.IBATT,
              selected3: taskStatus.fuel,
              selected4: taskStatus.oil,
              selected5: taskStatus.water,
              selected6: taskStatus.diesel_heater,
              selected7: taskStatus.dampers,
              indicators_keys: taskStatus.indicators_keys,
              appearance: taskStatus.appearance,
              temperature: taskStatus.temperature,
              status: taskStatus.status,
              descriptions: taskStatus.descriptions,
            };
          }
          return item;
        });
        setChecklistItems1(updatedChecklistItems1);

        const updatedChecklistItems2 = checklistItems2.map((item) => {
          const taskStatus = data[item.task]; // Access corresponding task data from `data`
          if (taskStatus) {
            // Check if the task exists in `data`, then assign corresponding status to each of the fields
            return {
              ...item,
              selected1: taskStatus.VT,
              selected2: taskStatus.VS,
              selected3: taskStatus.VR,
              selected4: taskStatus.IT,
              selected5: taskStatus.IS,
              selected6: taskStatus.IR,
              indicators_keys: taskStatus.indicators_keys,
              appearance: taskStatus.appearance,
              temperature: taskStatus.temperature,
              status: taskStatus.status,
              descriptions: taskStatus.descriptions,
            };
          }
          return item;
        });
        setChecklistItems2(updatedChecklistItems2);

        const updatedChecklistItems3 = checklistItems3.map((item) => {
          const taskStatus = data[item.task]; // Access corresponding task data from `data`
          if (taskStatus) {
            // Check if the task exists in `data`, then assign corresponding status to each of the fields
            return {
              ...item,
              indicators_keys: taskStatus.indicators_keys,
              appearance: taskStatus.appearance,
              temperature: taskStatus.temperature,
              status: taskStatus.status,
              descriptions: taskStatus.descriptions,
            };
          }
          return item;
        });
        setChecklistItems3(updatedChecklistItems3);

        const updatedChecklistItems4 = checklistItems4.map((item) => {
          const taskStatus = data[item.task]; // Access corresponding task data from `data`
          if (taskStatus) {
            // Check if the task exists in `data`, then assign corresponding status to each of the fields
            return {
              ...item,
              selected1: taskStatus.VT_in,
              selected2: taskStatus.VS_in,
              selected3: taskStatus.VR_in,
              selected4: taskStatus.IT_in,
              selected5: taskStatus.IS_in,
              selected6: taskStatus.IR_in,
              selected7: taskStatus.VOUT,
              selected8: taskStatus.IOUT,
              selected9: taskStatus.IBATT,
              indicators_keys: taskStatus.indicators_keys,
              appearance: taskStatus.appearance,
              temperature: taskStatus.temperature,
              status: taskStatus.status,
              descriptions: taskStatus.descriptions,
            };
          }
          return item;
        });
        setChecklistItems4(updatedChecklistItems4);

        const updatedChecklistItems5 = checklistItems5.map((item) => {
          const taskStatus = data[item.task]; // Access corresponding task data from `data`
          if (taskStatus) {
            // Check if the task exists in `data`, then assign corresponding status to each of the fields
            return {
              ...item,
              selected1: taskStatus.VT_out,
              selected2: taskStatus.VS_out,
              selected3: taskStatus.VR_out,
              selected4: taskStatus.IT_out,
              selected5: taskStatus.IS_out,
              selected6: taskStatus.IR_out,
              selected7: taskStatus.F_out,
              selected8: taskStatus.VBATT,
              selected9: taskStatus.IBATT,
              indicators_keys: taskStatus.indicators_keys,
              appearance: taskStatus.appearance,
              temperature: taskStatus.temperature,
              status: taskStatus.status,
              descriptions: taskStatus.descriptions,
            };
          }
          return item;
        });
        setChecklistItems5(updatedChecklistItems5);

        const updatedChecklistItems6 = checklistItems6.map((item) => {
          const taskStatus = data[item.task]; // Access corresponding task data from `data`
          if (taskStatus) {
            // Check if the task exists in `data`, then assign corresponding status to each of the fields
            return {
              ...item,
              selected1: taskStatus.VOUT,
              selected2: taskStatus.IOUT,
              selected3: taskStatus.V_in,
              selected4: taskStatus.I_in,
              indicators_keys: taskStatus.indicators_keys,
              appearance: taskStatus.appearance,
              temperature: taskStatus.temperature,
              status: taskStatus.status,
              descriptions: taskStatus.descriptions,
            };
          }
          return item;
        });
        setChecklistItems6(updatedChecklistItems6);
      } catch (error) {
        console.error("Failed to fetch shift names:", error);
      }
    };

    fetchForm();

    const fetchNames = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/users/getUserByRole?role=${role}`
        );
        const data = await response.json();
        console.log(data);
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

  const router = useRouter();
    if (!router.isReady) {
      return <span>page is loading</span>;
    }

  const handleSubmit = async (values: FormState) => {
    const findDayOfWeek = daysOfWeek.find((day) => day.label === values.day);
    const day = findDayOfWeek ? findDayOfWeek.value : "";

    const mappedValues: {
      [key: string]: string | number | boolean | object | null;
    } = {
      reportDate: values.reportDate,
      day: day,
      names: values.names.join(", "), // Join names into a string
      comments: values.comments,
      createdBy: createdBy,
      updatedBy: userName
    };

    values.checklistItems1.forEach((item) => {
      mappedValues[item.task] = {
        VBATT: item.selected1,
        IBATT: item.selected2,
        fuel: item.selected3,
        oil: item.selected4,
        water: item.selected5,
        diesel_heater: item.selected6,
        dampers: item.selected7,
        indicators_keys: item.indicators_keys,
        appearance: item.appearance,
        temperature: item.temperature,
        status: item.status,
        descriptions: item.descriptions,
      };
    });

    values.checklistItems2.forEach((item) => {
      mappedValues[item.task] = {
        VT: item.selected1,
        VS: item.selected2,
        VR: item.selected3,
        IT: item.selected4,
        IS: item.selected5,
        IR: item.selected6,
        indicators_keys: item.indicators_keys,
        appearance: item.appearance,
        temperature: item.temperature,
        status: item.status,
        descriptions: item.descriptions,
      };
    });

    values.checklistItems3.forEach((item) => {
      mappedValues[item.task] = {
        indicators_keys: item.indicators_keys,
        appearance: item.appearance,
        temperature: item.temperature,
        status: item.status,
        descriptions: item.descriptions,
      };
    });

    values.checklistItems4.forEach((item) => {
      mappedValues[item.task] = {
        VT_in: item.selected1,
        VS_in: item.selected2,
        VR_in: item.selected3,
        IT_in: item.selected4,
        IS_in: item.selected5,
        IR_in: item.selected6,
        VOUT: item.selected7,
        IOUT: item.selected8,
        IBATT: item.selected9,
        indicators_keys: item.indicators_keys,
        appearance: item.appearance,
        temperature: item.temperature,
        status: item.status,
        descriptions: item.descriptions,
      };
    });

    values.checklistItems5.forEach((item) => {
      mappedValues[item.task] = {
        VT_out: item.selected1,
        VS_out: item.selected2,
        VR_out: item.selected3,
        IT_out: item.selected4,
        IS_out: item.selected5,
        IR_out: item.selected6,
        F_out: item.selected7,
        VBATT: item.selected8,
        IBATT: item.selected9,
        indicators_keys: item.indicators_keys,
        appearance: item.appearance,
        temperature: item.temperature,
        status: item.status,
        descriptions: item.descriptions,
      };
    });

    values.checklistItems6.forEach((item) => {
      mappedValues[item.task] = {
        VOUT: item.selected1,
        IOUT: item.selected2,
        V_in: item.selected3,
        I_in: item.selected4,
        indicators_keys: item.indicators_keys,
        appearance: item.appearance,
        temperature: item.temperature,
        status: item.status,
        descriptions: item.descriptions,
      };
    });

    const requestValue = {
      formId: router.query.formId,
      role: role,
      form: mappedValues,
    };

    try {
      console.log("Mapped Values:", mappedValues);
      const updateForm = await fetch(
        `${apiUrl}/forms/updateFormById/${router.query.formId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Add JWT token to the request headers
          },
          body: JSON.stringify(requestValue),
        }
      );
     
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
      // style={{ backgroundImage: "url('/image/11.png')" }}
    >
      <div className="w-4/5 max-w-15xl bg-white p-6 rounded-lg shadow-lg opacity-95 my-10">
        <Formik
          initialValues={{
            reportDate: currentDate,
            day: currentDay,
            comments: comment,
            names: initialNames,
            checklistItems1: checklistItems1,
            checklistItems2: checklistItems2,
            checklistItems3: checklistItems3,
            checklistItems4: checklistItems4,
            checklistItems5: checklistItems5,
            checklistItems6: checklistItems6,
          }}
          validationSchema={validationSchema}
          enableReinitialize
          onSubmit={handleSubmit}
          validateOnSubmit={true}
        >
          {({ setFieldValue, values, isValid }) => (
            <Form>
              <h4 className="text-center mb-4 font-bold text-lg">
                فرم گزارش روزانه تجهیزات نیرو
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
                <table className="w-full table-auto border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200"></th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        VBATT
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        IBATT
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        بازدید سوخت
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        بازدید روغن
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        بازدید آب
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        گرمکن دیزل
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        دمپرها
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        *
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        *
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        نشانگرها و کلیدها
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        وضعیت ظاهری
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        دمای سالن
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        وضعیت سالن
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        توضیحات
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {values.checklistItems1.map((item, index) => (
                      <tr
                        key={item.id}
                        className="odd:bg-gray-50 even:bg-gray-100"
                      >
                        <td className="border border-gray-300 p-2">
                          {item.label}
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems1[${index}].selected1`}
                            type="text"
                            value={item.selected1}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems1[${index}].selected1`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems1[${index}].selected2`}
                            type="text"
                            value={item.selected2}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems1[${index}].selected2`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems1[${index}].selected3`}
                            type="text"
                            value={item.selected3}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems1[${index}].selected3`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems1[${index}].selected4`}
                            type="text"
                            value={item.selected4}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems1[${index}].selected4`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems1[${index}].selected5`}
                            type="text"
                            value={item.selected5}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems1[${index}].selected5`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <input
                            name={`checklistItems1[${index}].selected6`}
                            type="text"
                            value={item.selected6}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems1[${index}].selected6`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <input
                            name={`checklistItems1[${index}].selected7`}
                            type="text"
                            value={item.selected7}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems1[${index}].selected7`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center"></td>
                        <td className="border border-gray-300 p-2 text-center"></td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems1[${index}].indicators_keys`}
                            type="text"
                            value={item.indicators_keys}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems1[${index}].indicators_keys`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems1[${index}].appearance`}
                            type="text"
                            value={item.appearance}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems1[${index}].appearance`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems1[${index}].temperature`}
                            type="text"
                            value={item.temperature}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems1[${index}].temperature`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems1[${index}].status`}
                            type="text"
                            value={item.status}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems1[${index}].status`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems1[${index}].descriptions`}
                            type="text"
                            value={item.descriptions}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems[${index}].descriptions`,
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
                <table className="w-full table-auto border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200"></th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        VT
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        VS
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        VR
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        IT
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        IS
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        IR
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        *
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        *
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        *
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        نشانگرها و کلیدها
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        وضعیت ظاهری
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        دمای سالن
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        وضعیت سالن
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        توضیحات
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {values.checklistItems2.map((item, index) => (
                      <tr
                        key={item.id}
                        className="odd:bg-gray-50 even:bg-gray-100"
                      >
                        <td className="border border-gray-300 p-2">
                          {item.label}
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems2[${index}].selected1`}
                            type="text"
                            value={item.selected1}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems2[${index}].selected1`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems2[${index}].selected2`}
                            type="text"
                            value={item.selected2}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems2[${index}].selected2`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems2[${index}].selected3`}
                            type="text"
                            value={item.selected3}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems2[${index}].selected3`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems2[${index}].selected4`}
                            type="text"
                            value={item.selected4}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems2[${index}].selected4`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems2[${index}].selected5`}
                            type="text"
                            value={item.selected5}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems2[${index}].selected5`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems2[${index}].selected6`}
                            type="text"
                            value={item.selected6}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems2[${index}].selected6`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center"></td>
                        <td className="border border-gray-300 p-2 text-center"></td>
                        <td className="border border-gray-300 p-2 text-center"></td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems2[${index}].indicators_keys`}
                            type="text"
                            value={item.indicators_keys}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems2[${index}].indicators_keys`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems2[${index}].appearance`}
                            type="text"
                            value={item.appearance}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems2[${index}].appearance`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems2[${index}].temperature`}
                            type="text"
                            value={item.temperature}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems2[${index}].temperature`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems2[${index}].status`}
                            type="text"
                            value={item.status}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems2[${index}].status`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems2[${index}].descriptions`}
                            type="text"
                            value={item.descriptions}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems2[${index}].descriptions`,
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
                <table className="w-full table-auto border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200"></th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        *
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        *
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        *
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        *
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        *
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        *
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        *
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        *
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        *
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        نشانگرها و کلیدها
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        وضعیت ظاهری
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        دمای سالن
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        وضعیت سالن
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        توضیحات
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {values.checklistItems3.map((item, index) => (
                      <tr
                        key={item.id}
                        className="odd:bg-gray-50 even:bg-gray-100"
                      >
                        <td className="border border-gray-300 p-2">
                          {item.label}
                        </td>
                        <td className="border border-gray-300 p-2 text-center"></td>
                        <td className="border border-gray-300 p-2 text-center"></td>
                        <td className="border border-gray-300 p-2 text-center"></td>
                        <td className="border border-gray-300 p-2 text-center"></td>
                        <td className="border border-gray-300 p-2 text-center"></td>
                        <td className="border border-gray-300 p-2 text-center"></td>
                        <td className="border border-gray-300 p-2 text-center"></td>
                        <td className="border border-gray-300 p-2 text-center"></td>
                        <td className="border border-gray-300 p-2 text-center"></td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems3[${index}].indicators_keys`}
                            type="text"
                            value={item.indicators_keys}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems3[${index}].indicators_keys`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems3[${index}].appearance`}
                            type="text"
                            value={item.appearance}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems3[${index}].appearance`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems3[${index}].temperature`}
                            type="text"
                            value={item.temperature}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems3[${index}].temperature`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems3[${index}].status`}
                            type="text"
                            value={item.status}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems3[${index}].status`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems3[${index}].descriptions`}
                            type="text"
                            value={item.descriptions}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems3[${index}].descriptions`,
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
                <table className="w-full table-auto border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200"></th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        VT(in)
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        VS(in)
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        VR(in)
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        IT(in)
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        IS(in)
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        IR(in)
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        VOUT
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        IOUT
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        IBATT
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        نشانگرها و کلیدها
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        وضعیت ظاهری
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        دمای سالن
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        وضعیت سالن
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        توضیحات
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {values.checklistItems4.map((item, index) => (
                      <tr
                        key={item.id}
                        className="odd:bg-gray-50 even:bg-gray-100"
                      >
                        <td className="border border-gray-300 p-2">
                          {item.label}
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems4[${index}].selected1`}
                            type="text"
                            value={item.selected1}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems4[${index}].selected1`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems4[${index}].selected2`}
                            type="text"
                            value={item.selected2}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems4[${index}].selected2`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems4[${index}].selected3`}
                            type="text"
                            value={item.selected3}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems4[${index}].selected3`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems4[${index}].selected4`}
                            type="text"
                            value={item.selected4}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems4[${index}].selected4`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems4[${index}].selected5`}
                            type="text"
                            value={item.selected5}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems4[${index}].selected5`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems4[${index}].selected6`}
                            type="text"
                            value={item.selected6}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems4[${index}].selected6`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems4[${index}].selected7`}
                            type="text"
                            value={item.selected7}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems4[${index}].selected7`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems4[${index}].selected8`}
                            type="text"
                            value={item.selected8}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems4[${index}].selected8`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems4[${index}].selected9`}
                            type="text"
                            value={item.selected9}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems4[${index}].selected9`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems4[${index}].indicators_keys`}
                            type="text"
                            value={item.indicators_keys}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems4[${index}].indicators_keys`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems4[${index}].appearance`}
                            type="text"
                            value={item.appearance}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems4[${index}].appearance`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems4[${index}].temperature`}
                            type="text"
                            value={item.temperature}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems4[${index}].temperature`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems4[${index}].status`}
                            type="text"
                            value={item.status}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems4[${index}].status`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems4[${index}].descriptions`}
                            type="text"
                            value={item.descriptions}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems4[${index}].descriptions`,
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
                <table className="w-full table-auto border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200"></th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        VT(out)
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        VS(out)
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        VR(out)
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        IT(out)
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        IS(out)
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        IR(out)
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        F(out)
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        VBATT
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        IBATT
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        نشانگرها و کلیدها
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        وضعیت ظاهری
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        دمای سالن
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        وضعیت سالن
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        توضیحات
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {values.checklistItems5.map((item, index) => (
                      <tr
                        key={item.id}
                        className="odd:bg-gray-50 even:bg-gray-100"
                      >
                        <td className="border border-gray-300 p-2">
                          {item.label}
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems5[${index}].selected1`}
                            type="text"
                            value={item.selected1}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems5[${index}].selected1`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems5[${index}].selected2`}
                            type="text"
                            value={item.selected2}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems5[${index}].selected2`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems5[${index}].selected3`}
                            type="text"
                            value={item.selected3}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems5[${index}].selected3`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems5[${index}].selected4`}
                            type="text"
                            value={item.selected4}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems5[${index}].selected4`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems5[${index}].selected5`}
                            type="text"
                            value={item.selected5}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems5[${index}].selected5`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems5[${index}].selected6`}
                            type="text"
                            value={item.selected6}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems5[${index}].selected6`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems5[${index}].selected7`}
                            type="text"
                            value={item.selected7}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems5[${index}].selected7`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems5[${index}].selected8`}
                            type="text"
                            value={item.selected8}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems5[${index}].selected8`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems5[${index}].selected9`}
                            type="text"
                            value={item.selected9}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems5[${index}].selected9`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems5[${index}].indicators_keys`}
                            type="text"
                            value={item.indicators_keys}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems5[${index}].indicators_keys`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems5[${index}].appearance`}
                            type="text"
                            value={item.appearance}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems5[${index}].appearance`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems5[${index}].temperature`}
                            type="text"
                            value={item.temperature}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems5[${index}].temperature`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems5[${index}].status`}
                            type="text"
                            value={item.status}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems5[${index}].status`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems5[${index}].descriptions`}
                            type="text"
                            value={item.descriptions}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems5[${index}].descriptions`,
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
                <table className="w-full table-auto border-collapse border border-gray-300">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200"></th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        VOUT
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        IOUT
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        V_in
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        I_in
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        *
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        *
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        *
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        *
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        *
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        نشانگرها و کلیدها
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        وضعیت ظاهری
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        دمای سالن
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        وضعیت سالن
                      </th>
                      <th className="border border-gray-300 p-2 text-center bg-gray-200">
                        توضیحات
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {values.checklistItems6.map((item, index) => (
                      <tr
                        key={item.id}
                        className="odd:bg-gray-50 even:bg-gray-100"
                      >
                        <td className="border border-gray-300 p-2">
                          {item.label}
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems6[${index}].selected1`}
                            type="text"
                            value={item.selected1}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems6[${index}].selected1`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems6[${index}].selected2`}
                            type="text"
                            value={item.selected2}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems6[${index}].selected2`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems6[${index}].selected3`}
                            type="text"
                            value={item.selected3}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems6[${index}].selected3`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems6[${index}].selected4`}
                            type="text"
                            value={item.selected4}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems6[${index}].selected4`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center"></td>
                        <td className="border border-gray-300 p-2 text-center"></td>
                        <td className="border border-gray-300 p-2 text-center"></td>
                        <td className="border border-gray-300 p-2 text-center"></td>
                        <td className="border border-gray-300 p-2 text-center"></td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems6[${index}].indicators_keys`}
                            type="text"
                            value={item.indicators_keys}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems6[${index}].indicators_keys`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems6[${index}].appearance`}
                            type="text"
                            value={item.appearance}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems6[${index}].appearance`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems6[${index}].temperature`}
                            type="text"
                            value={item.temperature}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems6[${index}].temperature`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems6[${index}].status`}
                            type="text"
                            value={item.status}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems6[${index}].status`,
                                e.target.value
                              )
                            }
                            className="w-full h-full p-2 border rounded-md text-center"
                          />
                        </td>
                        <td className="border border-gray-300 p-2 text-center">
                          <Field
                            name={`checklistItems6[${index}].descriptions`}
                            type="text"
                            value={item.descriptions}
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) =>
                              setFieldValue(
                                `checklistItems6[${index}].descriptions`,
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

              {/* Comments */}
              <div className="mt-6">
                <label className="block text-sm font-medium mb-1">
                  توضیحات
                </label>
                <Field
                  as="textarea"
                  name="comments"
                  rows={4}
                  className="w-full border rounded-md p-2"
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

export default PowerReportForm;
