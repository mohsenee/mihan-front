import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import ClickOutside from "../ClickOutside";
import { useRouter } from "next/router";

type Notification = {
  reportDate: string;
  role: string;
};

const roleMapping: { [key: string]: string } = {
  Mux: "انتقال",
  Switch: "دیتا و سوئیچ",
  Fiber: "فیبر نوری",
  Power: "پاور",
  Facilities: "تاسیسات",
};

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [hasOpenedDropdown, setHasOpenedDropdown] = useState(false);
  const [userId, setUserId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const id = localStorage.getItem("userId");
    if (id) {
      setUserId(id);
    } else {
      alert("لطفا اول وارد سایت شوید");
      router.push("/");
      return;
    }
  }, [router]);

  // Fetch notifications and update pagination data.
  const fetchNotifications = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/forms/getMessageByUserId?userId=${userId}&page=${currentPage}&limit=10`,
        { method: "GET" }
      );
      if (response.ok) {
        const data = await response.json();
        setNotifications(data.messages); // Update the notifications for the current page
        setTotalPages(Math.ceil(data.total / 10)); // Calculate total pages
        
        // Only update the notification count if the dropdown hasn't been opened yet.
        if (!hasOpenedDropdown) {
          setNotificationCount(data.total);
        }
      }
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  }, [userId, currentPage, hasOpenedDropdown]);

  useEffect(() => {
    if (userId) {
      fetchNotifications();
    }
  }, [userId, currentPage, fetchNotifications]);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // When the notification icon is clicked, toggle the dropdown.
  // Also, if opening for the first time, reset the count and mark that it’s been opened.
  const handleNotificationClick = () => {
    setDropdownOpen(!dropdownOpen);
    if (!dropdownOpen && notificationCount > 0) {
      setNotificationCount(0);
      setHasOpenedDropdown(true);
    }
  };

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <li>
        <Link
          onClick={handleNotificationClick}
          href="#"
          className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
        >
          {/* Notification Count Badge */}
          <span
            className={`absolute -top-2 -right-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white ${
              notificationCount === 0 ? "hidden" : "block"
            }`}
          >
            {notificationCount}
          </span>
          <svg
            className="fill-current duration-300 ease-in-out"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.1999 14.9343L15.6374 14.0624C15.5249 13.8937 15.4687 13.7249 15.4687 13.528V7.67803C15.4687 6.01865 14.7655 4.47178 13.4718 3.31865C12.4312 2.39053 11.0812 1.7999 9.64678 1.6874V1.1249C9.64678 0.787402 9.36553 0.478027 8.9999 0.478027C8.6624 0.478027 8.35303 0.759277 8.35303 1.1249V1.65928C8.29678 1.65928 8.24053 1.65928 8.18428 1.6874C4.92178 2.05303 2.4749 4.66865 2.4749 7.79053V13.528C2.44678 13.8093 2.39053 13.9499 2.33428 14.0343L1.7999 14.9343C1.63115 15.2155 1.63115 15.553 1.7999 15.8343C1.96865 16.0874 2.2499 16.2562 2.55928 16.2562H8.38115V16.8749C8.38115 17.2124 8.6624 17.5218 9.02803 17.5218C9.36553 17.5218 9.6749 17.2405 9.6749 16.8749V16.2562H15.4687C15.778 16.2562 16.0593 16.0874 16.228 15.8343C16.3968 15.553 16.3968 15.2155 16.1999 14.9343ZM3.23428 14.9905L3.43115 14.653C3.5999 14.3718 3.68428 14.0343 3.74053 13.6405V7.79053C3.74053 5.31553 5.70928 3.23428 8.3249 2.95303C9.92803 2.78428 11.503 3.2624 12.6562 4.2749C13.6687 5.1749 14.2312 6.38428 14.2312 7.67803V13.528C14.2312 13.9499 14.3437 14.3437 14.5968 14.7374L14.7655 14.9905H3.23428Z"
              fill=""
            />
          </svg>
        </Link>

        {dropdownOpen && (
          <div className="absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80">
            <div className="px-4.5 py-3">
              <h5 className="text-sm font-medium text-bodydark2 px-2">پیام ها</h5>
            </div>
            <ul className="flex h-auto flex-col overflow-y-auto">
              {notifications.length === 0 ? (
                <li className="px-4.5 py-3 text-center text-sm text-bodydark2">
                  پیامی موجود نیست.
                </li>
              ) : (
                notifications.map((notification, index) => (
                  <li key={index}>
                    <Link
                      className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                      href="#"
                    >
                      <p className="text-xs px-2">
                        گزارش روزانه واحد {roleMapping[notification.role]} در تاریخ {notification.reportDate} ثبت نشده است
                      </p>
                    </Link>
                  </li>
                ))
              )}
            </ul>
            {totalPages > 1 && (
              <div className="mt-3 flex justify-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-blue-300"
                >
                  قبلی
                </button>
                <span className="px-4 py-2 text-sm text-bodydark2">
                  صفحه {currentPage} از {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-blue-300"
                >
                  بعدی
                </button>
              </div>
            )}
          </div>
        )}
      </li>
    </ClickOutside>
  );
};

export default DropdownNotification;
