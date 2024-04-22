import React, { useEffect, useState } from "react";
import { store } from "../../redux/store";
import NotificationIcon from "../../assets/images/notification_icon.png";
import UserIcon from "../../assets/images/user_1x.png";
import UserPic from "../../assets/images/user_1x.png";
// import UserPic_05x from '../../assets/images/user_05x.png'
// import CameraIcon from '../../assets/images/camera_2x.png'
// import CameraIcon_2x from '../../assets/images/camera_2x.png'
import PasswordIcon from "../../assets/images/password_icon2x.png";
import PolicyIcon from "../../assets/images/policy_icon2x.png";
import TermsIcon from "../../assets/images/terms_icon2x.png";
import LogoutIcon from "../../assets/images/logout_icon2x.png";
import HelpIcon from "../../assets/images/help_icon2x.png";
import Wrapper from "./common.style";
import Switch from "react-switch";
import {
  viewProfile,
  updateNotificationStatus,
  uploadImage,
} from "../../api/memberAPI";
import { logout as logoutAPI } from "../../api/commonAPI";
import { Spinner } from "reactstrap";
import { ToastsStore } from "react-toasts";
import ChangePassword from "./ChangePassword";
import PrivacyPolicy from "../staticPage/PrivacyPolicy";
import Terms from "../staticPage/Terms&Services";
import ContactUs from "./ContactUs";
import { HEADER_COLOR } from "../../helper/constant";
import Profile from "./Profile";
import AuthActions from "../../redux/auth/actions";
import { connect } from "react-redux";
import firebase from "../../firebaseChat";

const { logout, login } = AuthActions;

const CHILD_STATE = {
  profile: "profile",
  changePwd: "changePwd",
  policy: "policy",
  terms: "terms",
  contactUs: "contact",
};

const SIDE_MENU = [
  {
    label: "Profile",
    icon: UserIcon,
    alt: "user",
    state: CHILD_STATE.profile,
  },
  {
    label: "Change Password",
    icon: PasswordIcon,
    alt: "password",
    state: CHILD_STATE.changePwd,
  },
  {
    label: "Privacy Policy",
    alt: "privacy_policy",
    icon: PolicyIcon,
    state: CHILD_STATE.policy,
  },
  {
    label: "Terms & Service",
    icon: TermsIcon,
    alt: "terms",
    state: CHILD_STATE.terms,
  },
  {
    label: "Contact Us",
    icon: HelpIcon,
    alt: "help",
    state: CHILD_STATE.contactUs,
  },
];

