import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import icons from "../../data/icons_Data";
import { signout } from "../../store/slices/userSlice";
import { clearData } from "../../store/slices/userDataSlice";
import { adminReset } from "../../store/slices/adminSlice";
function Navbar() {
  const { currentUser } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const location = useLocation();

  const handleSignout = async () => {
    try {
      await fetch("http://localhost:3000/api/auth/signout");
      dispatch(adminReset());
      dispatch(clearData());
      dispatch(signout());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="sticky top-0 z-10 bg-neutral-100 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center font-medium">
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
          {location.pathname !== "/admin-panel" && (
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

              {currentUser?.role === "user" && (
                <Link
                  to="/transactions"
                  className="text-neutral-600 hover:text-neutral-800"
                >
                  Transactions
                </Link>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          {currentUser ? (
            <>
              <Link
                to={
                  currentUser.role === "admin"
                    ? "/admin-panel"
                    : currentUser.role === "user"
                    ? "/dashboard"
                    : "/"
                }
                className="inline-flex  gap-3 items-center bg-neutral-600 text-white px-3 py-1 rounded-lg hover:bg-inherit hover:text-neutral-600 transition-colors"
              >
                <span>
                  {currentUser.role === "admin" ? icons.admin : icons.user}
                </span>
                {currentUser.username}
              </Link>

              <button
                onClick={handleSignout}
                className="inline-flex  gap-3 items-center bg-red-600 text-white px-3 py-1 rounded-lg active:scale-95"
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
