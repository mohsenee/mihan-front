"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const role = "Power";

interface Report {
  id: string;
  reportDate: string;
}

async function fetchReports(): Promise<Report[]> {
  const response = await fetch(
    `http://localhost:8000/forms/getFormsByRole?role=${role}`
  );
  const data = await response.json();
  return data;
}

async function deleteFormsWithId(id: string) {
  await fetch(
    `http://localhost:8000/forms/deleteFormById?formId=${id}&role=${role}`,
    { method: "DELETE" }
  );
}

const FormElementsPage = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalData, setModalData] = useState<Report | null>(null);

  useEffect(() => {
    async function loadReports() {
      const data = await fetchReports();
      setReports(data);
    }
    loadReports();
  }, []);

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

    await deleteFormsWithId(modalData.id);
    setReports(reports.filter((r) => r.id !== modalData.id));
    setModalData(null);
  };

  const handleCreateNewReport = () => {
    window.location.href = `http://localhost:3000/forms/${role.toLowerCase()}/create`; // Redirect to create form page
  };

  return (
      <div className="p-4">
        <h1 className="mb-4 text-xl font-bold">فرم های گزارش روزانه واحد پاور</h1>
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
        />

        {/* Modal */}
        {modalData && (
          <div className="modal bg-white p-4 shadow-lg rounded ">
            
            <div className="flex space-x-4">
            <a
              href={`http://localhost:3000/forms/${role.toLowerCase()}/${modalData.id}/get`}
              className="text-blue-500"
            >
              مشاهده
            </a>
            <a
              href={`http://localhost:3000/forms/${role.toLowerCase()}/${modalData.id}/edit`}
              className="text-green-500 ml-4"
            >
              به روز رسانی
            </a>
            <button onClick={handleDelete} className="text-red-500 ml-4">
              حذف
            </button>
            </div>
          </div>
        )}

        {/* If no report exists for the selected date, show create new report option */}
        {modalData === null && selectedDate && (
          <div className="modal bg-white p-4 shadow-lg rounded mt-4">
            <p>گزارشی در این تاریخ ثبت نشده است.</p>
            <button
              onClick={handleCreateNewReport}
              className="text-green-500 mt-2"
            >
              ایجاد گزارش جدید
            </button>
          </div>
        )}
      </div>
  );
};

export default FormElementsPage;







