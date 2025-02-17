import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "jalali-moment"; // Use jalali-moment for Persian dates
import "react-big-calendar/lib/css/react-big-calendar.css"; // Import calendar styles
import DatePicker from "react-multi-date-picker";
import "react-multi-date-picker/styles/layouts/mobile.css";
import persian from "react-date-object/calendars/persian";
import fa from "react-date-object/locales/persian_fa";

// Initialize the localizer with moment
const localizer = momentLocalizer(moment);

// Define the structure of an Event
interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
}

function PersianCalendar() {
  // Helper function to convert Gregorian dates to Jalali
  const toJalali = (date: Date): string => {
    return moment(date).locale("fa").format("YYYY/MM/DD"); // Converts to Jalali format
  };

  // Helper function to convert Jalali to Gregorian
  const toGregorian = (jalaliDate: string): Date => {
    return moment(jalaliDate, "YYYY/MM/DD").locale("fa").toDate(); // Converts to Gregorian
  };

  // State for managing events
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "رویداد اول",
      start: toGregorian("2025/01/21"), // Convert Jalali to Gregorian for internal usage
      end: toGregorian("2025/01/21"),
    },
    {
      id: 2,
      title: "رویداد دوم",
      start: toGregorian("2025/01/22"),
      end: toGregorian("2025/01/22"),
    },
  ]);

  // State to manage the selected event for the modal
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [newTitle, setNewTitle] = useState<string>("");
  const [newStartDate, setNewStartDate] = useState<Date | null>(null);
  const [newEndDate, setNewEndDate] = useState<Date | null>(null);

  // Handle selecting a time slot to add an event
  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    const jalaliStart = toJalali(start); // Convert Gregorian to Jalali format
    const title = window.prompt(`Enter event title for ${jalaliStart}`);
    if (title) {
      // Add a new event with the correct time
      setEvents([
        ...events,
        {
          id: events.length + 1, // Generate a unique ID for the new event
          title,
          start,
          end,
        },
      ]);
    }
  };

  // Handle selecting an event to show the modal
  const handleSelectEvent = (event: Event) => {
    setSelectedEvent(event);
    setNewTitle(event.title); // Set the current title for editing
    setNewStartDate(event.start); // Initialize the date picker with the start date
    setNewEndDate(event.end); // Initialize the date picker with the end date
  };

  // Handle closing the modal
  const handleCloseModal = () => {
    setSelectedEvent(null); // Clear the selected event
    setNewTitle(""); // Clear the title input
    setNewStartDate(null); // Clear the start date input
    setNewEndDate(null); // Clear the end date input
  };

  // Handle editing an event
  const handleEditEvent = () => {
    if (selectedEvent && newStartDate && newEndDate) {
      const updatedEvent: Event = {
        ...selectedEvent,
        title: newTitle, // Update the title
        start: newStartDate, // Gregorian start date
        end: newEndDate, // Gregorian end date
      };
      setEvents(
        events.map((evt) =>
          evt.id === selectedEvent.id ? updatedEvent : evt
        )
      );
    }
    handleCloseModal(); // Close the modal after editing
  };

  // Handle deleting an event
  const handleDeleteEvent = () => {
    if (selectedEvent) {
      setEvents(events.filter((evt) => evt.id !== selectedEvent.id));
    }
    handleCloseModal(); // Close the modal after deleting
  };

  return (
    <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center text-indigo-600">
        تقویم فارسی
      </h1>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable={true}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        defaultView="month"
        views={["month", "week", "day"]}
        style={{ height: 500 }}
        messages={{
          allDay: "تمام روز",
          previous: "قبلی",
          next: "بعدی",
          today: "امروز",
          month: "ماه",
          week: "هفته",
          day: "روز",
          agenda: "لیست",
        }}
        components={{
          event: ({ event }) => (
            <div className="bg-blue-200 p-1 rounded text-black text-sm">
              {event.title}
            </div>
          ),
        }}
      />

      {/* Modal for editing/deleting events */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-2xl font-bold text-indigo-600 my-2">
              ویرایش رویداد
            </h2>
            <label className="block mb-2 text-gray-700">
              <strong>عنوان رویداد:</strong>
            </label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            />
            <label className="block mb-2 text-gray-700 my-2">
              <strong>تاریخ شروع :</strong>
            </label>
            <DatePicker
              value={newStartDate}
              onChange={(date) => setNewStartDate(date?.toDate() || null)}
              calendar={persian}
              locale={fa}
              format="YYYY/MM/DD"
              className="w-full border border-gray-300 rounded-md p-2 my-2"
            />
            <label className="block mb-2 text-gray-700 my-2">
              <strong>تاریخ پایان :</strong>
            </label>
            <DatePicker
              value={newEndDate}
              onChange={(date) => setNewEndDate(date?.toDate() || null)}
              calendar={persian}
              locale={fa}
              format="YYYY/MM/DD"
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
            />
            <div className="flex justify-end space-x-3 my-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 mx-2 w-20 rounded-lg shadow hover:bg-blue-600"
                onClick={handleEditEvent}
              >
                ویرایش
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 w-20 rounded-lg shadow hover:bg-red-600"
                onClick={handleDeleteEvent}
              >
                حذف
              </button>
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 w-20 rounded-lg shadow hover:bg-gray-400"
                onClick={handleCloseModal}
              >
                لغو
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PersianCalendar;
