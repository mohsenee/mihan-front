// import {
//   ArrowPathIcon,
//   CloudArrowUpIcon,
//   FingerPrintIcon,
//   LockClosedIcon,
// } from "@heroicons/react/24/outline";

// const features = [
//   {
//     name: "ثبت گزارش روزانه",
//     description: "",
//     icon: CloudArrowUpIcon,
//   },
//   {
//     name: "ثبت گزارش هفتگی",
//     description: "",
//     icon: LockClosedIcon,
//   },
//   {
//     name: "ثبت گزارش ماهانه",
//     description: "",
//     icon: ArrowPathIcon,
//   },
// ];

// export default function Home() {
//   const handleFeatureClick = (name: string) => {
//     console.log(`Feature clicked: ${name}`);
//   };

//   return (
    
//     // <div className="bg-white py-24 sm:py-32">
//     //   <div className="logo-wrapper flex items-center justify-center mb-5">
//     //     <div className="flex items-center justify-between px-10">
//     //       <div className="logo-center flex items-center">
//     //         <div className="text-center card-body">
//     //           <h1 className="font-bold text-5xl mb-4">سامانه میهن</h1>
//     //           <h2 className="font-bold text-3xl mt-2">
//     //             مدیریت یکپارچه هوشمند با رویکرد نگهداری و نظارت
//     //           </h2>
//     //         </div>
//     //         <img
//     //           src="/logo/logo.jpg"
//     //           className="w-24 h-24 mr-4 ml-4"
//     //           alt="logo"
//     //         />
//     //       </div>
//     //     </div>
//     //   </div>
//     //   <div className="mx-auto max-w-7xl px-6 lg:px-8">
//     //     {/* <div className="mx-auto max-w-2xl lg:text-center">
//     //       <h2 className="text-base/7 font-semibold text-indigo-600">
//     //         Deploy faster
//     //       </h2>
//     //       <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
//     //         Everything you need to deploy your app
//     //       </p>
//     //       <p className="mt-6 text-lg/8 text-gray-600">
//     //         Quis tellus eget adipiscing convallis sit sit eget aliquet quis.
//     //         Suspendisse eget egestas a elementum pulvinar et feugiat blandit at.
//     //         In mi viverra elit nunc.
//     //       </p>
//     //     </div> */}
//     //     {/* <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
//     //       <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
//     //         {features.map((feature) => (
//     //           <div key={feature.name} className="relative pr-16 text-right">
//     //             <dt className="text-base/7 font-semibold text-gray-900">
//     //               <div className="absolute right-0 top-0 flex size-10 items-center justify-center rounded-lg bg-blue-600">
//     //                 <feature.icon
//     //                   aria-hidden="true"
//     //                   className="size-6 text-white"
//     //                 />
//     //               </div>
//     //               {feature.name}
//     //             </dt>
//     //             <dd className="mt-2 text-base/7 text-gray-600">
//     //               {feature.description}
//     //             </dd>
//     //           </div>
//     //         ))}
//     //       </dl>
//     //     </div> */}

//     //     <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
//     //       <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
//     //         {features.map((feature) => (
//     //           <div
//     //             key={feature.name}
//     //             className="relative pr-16 text-right"
//     //             onClick={() => handleFeatureClick(feature.name)} // Add an onClick handler
//     //           >
//     //             <dt className="text-base/7 font-semibold text-gray-900 cursor-pointer hover:text-blue-600">
//     //               <div className="absolute right-0 top-0 flex size-10 items-center justify-center rounded-lg bg-blue-600">
//     //                 <feature.icon
//     //                   aria-hidden="true"
//     //                   className="size-6 text-white"
//     //                 />
//     //               </div>
//     //               {feature.name}
//     //             </dt>
//     //             <dd className="mt-2 text-base/7 text-gray-600 cursor-pointer hover:text-blue-600">
//     //               {feature.description}
//     //             </dd>
//     //           </div>
//     //         ))}
//     //       </dl>
//     //     </div>
//     //   </div>
//     // </div>
//   );
// }

import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    // Set the direction globally
    document.documentElement.setAttribute("dir", "rtl");
  }, []);

  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-gray-900 text-white py-3">
        <div
          className="container mx-auto flex justify-between items-center px-4"
        >
          {/* Navigation */}
          <div className="text-sm flex space-x-4 space-x-reverse">
            <a href="#" className="hover:underline">
              داشبورد
            </a>
            <a href="#" className="hover:underline">
              لینک های مفید
            </a>
            <a href="#" className="hover:underline">
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
            src="/logo/logo.jpg"
            alt="Logo"
            className="w-16 h-12 object-cover"
          />
        </div>
      </div>

      {/* Cards Section */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-4 w-11/12 mx-auto my-16"
      >
        {/* Card 1 */}
        <a
          href="http://localhost:3000/forms.SwitchReportForm"
          className="text-white no-underline"
        >
          <div className="bg-blue-600 text-center p-6 rounded-md shadow-md">
            <h3 className="text-lg font-bold">دیتا و سوئیچ</h3>
            <p>Data&Switch</p>
          </div>
        </a>

        {/* Card 2 */}
        <a
          href="http://localhost:8080/about"
          className="text-white no-underline"
        >
          <div className="bg-green-600 text-center p-6 rounded-md shadow-md">
            <h3 className="text-lg font-bold">انتقال</h3>
            <p>Mux</p>
          </div>
        </a>

        {/* Card 3 */}
        <a
          href="http://localhost:8080/about"
          className="text-white no-underline"
        >
          <div className="bg-cyan-600 text-center p-6 rounded-md shadow-md">
            <h3 className="text-lg font-bold">فیبر نوری</h3>
            <p>fiber</p>
          </div>
        </a>

        {/* Card 4 */}
        <a
          href="http://localhost:8080/about"
          className="text-white no-underline"
        >
          <div className="bg-cyan-600 text-center p-6 rounded-md shadow-md">
            <h3 className="text-lg font-bold">تاسیسات</h3>
            <p>Facilities</p>
          </div>
        </a>

        {/* Card 5 */}
        <a
          href="http://localhost:8080/about"
          className="text-white no-underline"
        >
          <div className="bg-red-600 text-center p-6 rounded-md shadow-md">
            <h3 className="text-lg font-bold">پاور</h3>
            <p>Power</p>
          </div>
        </a>

        {/* Card 6 */}
        <a
          href="http://localhost:8080/about"
          className="text-white no-underline"
        >
          <div className="bg-yellow-500 text-center p-6 rounded-md shadow-md">
            <h3 className="text-lg font-bold">مالی و اداری</h3>
            <p>$$</p>
          </div>
        </a>
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

