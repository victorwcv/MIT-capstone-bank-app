import "./onlineBanking.scss";


function OnlineBanking() {
  return (
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
        <h2 className="text-neutral-600 text-4xl font-bold text-center mb-16">Access to your Account</h2>
        <form
          className="flex flex-col gap-10"
          // onSubmit={handleSubmit}
        >
          {/* Input fields */}
          <input
            type="email"
            placeholder="Correo electrónico"
            id="email"
            className="bg-gray-100 p-3 rounded-lg outline-none"
            // onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Contraseña"
            id="password"
            className="bg-gray-100 p-3 rounded-lg outline-none"
            // onChange={handleChange}
          />
          {/* Submit button */}
          <button
            // disabled={loading}
            className="bg-green-500 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {"Access Account"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default OnlineBanking;
