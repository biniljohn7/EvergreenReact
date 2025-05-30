import React from "react";
import { Switch, Route } from "react-router-dom";
// import NotFound from '../views/NotFound'
import LandingPage from "../components/landing/LandingPage";
import ContactUs from "../components/footer/ContactUs";
import Contact from "../components/settingPage/ContactUs";
import PageContainer from "../layout/PageContainer";
import SignUp from "../components/signup/Signup";
import AccountCreated from "../components/accountCreated/accountCreated";
import SignIn from "../components/signin/SignIn";
import AboutUs from "../components/staticPage/AboutUs";
import TermsOfService from "../components/staticPage/Terms&Services";
import PrivacyPolicy from "../components/staticPage/PrivacyPolicy";
import Help from "../components/staticPage/Help";
import ChangePassword from "../components/settingPage/ChangePassword";
// import ProtectedRoutes from './ProtectedRoutes'
// import ProtectedLayout from '../layout/ProtectedLayout'
import ExtraRoutes from "./ExtraRoutes";
import Setting from "../components/settingPage/Setting";
import AcceptTerms from "../components/merchant/AcceptTerms";
import Payment from "../components/payment/Payment";
import CancelPayment from "../components/payment/CancelPayment";
import AccountVerification from "../components/verification/AccountVerification"; // Import the component
import {store} from '../redux/store'


function Routes() {
  return (
    <Switch>
      <Route
        exact
        path="/home1"
        render={(props) => (
          <PageContainer>
            <LandingPage {...props} />
          </PageContainer>
        )}
      />
      <Route
        exact
        path="/contact_us"
        render={(props) => (
          <PageContainer>
            <ContactUs {...props} />
          </PageContainer>
        )}
      />
      <Route
        exact
        path={["/", "/signup"]}
        render={(props) => (
          <PageContainer>
            {store.getState().auth.isLogin &&
            store.getState().auth.accessToken ? (
              <LandingPage {...props} />
            ) : (
              <SignUp {...props} />
            )}
          </PageContainer>
        )}
      />
      <Route
        exact
        path="/account-created"
        render={(props) => (
          <PageContainer>
            <AccountCreated {...props} />
          </PageContainer>
        )}
      />
      <Route
        exact
        path="/signin"
        render={(props) => (
          <PageContainer>
            <SignIn {...props} />
          </PageContainer>
        )}
      />
      <Route
        exact
        path="/about_us"
        render={(props) => (
          <PageContainer>
            <AboutUs {...props} fromRoute={true} />
          </PageContainer>
        )}
      />
      <Route
        exact
        path="/terms_of_service"
        render={(props) => (
          <PageContainer>
            <TermsOfService {...props} fromRoute={true} />
          </PageContainer>
        )}
      />
      <Route
        exact
        path="/privacy_policy"
        render={(props) => (
          <PageContainer>
            <PrivacyPolicy {...props} fromRoute={true} />
          </PageContainer>
        )}
      />
      <Route
        exact
        path="/help"
        render={(props) => (
          <PageContainer>
            <Help {...props} fromRoute={true} />
          </PageContainer>
        )}
      />
      <Route
        exact
        path="/help/contact_us"
        render={(props) => (
          <PageContainer>
            <Contact {...props} />
          </PageContainer>
        )}
      />
      <Route
        exact
        path="/change_password"
        render={(props) => (
          <PageContainer>
            <ChangePassword {...props} />
          </PageContainer>
        )}
      />

      <Route
        exact
        path="/account"
        render={(props) => (
          <PageContainer>
            <Setting {...props} />
          </PageContainer>
        )}
      />

      <Route
        exact
        // path="/:acceptanceToken"
        path="/merchant/terms-and-services/:acceptanceToken"
        render={(props) => (
          <PageContainer>
            <AcceptTerms {...props} />
          </PageContainer>
        )}
      />

      <Route
        exact
        path="/payment/:token"
        render={(props) => (
          <PageContainer>
            <Payment {...props} />
          </PageContainer>
        )}
      />
      <Route
        exact
        path="/payment/cancel/:recurringId"
        render={(props) => (
          <PageContainer>
            <CancelPayment {...props} />
          </PageContainer>
        )}
      />
      <Route
        exact
        path="/membership/:token"
        render={(props) => (
          <PageContainer>
            <div className="red--text text-center ptb-100">Redirecting...</div>
          </PageContainer>
        )}
      />

      <Route
        exact
        path="/verification/:t"
        render={(props) => (
          <PageContainer>
            <AccountVerification {...props} />
          </PageContainer>
        )}
      />

      <Route path="/" render={(props) => <ExtraRoutes />} />
    </Switch>
  );
}

export default Routes;
