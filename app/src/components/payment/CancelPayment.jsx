import React, { useEffect, useState } from "react";
import Wrapper from "./payment.style";
import { cancelPayment, fetchPayment } from "../../api/duesAPI";
import { Modal, Spinner, Button } from "reactstrap";
import { ToastsStore } from "react-toasts";

const CancelPayment = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [payment, setPayment] = useState(null);
  const [msg, setMsg] = useState("");
  const [step, setStep] = useState(0);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (!props.match.params.recurringId) {
      props.history.replace("/");
    } else {
      fetchPayment(props.match.params.recurringId)
        .then((res) => {
          if (res.success === 1) {
            setPayment(res.data);
            setStep(1);
          } else {
            setStep(0);

            setMsg(res.message);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setStep(0);

          setMsg("Something went wrong");
          setLoading(false);
        });
    }
  }, []);

  const cancelRecurringPayment = () => {
    setProcessing(true);
    cancelPayment(props.match.params.recurringId)
      .then((res) => {
        if (res.success === 1) {
          setMsg(res.message);
          setProcessing(false);
          setToggle(!toggle);
          setStep(0);
        } else {
          setProcessing(false);
          ToastsStore.error(res.message);
        }
      })
      .catch((err) => {
        console.error(err);
        ToastsStore.error("Something went wrong");
        setProcessing(false);
        setToggle(!toggle);
      });
  };

  document.title = 'Payment Cancellation - ' + window.seoTagLine;

  return isLoading ? (
    <div className="custom-spinner">
      <Spinner color="danger" />
    </div>
  ) : (
    <Wrapper>
      {step === 1 && payment ? (
        <section className="site-spacing ptb-50">
          <h4 className="text-bold">Membership Fee Details:</h4>
          <div>
            Payment Date: {new Date(payment.executionDate).toLocaleString()}
          </div>
          <div className="pa-15 border rounded mt-15 text-secondary">
            <div className="ptb-7 border-bottom">
              Title:
              <span className="float-right text-dark">
                {payment.membership.chargesTitle}
              </span>
            </div>

            <div className="ptb-7">
              National Dues:
              <span className="float-right text-dark">
                ${(payment.membership.nationalDues || 0).toFixed(2)}
              </span>
            </div>

            <div className="ptb-7">
              Section Dues:
              <span className="float-right text-dark">
                ${(payment.membership.localDues || 0).toFixed(2)}
              </span>
            </div>

            {/* <div className="ptb-7">
              National Per Capital Fee:
              <span className="float-right text-dark">
                ${(payment.membership.nationalPerCapitalFee || 0).toFixed(2)}
              </span>
            </div>

            <div className="ptb-7">
              Reinstatement Fee:
              <span className="float-right text-dark">
                ${(payment.membership.nationalReinstatementFee || 0).toFixed(2)}
              </span>
            </div> */}

            <div className="ptb-7">
              Payment Processing Fee:
              <span className="float-right text-dark">
                ${(payment.membership.nationalLateFee || 0).toFixed(2)}
              </span>
            </div>

            <div className="ptb-7">
              Section Donation:
              <span className="float-right text-dark">
                ${(payment.membership.localDonation || 0).toFixed(2)}
              </span>
            </div>

            <div className="ptb-7">
              National Donation:
              <span className="float-right text-dark">
                ${(payment.membership.nationDonation || 0).toFixed(2)}
              </span>
            </div>

            <div className="text-dark text-bold border-top ptb-7">
              Total
              <span className="float-right">
                ${(payment.membership.totalCharges || 0).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="text-center mt-20">
            <Button
              color="danger"
              type="button"
              onClick={(e) => setToggle(true)}
            >
              CANCEL PAYMENT
            </Button>
          </div>

          {toggle && (
            <div>
              <div
                className="bg-light"
                style={{ height: window.innerHeight + "px" }}
              ></div>
              <Modal
                isOpen={toggle}
                toggle={() => setToggle(!toggle)}
                centered
                size="xl"
                className="signup"
                backdrop="static"
                keyboard={false}
              >
                <div className="pa-50">
                  <label className="text-bold fs-20">
                    Are you sure you want to cancel this payment?
                  </label>
                  <div className="d-flex mt-20 justify-content-center">
                    <Button
                      color="danger"
                      type="button"
                      onClick={(e) => setToggle(!toggle)}
                    >
                      NO
                    </Button>
                    <Button
                      color="info"
                      type="button"
                      className="ml-20"
                      onClick={(e) => {
                        cancelRecurringPayment();
                      }}
                      disabled={processing}
                    >
                      YES
                    </Button>
                  </div>
                </div>
              </Modal>
            </div>
          )}
        </section>
      ) : (
        <div className="ptb-50 site-spacing mt-50 red--text plr-20 border text-bold text-center">
          {msg}
        </div>
      )}
    </Wrapper>
  );
};

export default CancelPayment;
