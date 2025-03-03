import Login from "./auth/login";


export default function Home() {

  // useEffect(() => {
  //   document.documentElement.setAttribute("dir", "rtl");
  // }, []);

  return (
    <div id="root">
      <div>
        <div className="notification-container notification-container-empty">
          <div></div>
        </div>
        <div className="w-full">
          <div className="mb-0 w-full card-group flex">
            <div className="w-full flex relative lg:max-w-md xl:max-w-xl h-screen justify-center bg-slate-50 dark:bg-[var(--color-echo)] dark:bg-[image:none] dark:border border-solid border-0 border-r border-[var(--border-color)]">
              <div className="flex relative h-screen w-full justify-center overflow-auto">
                <div className="p-8 login-card-top my-auto w-full max-w-sm">
                  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <Login /> 
                  </div>
                </div>
              </div>
            </div>

            <div className="text-white flex-1 bg-center login_box md:hidden lg:block card bg-slate-800">
              <div className="logo-wrapper flex items-center justify-center h-screen">
                <div className="flex items-center justify-between px-10">
                  <div className="logo-center flex items-center">
                    <img
                      src="/logo/TIC-Logo.png"
                      className="w-60 h-60 mr-4 ml-4"
                      alt="logo"
                    />
                    <div className="text-center card-body">
                      <h1 className="font-bold text-5xl mb-6">سامانه میهن</h1>
                      <h2 className="font-bold text-2xl mt-6">
                        مدیریت یکپارچه هوشمند نگهداری و نظارت
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

