import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import SignInWrapper from "./signin.style";
import Button from "../../UI/button/button";
import Input from "../../UI/input/input";
import { withRouter } from "react-router-dom";
import { Modal } from "reactstrap";
import {
  SITE_NAME,
  SITE_SHORT_DESC,
  REGISTER_TYPE,
} from "../../helper/constant";
import { LoginEnhancer as enhancer } from "./enhancer";
import AuthActions from "../../redux/auth/actions";
import { Link } from "react-router-dom";
import FB from '../../assets/images/fb_icon_1x.png'
import Google from '../../assets/images/google_icon_1x.png'
import ForgotPassword from "../forgotPassword/ForgotPassword";
import { login as logIn } from "../../api/commonAPI";

import Toast from "../../UI/Toast/Toast";
import Spinner from "../../UI/Spinner/Spinner";

import Logo from "../../assets/images/logo.png";

const { login, logInViaSMedia } = AuthActions;

const loadFacebookSDK = () => {
  (function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
};

const initializeFacebookSDK = (appId) => {
  window.fbAsyncInit = function () {
    window.FB.init({
      appId: appId,
      cookie: true,
      xfbml: true,
      version: 'v11.0'
    });
    window.FB.AppEvents.logPageView();
  };
};

const SignIn = (props) => {
  const [signInState, setSignInState] = useState(true);
  const [passwordType, setPasswordType] = useState("password");
  const [setForgotPassword, setForgotPasswordState] = useState(false);

  const Tst = Toast();
  const Spn = Spinner();

  useEffect(() => {
    const loadGoogleSDK = () => {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;
        script.defer = true;
        script.onload = () => {
            if (window.google) {
                window.google.accounts.id.initialize({
                    client_id: '374834160970-r11lok9u1jev7j8pid5fgn1qsenuhct5.apps.googleusercontent.com',
                    callback: handleCredentialResponse,
                    cancel_on_tap_outside: false,
                    ux_mode: 'popup',
                });
            } else {
                console.error('Google SDK not loaded');
            }
        };
        document.body.appendChild(script);
    };

    loadFacebookSDK();
    initializeFacebookSDK('453770680596721');
    loadGoogleSDK();
  }, []);

  const handleCredentialResponse = (response) => {
      const credential = response.credential;
      const payload = JSON.parse(atob(credential.split('.')[1]));
  
      const userData = {
          email: payload.email,
          firstName: payload.given_name,
          lastName: payload.family_name,
          imageUrl: payload.picture,
          googleId: payload.sub,
      };
  
      handleSMediaSignIn(userData);
  };

  const handleSigninFailure = (error) => {
      if (error.error === 'popup_closed_by_user') {
        Tst.Error('Sign-in process was not completed. Please try again.');
      } else {
          console.error('Sign-in error: ', error);
          Tst.Error('An error occurred during sign-in. Please try again later.');
      }
  };

  const handleGoogleLogin = () => {
      if (window.google) {
          window.google.accounts.id.prompt((notification) => {
              if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
                  handleSigninFailure({ error: 'popup_closed_by_user' });
              }
          });
      }
  };

  const handleFacebookLogin = () => {
    window.FB.login((response) => {
      if (response.authResponse) {
        window.FB.api('/me', { fields: 'first_name,last_name,email,picture' }, (response) => {
          const userData = {
            email: response.email,
            firstName: response.first_name,
            lastName: response.last_name,
            imageUrl: response.picture.data.url,
            facebookId: response.id,
          };
          handleSMediaSignIn(userData);
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, { scope: 'public_profile,email' });
  };


  function toggleForgotPassword() {
    if (setForgotPassword === false) {
      setSignInState(false);
      setForgotPasswordState(!setForgotPassword);
    } else {
      setForgotPasswordState(!setForgotPassword);
      setSignInState(true);
    }
  }

  function reset() {
    setForgotPasswordState(false);
    if (signInState === false) {
      setSignInState(true);
    }
  }

  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    submitCount,
    isValid,
  } = props;

  const Error = (props) => {
    const field1 = props.field;
    if ((errors[field1] && touched[field1]) || submitCount > 0) {
      return (
        <div className={props.class ? props.class : "error-msg"}>
          {errors[field1]}
        </div>
      );
    } else {
      return <div />;
    }
  };

  const toggelModal = () => {
    setSignInState(!signInState);
  };

  document.title = 'Sign In - ' + window.seoTagLine;

  const SignUp = () => {
    return (
      <>
        {Tst.Obj}
        {Spn.Obj}
        <div className="flex-item">
          <Link to="/" className="cursor-pointer hover-none">
            <img
              src={Logo}
              alt={SITE_NAME}
              className="image-size"
              height="50px"
              width="50px"
            />
            <div>
              <label className="white--text text-bold fs-25 letter-spacing-2 title mt-3 mb-0">
                {SITE_NAME}
              </label>
            </div>
            <p className="white--text text-bold fs-7 short-desc">
              {SITE_SHORT_DESC}
            </p>
          </Link>
          <h4 className="text-bold mt-20">Welcome Back!</h4>
          <p className="mt-10">Sign up to access your account</p>{" "}
          <p className="mt-10">
            Don’t have an account? Create an account for free.
          </p>
          <Button
            className="border-radius-41 bg-white red--text mt-20"
            name="SIGN UP"
            clicked={() => props.history.push("/signup")}
          />
        </div>
      </>
    );
  };

  const handleSMediaSignIn = (userData) => {
    Spn.Show();
    const body = {
      method: 'login-via-smedia',
      email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      imageUrl: userData.imageUrl,
      facebookId: userData.facebookId || null,
      googleId: userData.googleId || null,
      registerType: userData.googleId ? REGISTER_TYPE.google : (userData.facebookId ? REGISTER_TYPE.facebook : REGISTER_TYPE.normal),
      deviceType: "web",
    };

    logInViaSMedia(body)
      .then((res) => {
        if (res.success === 1) {
          const userData = {
            isLogin: true,
            accessToken: res.data.accessToken,
            memberId: res.data.memberId,
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            referralPoints: res.data.refferalPoints || 0,
            prefix: res.data.prefix,
            profileImage: res.data.profileImage,
            isProfileCreated: res.data.profileCreated,
            isNotificationOn: res.data.notification || false,
            currentChapter: res.data.currentChapter,
          };
          props.login(userData);
          Tst.Success(res.message);
          if (res.data.profileCreated) {
            props.history.push("/home");
          } else {
            props.history.push("/account");
          }
        } else {
          props.resetForm();
          Tst.Error(res.message);
        }
      })
      .catch((err) => {
        Tst.Error("Something went wrong!");
      })
      .finally(() => {
        Spn.Hide();
      });
  };

  const handleSignIn = (e) => {

    if (isValid) {
      Spn.Show();

      const body = {
        method: 'login',
        email: values.email,
        password: values.password,
        facebookId: null,
        googleId: null,
        registerType: REGISTER_TYPE.normal,
        deviceType: "web",
      };

      logIn(body)
        .then((res) => {
          if (res.success === 1) {
            const userData = {
              isLogin: true,
              accessToken: res.data.accessToken,
              memberId: res.data.memberId,
              firstName: res.data.firstName,
              lastName: res.data.lastName,
              referralPoints: res.data.refferalPoints || 0,
              prefix: res.data.prefix,
              profileImage: res.data.profileImage,
              isProfileCreated: res.data.profileCreated,
              isNotificationOn: res.data.notification || false,
              currentChapter: res.data.currentChapter,
            };
            props.login(userData);
            Tst.Success(res.message);
            if (res.data.profileCreated) {
              props.history.push("/home");
            } else {
              props.history.push("/account");
            }
          } else {
            props.resetForm();
            Tst.Error(res.message);
          }
        })
        .catch((err) => {
          Tst.Error("Something went wrong!");
        })
        .finally(() => {
          Spn.Hide();
        });
    }
  };

  return (
    <div>
      <div
        className="bg-light"
        style={{ height: window.innerHeight + "px" }}
      ></div>
      <Modal
        isOpen={signInState}
        toggle={toggelModal}
        centered
        // size="lg"
        // className="signin"
        size="xl"
        className="signup"
        backdrop="static"
        keyboard={false}
      >
        <SignInWrapper onSubmit={function (e) {
          handleSignIn();
          e.preventDefault();
          return false;
        }}>
          {signInState ? (
            <section className="row login mlr-0">
              <div
                className={
                  "flex-container align-items-center justify-content-center m-auto white--text plr-50 d-sm-none d-none d-lg-block d-xl-block col-md-5 col-lg-5 col-xl-5" +
                  (window.innerWidth === 768 ? "d-md-none" : "d-md-block") +
                  (window.innerWidth < 768 ? "" : " d-flex ")
                }
              >
                <SignUp />
              </div>
              <div
                className={
                  "col-12 col-sm-12 col-lg-7 col-xl-7 ptb-50 plr-30 position-relative bg-white " +
                  (window.innerWidth === 768 ? "col-md-12" : "col-md-7")
                }
              >
                <div
                  className="cancelmain text-bold cursor-pointer"
                  onClick={() => props.history.push("/")}
                >
                  X
                </div>
                <h4 className="flex-container text-bold mt-30 mb-10 flex-item">
                  Sign in to{" "}
                  {SITE_NAME.charAt(0).toUpperCase() +
                    SITE_NAME.slice(1).toLowerCase()}
                </h4>
                <div className="d-flex justify-content-center">
                  <span onClick={handleFacebookLogin}>
                    <img
                      src={FB}
                      alt="Create with Facebook"
                      className="mr-20"
                    />
                  </span>
                  <span>
                    <span onClick={handleGoogleLogin}>
                      <img src={Google} alt="Create with Google" className="" />
                    </span>
                  </span>
                </div>
                <div className="justify-content-center row mtb-20">
                  <div className="mb-20 col-12 col-sm-12 col-md-9 col-lg-10 col-xl-10">
                    <Input
                      label="Email"
                      type="text"
                      placeholder="Email"
                      id="email"
                      fontSize={"fs-16 text-dark"}
                      contentFontSize={"fs-14"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email || ""}
                    />
                    <Error field="email" />
                  </div>
                  <div className="mb-20 col-12 col-sm-12 col-md-9 col-lg-10 col-xl-10">
                    <div className="position-relative">
                      <Input
                        label="Password"
                        type={passwordType}
                        placeholder="Password"
                        id="password"
                        fontSize={"fs-16 text-dark"}
                        contentFontSize={"fs-14"}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password || ""}
                      />
                      {passwordType === "password" ? (
                        <i
                          className="fa fa-eye eye pwd cursor-pointer"
                          onClick={() => {
                            setPasswordType("text");
                          }}
                        ></i>
                      ) : (
                        <i
                          className="fa fa-eye-slash eye pwd cursor-pointer"
                          onClick={() => {
                            setPasswordType("password");
                          }}
                        ></i>
                      )}
                    </div>
                    <Error field="password" />
                  </div>
                </div>
                <p className="flex-container">
                  <span>
                    <label
                      className="red--text cursor-pointer"
                      onClick={(e) => {
                        props.resetForm();
                        toggleForgotPassword();
                      }}
                    >
                      Forgot your password?
                    </label>
                  </span>
                </p>
                <div className="flex-container">
                  <Button
                    className="button mt-20"
                    name="LOGIN"
                    type="submit"
                  />
                </div>
              </div>

              <div
                className={
                  "d-flex flex-container ptb-50 m-auto white--text plr-50 d-sm-block d-block d-lg-none d-xl-none col-12 col-sm-12 " +
                  (window.innerWidth === 768
                    ? "d-md-block col-md-12"
                    : "d-md-none")
                }
              >
                <SignUp />
              </div>
            </section>
          ) : null}
        </SignInWrapper>
      </Modal>
      <ForgotPassword
        show={setForgotPassword}
        clicked={toggleForgotPassword}
        reset={reset}
      />
    </div>
  );
};

export default compose(withRouter, enhancer, connect(null, { login }))(SignIn);
