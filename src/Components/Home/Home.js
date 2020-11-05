import React from "react";
import Container from "react-bootstrap/Container";
import Banner from "../../Images/banner.jpeg";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterHashtagButton,
  TwitterMentionButton,
  TwitterTweetEmbed,
  TwitterMomentShare,
  TwitterDMButton,
  TwitterVideoEmbed,
  TwitterOnAirButton,
} from "react-twitter-embed";

import { Link } from "react-router-dom";

import Header from "../Shared/Header/Header";
import Footer from "../Shared/Footer/Footer";

function Home() {
  return (
    <div>
      <Header />
      <div>
        <div className="home-banner">
          <div className="banner-img-wrap">
            <img className="banner-img" src={Banner} />
            <div className="overlay"></div>
          </div>
          <div className="banner-main">
            <Container>
              <div className="inner-banner">
                <h1>Easy Shipping</h1>
                <h4>
                  ECommerce shipping solution with full safety and security. Enjoy lowest shipping
                  rates, widest reach and best customer support while we ship your products at right
                  place on right time.
                </h4>
                <button className="button sign-up-btn">
                  <Link to="/signup">Sign Up Free</Link>
                </button>
              </div>
            </Container>
          </div>
        </div>
        <div className="">
          <Container>
            <div className="features-sec">
              <h2 className="">Why Choose Us?</h2>
              <p>
                We’re here to help you achieve your overall shipping needs as they arise across all
                over India
              </p>
              <ul className="features">
                <li className="item">
                  <h5>We Reduce Cost</h5>
                  <ul className="list">
                    <li className="itm">Reduce Shipping Cost.</li>
                    <li className="itm">Compare prices and order shipping</li>
                    <li className="itm">Maximum insurance coverage for lost shipments</li>
                  </ul>
                </li>
                <li className="item">
                  <h5>We Make Shipping Easy</h5>
                  <ul className="list">
                    <li className="itm">Send anywhere</li>
                    <li className="itm">We keep traking the orders</li>
                    <li className="itm">Delivery on right time at the right place with.</li>
                  </ul>
                </li>
                <li className="item">
                  <h5>Comprehensive Supply Chain Solution</h5>
                  <ul className="list">
                    <li className="itm">Our efficient delivery services.</li>
                    <li className="itm">Real time tracing system</li>
                    <li className="itm">Support Available 24*7</li>
                  </ul>
                </li>
              </ul>
              <div className="solutions-wrp">
                <h2>All your business needs at a single platform</h2>
                <ul className="solutions">
                  <li>
                    <button className="button sol">Standard Delivery</button>
                  </li>
                  <li>
                    <button className="button sol">Expess Delivery</button>
                  </li>
                  <li>
                    <button className="button sol">LightWeight Delivery</button>
                  </li>
                  <li>
                    <button className="button sol">Heavy Weight Delivery</button>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>
        <div className="social-reach">
          <Container>
            <h2>What do sellers say about us</h2>
            <ul className="social-feedback">
              <li className="item">
                <TwitterTweetEmbed tweetId={"933354946111705097"} />
              </li>
              <li className="item">
                <TwitterTweetEmbed tweetId={"1165284614979686400"} />
              </li>
            </ul>
          </Container>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
