import Card from "../../components/card_Comp/card.jsx";
import Carousel from "../../components/carousel_Comp/carousel.jsx";
import Footer from "../../components/footer_Comp/footer.jsx";
import banners from "../../data/carousel_Data.js";
import icons from '../../data/icons_Data.jsx';
import "./home.scss";

function Home() {
  return (
    <div className="home_page">
      <Carousel banners={banners} />
      <section className="operations-section">
        <p>We are here to serve you,</p>
        <h2>What would you like to do today?</h2>
        <div className="operations-container">
          <Card icon={icons.credit_card} title={'Credit Card'} link={'#'}/>
          <Card icon={icons.money} title={'Loan'} link={'#'}/>
          <Card icon={icons.piggy} title={'Savings Account'} link={'#'}/>
          <Card icon={icons.secure} title={'Card Insurance'} link={'#'}/>
          <Card icon={icons.service} title={'Utility Payment'} link={'#'}/>
        </div>
      </section>
    </div>
  );
}

export default Home;
