import React, { useState } from "react";
import { Modal } from "reactstrap";
import Wrapper from "./dues.style";
import Button from "../../UI/button/button";
import Input from "../../UI/input/input";
import Checkbox from "../../UI/checkbox/checkbox";
import { payment as enhancer } from "./enhancer";

const PaymentSummary = (props) => {
  const [code, setCode] = useState("");
  const [isChecked, check] = useState(true);

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
    handleSubmit(e);
    if (isChecked && isValid) {
      console.log("done");
    }
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
        size="xl"
        className="signin"
        backdrop="static"
        keyboard={false}
      >
        <Wrapper>
          <div className="row mlr-0">
            <div
              className={
                "ptb-50 col-12 col-sm-12 col-lg-5 col-xl-5 white--text red " +
                (window.innerWidth === 768 ? " col-md-12 " : " col-md-4 ") +
                (window.innerWidth > 768
                  ? " plr-40"
                  : window.innerWidth === 768
                  ? " plr-30"
                  : " plr-20")
              }
            >
              <div className="flex-item">
                <h4 className="flex-container text-bold">Payment Summary</h4>
                <label className="mt-25 mb-5 text-bold flex-container">
                  Referral Discount
                </label>

                <>
                  <Input
                    label="Referral Details"
                    type="text"
                    placeholder="Enter referral code"
                    id="referral_code"
                    fontSize={"fs-16 mt-20 text-left"}
                    contentFontSize={"fs-14"}
                    className="text-danger"
                    onChange={(e) => setCode(e.target.value || "")}
                    value={code || ""}
                  />
                  <div id="apply_code" className="mt-3" />
                </>
                <div className="flex-container">
                  <Button
                    class="button mt-20"
                    name="APPLY"
                    clicked={(e) => {
                      if (code && code.trim()) {
                        document.getElementById("apply_code").innerHTML = "";
                        setCode("");
                        alert("Done");
                      } else {
                        document.getElementById("apply_code").innerHTML =
                          "Please enter valid referral code";
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div
              className={
                "ptb-50 col-12 col-sm-12 col-md-8 col-lg-7 col-xl-7 m-auto " +
                (window.innerWidth === 768 ? " col-md-12 " : " col-md-8 ") +
                (window.innerWidth < 768
                  ? " plr-20 "
                  : window.innerWidth === 786
                  ? " plr-30 "
                  : " plr-40 ")
              }
            >
              <h5 className="text-bold">Membership Fee Cart</h5>
              {props.data && (
                <p className="text-bold mt-7">
                  {props.data.subPlan.chargesTitle}
                </p>
              )}
              <div className="border pa-20 mt-20 text-secondary">
                <div className="ptb-7">
                  National Dues:
                  <span className="float-right text-dark">$260.00</span>
                </div>

                <div className="pb-7">
                  Section Dues:
                  <span className="float-right text-dark">$190.00</span>
                </div>

                {/* <div className="ptb-7">
                  Reinstatement Fee:
                  <span className="float-right text-dark">$40.00</span>
                </div> */}
                <div className="ptb-7">
                  Payment Processing Fee:
                  <span className="float-right text-dark">$20.00</span>
                </div>
                <div className="ptb-7">
                  Total
                  <span className="float-right text-dark ">$510.00</span>
                </div>
                <div className="ptb-7">
                  Referral Discount Code:
                  <span className="float-right text-dark ">-$10.00</span>
                  <div className="text-dark text-bold fs-14">RECLAIM</div>
                </div>
                <div className="pt-10 mt-10 text-dark text-bold border-top">
                  Final Total:
                  <span className="float-right ">$500.00</span>
                </div>
              </div>

              <>
                <label className="text-bold mt-30">Optional Donation:</label>
                <>
                  <Checkbox
                    id="isLocal"
                    name="isLocal"
                    checked={values.isLocal}
                    onChange={(e) => {
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
              <>
                <label className="text-bold mt-30">Subscribe:</label>
                <Checkbox
                  id="terms"
                  name="terms"
                  checked={isChecked}
                  onChange={(e) => {
                    if (isChecked) {
                      document.getElementById("term_condition").innerHTML =
                        "This field is required";
                    } else {
                      document.getElementById("term_condition").innerHTML = "";
                    }
                    check(!isChecked);
                  }}
                  label="I agree that my Membership Dues/Fees and optional Donations will be paid annually on a Subscription basis, and my above elections will apply to each subscription payment. I may change my elections or subscriptions at any time."
                />
                <div className="red--text" id="term_condition"></div>
              </>

              <div className="flex-container">
                <Button
                  class="button mt-30"
                  name="MAKE PAYMENT"
                  clicked={handleForm}
                />
              </div>
            </div>
          </div>
        </Wrapper>
      </Modal>
    </div>
  );
};

export default enhancer(PaymentSummary);
