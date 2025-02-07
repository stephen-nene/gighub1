// src/components/HeroSection.jsx
import React from "react";

const HeroSection = () => (
  <section className="hero-section deep-purple darken-3 white-text">
    <div className="container">
      <div className="row">
        <div className="col s12 m8 offset-m2 center-align" data-aos="fade-up">
          <h1 className="animate__animated animate__fadeInDown">
            Welcome to GigHub
          </h1>
          <p className="flow-text animate__animated animate__fadeInUp animate__delay-1s">
            Find or post gigs with ease. Join thousands of professionals today!
          </p>
          <a
            href="#post-gig"
            className="btn-large waves-effect waves-light deep-purple lighten-1 animate__animated animate__fadeInUp animate__delay-2s"
          >
            Post a Gig
          </a>
          <a
            href="#find-gig"
            className="btn-large waves-effect waves-light teal lighten-1 animate__animated animate__fadeInUp animate__delay-2s"
          >
            Find a Gig
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
