import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import "./onlineBanking.scss";
import {
  authFailure,
  authStart,
  authSuccess,
} from "../../store/slices/userSlice";

function OnlineBanking() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(authStart());
      const apiUrl = import.meta.env.VITE_API_URL;
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      };
      const response = await fetch(
        `${apiUrl}/api/auth/online-banking`,
        options
      );
      const data = await response.json();
      if (!response.ok) {
        dispatch(authFailure(data));
        return;
      }
      dispatch(authSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(authFailure(error));
    }
  };

  return (
    <>
      <div className="flex flex-wrap justify-center items-center">
        <div className="h-[calc(100vh-64px)] min-w-[500px] flex-1 px-6 bg-[url('/bank_2.jpeg')] bg-cover bg-no-repeat flex justify-center items-center">
          <div className="bg-neutral-500 bg-opacity-95 p-16 text-white min-w-[400px] text-xl size-[80%] flex flex-col justify-around">
            <h2 className="text-4xl font-bold text-center mb-12"> Online Banking </h2>
            <p className="text-center">
              Manage your finances with ease and security. Log in to access your
              accounts, make transactions, and more.
            </p>
            <ul className="list-disc list-inside mx-auto">
              <li>Secure and convenient access to your accounts</li>
              <li>24/7 availability for all your banking needs</li>
              <li>Quick transfers and bill payments</li>
              <li>Real-time transaction alerts</li>
            </ul>
          </div>
        </div>

        <div className="h-[calc(100vh-64px)] min-w-[500px] flex-1 flex flex-col items-center justify-center px-6">
          <h2 className="text-neutral-600 text-4xl font-bold text-center mx-6 mb-16">
            Access to your Account
          </h2>
          <form className="flex flex-col items-center gap-4 w-[50%] min-w-[300px]" onSubmit={handleSubmit}>
            {/* Input fields */}
            <input
              type="email"
              placeholder="Email"
              id="email"
              className="bg-gray-100 p-3 w-full"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              className="bg-gray-100 p-3 w-full"
              onChange={handleChange}
              required
            />
            {/* Submit button */}
            <button
              // disabled={loading}
              className="btn-primary mt-10 w-full shadow-md hover:shadow-lg"
            >
              {loading ? "Loading..." : "Access"}
            </button>
            <p className="text-red-600 mt-2 text-sm h-4">
              {error ? error.message || "somenthing went wrong" : ""}
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default OnlineBanking;
