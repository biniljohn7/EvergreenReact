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
              <Link
                to={
                  location.pathname === '/' ? '/#home' : '/'
                }
                className="nav-link white--text cursor-pointer header-link"
              >
                Home
              </Link>
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
                    <Link
                      to={
                        location.pathname === '/' ? '/#home' : '/'
                      }
                      className="nav-link white--text cursor-pointer header-link"
                    >
                      Home
                    </Link>
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
    </HeaderWrapper>
  )
}


export default Header
