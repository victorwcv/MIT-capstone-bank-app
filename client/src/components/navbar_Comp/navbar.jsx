import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="bg-neutral-100 p-4">
      <div className="container mx-auto flex justify-around items-center">
        <div >
          <h1 className="font-bold text-xl inline mr-10">
            <Link to='/'><span className="text-[var(--secondary-color)]" style={{fontFamily:"Poetsen One"}}>VWCV</span> Bank</Link>
          </h1>
          <div className="space-x-4 inline">
            <Link to='#' className="text-neutral-600 hover:text-neutral-800 ">Transactions</Link>
            <Link to='#' className="text-neutral-600 hover:text-neutral-800 ">Products</Link>
            <Link to='#' className="text-neutral-600 hover:text-neutral-800 ">Suport</Link>
          </div>
        </div>
        <div className="space-x-4">
          <Link to='/create-account' className="border-2 rounded-full border-[var(--secondary-color)] hover:border-blue-500 py-2 px-10">Create Account</Link>
          <Link to='/online-banking' className="hover:underline underline-offset-4">Online Banking</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
