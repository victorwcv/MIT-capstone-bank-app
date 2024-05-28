import Navbar from "./components/navbar_Comp/navbar.jsx";
import Footer from "./components/footer_Comp/footer.jsx";
import Card from "./components/card_Comp/card.jsx";
import Carousel from "./components/carousel_Comp/carousel.jsx";
import banners from "./data/carousel_Data.js";
import icons from "./data/icons_Data.jsx";


function App() {
  return (
    < >
      <Navbar />
      <Carousel banners={banners} />
      <section className="container max-w-7xl m-auto text-center">
        <p className="text-2xl mt-20">We are here to serve you,</p>
        <h2 className="text-4xl mb-5 font-bold text-slate-700">What would you like to do today?</h2>
        <div className="container flex justify-evenly my-32">
          <Card icon={icons.credit_card} title={'Credit Card'} link={'#'}/>
          <Card icon={icons.money} title={'Loan'} link={'#'}/>
          <Card icon={icons.piggy} title={'Savings Account'} link={'#'}/>
          <Card icon={icons.secure} title={'Card Insurance'} link={'#'}/>
          <Card icon={icons.service} title={'Utility Payment'} link={'#'}/>
        </div>
      </section>
      <Footer /> 
      <a className="block text-center bg-yellow-300 text-sm font-light">
        Attention! This is an educational project and does not represent a real
        bank. Do not enter personal information. This website is fictitious and
        is for demonstration purposes only.
      </a>
    </>
  );
}

export default App;
