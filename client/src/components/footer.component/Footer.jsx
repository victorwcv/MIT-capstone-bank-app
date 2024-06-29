
function Footer() {
  return (
    <footer className="flex flex-wrap gap-12 justify-evenly py-10 bg-neutral-100 text-neutral-500">
      <aside className="min-w-[300px] flex flex-col justify-center">
        <div className="mx-auto">

        <h2>&copy; <span className="font-bold" style={{ fontFamily: "Poetsen One" }}>VWCV</span> <span>BANK</span>&trade;</h2>
        <p>
          Your bank since 1995
          <br />
          <small>By Victor Ccanchi - MIT xPro 2024</small>
        </p>
        </div>
      </aside>
      <div className='min-w-[300px] flex flex-col items-center'>
        <h3 className="font-semibold underline underline-offset-2">Services</h3>
        <a className="cursor-pointer hover:text-neutral-900">Branding</a>
        <a className="cursor-pointer hover:text-neutral-900">Design</a>
        <a className="cursor-pointer hover:text-neutral-900">Marketing</a>
        <a className="cursor-pointer hover:text-neutral-900">Advertisement</a>
      </div>
      <div className='min-w-[300px] flex flex-col items-center'>
        <h3 className="font-semibold underline underline-offset-2">Company</h3>
        <a className="cursor-pointer hover:text-neutral-900">About us</a>
        <a className="cursor-pointer hover:text-neutral-900">Contact</a>
        <a className="cursor-pointer hover:text-neutral-900">Jobs</a>
        <a className="cursor-pointer hover:text-neutral-900">Press kit</a>
      </div>
      <div className='min-w-[300px] flex flex-col items-center'>
        <h3 className="font-semibold underline underline-offset-2">Legal</h3>
        <a className="cursor-pointer hover:text-neutral-900">Terms of use</a>
        <a className="cursor-pointer hover:text-neutral-900">Privacy policy</a>
        <a className="cursor-pointer hover:text-neutral-900">Cookie policy</a>
      </div>
    </footer>
  );
}

export default Footer;
