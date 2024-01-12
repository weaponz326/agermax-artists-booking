// import { Component } from "./Component";
// import "../screens/Desktop/style.css";
import { Component } from './Component'
import Carousel from './Carousel'
export default function Header() {
  return (
    <header>
      <div className='header-background'>
        <div className='top-bar'>
          <div className='logo first-img'>
            <img className='logo-img ' alt='App dark' src='/img/app-dark-1.png' />
          </div>
          <div className='search-component'>
            <Component />
          </div>
          <div className='logo last-img'>
            <img className='logo-img ' alt='Ellipse' src='/img/ellipse-121.png' />
          </div>
        </div>

        <div className='greetings'>
          <div>
            <p className='greetings-hi'>Hey John!&nbsp;&nbsp;👋</p>
          </div>
          <div>
            <p className='greetings-message'>Book amazing artists for your next events</p>
          </div>
        </div>
      </div>
      <div className='header-carousel'>
        <Carousel />
        <Carousel />
        <Carousel />
        <Carousel />
      </div>
    </header>
  )
}
