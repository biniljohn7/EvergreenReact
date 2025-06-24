import React, { useState } from "react";
import HeaderWrapper from "./header.style";
import Logo from "../../assets/images/logo.png";
import ProfileIcon from "../../assets/images/man.svg";
import { logout as logoutAPI } from "../../api/commonAPI";
import Spinner from "../../UI/Spinner/Spinner";
import {
  SITE_NAME,
  // SITE_SHORT_DESC,
  WEBSITE_URL,
  LOGIN_HEADER,
} from "../../helper/constant";
import { Link, useLocation } from "react-router-dom";
//import MobileHeader from './MobileHeader'
// import icon from '../../assets/images/man_icon1.5x.png'
import icon from "../../assets/images/man_icon1x.png";
import { store } from "../../redux/store";
import { useSelector } from "react-redux";
import Toast from "../../UI/Toast/Toast";
import AuthActions from "../../redux/auth/actions";
import { connect } from "react-redux";
import Wrapper from "../newPage/newpage.style";
import Banner from "../common/NewBanner";
import Dashboard from './../leader-dashboard/Dashboard';

const { logout, login } = AuthActions;

const COL_NO = window.innerWidth < 768 ? 2 : window.innerWidth <= 1024 ? 3 : 4;
const COL_WIDTH =
  window.innerWidth < 768 ? "50%" : window.innerWidth <= 1024 ? "33%" : "25%";

const IMAGE_SIZE =
  window.innerWidth < 768
    ? "100px"
    : window.innerWidth <= 1440
    ? "150px"
    : "200px";

const Header = (props) => {
  const [MobMenu, setMobMenu] = useState(0);
  //const { logout, login } = AuthActions;
  const location = useLocation();
  const profileImage = useSelector((state) => state.auth.profileImage);
  const { userRoles } = store.getState().auth;
  let Spn = Spinner();
  let Tst = Toast();
  return (
    <>
      <HeaderWrapper>
        <nav
          id="main-nav"
          className={"mobile-menu" + (MobMenu === 1 ? " active" : "")}
        >
          <div
            className="menu-close"
            onClick={function () {
              setMobMenu(0);
            }}
          >
            <i className="fa fa-long-arrow-left"></i>
          </div>
          {store.getState().auth.isLogin &&
          store.getState().auth.accessToken ? (
            <ul>
              {LOGIN_HEADER.map((ele, key) => {
                return (
                  <li
                    className={
                      "" +
                      (key === 0 ? "" : window.innerWidth > 1100 ? " " : " ")
                    }
                    key={key}
                  >
                    <Link
                      className={
                        " " +
                        (location.pathname.startsWith(ele.path) ? "active" : "")
                      }
                      to={ele.path}
                    >
                      {ele.label}
                    </Link>
                  </li>
                );
              })}
              <li className="inbox-menu">
                <Link to="/inbox">Inbox</Link>
              </li>
              <li className="my-acc">
                <img
                  src={profileImage || icon}
                  alt={"profile_image"}
                  className="profile-image-size cursor-pointer"
                  onClick={(e) => props.history.push("/account")}
                />
              </li>
            </ul>
          ) : (
            <ul>
              {/* <li>
              <Link
                to={
                  location.pathname === '/' ? '/#home' : '/'
                }
                className="nav-link white--text cursor-pointer header-link"
              >
                Home
              </Link>
            </li> */}
              {/* <li>
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
            </li> */}
              <li>
                <Link className="nav-link white--text header-link" to="/signin">
                  Log In
                </Link>
              </li>
              {/* <li>
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
            </li> */}
            </ul>
          )}
        </nav>
        <div className="top-header">
          <div className="container">
            <div className="logo-box">
              <Link to="/home" className="main_logo">
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
                            "" +
                            (key === 0
                              ? ""
                              : window.innerWidth > 1100
                              ? " "
                              : " ")
                          }
                          key={key}
                        >
                          <Link
                            className={
                              " " +
                              (location.pathname.startsWith(ele.path)
                                ? "active"
                                : "")
                            }
                            to={ele.path}
                          >
                            {ele.label}
                          </Link>
                        </li>
                      );
                    })}
                    <li className="inbox-menu">
                      <Link to="/inbox">
                        <span className="material-symbols-outlined">mail</span>
                      </Link>
                    </li>
                    {/* {console.log(logout())} */}
                    <li className="my-acc">
                      <span className="mnu-label">
                        <img
                          src={ProfileIcon}
                          alt={""}
                          className="profile-image-size cursor-pointer"
                          onClick={(e) => props.history.push("/account")}
                        />
                        &nbsp; PROFILE
                      </span>
                      <ul>
                        {
                            Array.isArray(userRoles) && userRoles.length > 0 && (
                                <li>
                                    <Link to="/leader-dashboard">Leadership Panel</Link>
                                </li>
                            )
                        }
                        <li>
                            <Link to="/account">My Profile</Link>
                        </li>
                        <li>
                          <a
                            onClick={(e) => {
                              Spn.Show();
                              logoutAPI()
                                .then((res) => {
                                  props.logout();
                                  Tst.Success(
                                    "You are logged out successfully!"
                                  );
                                  props.history.push("/");
                                })
                                .catch((err) => {
                                  console.error(err);
                                  props.logout();
                                  Tst.Success(
                                    "You are logged out successfully!"
                                  );
                                  props.history.push("/");
                                });
                            }}
                          >
                            LOGOUT
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                ) : (
                  <ul>
                    {/* <li>
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
                  </li> */}
                    <li>
                      <Link
                        className="nav-link white--text header-link hv-icon"
                        to="/signin"
                      >
                        <span className="icon">
                          <img src={ProfileIcon} alt="" />
                        </span>
                        Log In
                      </Link>
                    </li>
                    {/* <li>
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
                  </li> */}
                  </ul>
                )}
              </div>
              <div className="mob-menu">
                <div
                  className="toggle mob-click-btn"
                  onClick={function () {
                    setMobMenu(MobMenu ? 0 : 1);
                  }}
                >
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HeaderWrapper>
      {store.getState().auth.isLogin && store.getState().auth.accessToken && (
        <Wrapper col={COL_NO} width={COL_WIDTH} size={IMAGE_SIZE}>
          <div className="site-spacing- ptb-50-">{<Banner />}</div>
        </Wrapper>
      )}
    </>
  );
};

//export default Header
export default connect(null, { login, logout })(Header);
