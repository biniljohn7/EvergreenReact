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
import Spinner from "../../UI/Spinner/Spinner";

const PaymentSummary = (props) => {
  const [code, setCode] = useState("");
  const [isChecked, check] = useState(true);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [ErrorList, setErrorList] = useState({});
  const [DonationInp, setDonationInp] = useState({})

  // const {
  //   values,
  //   errors,
  //   touched,
  //   submitCount,
  //   handleSubmit,
  //   handleBlur,
  //   isValid,
  //   handleChange,
  // } = props;

  let Spn = Spinner();

  const Error = ({ field }) => {
    return ErrorList[field] ?
      <div className="text-danger">
        {ErrorList[field]}
      </div> :
      <></>;
  };
  const handleForm = (e) => {
    function el(id) {
      return document.getElementById(id);
    }
    function isNum(num) {
      if (num) {
        num = Number(num);
        if (!isNaN(num) && num > 0.01) {
          return true;
        }
      }
      return false;
    }
    if (step === 1) {
      let
        sErrs = {},
        locAmount = el('localAmount').value.trim(),
        natAmount = el('nationalAmount').value.trim();

      if (
        el('isLocal').checked &&
        !isNum(locAmount)
      ) {
        sErrs['amountLocal'] = 'Invalid amount';
      }
      if (
        el('isNational').checked &&
        !isNum(natAmount)
      ) {
        sErrs['amountNational'] = 'Invalid amount';
      }
      setErrorList(sErrs);

      if (Object.keys(sErrs).length < 1) {
        setDonationInp({
          loc: Number(locAmount),
          nat: Number(natAmount)
        });
        setStep(2);
      }

    } else if (step === 2) {
      Spn.Show();
      addMembership({
        membershipTypeId: props.data.type,
        recurring: isChecked,
        membershipChargesId: props.data.id,
        //   serviceAward: props.membershipValue.service.value,
        chapterDonation: DonationInp.loc,
        nationDonation: DonationInp.nat,
        // year: 1,
        // currency: "USD",
      })
        .then((res) => {
          if (res.success === 1) {
            //       // window.location.href =  res.data.paymentUrl
            props.changeURL(
              res.data.paymentUrlForWebsite,
              {
                fromWebsite: true,
                referralCode: code,
              }
            );
          } else {
            //       ToastsStore.error(res.message);
          }
        })
        //   .catch((err) => {
        //     console.error(err);
        //     ToastsStore.error("Something went wrong!");
        //   })
        .finally(() => {
          Spn.Hide()
        });
    }
  };

  const GetCharge = () => {
    const localAmount = DonationInp.loc || 0;
    const nationalAmount = DonationInp.nat || 0;
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
      {Spn.Obj}
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
                      <table width="100%">
                        <tr>
                          <td className="pb10">
                            National Dues:
                          </td>
                          <td className="pb10 text-right bold-600">
                            ${(props.data.nationalDues || 0).toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td className="pb10">
                            Section Dues:
                          </td>
                          <td className="pb10 text-right bold-600">
                            ${(props.data.localDues || 0).toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td className="pb10">
                            Payment Processing Fee:
                          </td>
                          <td className="pb10 text-right bold-600">
                            ${(props.data.nationalLateFee || 0).toFixed(2)}
                          </td>
                        </tr>
                        <tr className="text-black text-11">
                          <td className="bold-500">
                            Total
                          </td>
                          <td className="text-right bold-600">
                            ${(props.data.totalCharges || 0).toFixed(2)}
                          </td>
                        </tr>
                      </table>
                    </div>
                    <>
                      <div class="mb10">
                        <label className="text-bold mt-30">
                          Optional Donation:
                        </label>
                      </div>
                      <>
                        <Checkbox
                          id="isLocal"
                          name="isLocal"
                          // checked={ChkSecDonation}
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
                            // setChkSecDonation(!ChkSecDonation)
                            // handleChange(e);
                            let inp = document.getElementById('localAmount');
                            inp.style.display = e.target.checked ? '' : 'none';
                            if (e.target.checked) {
                              inp.focus();
                            }
                          }}
                          label="Section Donation"
                        />
                        {/* {values.isLocal && ( */}
                        <Input
                          type="number"
                          style={{ display: 'none' }}
                          placeholder="Enter Amount"
                          id="localAmount"
                        // value={DonationInp.loc}
                        // onChange={handleChange}
                        // onBlur={handleBlur}
                        />
                        {/* )} */}
                        <Error field="amountLocal" />
                      </>
                      <>
                        <Checkbox
                          id="isNational"
                          name="isNational"
                          // checked={values.isNational}
                          // onChange={(e) => {
                          //   if (nationalChecked) {
                          //     document.getElementById('national_error').innerHTML = ''
                          //   } else {
                          //     document.getElementById('national_error').innerHTML =
                          //       'This field is required'
                          //   }
                          //   setNational(!nationalChecked)
                          // }}
                          // onChange={handleChange}
                          onChange={function (e) {
                            let inp = document.getElementById('nationalAmount');
                            inp.style.display = e.target.checked ? '' : 'none';
                            if (e.target.checked) {
                              inp.focus();
                            }
                          }}
                          margin="mt-15"
                          label="National Donation"
                        />
                        {/* {values.isNational && ( */}
                        <Input
                          type="number"
                          placeholder="Enter Amount"
                          id="nationalAmount"
                          // value={values.nationalAmount}
                          style={{ display: 'none' }}
                        // onChange={handleChange}
                        // onBlur={handleBlur}
                        />
                        {/* )} */}
                        <Error field="amountNational" />
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
                        if (code.length !== 6) {
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
                  <table width="100%">
                    <tr>
                      <td className="pb10">
                        Total Dues/Fees:
                      </td>
                      <td className="pb10 text-right bold-600">
                        ${props.data.totalCharges.toFixed(2)}
                      </td>
                    </tr>

                    {DonationInp.loc ? (
                      <tr>
                        <td className="pb10">
                          Section Donation:
                        </td>
                        <td className="pb10 text-right bold-600">
                          ${DonationInp.loc.toFixed(2)}
                        </td>
                      </tr>
                    ) : null}

                    {DonationInp.nat ? (
                      <tr>
                        <td className="pb10">
                          National Donation:
                        </td>
                        <td className="pb10 text-right bold-600">
                          ${DonationInp.nat.toFixed(2)}
                        </td>
                      </tr>
                    ) : null}

                    <tr>
                      <td className="pb10">
                        Discount:
                      </td>
                      <td className="pb10 text-right bold-600">
                        - ${discount.toFixed(2)}
                      </td>
                    </tr>

                    <tr className="text-12 text-black">
                      <td>
                        Grand Total:
                      </td>
                      <td className="text-right bold-600">
                        <GetCharge />
                      </td>
                    </tr>
                  </table>
                </div>

                <>
                  <label className="text-bold mt-30">Subscribe:</label>
                  <Checkbox
                    id="terms"
                    name="terms"
                    checked={isChecked}
                    onChange={(e) => {
                      // 
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

            <div className="flex-container pt15">
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
