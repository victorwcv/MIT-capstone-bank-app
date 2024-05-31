import { useState } from "react";
import "./onlineBanking.scss";

function OnlineBanking() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ state: false, message: "" });
  const [formData, setFormData] = useState({});
  console.log(error);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form data before submission
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/auth/online-banking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      let data = await res.json();
      setLoading(false);
      console.log(data);
      if (!res.ok) {
        setError({ state: !data.success, message: data.message });
      } else {
        setError({ state: false, message: "" });
      }
    } catch (error) {
      setError({ state: !data.success, message: data.message });
      setLoading(false);
    }
  };

  return (
    <>
      <div className="online-banking">
        <div className="welcome-container">
          <h1> Online Banking </h1>
          <p>
            Manage your finances with ease and security. Log in to access your
            accounts, make transactions, and more.
          </p>
          <ul>
            <li>Secure and convenient access to your accounts</li>
            <li>24/7 availability for all your banking needs</li>
            <li>Quick transfers and bill payments</li>
            <li>Real-time transaction alerts</li>
          </ul>
        </div>

        <div className="form-container">
          <h2 className="text-neutral-600 text-4xl font-bold text-center mx-6 mb-16">
            Access to your Account
          </h2>
          <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
            {/* Input fields */}
            <input
              type="email"
              placeholder="Email"
              id="email"
              className="bg-gray-100 p-3 rounded-lg outline-none"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              className="bg-gray-100 p-3 rounded-lg outline-none"
              onChange={handleChange}
              required
            />
            {/* Submit button */}
            <button
              // disabled={loading}
              className="bg-green-500 font-bold text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
              {loading ? "Loading..." : "Access"}
            </button>
            <p className="text-red-600 mt-2 text-sm h-4">
              {error.state && error.message}
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default OnlineBanking;
