import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastsStore } from "react-toasts";
import { Spinner } from "reactstrap";
import Wrapper from "./wrapper.style";
import { memberTxn } from "../../api/memberAPI";

import AuthActions from "../../redux/auth/actions";
import { connect } from "react-redux";
const { login } = AuthActions;

const Transaction = (props) => {
  const { txnid, status } = useParams();
  const [loading, setLoading] = useState(true);
  const [shwStatus, setShwStatus] = useState("pending");

  useEffect(() => {
    const verifyTxn = async (payload) => {
      try {
        const res = await memberTxn(payload);
        if (res.success === 1) {
          setShwStatus(res.data.payStatus);
          if (res.data.loginData) {
            props.login(res.data.loginData);
          }
        } else {
          ToastsStore.error(res.message);
        }
      } catch (err) {
        console.error(err);
        ToastsStore.error("Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    if (txnid && status) {
      verifyTxn({
        token: txnid,
        status: status,
      });
    }
  }, [txnid, status]);

  document.title = "Payment - " + window.seoTagLine;

  return loading ? (
    <div className="custom-spinner">
      <Spinner color="danger" />
    </div>
  ) : (
    <Wrapper>
      <div className="text-center pt20">
        {shwStatus === "success" && (
          <div>
            <h2>Payment Received</h2>
            <p>
              Thank you! Your payment was successful.
              <br />
              If this doesn't reflect immediately, rest assured—it will be
              confirmed shortly.
            </p>
          </div>
        )}

        {shwStatus === "cancelled" && (
          <div>
            <h2>Payment Cancelled</h2>
            <p>
              Your payment was cancelled.
              <br />
              If this was unintentional, feel free to try again.
            </p>
          </div>
        )}

        {shwStatus === "pending" && (
          <div>
            <h2>Payment Pending</h2>
            <p>
              We've received your request, but the payment hasn’t been confirmed
              yet.
              <br />
              Please allow a little time, or contact support if it takes too
              long.
            </p>
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default connect(null, { login })(Transaction);
