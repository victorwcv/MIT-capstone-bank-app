import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import icons from "../../data/icons_Data";
import { signout } from "../../store/slices/userSlice";
import { clearData } from "../../store/slices/userDataSlice";
function Navbar() {
  const { currentUser } = useSelector((state) => state.user);

  let isUser = currentUser && currentUser.role === "user";
  let isAdmin = currentUser && currentUser.role === "admin";

  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      await fetch("http://localhost:3000/api/auth/signout");
      dispatch(clearData());
      dispatch(signout());
    } catch (error) {
      console.log(error);
    }
  };

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

            {isUser && (
              <Link
                to="/transactions"
                className="text-neutral-600 hover:text-neutral-800"
              >
                Transactions
              </Link>
            )}

            {isAdmin && (
              <Link
                to="/admin-panel"
                className="text-red-500 hover:text-red-700"
              >
                Admin Panel
              </Link>
            )}
          </div>
        </div>

        <div className="space-x-4">
          {currentUser ? (
            <>
              <Link
                to="/dashboard"
                className="hover:underline underline-offset-4"
              >
                {currentUser && currentUser.username}
              </Link>

              <button
                onClick={handleSignout}
                className="inline-flex gap-3 items-center bg-red-600 text-white px-3 py-1 rounded-lg"
              >
                Sign out <span>{icons.signout}</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/create-account"
                className="border-2 font-semibold rounded-full border-[var(--secondary-color)] py-2 px-10"
              >
                Create Account
              </Link>
              <Link
                to="/online-banking"
                className="hover:underline underline-offset-4"
              >
                Online Banking
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
