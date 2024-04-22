import React from 'react'
import HeaderWrapper from './header.style'
import Logo from '../../assets/images/logo.png'
import { SITE_NAME, SITE_SHORT_DESC, LOGIN_HEADER } from '../../helper/constant'
import { Link } from 'react-router-dom'
import icon from '../../assets/images/man_icon1x.png'
// import icon from '../../assets/images/man_icon75x.png'
import { store } from '../../redux/store'

const Header = (props) => {
  const mobileMenu =
    store.getState().auth.isLogin && store.getState().auth.accessToken
      ? LOGIN_HEADER
      : [
          {
            label: 'Contact Us',
            path: '/contact_us',
          },
          {
            label: 'Log In',
            path: '/signin',
          },
          {
            label: 'Sign Up',
            path: '/signup',
          },
        ]

  const openNav = () => {
    document.getElementById('mySidenav').style.width = '250px'
  }
  const closeNav = () => {
    document.getElementById('mySidenav').style.width = '0'
  }

  return (
    <HeaderWrapper>
      <header className="header-height">
        <div className="row site-spacing">
          <div className="col-9 col-sm-9">
            <div className="d-flex flex-row">
              <Link to="/" className="main_logo">
                <img src={Logo} alt={SITE_NAME} className="image-size" />
              </Link>
              <div className="pt-5 ml-10 white--text text-bold fs-18 title">
                {SITE_NAME}
                <div className="white--text text-bold fs-7">
                  {SITE_SHORT_DESC}
                </div>
              </div>
            </div>
            {/* <Link to="/" className="main_logo">
              <img src={Logo} alt={SITE_NAME} className="image-size" />
              <span className="ml-10 white--text text-bold fs-18 title">
                {SITE_NAME}
              </span>
              <div className="ml-45 white--text text-bold fs-7">
                {SITE_SHORT_DESC}
              </div>
            </Link> */}
          </div>
          <div className="col-3 col-sm-3">
            <div onClick={() => openNav()} className="openBtn text-right">
              &#9776;
            </div>
          </div>
        </div>
        <div id="mySidenav" className="sidenav">
          <div className="closebtn navMenu" onClick={() => closeNav()}>
            &times;
          </div>

          {mobileMenu.map((ele, i) => {
            return (
              <div className="navMenu" key={i}>
                <Link to={ele.path} onClick={closeNav}>
                  {ele.label}
                </Link>
              </div>
            )
          })}
        </div>{' '}
        <div className="row mt-20 site-spacing">
          {store.getState().auth.isLogin &&
          store.getState().auth.accessToken ? (
            <div className="col-12 col-sm-12 col-md-12 d-flex flex-row">
              <img
                src={store.getState().auth.profileImage || icon}
                alt={'profile_image'}
                className="image-size cursor-pointer"
                onClick={(e) => props.history.push('/account')}
              />
              <span className="ml-15 white--text fs-16 text-left">
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
              </span>
            </div>
          ) : null}
        </div>
      </header>
    </HeaderWrapper>
  )
}

export default Header
