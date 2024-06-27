import { useDispatch, useSelector } from "react-redux";
import { useUser } from "../../hooks/useUser";
import {
  adminStart,
  adminSuccess,
  adminFailure,
  adminEnd,
} from "../../store/slices/adminSlice";
import getCurrentDateTime from "../../utils/dates";

function AdminData() {
  const admin = useSelector((state) => state.admin);
  const { currentUser } = useUser();
  const dispatch = useDispatch();
  const date = getCurrentDateTime().onlyDate;

  console.log("admin data");
  return (
    <>
      <h2 className="text-3xl text-center font-bold mb-10">
        Welcome to Admin Panel
      </h2>

      <h3 className="text-2xl font-bold mb-3">General Information</h3>
      <ol className="text-lg list-decimal mb-6" >
        <li>Operating time will be stored in our database.</li>
        <li>Any movement outside of operating hours will be logged and notified to the appropriate person via email.</li>
      </ol>
      <div className="flex justify-center gap-4">
        <ul className="text-lg">
          <li>
            <strong>User ID:</strong> {currentUser._id}
          </li>
          <li>
            <strong>Name:</strong> {currentUser.username}
          </li>
          <li>
            <strong>Email:</strong> {currentUser.email}
          </li>
          <li>
            <strong>Date:</strong> {date}
          </li>
          <li>
            <strong>Admin Start Time:</strong> {admin.startTime}
          </li>
          <li>
            <strong>Admin End Time:</strong> {admin.endTime}
          </li>
        </ul>
      </div>
      <div className="flex justify-center gap-4 mt-10">
        <button
          className="btn-primary"
          disabled={admin.administering}
          onClick={() => dispatch(adminSuccess())}
        >
          Begin Administration
        </button>
        <button
          className="btn-primary"
          disabled={!admin.administering}
          onClick={() => dispatch(adminEnd())}
        >
          Finish Administration
        </button>
      </div>
    </>
  );
}

export default AdminData;
