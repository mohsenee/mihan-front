"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useRouter } from "next/router";
import DefaultLayout from "../Layouts/DefaultLayout";

interface Report {
  id: string;
  reportDate: string;
}

interface FormElementsProps {
  role: string;
  title: string;
}

const fetchReports = async (role: string): Promise<Report[]> => {
  const response = await fetch(
    `http://localhost:8000/forms/getFormsByRole?role=${role}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Error fetching reports: ${response.statusText}`);
  }

  return response.json();
};

const deleteFormsWithId = async (id: string, role: string, userName: string|null) => {
  const response = await fetch(
    `http://localhost:8000/forms/deleteFormById?formId=${id}&role=${role}&updatedBy=${userName}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }
  );

  if (response.ok) {
    alert("Form deleted successfully!");
  } else {
    alert("Failed to delete form");
  }
};

const FormElements: React.FC<FormElementsProps> = ({ role, title }) => {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalData, setModalData] = useState<Report | null>(null);
  const [userName, setUserName] = useState<string | null>("");
  const router = useRouter();

  useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
    const token = localStorage.getItem("access_token");
    if (!token) {
      alert("لطفا اول وارد سایت شوید");
      router.push("/");
      return;
    }

    if(localStorage.getItem("userName")){
      setUserName(localStorage.getItem("userName"))
    }
    else{
      alert("لطفا اول وارد سایت شوید");
      router.push("/");
      return;
    }


    async function loadReports() {
      const data = await fetchReports(role);
      setReports(data);
    }

    loadReports();
  }, [role]);

  const handleDateClick = (date: any) => {
    const formattedDate = date.format();
    const report = reports.find((r) => r.reportDate === formattedDate);
    setSelectedDate(formattedDate);
    setModalData(report || null);
  };

  const handleDelete = async () => {
    if (!modalData) return;
    const confirmDelete = window.confirm("آیا مطمئن هستید می خواهید این گزارش را حذف کنید؟");
    if (!confirmDelete) return;

    await deleteFormsWithId(modalData.id, role, userName);
    setReports(reports.filter((r) => r.id !== modalData.id));
    setModalData(null);
  };

  const handleCreateNewReport = () => {
    window.location.href = `http://localhost:3000/forms/${role.toLowerCase()}/create`;
  };

  return (
    <DefaultLayout>
        <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md border border-gray-200 mt-10">
      <h1 className="mb-6 text-2xl font-semibold text-gray-800">فرم های گزارش روزانه واحد {title}</h1>
      <DatePicker
        calendar={persian}
        locale={persian_fa}
        value={selectedDate}
        onChange={handleDateClick}
        mapDays={({ date }) => {
          const formattedDate = date.format();
          const hasReport = reports.some((r) => r.reportDate === formattedDate);
          return hasReport ? { className: "bg-green-500 text-white" } : {};
        }}
        className="w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-200"
      />

      {modalData && (
        <div className="modal bg-gray-100 p-6 shadow-lg rounded mt-4">
          <div className="flex justify-between">
            <a href={`http://localhost:3000/forms/${role.toLowerCase()}/${modalData.id}/get`} className="text-blue-500 hover:text-blue-700 font-medium">
              مشاهده
            </a>
            <a href={`http://localhost:3000/forms/${role.toLowerCase()}/${modalData.id}/edit`} className="text-green-500 hover:text-green-700 font-medium">
              به روز رسانی
            </a>
            <button onClick={handleDelete} className="text-red-500 hover:text-red-700 font-medium">
              حذف
            </button>
          </div>
        </div>
      )}

      {modalData === null && selectedDate && (
        <div className="modal bg-gray-100 p-6 shadow-lg rounded mt-4 text-center">
          <p className="text-gray-700">گزارشی در این تاریخ ثبت نشده است.</p>
          <button onClick={handleCreateNewReport} className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700">
            ایجاد گزارش جدید
          </button>
        </div>
      )}
    </div>
    </DefaultLayout>
  );
};

export default FormElements;

