import { useState } from "react";
import "./createAcount.scss";
function CreateAccount() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({state: false, message: ''});
  const [formData, setFormData] = useState({});
  console.log('error', error);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/auth/create-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (!data.success) {
        setError({state:!data.success, message:data.message})
      }
    } catch (error) {
      setLoading(false);
      setError({ state: true, message:"An error occured! Please try again later." })
    }
  };

  return (
    <>
      <div className="create-account">
        <div className="steps-container">
          <h2>
            Welcome to <span>VWCV</span> Bank
          </h2>
          <h4>
            Creating an account is quick and easy, Just follow these simple
            steps:
          </h4>
          <ul>
            <li>
              Personal Information:
              <span>Provide your full name and adress.</span>
            </li>
            <li>
              Contact Details:
              <span>Enter your phone number and email address.</span>
            </li>
            <li>
              Security:
              <span>Create a secure password.</span>
            </li>
          </ul>
          <p>
            Once you complete these steps, you will have instant access to all
            our banking services.
          </p>
        </div>
        <div className="create-acc-form">
          <h2 className="text-neutral-600 text-4xl font-bold text-center mx-10 mb-16">
            Create new Account
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="Full Name"
              id="username"
              className="bg-gray-100 p-3 rounded-lg outline-none"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Address"
              id="address"
              className="bg-gray-100 p-3 rounded-lg outline-none"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Phone Number"
              id="phone"
              className="bg-gray-100 p-3 rounded-lg outline-none"
              onChange={handleChange}
              required
            />
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
            <button
              // disabled={loading}
              className="bg-blue-500 font-bold text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
            >
              {loading ? "Loading" : "Create Account"}
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

export default CreateAccount;
