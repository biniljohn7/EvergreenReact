import React, { useState } from 'react'
import HeaderWrapper from './header.style'
import Logo from '../../assets/images/logo.png'
import {
  SITE_NAME,
  SITE_SHORT_DESC,
  WEBSITE_URL,
  LOGIN_HEADER,
} from '../../helper/constant'
import { Link, useLocation } from 'react-router-dom'
//import MobileHeader from './MobileHeader'
// import icon from '../../assets/images/man_icon1.5x.png'
import icon from '../../assets/images/man_icon1x.png'
import { store } from '../../redux/store'
import { useSelector } from 'react-redux';

const Header = (props) => {

  const [MobMenu, setMobMenu] = useState(0)

  const location = useLocation()
  const profileImage = useSelector((state) => state.auth.profileImage)

  return (
    <HeaderWrapper>


      <nav id="main-nav" className={"mobile-menu" + (MobMenu === 1 ? ' active' : '')}>
        <div className="menu-close" onClick={function () {
          setMobMenu(0);
        }}>
          <i className="fa fa-long-arrow-left"></i>
        </div>
        {store.getState().auth.isLogin &&
          store.getState().auth.accessToken ? (

          <ul>
            {LOGIN_HEADER.map((ele, key) => {
              return (
                <li
                  className={
                    '' +
                    (key === 0
                      ? ''
                      : window.innerWidth > 1100
                        ? ' '
                        : ' ')
                  }
                  key={key}
                >
                  <Link
                    className={
                      ' ' +
                      (location.pathname.startsWith(ele.path)
                        ? 'active'
                        : '')
                    }
                    to={ele.path}
                  >
                    {ele.label}
                  </Link>
                </li>
              )
            })}

            <li className="my-acc">
              <img
                src={profileImage || icon}
                alt={'profile_image'}
                className="profile-image-size cursor-pointer"
                onClick={(e) => props.history.push('/account')}
              />
            </li>
          </ul>

        ) : (
          <ul>
            <li>
              <a
                href={
                  location.pathname === '/' ? '#home' : WEBSITE_URL
                }
                className="nav-link white--text cursor-pointer header-link"
              // onClick={(e) => {
              //   window.scrollTo(0, 0)
              // }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                className="nav-link white--text cursor-pointer header-link"
                href={
                  location.pathname === '/'
                    ? '#contact_us'
                    : WEBSITE_URL + 'contact_us'
                }
              // onClick={(e) => {
              //   window.scrollTo(
              //     0,
              //     window.innerWidth > 1024 ? 1155 : 1000,
              //   )
              // }}
              >
                Contact Us
              </a>
            </li>
            <li>
              <Link
                className="nav-link white--text header-link"
                to="/signin"
              >
                Log In
              </Link>
            </li>
            <li>
              <a
                href={
                  location.pathname === '/'
                    ? '#downloadApp'
                    : WEBSITE_URL
                }
                className="btn download"
                role="button"
              // onClick={(e) => {
              //   window.scrollTo(
              //     0,
              //     window.innerWidth > 1024 ? 681 : 581,
              //   )
              // }}
              >
                Download Now
              </a>
            </li>
          </ul>

        )}
      </nav>
      <div className="top-header">
        <div className="container">
          <div className="logo-box">
            <Link to="/" className="main_logo">
              <img src={Logo} alt={SITE_NAME} className="image-sizes" />
            </Link>
          </div>
          <div className="nav-box">
            <div className="desk-menu">

              {store.getState().auth.isLogin &&
                store.getState().auth.accessToken ? (

                <ul className="login-menu">
                  {LOGIN_HEADER.map((ele, key) => {
                    return (
                      <li
                        className={
                          '' +
                          (key === 0
                            ? ''
                            : window.innerWidth > 1100
                              ? ' '
                              : ' ')
                        }
                        key={key}
                      >
                        <Link
                          className={
                            ' ' +
                            (location.pathname.startsWith(ele.path)
                              ? 'active'
                              : '')
                          }
                          to={ele.path}
                        >
                          {ele.label}
                        </Link>
                      </li>
                    )
                  })}

                  <li className="my-acc">
                    <img
                      src={profileImage || icon}
                      alt={'profile_image'}
                      className="profile-image-size cursor-pointer"
                      onClick={(e) => props.history.push('/account')}
                    />
                  </li>
                </ul>

              ) : (
                <ul >
                  <li>
                    <a
                      href={
                        location.pathname === '/' ? '#home' : WEBSITE_URL
                      }
                      className="nav-link white--text cursor-pointer header-link"
                    // onClick={(e) => {
                    //   window.scrollTo(0, 0)
                    // }}
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      className="nav-link white--text cursor-pointer header-link"
                      href={
                        location.pathname === '/'
                          ? '#contact_us'
                          : WEBSITE_URL + 'contact_us'
                      }
                    // onClick={(e) => {
                    //   window.scrollTo(
                    //     0,
                    //     window.innerWidth > 1024 ? 1155 : 1000,
                    //   )
                    // }}
                    >
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <Link
                      className="nav-link white--text header-link"
                      to="/signin"
                    >
                      Log In
                    </Link>
                  </li>
                  <li>
                    <a
                      href={
                        location.pathname === '/'
                          ? '#downloadApp'
                          : WEBSITE_URL
                      }
                      className="btn download"
                      role="button"
                    // onClick={(e) => {
                    //   window.scrollTo(
                    //     0,
                    //     window.innerWidth > 1024 ? 681 : 581,
                    //   )
                    // }}
                    >
                      Download Now
                    </a>
                  </li>
                </ul>

              )}

            </div>
            <div className="mob-menu">
              <a className="toggle mob-click-btn" onClick={function () {
                setMobMenu(1);
              }} >
                <span></span>
              </a>
            </div>
          </div>
        </div>
      </div>


      {/*
      <section className="sticky-header">
        <header className="header-height">
          {window.innerWidth <= 768 ? (
            <MobileHeader {...props} />
          ) : (
            <React.Fragment>
              <div className="row site-spacing">
                <div
                  className={
                    'col-12 col-sm-12 col-xl-6' +
                    (window.innerWidth === 1024
                      ? ' col-md-3 col-lg-4'
                      : ' col-md-4 col-lg-6')
                  }
                >
                  
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
                <div
                  className={
                    'col-12 col-sm-12 col-xl-6' +
                    (window.innerWidth === 1024
                      ? ' col-md-9 col-lg-8'
                      : ' col-md-8 col-lg-6')
                  }
                >
                  {store.getState().auth.isLogin &&
                  store.getState().auth.accessToken ? (
                    <React.Fragment>
                      <div className="float-right d-flex flex-row">
                        <img
                          src={store.getState().auth.profileImage || icon}
                          alt={'profile_image'}
                          className="profile-image-size cursor-pointer"
                          onClick={(e) => props.history.push('/account')}
                        />
                        <div className="ml-15 white--text fs-18 text-left">
                          {(store.getState().auth.prefix
                            ? store.getState().auth.prefix + ' '
                            : '') +
                            store.getState().auth.firstName +
                            ' ' +
                            store.getState().auth.lastName}
                          <div className="white--text fs-14">
                            Referral Points Earned :{' '}
                            {store.getState().auth.referralPoints}
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  ) : (
                    <nav className="navbar navbar-expand-sm justify-content-end mt-20">
                      <ul className="navbar-nav">
                        <li className="nav-item">
                          <a
                            href={
                              location.pathname === '/' ? '#home' : WEBSITE_URL
                            }
                            className="nav-link white--text cursor-pointer header-link"
                            // onClick={(e) => {
                            //   window.scrollTo(0, 0)
                            // }}
                          >
                            Home
                          </a>
                        </li>
                        <li className="nav-item ml-10">
                          <a
                            className="nav-link white--text cursor-pointer header-link"
                            href={
                              location.pathname === '/'
                                ? '#contact_us'
                                : WEBSITE_URL + 'contact_us'
                            }
                            // onClick={(e) => {
                            //   window.scrollTo(
                            //     0,
                            //     window.innerWidth > 1024 ? 1155 : 1000,
                            //   )
                            // }}
                          >
                            Contact Us
                          </a>
                        </li>
                        <li className="nav-item ml-10">
                          <Link
                            className="nav-link white--text header-link"
                            to="/signin"
                          >
                            Log In
                          </Link>
                        </li>
                        <li className="nav-item ml-10">
                          <a
                            href={
                              location.pathname === '/'
                                ? '#downloadApp'
                                : WEBSITE_URL
                            }
                            className="btn btn-md cursor-pointer header-link download"
                            role="button"
                            // onClick={(e) => {
                            //   window.scrollTo(
                            //     0,
                            //     window.innerWidth > 1024 ? 681 : 581,
                            //   )
                            // }}
                          >
                            Download Now
                          </a>
                        </li>
                      </ul>
                    </nav>
                  )}
                </div>
              </div>
            </React.Fragment>
          )}
        </header>

        {window.innerWidth > 768 &&
        store.getState().auth.isLogin &&
        store.getState().auth.accessToken ? (
          <div className="login-header">
            <nav className="navbar navbar-expand-sm site-spacing pb-0">
              <ul className="navbar-nav wp-100 d-flex justify-content-between">
                {LOGIN_HEADER.map((ele, key) => {
                  return (
                    <li
                      className={
                        'nav-item pr-0' +
                        (key === 0
                          ? ''
                          : window.innerWidth > 1100
                          ? ' ml-10'
                          : ' ml-5')
                      }
                      key={key}
                    >
                      <Link
                        className={
                          'nav-link ' +
                          (location.pathname.startsWith(ele.path)
                            ? 'active'
                            : '')
                        }
                        to={ele.path}
                      >
                        {ele.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>
        ) : null}
      </section>
      */}

    </HeaderWrapper>
  )
}


export default Header
