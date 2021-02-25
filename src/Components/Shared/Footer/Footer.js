import React from "react";
import Container from "react-bootstrap/Container";
import { FaTwitter, FaFacebookF, FaPhoneVolume } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { IoIosMail } from "react-icons/io";

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <div className="footer-wrp">
          <div className="sec about-us">
            <div className="logo">
              <a href="">Wooden Culture</a>
            </div>
            <ul className="">
              <li>
                <p>
                  Wooden Culture, a product of Stackfoot Retail Solution Pvt. Ltd., is India’s best
                  logistics software, which offers you automated shipping solution. Using this, you
                  can ship anywhere in India and abroad using the best courier company and at
                  discounted rates.
                </p>
              </li>
            </ul>
            <ul className="social-icons">
              <li>
                <a href="">
                  <FaTwitter />
                </a>
              </li>
              <li>
                <a href="">
                  <FaFacebookF color={"#3b5998"} />
                </a>
              </li>
            </ul>
          </div>
          <div className="sec more">
            <div className="">
              <h5>More</h5>
            </div>
            <ul className=""></ul>
          </div>
          <div className="sec more info">
            <div className="">
              <h5>Knowledge base</h5>
            </div>
            <ul className="">
              <li>
                <a href="">F&Q</a>
              </li>
              <li>
                <a href="">Merchant Aggrement</a>
              </li>
              <li>
                <a href="">Privacy Policy</a>
              </li>
              <li>
                <a href="">Refund & Cancellation Policy</a>
              </li>
              <li>
                <a href="">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="sec more connect">
            <div className="">
              <h5>Connect with Us</h5>
            </div>
            <ul className="">
              <li>
                <IoIosMail className="connect-icon" />

                <a href="">support@woodenculture.com</a>
              </li>
              <li>
                <FaPhoneVolume className="connect-icon" />

                <a href="">+1 1201256</a>
              </li>
              <li>
                <FiMapPin className="connect-icon" />
                <a href="">Plot No.- B, Ks-20, Noida,</a>
              </li>
            </ul>
          </div>
          <div className="copyright">Copyright Ⓒ 2019 Wooden Culture. All Rights Reserved.</div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
