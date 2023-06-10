import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default class Testimonials extends Component {
  render() {
    return (
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        interval={6100}
      >
       
        <div style={{backgroundColor:'#DDE6ED'}}>
          <img src="/images/avatar.png" />
          <div className="myCarousel">
            <h3 style={{fontSize:"2rem"}}>Mahatma Gandhi</h3>
            <h4 style={{fontSize:"1.5rem"}}>India's Father Of Nation</h4>
            <p style={{fontSize:"1.5rem"}}>
            Strength does not come from physical capacity. It comes from an indomitable will.
            </p>
          </div>
        </div>
        <div style={{backgroundColor:'#DDE6ED'}}>
          <img src="/images/avatar.png" />
          <div className="myCarousel">
            <h3 style={{fontSize:"2rem"}}>Mahatma Gandhi</h3>
            <h4 style={{fontSize:"1.5rem"}}>India's Father Of Nation</h4>
            <p style={{fontSize:"1.5rem"}}>
            Strength does not come from physical capacity. It comes from an indomitable will.
            </p>
          </div>
        </div>
        <div style={{backgroundColor:'#DDE6ED'}}>
          <img src="/images/avatar.png" />
          <div className="myCarousel">
            <h3 style={{fontSize:"2rem"}}>Mahatma Gandhi</h3>
            <h4 style={{fontSize:"1.5rem"}}>India's Father Of Nation</h4>
            <p style={{fontSize:"1.5rem"}}>
            Strength does not come from physical capacity. It comes from an indomitable will.
            </p>
          </div>
        </div>

        
      </Carousel>
    );
  }
}


