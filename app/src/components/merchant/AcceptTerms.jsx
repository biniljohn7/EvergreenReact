import React, { useState, useEffect } from "react";
import { SITE_NAME } from "../../helper/constant";
import { FormGroup, Input, Label } from "reactstrap";
import { acceptTerms } from "../../api/merchantApi";
import { ToastsStore } from "react-toasts";
const queryString = require("query-string");

const AcceptedTerms = (props) => {
  const [loading, setLoading] = useState(false);
  let email = "";
  useEffect(() => {
    const merchant_email = queryString.parse(props.location.search).email;
    if (
      !props.match.params ||
      !props.match.params.acceptanceToken ||
      !merchant_email
    ) {
      props.history.replace("/");
    } else {
      email = merchant_email;
    }
  }, []);

  document.title = 'Terms of Service - ' + window.seoTagLine;

  const submitAgreement = () => {
    const ele = document.getElementById("merchant_terms");
    if (ele.checked) {
      setLoading(true);
      acceptTerms({
        email: email,
        acceptanceToken: props.match.params.acceptanceToken,
      })
        .then((res) => {
          if (res.success === 1) {
            ToastsStore.success(res.message);
            setTimeout(() => {
              props.history.replace("/");
            }, 800);
          } else {
            setLoading(false);
            ToastsStore.error(res.message);
          }
        })
        .catch((err) => {
          setLoading(false);
          console.error(err);
          ToastsStore.error("Something went wrong");
        });
    } else {
      document.getElementById("error-msg").innerText =
        "Please accept Terms of Service";
    }
  };

  return (
    <div className="site-spacing ptb-50">
      <h3 className="text-bold">WePay Merchant Terms & Services</h3>
      <p className="mt-20 mb-15 text-justify">
        {SITE_NAME} offers payments through WePay, Inc. (“WePay”), a third-party
        payment processor. In order for you to use WePay’s payment processing
        services, you must register with WePay as a merchant. The WePay Terms of
        Service explain that process and are available here:{" "}
        <a
          href="https://go.wepay.com/terms-of-service-us"
          target="_blank"
          rel="noreferrer"
        >
          Terms of Service
        </a>
        . The WePay Privacy Policy is available here:{" "}
        <a
          href="https://go.wepay.com/privacy-policy"
          target="_blank"
          rel="noreferrer"
        >
          Privacy Policy
        </a>
        . By accepting this agreement with {SITE_NAME}, you agree that you have
        reviewed the WePay Terms of Service and Privacy Policy for the country
        in which you are located and agree to them. If you have questions
        regarding the WePay Terms of Service or Privacy Policy, please refer to
        the WePay website{" "}
        <a href="www.wepay.com" target="_blank" rel="noreferrer">
          www.wepay.com
        </a>{" "}
        or contact WePay at{" "}
        <a
          href="https://support.wepay.com/hc/en-us"
          target="_blank"
          rel="noreferrer"
        >
          Support
        </a>
        .
      </p>

      <h3 className="text-bold">
        Standard Rate for Receiving Domestic Transactions
      </h3>
      <p className="mt-20 mb-15 text-justify"> 3.49% + fixed fee ($0.49 USD)</p>
      <>
        <FormGroup check>
          <Input
            type="checkbox"
            id="merchant_terms"
            className="height-15 width-15"
            onChange={(e) => {
              if (e.target.checked) {
                document.getElementById("error-msg").innerText = "";
              } else {
                document.getElementById("error-msg").innerText =
                  "Please accept Terms of Service";
              }
            }}
          />{" "}
          <Label check>
            I hereby acknowledge and agree to the Terms of Service and the
            associated fees per transaction as outlined by WePay.
          </Label>
        </FormGroup>
        <div id="error-msg" className="error-msg" />
      </>
      <div className="text-center">
        <button
          type="button"
          className="btn mt-70 btn-rounded button plr-30 ptb-10"
          onClick={submitAgreement}
          disabled={loading}
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
};

export default AcceptedTerms;
