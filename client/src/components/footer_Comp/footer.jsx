import './footer.scss'

function Footer() {
  return (
    <footer className="footer">
      <aside>
        <h2>VWCV <span>BANK</span></h2>
        <p>
          &copy; VWCV Bank&trade;
          <br />
          Your bank since 1995
          <br />
          <small>By Victor Ccanchi - MIT xPro 2024</small>
        </p>
      </aside>
      <div className='section-container'>
        <h6 >Services</h6>
        <a>Branding</a>
        <a>Design</a>
        <a>Marketing</a>
        <a>Advertisement</a>
      </div>
      <div className='section-container'>
        <h6 >Company</h6>
        <a>About us</a>
        <a>Contact</a>
        <a>Jobs</a>
        <a>Press kit</a>
      </div>
      <div className='section-container'>
        <h6 >Legal</h6>
        <a>Terms of use</a>
        <a>Privacy policy</a>
        <a>Cookie policy</a>
      </div>
    </footer>
  );
}

export default Footer;
