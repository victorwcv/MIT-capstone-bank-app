import { Link } from "react-router-dom";

function Card({icon, title, link}) {
  return (
    <div className=" size-fit rounded-md shadow-lg hover:scale-110 transition-all">
      <Link className="flex justify-center items-center flex-col gap-4 size-40 " to={link}>
        <div className="text-6xl text-[var(--secondary-color)]" >{icon}</div>
        <h3 className="font-semibold text-neutral-600">{title}</h3>
      </Link>
    </div>
  );
}

export default Card;
