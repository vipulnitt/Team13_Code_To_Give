import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

export default class Testimonials extends Component {
  render() {
    return (
      <Carousel
        showArrows={false}
        infiniteLoop={false}
        showThumbs={true}
        showStatus={false}
        autoPlay={false}
        interval={3000}
      >
       
        <div style={{backgroundColor:'#DDE6ED'}}>
          <img src="/images/article1.png" />
          <div className="myCarousel">
            <h3 style={{fontSize:"2rem"}}>Mahatma Gandhi</h3>
            <br></br>

            {/* <h4 style={{fontSize:"1.5rem"}}>India's Father Of Nation</h4> */}
            <p style={{fontSize:"1.5rem"}}>
            A lot of us think there’s no way we’ll ever be able to give up drugs or alcohol, but we underestimate the strength within ourselves. Sure, the easier route may be to give up and return to our old ways, but we can beat this disease once and for all. We must commit to ourselves and have focus, determination, and hard work. </p>
          </div>
        </div>
        <div style={{backgroundColor:'#DDE6ED'}}>
          <img src="/images/article2.png" />
          <div className="myCarousel">
            <h3 style={{fontSize:"2rem"}}>Robert Downey Jr. </h3>
            <br></br>
            {/* <h4 style={{fontSize:"1.5rem"}}>India's Father Of Nation</h4> */}
            <p style={{fontSize:"1.5rem"}}>
            The actor says he used drugs before he was a teenager and spent most of his early career under their influence. He had several high-profile arrests in the late 1990s and early 2000s while misusing alcohol, cocaine, and heroin and spent time in a California prison and a state-run rehab facility. In 2002, he announced that he was recovered. Marvel’s 2008 movie Iron Man revived his stalled career.
            </p>
          </div>
        </div>
        <div style={{backgroundColor:'#DDE6ED'}}>
          <img src="/images/article3.png" />
          <div className="myCarousel">
            <h3 style={{fontSize:"2rem"}}>Ben Affleck </h3>
            <br></br>

            {/* <h4 style={{fontSize:"1.5rem"}}>India's Father Of Nation</h4> */}
            <p style={{fontSize:"1.5rem"}}>
            Affleck, who won Academy Awards for Good Will Hunting and Argo and starred as Batman in the DC Comics franchise, has been open about his issues with alcohol. He went to rehab for the first time in 2001 and has called addiction “a lifelong and difficult struggle.” Following a stay at a treatment center in 2018, Affleck said on social media, “If you have a problem, getting help is a sign of courage, not weakness or failure.
            </p>
          </div>
        </div>

        
      </Carousel>
    );
  }
}