import React, { useEffect } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom'
import LandingWrapper from './landing.style'

import Landing from '../../assets/images/landing_new.png'
import Landing75 from '../../assets/images/landing_new_0.75x.png'
import Landing05 from '../../assets/images/landing_new_0.5x.png'
import ScreenShot15x from '../../assets/images/screenshot_1.5x.png'
import ScreenShot75x from '../../assets/images/screenshot_0.75x.png'
import AppleStore from '../../assets/images/Apple_Store_1.5x.png'
import GooglePlayStore from '../../assets/images/Google_Play_Store_1.5x.png'
import {
  SITE_SHORT_DESC,
  APP_STORE_LINK,
  GOOGLE_MAP_KEY,
} from '../../helper/constant'
import { store } from '../../redux/store'
import { GoogleApiWrapper } from 'google-maps-react'
import Support from './Support'

const LandingPage = (props) => {
  useEffect(() => {
    if (store.getState().auth.isLogin && store.getState().auth.accessToken) {
      props.history.push('/home')
    }
  }, [])

  return (
    <LandingWrapper>
      {window.innerWidth < 768 ? (
        <React.Fragment>
          <section className="ash" id="home">
            <div className="row landing ptb-30 site-spacing">
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <img
                  src={Landing05}
                  alt={SITE_SHORT_DESC}
                  className="landing-image"
                />
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <h4 className="text-bold mb-20">Welcome to Evergreen! </h4>
                <p className="mb-20 para">
                  This is the landing page to your organization’s Evergreen web
                  portal. Login or signup to access your organization’s
                  resources, such as news, messaging, event calendars,
                  membership benefits, job postings, advocacy, and much more.
                  Otherwise, you can download the app and access your account on
                  your phone, tablet, or other mobile device.
                </p>
                <Link
                  to="/"
                  className="btn btn-md btn-rounded button plr-25 ptb-7 text-bold"
                >
                  SIGN UP
                </Link>
              </div>
            </div>
          </section>
          {/* <section className="bg-white pt-50">
            <div
              className="row align-middle site-spacing overflow-hide"
              id="downloadApp"
            >
              <div className="col-12 col-sm-12 mb-20">
                <h4 className="text-bold mb-20">
                  Download Now
                  <div className="horizontal-line" />
                </h4>
                <p className="mb-20 para">
                  Evergreen is available to use here via web portal, or as an
                  Android or iOS mobile application.
                </p>
                <React.Fragment>
                  <a href="/">
                    <img
                      src={GooglePlayStore}
                      alt="Google_Play_Store"
                      className="wp-30 mr-20"
                    />
                  </a>
                  <span>
                    <a href={APP_STORE_LINK} target="_blank" rel="noreferrer">
                      <img
                        src={AppleStore}
                        alt="Apple_Store"
                        className="wp-30"
                      />
                    </a>
                  </span>
                </React.Fragment>
              </div>
              <div className="col-12 col-sm-12">
                <img
                  src={ScreenShot75x}
                  alt={SITE_SHORT_DESC}
                  className="mobile-screen"
                ></img>
              </div>
            </div>
          </section> */}

          <Support {...props} />


        </React.Fragment>
      ) : (
        <React.Fragment>
          <section className="ash " id="home">
            <div className="container landing site-spacing ptb-50">
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <h2 className="text-bold mb-20">Welcome to Evergreen! </h2>
                <p className="mb-20 para">
                  This is the landing page to your organization’s Evergreen web
                  portal. Login or signup to access your organization’s
                  resources, such as news, messaging, event calendars,
                  membership benefits, job postings, advocacy, and much more.
                  Otherwise, you can download the app and access your account on
                  your phone, tablet, or other mobile device.
                </p>
                <Link
                  to="/"
                  className="btn btn-md btn-rounded button plr-25 ptb-7 text-bold"
                >
                  SIGN UP
                </Link>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                <img
                  src={
                    window.innerWidth === 1024 ||
                      (window.innerWidth > 1024 && window.innerWidth < 1300)
                      ? Landing75
                      : window.innerWidth < 1024
                        ? Landing05
                        : Landing
                  }
                  alt={SITE_SHORT_DESC}
                  className="landing-image"
                />
              </div>
            </div>
          </section>
          {/* <section className="bg-white overflow-hide" id="downloadApp">
            <div className="container align-middle site-spacing">
              <div
                className={
                  'col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 ' +
                  (window.innerWidth >= 1024 ? 'ptb-150' : 'ptb-80')
                }
              >
                <h4 className="text-bold mb-20">
                  Download Now
                  <div className="horizontal-line" />
                </h4>
                <p className="mb-20 para">
                  Evergreen is available to use here via web portal, or as an
                  Android or iOS mobile application.
                </p>
                <React.Fragment>
                  <a href="/">
                    <img
                      src={GooglePlayStore}
                      alt="Google_Play_Store"
                      className="wp-25 mr-20"
                    />
                  </a>
                  <span>
                    <a href={APP_STORE_LINK} target="_blank" rel="noreferrer">
                      <img
                        src={AppleStore}
                        alt="Apple_Store"
                        className="wp-25"
                      />
                    </a>
                  </span>
                </React.Fragment>
              </div>
              <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 position-relative">
                <img
                  src={ScreenShot15x}
                  alt={SITE_SHORT_DESC}
                  className="sceenshot-image"
                />
              </div>
            </div>
          </section> */}

          <Support {...props} />

        </React.Fragment>
      )}
    </LandingWrapper>
  )
}

// export default LandingPage
export default GoogleApiWrapper({
  apiKey: GOOGLE_MAP_KEY,
})(LandingPage)
