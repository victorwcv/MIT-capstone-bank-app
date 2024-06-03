import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
function Navbar() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <nav className="bg-neutral-100 p-4">
      <div className="container mx-auto flex justify-around items-center">
        <div>
          <h1 className="font-bold text-2xl inline mr-10">
            <Link to="/">
              <span
                className="text-[var(--secondary-color)]"
                style={{ fontFamily: "Poetsen One" }}
              >
                VWCV
              </span>{" "}
              Bank
            </Link>
          </h1>
          <div className="space-x-4 inline">
            <Link to="/" className="text-neutral-600 hover:text-neutral-800 ">
              Home
            </Link>
            <Link to="#" className="text-neutral-600 hover:text-neutral-800 ">
              Products
            </Link>
            <Link to="#" className="text-neutral-600 hover:text-neutral-800 ">
              Suport
            </Link>
            <Link to="#" className="text-neutral-600 hover:text-neutral-800 ">
              Transactions
            </Link>
            <Link to="#" className="text-neutral-600 hover:text-neutral-800 ">
              All Data
            </Link>
          </div>
        </div>
        <div className="space-x-4">
          {currentUser ? (
            ""
          ) : (
            <Link
              to="/create-account"
              className="border-2 font-semibold rounded-full border-[var(--secondary-color)] py-2 px-10"
            >
              Create Account
            </Link>
          )}
          <Link
            to="/dashboard"
            className="hover:underline underline-offset-4"
          >
            {currentUser
              ? `Welcome, ${currentUser.username}`
              : "Online Banking"}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
