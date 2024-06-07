import React, { useState, useEffect } from 'react'
import { compose } from 'redux'
import SignUpWrapper from './signup.style'
import Button from '../../UI/button/button'
import Input from '../../UI/input/input'
import { withRouter } from 'react-router-dom'
import { Modal } from 'reactstrap'
import {
  SITE_NAME,
  SITE_SHORT_DESC,
  WEBSITE_URL,
  REGISTER_TYPE
} from '../../helper/constant'
import Logo from '../../assets/images/logo.png'
import enhancer from './enhancer'
import { Link } from 'react-router-dom'
import FB from '../../assets/images/fb_icon_1x.png'
import Google from '../../assets/images/google_icon_1x.png'
import { signUp as createAccount, logInViaSMedia } from '../../api/commonAPI'



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
  
  const loadGoogleSDK = () => {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.async = true;
    script.defer = true;
    // script.onload = () => {
    //   window.gapi.load('auth2', () => {
    //     window.gapi.auth2.init({
    //       client_id: '',
    //     });
    //   });
    // };
    document.body.appendChild(script);
  };
import { signUp as createAccount } from '../../api/commonAPI'

import Toast from '../../UI/Toast/Toast';
import Spinner from '../../UI/Spinner/Spinner';

const SignUp = (props) => {
  const [signupState, setSignupState] = useState(true)
  const [passwordType, setPasswordType] = useState('password')

  const Tst = Toast();
  const Spn = Spinner();

  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    submitCount,
    handleSubmit,
    isValid,
  } = props

  const Error = (props) => {
    const field1 = props.field
    if ((errors[field1] && touched[field1]) || submitCount > 0) {
      return (
        <span className={props.class ? props.class : 'error-msg'}>
          {errors[field1]}
        </span>
      )
    } else {
      return <span />
    }
  }

  const toggelModal = () => {
    setSignupState(!signupState)
  }

  document.title = 'Sign Up - ' + window.seoTagLine;

  useEffect(() => {
    loadFacebookSDK();
    initializeFacebookSDK(''); 
    loadGoogleSDK(); 
  }, []);

  const handleGoogleLogin = () => {
    const auth2 = window.gapi.auth2.getAuthInstance();
    auth2.signIn().then(googleUser => {
      const profile = googleUser.getBasicProfile();
      const userData = {
        email: profile.getEmail(),
        firstName: profile.getGivenName(),
        lastName: profile.getFamilyName(),
        imageUrl: profile.getImageUrl(),
        googleId: profile.getId(),
      };
      handleSMediaSignIn(userData);
    }).catch(error => {
      console.error('Google login error', error);
    });
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

  const Login = () => {
    return (
      <>
        {Tst.Obj}
        {Spn.Obj}
        <div className="flex-item">
          <Link to="/">
            <img
              src={Logo}
              alt={SITE_NAME}
              className="image-size"
              width="50px"
              height="50px"
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
          <p className="mt-10">Login to access your account</p>
          <Button
            className="border-radius-41 bg-white mt-20"
            name="LOGIN"
            clicked={() => props.history.push('/signin')}
          />
        </div>
      </>
    )
  }

  const handleSMediaSignIn = (userData) => {
    setLoading(true)
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
        ToastsStore.Success(res.message);
        if (res.data.profileCreated) {
            props.history.push("/home");
        } else {
            props.history.push("/account");
        }
        } else {
        props.resetForm();
        ToastsStore.Error(res.message);
        }
    })
    .catch((err) => {
        ToastsStore.Error("Something went wrong!");
    })
    .finally(() => {
        setLoading(false)
    });
  };

  const handleSignup = (e) => {
    if (isValid) {
      Spn.Show();

      const body = {
        method: 'signup',
        firstName: values.firstName,
        lastName: values.lastName,
        memberCode: values.memberId,
        email: values.email,
        password: values.password,
        facebookId: null,
        googleId: null,
        registerType: REGISTER_TYPE.normal,
      }

      createAccount(body)
        .then((res) => {
          if (res.success === 1) {
            props.history.push('/account-created')
          } else {
            Tst.Error(res.message)
          }
        })
        .catch((err) => {
          Tst.Error('Something went wrong!')
        })
        .finally(() => {
          Spn.Hide();
        });
    }
  }

  return (
    <div>
      <div
        className="bg-light"
        style={{ height: window.innerHeight + 'px' }}
      ></div>
      <Modal
        isOpen={signupState}
        toggle={toggelModal}
        centered
        size="xl"
        className="signup"
        backdrop="static"
        keyboard={false}
      >
        <SignUpWrapper>
          {signupState ? (
            <section className="row login mlr-0">
              <div
                className={
                  'flex-container align-items-center justify-content-center m-auto white--text plr-50 d-sm-none d-none d-lg-block d-xl-block col-md-5 col-xl-4' +
                  (window.innerWidth <= 1024 && window.innerWidth > 768
                    ? ' col-lg-5 '
                    : ' col-lg-4 ') +
                  (window.innerWidth === 768 ? 'd-md-none' : 'd-md-block') +
                  (window.innerWidth < 768 ? '' : ' d-flex ')
                }
              >
                <Login />
              </div>
              <div
                className={
                  'col-12 col-sm-12 col-xl-8 ptb-50 plr-30 position-relative bg-white ' +
                  (window.innerWidth <= 1024 && window.innerWidth > 768
                    ? ' col-lg-7 '
                    : ' col-lg-8 ') +
                  (window.innerWidth === 768 ? 'col-md-12' : 'col-md-7')
                }
              >
                <div
                  className="cancelmain text-bold cursor-pointer"
                  onClick={() => props.history.push('/')}
                >
                  X
                </div>
                <h4 className="flex-container text-bold mt-30 mb-10 flex-item">
                  Create an Account
                </h4>
                <div className="d-flex justify-content-center">
                  <a href="#" onClick={handleFacebookLogin}>
                    <img
                      src={FB}
                      alt="Create with Facebook"
                      className="mr-20"
                    />
                  </a>
                  <span>
                    <a href="#" onClick={handleGoogleLogin}>
                      <img src={Google} alt="Create with Google" className="" />
                    </a>
                  </span>
                </div>
                <div className="row mtb-20">
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div className="mb-20">
                      <Input
                        label="First Name"
                        type="text"
                        placeholder="First Name"
                        id="firstName"
                        fontSize={'fs-16 text-dark'}
                        contentFontSize={'fs-14'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName || ''}
                      />
                      <Error field="firstName" />
                    </div>
                    <div className="mb-20">
                      <Input
                        label="Last Name"
                        type="text"
                        placeholder="Last Name"
                        id="lastName"
                        fontSize={'fs-16 text-dark'}
                        contentFontSize={'fs-14'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName || ''}
                      />
                      <Error field="lastName" />
                    </div>
                    <div className="mb-20">
                      <Input
                        label="Email"
                        type="text"
                        placeholder="Email"
                        id="email"
                        fontSize={'fs-16 text-dark'}
                        contentFontSize={'fs-14'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email || ''}
                      />
                      <Error field="email" />
                    </div>
                  </div>
                  <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div className="mb-20">
                      <Input
                        label="Member ID"
                        type="text"
                        placeholder="Member ID"
                        id="memberId"
                        fontSize={'fs-16 text-dark'}
                        contentFontSize={'fs-14'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.memberId || ''}
                      />
                      <Error field="memberId" />
                    </div>
                    <div className="mb-20">
                      <div className="position-relative">
                        <Input
                          label="Password"
                          type={passwordType}
                          placeholder="Password"
                          id="password"
                          fontSize={'fs-16 text-dark'}
                          contentFontSize={'fs-14'}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password || ''}
                        />
                        {passwordType === 'password' ? (
                          <i
                            className="fa fa-eye eye pwd cursor-pointer"
                            onClick={() => {
                              setPasswordType('text')
                            }}
                          ></i>
                        ) : (
                          <i
                            className="fa fa-eye-slash eye pwd cursor-pointer"
                            onClick={() => {
                              setPasswordType('password')
                            }}
                          ></i>
                        )}
                      </div>
                      <Error field="password" />
                    </div>

                    <div className="mb-20">
                      <Input
                        label="Confirm Password"
                        type="password"
                        placeholder="Password"
                        id="confirmPwd"
                        fontSize={'fs-16 text-dark'}
                        contentFontSize={'fs-14'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.confirmPwd || ''}
                      />
                      <Error field="confirmPwd" />
                    </div>
                  </div>
                </div>
                {/* <p className="flex-container">
                  By creating an account you agree to our{' '}
                  <span>
                    <a href={WEBSITE_URL + 'terms_of_service'}>
                      Terms of Service
                    </a>
                  </span>{' '}
                  &
                  <span>
                    <a href={WEBSITE_URL + 'privacy_policy'}> Privacy Policy</a>
                  </span>
                </p> */}
                {window.innerWidth > 1024 ? (
                  <p className="text-center">
                    By creating an account you agree to our{' '}
                    <a
                      href={WEBSITE_URL + 'terms_of_service'}
                      className="red--text"
                    >
                      Terms of Service
                    </a>{' '}
                    &
                    <a
                      href={WEBSITE_URL + 'privacy_policy'}
                      className="red--text"
                    >
                      {' '}
                      Privacy Policy
                    </a>
                  </p>
                ) : (
                  <p className="text-center">
                    By creating an account you agree to our{' '}
                    <div>
                      <a href={WEBSITE_URL + 'terms_of_service'}>
                        Terms of Service
                      </a>{' '}
                      &
                      <a href={WEBSITE_URL + 'privacy_policy'}>
                        {' '}
                        Privacy Policy
                      </a>
                    </div>
                  </p>
                )}
                <div className="flex-container">
                  <Button
                    className="button mt-20"
                    name="SIGN UP"
                    clicked={handleSignup}
                  />
                </div>
              </div>

              <div
                className={
                  'd-flex flex-container ptb-50 m-auto white--text plr-50 d-sm-block d-block d-lg-none d-xl-none col-12 col-sm-12 ' +
                  (window.innerWidth === 768
                    ? 'd-md-block col-md-12'
                    : 'd-md-none')
                }
              >
                <Login />
              </div>
            </section>
          ) : null}
        </SignUpWrapper>
      </Modal>
    </div>
  )
}

export default compose(withRouter, enhancer)(SignUp)
