import './App.css'
import Carousel from './components/carousel_Comp/carousel.jsx';
import Navbar from "./components/navbar_Comp/navbar.jsx";
import banners from './data/carousel_Data.js'

function App() {

  return (
    <>
     <Navbar />
     <Carousel banners={banners}/>
    </>
  )
}

export default App