const Setting = (props) => {
  const [activeState, setStateActive] = useState(CHILD_STATE.profile);
  const [isNotificationOn, setNotification] = useState(
    store.getState().auth.isNotificationOn || false
  );
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (store.getState().auth.isLogin && store.getState().auth.accessToken) {
      viewProfile()
        .then((res) => {
          setProfile(res.data);
          setPhoto(res.data.profile.profileImage);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          if (err.response && err.response.status === 401) {
            props.logout();
            ToastsStore.error("Session Expire! Please login again.");
            setTimeout(() => props.history.push("/signin"), 800);
          } else {
            ToastsStore.error("Something Went Wrong!");
            props.history.push("/home");
          }
        });
    } else {
      props.history.replace("/signin");
    }
  }, []);

  function renderComponent(isMobile = false) {
    switch (activeState) {
      case CHILD_STATE.changePwd:
        return <ChangePassword isMobile={isMobile} />;
      case CHILD_STATE.terms:
        return <Terms isMobile={isMobile} />;
      case CHILD_STATE.policy:
        return <PrivacyPolicy isMobile={isMobile} />;
      case CHILD_STATE.contactUs:
        return <ContactUs isMobile={isMobile} />;
      default:
        return <Profile data={profile} isMobile={isMobile} />;
    }
  }

  const openNav = () => {
    document.getElementById("settingNavbar").style.width = "250px";
  };
  const closeNav = () => {
    document.getElementById("settingNavbar").style.width = "0";
  };

  return (
    <Wrapper>
      {window.innerWidth > 800 ? (
        loading ? (
          <div className="custom-spinner">
            <Spinner color="danger" />
          </div>
        ) : (
          <div className="row site-spacing ptb-50">
            <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-3">
              <div className="flex-container align-items-center justify-content-center m-auto position-relative">
                {/* {photo ? (
                      <i
                        className="fa fa-trash delete cursor-pointer fs-18"
                        aria-hidden="true"
                      ></i>
                    ) : null} */}
                <div className="flex-item">
                  <div className="">
                    <img
                      src={
                        photo
                          ? typeof photo === "string"
                            ? photo
                            : URL.createObjectURL(photo)
                          : UserPic
                      }
                      alt="profile_pic"
                      className="profile_pic"
                    />
                    <label className="position-relative">
                      {/* <img
                        src={CameraIcon}
                        alt="change"
                        className="position-absolute camera cursor-pointer"
                      /> */}
                      <div className="bg-white rounded-circle position-absolute camera cursor-pointer pb-1 pt-3 height-25 width-25">
                        <i className="fa fa-star fs-20" aria-hidden="true"></i>
                      </div>
                      <input
                        id="profileImageUpload"
                        className="file-upload__input"
                        name="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          setLoading(true);
                          const formData = new FormData();
                          formData.append("file", e.target.files[0]);
                          uploadImage(formData)
                            .then((res) => {
                              setPhoto(res.data.profileImage);
                              props.login({
                                isLogin: true,
                                profileImage: res.data.profileImage,
                              });
                              try {
                                let ref = firebase
                                  .firestore()
                                  .collection("users")
                                  .doc(
                                    store.getState().auth.memberId.toString()
                                  );
                                ref.update({
                                  profileImage: res.data.profileImage || null,
                                });

                                // Update profile image using references
                                ref
                                  .get()
                                  .then((doc) => {
                                    if (doc.exists) {
                                      const refArray = doc.data().userRef;
                                      refArray.forEach((element) => {
                                        element.update({
                                          profileImage:
                                            res.data.profileImage || null,
                                        });
                                      });
                                    }
                                  })
                                  .catch((err) => {
                                    console.error(
                                      "Error getting document:",
                                      err
                                    );
                                  });
                                // .update({
                                //   profileImage: res.data.profileImage || null,
                                // })
                              } catch (error) {
                                console.error(
                                  "Failed to update profile image in Firestore, ",
                                  error
                                );
                              }
                              ToastsStore.info(res.message);
                              setLoading(false);
                            })
                            .catch((err) => {
                              console.error(err);
                              setLoading(false);
                              ToastsStore.error(
                                "Failed to upload the profile photo!"
                              );
                            });
                        }}
                      />
                    </label>
                  </div>
                  <div className="text-bold fs-20 pt-7">
                    {(profile.profile.prefix
                      ? profile.profile.prefix.name + " "
                      : "") +
                      profile.profile.firstName +
                      " " +
                      profile.profile.lastName}
                  </div>
                  <div className="fs-16 ptb-3">Expired on: 13-11-2020</div>
                </div>
              </div>
              <div className="mt-30 position-relative">
                <div className="d-flex content-padding">
                  <img
                    height="23px"
                    width="23px"
                    src={NotificationIcon}
                    alt="notification"
                  />
                  <div className="ml-15 text-bold">Notification</div>
                  <Switch
                    onChange={(checked) => {
                      setLoading(true);
                      updateNotificationStatus(checked)
                        .then((res) => {
                          setNotification(checked);
                          props.login({
                            isLogin: true,
                            isNotificationOn: checked,
                          });
                          setLoading(false);
                          ToastsStore.info(res.message);
                        })
                        .catch((err) => {
                          console.error(err);
                          setLoading(false);
                          ToastsStore.error(
                            "Failed to update the notification status!"
                          );
                        });
                    }}
                    disabled={!store.getState().auth.isProfileCreated}
                    checked={isNotificationOn}
                    onColor="#EAEAEA"
                    onHandleColor={HEADER_COLOR}
                    handleDiameter={10}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={15}
                    width={40}
                    className="react-switch"
                  />
                </div>

                {SIDE_MENU.map((el, i) => {
                  return (
                    <div
                      className={
                        "d-flex content-padding " +
                        (activeState === el.state ? "active" : "")
                      }
                      key={i}
                    >
                      <img
                        // height="23px"
                        // width="23px"
                        height="25px"
                        width="25px"
                        src={el.icon}
                        alt={el.alt}
                      />
                      <label
                        className="ml-15 text-bold cursor-pointer"
                        onClick={(e) => {
                          setStateActive(el.state);
                        }}
                      >
                        {el.label}
                      </label>
                    </div>
                  );
                })}

                <div className="d-flex content-padding">
                  <img
                    height="23px"
                    width="23px"
                    src={LogoutIcon}
                    alt="logout"
                  />
                  <label
                    className="ml-15 text-bold cursor-pointer"
                    onClick={(e) => {
                      setLoading(true);
                      logoutAPI()
                        .then((res) => {
                          props.logout();
                          ToastsStore.info("You are logged out successfully!");
                          props.history.push("/");
                        })
                        .catch((err) => {
                          console.error(err);
                          props.logout();
                          ToastsStore.info("You are logged out successfully!");
                          props.history.push("/");
                        });
                    }}
                  >
                    Logout
                  </label>
                </div>
              </div>
            </div>
            <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-9 border pa-30">
              {renderComponent()}
            </div>
          </div>
        )
      ) : loading ? (
        <div className="custom-spinner">
          <Spinner color="danger" />
        </div>
      ) : (
        <div className="site-spacing mtb-50">
          <div onClick={() => openNav()} className="mtb-20 text-bold openBtn">
            &#9776;
          </div>
          <div id="settingNavbar" className="sidenav">
            <div className="closebtn navMenu" onClick={() => closeNav()}>
              &times;
            </div>
            <div className="navMenu">
              <div className="mt-30 position-relative">
                <div className="d-flex content-padding">
                  <img
                    height="23px"
                    width="23px"
                    src={NotificationIcon}
                    alt="notification"
                  />
                  <div className="ml-15 text-bold">Notification</div>
                  <Switch
                    onChange={(checked) => {
                      setLoading(true);
                      updateNotificationStatus(checked)
                        .then((res) => {
                          setNotification(checked);
                          props.login({
                            isLogin: true,
                            isNotificationOn: checked,
                          });
                          setLoading(false);
                          ToastsStore.info(res.message);
                        })
                        .catch((err) => {
                          console.error(err);
                          setLoading(false);
                          ToastsStore.error(
                            "Failed to update the notification status!"
                          );
                        });
                    }}
                    disabled={!store.getState().auth.isProfileCreated}
                    checked={isNotificationOn}
                    onColor="#EAEAEA"
                    onHandleColor={HEADER_COLOR}
                    handleDiameter={10}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={15}
                    width={40}
                    className="react-switch"
                  />
                </div>

                {SIDE_MENU.map((el, i) => {
                  return (
                    <div
                      className={
                        "d-flex content-padding " +
                        (activeState === el.state ? "active" : "")
                      }
                      key={i}
                    >
                      <img
                        height="23px"
                        width="23px"
                        src={el.icon}
                        alt={el.alt}
                      />
                      <label
                        className="ml-15 text-bold cursor-pointer"
                        onClick={(e) => {
                          closeNav();
                          setTimeout(() => {
                            setStateActive(el.state);
                          }, 800);
                        }}
                      >
                        {el.label}
                      </label>
                    </div>
                  );
                })}

                <div className="d-flex content-padding">
                  <img
                    height="23px"
                    width="23px"
                    src={LogoutIcon}
                    alt="logout"
                  />
                  <label
                    className="ml-15 text-bold cursor-pointer"
                    onClick={(e) => {
                      setLoading(true);
                      logoutAPI()
                        .then((res) => {
                          props.logout();
                          ToastsStore.info("You are logged out successfully!");
                          props.history.push("/");
                        })
                        .catch((err) => {
                          console.error(err);
                          props.logout();
                          ToastsStore.info("You are logged out successfully!");
                          props.history.push("/");
                        });
                    }}
                  >
                    Logout
                  </label>
                </div>
              </div>
            </div>
          </div>
          {/* {photo ? (
                      <i
                        className="fa fa-trash delete cursor-pointer fs-18"
                        aria-hidden="true"
                      ></i>
                    ) : null} */}

          <div className="row mt-20">
            <div className="col-12">
              {activeState === CHILD_STATE.profile && (
                <div className="flex-container align-items-center justify-content-center m-auto position-relative">
                  <div className="flex-item">
                    <div className="">
                      <img
                        src={
                          photo
                            ? typeof photo === "string"
                              ? photo
                              : URL.createObjectURL(photo)
                            : UserPic
                        }
                        alt="profile_pic"
                        className="profile_pic"
                      />
                      <label className="position-relative">
                        {/* <img
                    src={CameraIcon}
                    alt="change"
                    className="position-absolute camera cursor-pointer"
                  /> */}

                        <div className="bg-white rounded-circle position-absolute camera cursor-pointer pb-1 pt-3 height-25 width-25">
                          <i
                            className="fa fa-star fs-20"
                            aria-hidden="true"
                          ></i>
                        </div>
                        <input
                          id="profileImageUpload"
                          className="file-upload__input"
                          name="file-upload"
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            setLoading(true);
                            const formData = new FormData();
                            formData.append("file", e.target.files[0]);
                            uploadImage(formData)
                              .then((res) => {
                                setPhoto(res.data.profileImage);
                                props.login({
                                  isLogin: true,
                                  profileImage: res.data.profileImage,
                                });
                                try {
                                  firebase
                                    .firestore()
                                    .collection("users")
                                    .doc(
                                      store.getState().auth.memberId.toString()
                                    )
                                    .update({
                                      profileImage:
                                        res.data.profileImage || null,
                                    });
                                } catch (error) {
                                  console.error(
                                    "Failed to update profile image in Firestore, ",
                                    error
                                  );
                                }
                                ToastsStore.info(res.message);
                                setLoading(false);
                              })
                              .catch((err) => {
                                console.error(err);
                                setLoading(false);
                                ToastsStore.error(
                                  "Failed to upload the profile photo!"
                                );
                              });
                          }}
                        />
                      </label>
                    </div>
                    <div className="text-bold fs-20 pt-7">
                      {(profile.profile.prefix
                        ? profile.profile.prefix.name + " "
                        : "") +
                        profile.profile.firstName +
                        " " +
                        profile.profile.lastName}
                    </div>
                    <div className="fs-16 ptb-3">Expired on: 13-11-2020</div>
                  </div>
                </div>
              )}
              {renderComponent(true)}
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default connect(null, { login, logout })(Setting);
