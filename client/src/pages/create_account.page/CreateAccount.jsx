import { useState } from "react";
import Alert from "../../components/Alert";
function CreateAccount() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const [showAlert, setShowAlert] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_API_URL;
      const link = `${apiUrl}/api/auth/create-account`;
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      };
      const response = await fetch(link, options);
      const data = await response.json();
      setLoading(false);
      if (!response.ok) {
        setError(data.message || "An error occured! Please try again later.");
        return;
      }
      setError(null);
      setShowAlert(data.message);
    } catch (error) {
      setLoading(false);
      setError('An error occured! Please try again later.');
    }
  };

  return (
    <>
      <div className="flex flex-wrap justify-center items-center">
        <div className="h-[calc(100vh-64px)] min-w-[400px] flex-1 px-6 bg-[url('/bank.jpeg')] bg-cover bg-no-repeat flex justify-center items-center">
          <div className="bg-neutral-500 bg-opacity-95 p-16 text-white min-w-[380px] xl:text-xl size-[80%] flex flex-col justify-around">
            <h2 className="md:text-4xl text-2xl font-bold text-center mb-12">
              Welcome to{" "}
              <span
                className="text-[var(--secondary-color)]"
                style={{ fontFamily: "Poetsen One" }}
              >
                VWCV
              </span>{" "}
              <span className="text-[var(--primary-text-color)]">Bank</span>
            </h2>
            <h4 className="text-center">
              Creating an account is quick and easy, Just follow these simple
              steps:
            </h4>
            <ul className="list-disc list-inside">
              <li className="font-semibold">
                Personal Information:
                <p className="font-normal ml-12">
                  Provide your full name and adress.
                </p>
              </li>
              <li className="font-semibold">
                Contact Details:
                <p className="font-normal ml-12">
                  Enter your phone number and email address.
                </p>
              </li>
              <li className="font-semibold">
                Security:
                <p className="font-normal ml-12">Create a secure password.</p>
              </li>
            </ul>
            <p>
              Once you complete these steps, you will have instant access to all
              our banking services.
            </p>
          </div>
        </div>
        <div className="relative h-[calc(100vh-64px)] min-w-[400px] flex-1 flex flex-col items-center justify-center px-6">
          <h2 className="text-neutral-600 text-4xl font-bold text-center mx-10 mb-16">
            Create Account
          </h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-4 w-[50%] min-w-[300px]"
          >
            <input
              type="text"
              placeholder="Full Name"
              id="username"
              className="bg-gray-100 p-3 w-full"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Address"
              id="address"
              className="bg-gray-100 p-3 w-full"
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Phone Number"
              id="phone"
              className="bg-gray-100 p-3 w-full"
              onChange={handleChange}
              required
            />
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
            <button
              disabled={loading}
              className="btn-primary mt-10 w-full shadow-md hover:shadow-lg"
            >
              {loading ? "Loading..." : "Create Account"}
            </button>
            <div className="text-red-600 mt-2 text-md h-4 w-full text-right">
              {error}
            </div>
          </form>
          {showAlert && (
            <Alert message={showAlert} link="/online-banking" />
          )}
        </div>
      </div>
    </>
  );
}

export default CreateAccount;
