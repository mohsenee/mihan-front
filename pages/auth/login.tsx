import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchUserData } from '../../app/utils/fetchUserData';
import { AppDispatch } from '../../app/store/store';
import { useDispatch } from "react-redux";

const Login = () => {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  useEffect(() => {
      document.documentElement.setAttribute("dir", "ltr");
      localStorage.removeItem('access_token');
      localStorage.removeItem('userName');
      localStorage.removeItem('role');
      localStorage.removeItem('access');

    }, []);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, password }),
      });

      const data = await response.json();
      console.log("Login Response:", data);

      if (!response.ok) {
        throw new Error("Login failed. Please check your credentials.");
      }

      
      localStorage.setItem("access_token", data.access_token);
      await fetchUserData(dispatch, data.access_token);

      router.push("/home/home");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold text-blue-700">
          ورود به حساب کاربری
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="code" className="block text-sm font-medium text-gray-900 text-right">
              کدملی
            </label>
            <input
              id="code"
              name="code"
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-indigo-600 sm:text-sm"
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-900 text-right">
                رمز
              </label>
              <a href="#" className="text-sm text-blue-700 hover:text-blue-500">
                رمز خود را فراموش کرده اید؟
              </a>
            </div>
            <div className="mt-2 relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-indigo-600 sm:text-sm"
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div>
            <button
              type="submit"
              className="w-full rounded-md bg-blue-700 px-3 py-1.5 text-white font-semibold hover:bg-blue-500"
            >
              ورود
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-blue-500">
          عضو سامانه نیستید؟{" "}
          <a href="/auth/register" className="font-semibold text-blue-700 hover:text-blue-500">
            ساخت حساب کاربری
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
