import React from "react";
import FooterWrapper from "./footer.style";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
// import Llogo from '../../assets/images/f-logo.png';
import Rlogo from "../../assets/images/r-logo.png";

import fb from "../../assets/images/facebook.png";
import lin from "../../assets/images/linkedin.png";
import insta from "../../assets/images/instagram.png";
import tw from "../../assets/images/twitter.png";
import bsky from "../../assets/images/bluesky.png";
import tk from "../../assets/images/tik-tok.png";

import {
  SITE_NAME,
  // SITE_SHORT_DESC,
  // WEBSITE_URL,
  // GOOGLE_MAP_KEY,
} from "../../helper/constant";
//import { Link, useLocation } from 'react-router-dom'
// import ContactUs from './ContactUs'
// import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'

const Footer = (props) => {
  //const location = useLocation()

  return (
    <FooterWrapper>
      <div className="footer-section">
        <div className="container">
          <div className="l-logo">
            {/* <img src={Llogo} alt={SITE_NAME} /> */}
            <img src={Logo} alt={SITE_NAME} class="ft-logo" />
            <div className="f-nav">
              <Link to="/contact_us">Contact Us</Link>&nbsp;|&nbsp;
              <Link to="/privacy_policy">Privacy Policy</Link>&nbsp;|&nbsp;
              {/* <Link to="#">Terms & Conditions</Link> */}
            </div>
          </div>

          <div className="r-logo">
            <div className="f-social">
              <a href="https://www.facebook.com/NCNW633/" target="_blank">
                <img src={fb} alt="fb" />
              </a>

              <a href="https://www.linkedin.com/company/ncnw/" target="_blank">
                <img src={lin} alt="in" />
              </a>

              <a href="https://bsky.app/profile/ncnwhq.bsky.social" target="_blank">
                <img src={bsky} alt="bsky" />
              </a>

              <a href="https://www.instagram.com/ncnw_hq/" target="_blank">
                <img src={insta} alt="in" />
              </a>

              <a href="https://www.tiktok.com/@ncnwhq" target="_blank">
                <img src={tk} alt="in" />
              </a>
            </div>
            {/* <img src={Rlogo} alt={SITE_NAME} /> */}
          </div>
        </div>
      </div>
      {/*
      <div>
        <div className="all-footer">
          
          <footer className="footer">
            <div className="site-spacing">
              <div className="row mlr-0">
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  
                  <div className="d-flex flex-row">
                    <Link to="/" className="main_logo">
                      <img src={Logo} alt={SITE_NAME} className="image-size" />
                    </Link>
                    <div className="pt-5 ml-10 title white--text text-bold ">
                      <div className="fs-18">{SITE_NAME}</div>
                      <div className="fs-7">{SITE_SHORT_DESC}</div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                  <nav
                    className={
                      'navbar navbar-expand-sm ' +
                      (window.innerWidth < 768
                        ? 'justify-content-start mt-20'
                        : 'justify-content-end')
                    }
                  >
                    <ul className="navbar-nav">
                      <li className="nav-item">
                        <a
                          className="nav-link cursor-pointer white--text header-link pt-0"
                          href={
                            location.pathname === '/' ? '#home' : WEBSITE_URL
                          }
                          // onClick={(e) => {
                          //   if (location.pathname === '/') {
                          //     window.scrollTo(0, 0)
                          //   } else {
                          //     props.history.push('/')
                          //   }
                          // }}
                        >
                          Home
                        </a>
                      </li>
                      <li
                        className={
                          'nav-item ' + (window.innerWidth < 768 ? '' : 'ml-10')
                        }
                      >
                        <a
                          className="nav-link cursor-pointer white--text header-link pt-0"
                          href={
                            location.pathname === '/'
                              ? '#contact_us'
                              : WEBSITE_URL + 'contact_us'
                          }
                          // onClick={(e) => {
                          //   if (location.pathname === '/') {
                          //     window.scrollTo(
                          //       0,
                          //       window.innerWidth > 1024
                          //         ? 1155
                          //         : window.innerWidth === 1024
                          //         ? 1000
                          //         : window.innerWidth >= 768
                          //         ? 920
                          //         : 1200,
                          //     )
                          //   } else {
                          //     props.history.push('/contact_us')
                          //   }
                          // }}
                        >
                          Contact Us
                        </a>
                      </li>
                      <li
                        className={
                          'nav-item ' + (window.innerWidth < 768 ? '' : 'ml-10')
                        }
                      >
                        <Link
                          className="nav-link white--text header-link pt-0"
                          to="/signup"
                        >
                          Sign Up
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <label className="rights d-flex justify-content-center">
                All rights reseved by @{SITE_NAME}
              </label>
            </div>
          </footer>
        </div>
      </div>
     */}
    </FooterWrapper>
  );
};

// export default GoogleApiWrapper({
//   apiKey: GOOGLE_MAP_KEY,
// })(Footer)

export default Footer;
