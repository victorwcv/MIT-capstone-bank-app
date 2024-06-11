import Carousel from "../../components/carousel/Carousel.jsx";
import Card from "../../components/home/Card.jsx";
import banners from "../../data/carousel_Data.js";
import icons from "../../data/icons_Data.jsx";

function Home() {
  return (
    <div>
      <Carousel banners={banners} />
      <section className="container max-w-7xl m-auto text-center">
        <p className="text-2xl mt-20">We are here to serve you,</p>
        <h2 className="text-4xl mb-5 font-bold text-slate-700">
          What would you like to do today?
        </h2>
        <div className="container flex flex-wrap justify-center gap-10 mx-auto my-32">
          <Card icon={icons.credit_card} title={"Credit Card"} link={"#"} />
          <Card icon={icons.money} title={"Loan"} link={"#"} />
          <Card icon={icons.piggy} title={"Savings Account"} link={"#"} />
          <Card icon={icons.secure} title={"Card Insurance"} link={"#"} />
          <Card icon={icons.service} title={"Utility Payment"} link={"#"} />
        </div>
      </section>
    </div>
  )
}

export default Home