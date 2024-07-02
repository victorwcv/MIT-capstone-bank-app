import Carousel from "../../components/carousel/Carousel.jsx";
import Card from "../../components/home/Card.jsx";
import banners from "../../data/carousel_Data.js";
import icons from "../../data/icons_Data.jsx";
import Layout from "../../layouts/Layout.jsx";

function Home() {
  return (
    <Layout>
      <img src="banner.jpeg" alt="" className="w-full h-96 object-cover"/>
      <section className="container m-auto text-center bg-slate-50">
        <p className="text-2xl mt-20">We are here to serve you,</p>
        <h2 className="text-4xl mb-5 font-bold text-slate-700">
          What would you like to do today?
        </h2>
        <div className="container flex flex-wrap justify-center gap-10 mx-auto my-32">
          <Card icon={icons.credit_card} title={"Credit Card"} link={"/create-account"} />
          <Card icon={icons.money} title={"Loan"} link={"/create-account"} />
          <Card icon={icons.piggy} title={"Savings Account"} link={"/create-account"} />
          <Card icon={icons.secure} title={"Card Insurance"} link={"/create-account"} />
          <Card icon={icons.service} title={"Utility Payment"} link={"/create-account"} />
        </div>
      </section>
    </Layout>
  )
}

export default Home