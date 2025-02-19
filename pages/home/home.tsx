import Calendar from "@/app/components/calender";
import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    // Set the direction globally
    document.documentElement.setAttribute("dir", "rtl");
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <div className="bg-gray-800 text-white py-3">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Navigation */}
          <div className="text-sm flex space-x-4 space-x-reverse">
            <a href="http://localhost:3001/" className="hover:underline">
              داشبورد
            </a>
            <a href="#" className="hover:underline">
              لینک های مفید
            </a>
            <a href="/" className="hover:underline">
              خروج
            </a>
            <a href="#" className="hover:underline">
              پیام ها
            </a>
          </div>

          {/* Welcome Title */}
          <div className="text-center">
            <h6 className="m-0">به سامانه میهن خوش آمدید</h6>
          </div>

          {/* Logo */}
          <img
            src="/logo/TIC-Logo.png"
            alt="Logo"
            className="w-20 h-20 object-cover"
          />
        </div>
      </div>

      {/* Cards Section */}
      <div className="flex-grow flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-11/12 mx-auto my-16">
          {/* Card 1 */}
          <a href="/forms/switch/reports" className="text-white no-underline">
            <div className="bg-blue-600 text-center p-6 rounded-md shadow-md">
              <h3 className="text-lg font-bold">دیتا و سوئیچ</h3>
              <p>Data&Switch</p>
            </div>
          </a>

          {/* Card 2 */}
          <a href="/forms/mux/reports" className="text-white no-underline">
            <div className="bg-blue-500 text-center p-6 rounded-md shadow-md">
              <h3 className="text-lg font-bold">انتقال</h3>
              <p>Mux</p>
            </div>
          </a>

          {/* Card 3 */}
          <a href="/forms/fiber/reports" className="text-white no-underline">
            <div className="bg-blue-400 text-center p-6 rounded-md shadow-md">
              <h3 className="text-lg font-bold">فیبر نوری</h3>
              <p>fiber</p>
            </div>
          </a>

          {/* Card 4 */}
          <a
            href="/forms/facilities/reports"
            className="text-white no-underline"
          >
            <div className="bg-cyan-600 text-center p-6 rounded-md shadow-md">
              <h3 className="text-lg font-bold">تاسیسات</h3>
              <p>Facilities</p>
            </div>
          </a>

          {/* Card 5 */}
          <a href="/forms/power/reports" className="text-white no-underline">
            <div className="bg-cyan-500 text-center p-6 rounded-md shadow-md">
              <h3 className="text-lg font-bold">پاور</h3>
              <p>Power</p>
            </div>
          </a>

          {/* Card 6 */}
          <a
            href="http://localhost:8080/about"
            className="text-white no-underline"
          >
            <div className="bg-cyan-400 text-center p-6 rounded-md shadow-md">
              <h3 className="text-lg font-bold">مالی و اداری</h3>
              <p>$$</p>
            </div>
          </a>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* About Us */}
            <div className="text-center md:text-right">
              <h5 className="font-bold">درباره ی ما</h5>
              <p>
                سامانه میهن یک سامانه یکپارچه نظارت هوشمند برای شرکت ارتباطات
                زیر ساخت می باشد
              </p>
            </div>

            {/* Links */}
            <div className="text-center">
              <h5 className="font-bold">لینک ها</h5>
              <ul className="list-none space-y-2">
                <li>
                  <a href="#" className="hover:underline">
                    خانه
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    درباره ی ما
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    تماس با ما
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="text-center md:text-left">
              <h5 className="font-bold">Contact</h5>
              <p>
                Email: mehdiopec66@gmail.com <br />
                Phone: 09351173639
              </p>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center mt-4">
            <small>&copy; 2025 Your Company. All Rights Reserved.</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
