import React, { useState } from "react";
import { Modal } from "reactstrap";
import Wrapper from "./dues.style";
import Button from "../../UI/button/button";
import Input from "../../UI/input/input";
import Checkbox from "../../UI/checkbox/checkbox";
import { payment as enhancer } from "./enhancer";
import { applyCode } from "../../api/duesAPI";
import { ToastsStore } from "react-toasts";
import { addMembership } from "../../api/duesAPI";

const PaymentSummary = (props) => {
  const [code, setCode] = useState("");
  const [isChecked, check] = useState(true);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [discount, setDiscount] = useState(0);

  const {
    values,
    errors,
    touched,
    submitCount,
    handleSubmit,
    handleBlur,
    isValid,
    handleChange,
  } = props;

  const Error = (props) => {
    const field1 = props.field;
    if ((errors[field1] && touched[field1]) || submitCount > 0) {
      return <div className="text-danger">{errors[field1]}</div>;
    } else {
      return <div />;
    }
  };
  const handleForm = (e) => {
    if (step === 1) {
      handleSubmit(e);
      if (isValid) {
        setStep(2);
      }
    } else if (step === 2) {
      setLoading(true);
      addMembership({
        membershipTypeId: props.membershipValue.plan.membershipTypeId,
        recurring: isChecked,
        membershipChargesId: props.membershipValue.subPlan.membershipChargesId,
        serviceAward: props.membershipValue.service.value,
        chapterDonation: values.localAmount ? values.localAmount : 0,
        nationDonation: values.nationalAmount ? values.nationalAmount : 0,
        year: 1,
        currency: "USD",
      })
        .then((res) => {
          if (res.success === 1) {
            // window.location.href =  res.data.paymentUrl
            props.changeURL(res.data.paymentUrlForWebsite, {
              fromWebsite: true,
              referralCode: code,
            });
          } else {
            ToastsStore.error(res.message);
          }
        })
        .catch((err) => {
          console.error(err);
          ToastsStore.error("Something went wrong!");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const GetCharge = () => {
    const localAmount = values.localAmount || 0;
    const nationalAmount = values.nationalAmount || 0;
    const total = (
      parseFloat(props.data.totalCharges) +
      parseFloat(localAmount) +
      parseFloat(nationalAmount) -
      parseFloat(discount)
    ).toFixed(2);
    return <span className="float-right">${total}</span>;
  };

  return (
    <div>
      <div
        className="bg-light"
        style={{ height: window.innerHeight + "px" }}
      ></div>
      <Modal
        isOpen={props.isOpen}
        toggle={props.toggle}
        centered
        size="lg"
        className="signup"
        backdrop="static"
        keyboard={false}
      >
        <Wrapper>
          <div
            className={
              "ptb-50 m-auto " +
              (window.innerWidth < 768
                ? " plr-20 "
                : window.innerWidth === 786
                  ? " plr-30 "
                  : " plr-40 ")
            }
          >
            {step === 1 && (
              <>
                <h5 className="text-bold">Membership Fee Cart</h5>
                {props.data ? (
                  <>
                    <p className="text-bold mt-7">{props.data.chargesTitle}</p>
                    <div className="pa-15 border rounded mt-15 text-secondary">
                      <div className="ptb-7">
                        National Dues:
                        <span className="float-right text-dark">
                          ${(props.data.nationalDues || 0).toFixed(2)}
                        </span>
                      </div>

                      <div className="ptb-7">
                        Section Dues:
                        <span className="float-right text-dark">
                          ${(props.data.localDues || 0).toFixed(2)}
                        </span>
                      </div>

                      {/* <div className="ptb-7">
                        National Per Capital Fee:
                        <span className="float-right text-dark">
                          ${(props.data.nationalPerCapitalFee || 0).toFixed(2)}
                        </span>
                      </div>

                      <div className="ptb-7">
                        Reinstatement Fee:
                        <span className="float-right text-dark">
                          $
                          {(props.data.nationalReinstatementFee || 0).toFixed(
                            2
                          )}
                        </span>
                      </div> */}

                      <div className="ptb-7">
                        Payment Processing Fee:
                        <span className="float-right text-dark">
                          ${(props.data.nationalLateFee || 0).toFixed(2)}
                        </span>
                      </div>

                      <div className="text-dark text-bold border-top ptb-7">
                        Total
                        <span className="float-right">
                          ${(props.data.totalCharges || 0).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <>
                      <label className="text-bold mt-30">
                        Optional Donation:
                      </label>
                      <>
                        <Checkbox
                          id="isLocal"
                          name="isLocal"
                          checked={values.isLocal}
                          // onChange={(e) => {
                          //   if (localChecked) {
                          //     document.getElementById('local_error').innerHTML = ''
                          //   } else {
                          //     document.getElementById('local_error').innerHTML =
                          //       'This field is required'
                          //   }
                          //   setLocal(!localChecked)
                          // }}
                          onChange={(e) => {
                            // setFieldTouched('isLocal',true,true)
                            handleChange(e);
                          }}
                          label="Section Donation"
                        />
                        {values.isLocal && (
                          <Input
                            type="number"
                            placeholder="Enter Amount"
                            id="localAmount"
                            value={values.localAmount}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        )}
                        <Error field="localAmount" />
                      </>
                      <>
                        <Checkbox
                          id="isNational"
                          name="isNational"
                          checked={values.isNational}
                          // onChange={(e) => {
                          //   if (nationalChecked) {
                          //     document.getElementById('national_error').innerHTML = ''
                          //   } else {
                          //     document.getElementById('national_error').innerHTML =
                          //       'This field is required'
                          //   }
                          //   setNational(!nationalChecked)
                          // }}
                          onChange={handleChange}
                          margin="mt-15"
                          label="National Donation"
                        />
                        {values.isNational && (
                          <Input
                            type="number"
                            placeholder="Enter Amount"
                            id="nationalAmount"
                            value={values.nationalAmount}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        )}
                        <Error field="nationalAmount" />
                      </>
                    </>
                  </>
                ) : null}
              </>
            )}

            {step === 2 && (
              <>
                <h5 className="text-bold">Referral Details:</h5>
                <>
                  <Input
                    label="Referral Details"
                    type="text"
                    placeholder="Enter referral code"
                    id="referral_code"
                    fontSize={"fs-16 text-left"}
                    className="text-danger code"
                    contentFontSize={"fs-14"}
                    onChange={(e) => setCode(e.target.value || "")}
                    value={code || ""}
                  />
                  <div id="apply_code" className="mt-3 red--text" />
                  <Button
                    className="button mt-10"
                    name="APPLY"
                    disabled={loading}
                    clicked={(e) => {
                      if (code && code.trim()) {
                        setLoading(true);
                        if (code.length != 6) {
                          ToastsStore.info(
                            "length must be exactly 6 characters"
                          );
                          setLoading(false);
                        } else {
                          document.getElementById("apply_code").innerHTML = "";
                          applyCode(code)
                            .then((res) => {
                              if (res.success === 1) {
                                ToastsStore.info("Coupon code applied!");
                              } else {
                                ToastsStore.error(res.message);
                              }
                            })
                            .catch((err) => {
                              console.error(err);
                              ToastsStore.error("Something went wrong!");
                            })
                            .finally(() => {
                              setLoading(false);
                            });
                        }
                      } else {
                        document.getElementById("apply_code").innerHTML =
                          "Please enter valid referral code";
                      }
                    }}
                  />
                </>
                <div className="border pa-20 mt-30 text-secondary">
                  <div className="pb-7">
                    Total Dues/Fees:
                    <span className="float-right text-dark">
                      ${props.data.totalCharges.toFixed(2)}
                    </span>
                  </div>
                  {values.localAmount ? (
                    <div className="pb-7">
                      Section Donation:
                      <span className="float-right text-dark">
                        ${values.localAmount.toFixed(2)}
                      </span>
                    </div>
                  ) : null}
                  {values.nationalAmount ? (
                    <div className="pb-7">
                      National Donation:
                      <span className="float-right text-dark">
                        ${values.nationalAmount.toFixed(2)}
                      </span>
                    </div>
                  ) : null}
                  <div className="ptb-7">
                    Discount:
                    <span className="float-right red--text text-dark">
                      - ${discount.toFixed(2)}
                    </span>
                  </div>
                  <div className="pt-10 mt-10 text-dark text-bold border-top">
                    Grand Total:
                    <GetCharge />
                  </div>
                </div>
                <>
                  <label className="text-bold mt-30">Subscribe:</label>
                  <Checkbox
                    id="terms"
                    name="terms"
                    checked={isChecked}
                    onChange={(e) => {
                      // if (isChecked) {
                      //   document.getElementById('term_condition').innerHTML =
                      //     'This field is required'
                      // } else {
                      //   document.getElementById('term_condition').innerHTML = ''
                      // }
                      check(!isChecked);
                    }}
                    label="I agree that my Membership Dues/Fees and optional Donations will be paid annually on a Subscription basis, and my above elections will apply to each subscription payment. I may change my elections or subscriptions at any time."
                  />
                  {/* <div className="red--text" id="term_condition"></div> */}
                </>
              </>
            )}

            <div className="flex-container">
              <Button
                className="button plr-50 ptb-10 mt-30"
                name={step === 1 ? "NEXT" : "MAKE PAYMENT"}
                clicked={handleForm}
                disabled={loading}
              />
            </div>
          </div>
        </Wrapper>
      </Modal>
    </div>
  );
};

export default enhancer(PaymentSummary);
