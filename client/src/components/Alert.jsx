import { Link } from "react-router-dom";
import icons from "../data/icons_Data";

function Alert({ message = "Something went wrong!", success = true, link = "#", close = () => {} }) {
  return (
    <div className="absolute top-1/2 left-[50%] transform -translate-x-1/2 -translate-y-1/2 size-80 flex flex-col items-center justify-center gap-6 bg-white rounded-xl shadow-2xl p-10">
      <span className={`${success ? "text-green-500" : "text-red-500"} text-6xl`}>{success ? icons.check : icons.xMarck}</span>
      <p className="text-xl font-semibold text-center">{message}</p>
      <Link to={link} onClick={close} className="btn-primary">OK</Link>
    </div>
  );
}

export default Alert;
