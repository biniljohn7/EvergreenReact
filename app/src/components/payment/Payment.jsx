import React, { useEffect, useState } from "react";
import Wrapper from "./payment.style";
import {
  WEPAY_APP_ID,
  WEPAY_VERSION,
  WEPAY_ENV,
  COUNTRY_CODE,
} from "../../helper/constant";
import {
  validateToken,
  createPayment,
  fetchStoredCard,
  deleteStroredCard,
} from "../../api/duesAPI";
import { ToastsStore } from "react-toasts";
import { FormGroup, Form, Input, Label, Spinner, Button } from "reactstrap";
import enhancer from "./enhancer";
import "rc-steps/assets/index.css";
import Steps, { Step } from "rc-steps";
let message = "";
let iFrameMessage = "";

const Payment = (props) => {
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    submitCount,
    handleSubmit,
    isValid,
    setFieldTouched,
    setFieldValue,
  } = props;

  /* 
  1 - user details
  2 - payment gateway
  3 - API processing
  */

  const [step, setStep] = useState(1);

  // Validate token
  const [validating, setValidating] = useState(true);
  const [isValidToken, setValidToken] = useState(false);

  const [processing, setProcessing] = useState(false);
  const [step2Success, setStep2Suceess] = useState(false);
  const [step3Success, setStep3Suceess] = useState(false);
  const [cards, setCards] = useState([]);

  // IFrame loading
  const [iFrameLoading, setIFrameLoading] = useState(true);

  // Success of IFrame loading
  const [iFrameSuccess, setIFrameSuccess] = useState(false);

  // Credit card iFrame
  const [creditCardIFrame, setCreditCard] = useState(null);

  const [isFailed, setFailed] = useState(false);

  // To toggle between my cards and wepay card
  const [cardToggle, setCardToggle] = useState(true);

  const [checkedCard, setCardChecked] = useState();

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

  useEffect(() => {
    if (!props.match.params.token) {
      props.history.replace("/");
    } else {
      const error = window.WePay.configure(
        WEPAY_ENV,
        WEPAY_APP_ID,
        WEPAY_VERSION
      );
      if (error) {
        console.error(error);
        ToastsStore.error("Failed to load script");
        message = "Failed to load Payment script";
      } else {
        validateToken(props.match.params.token)
          .then((res) => {
            if (res.success === 1) {
              const error = window.WePay.configure(
                WEPAY_ENV,
                WEPAY_APP_ID,
                WEPAY_VERSION
              );
              if (error) {
                console.error(error);
                ToastsStore.error("Failed to load script");
                message = "Failed to load Payment script";
              } else {
                setFieldTouched("countryCode", true, true);
                setFieldValue("countryCode", COUNTRY_CODE[0].countryCode);
                setFieldTouched("phoneCode", true, true);
                setFieldValue("phoneCode", COUNTRY_CODE[0].phoneCode);

                fetchStoredCard(props.match.params.token)
                  .then((res) => {
                    setCards(res.data.card || []);
                  })
                  .catch((err) => {
                    console.error(err);
                  })
                  .finally(() => {
                    setValidToken(true);
                  });
              }
            } else {
              message = res.message;
            }
            setValidating(false);
          })
          .catch((error) => {
            console.error(error);
            setValidating(false);
            ToastsStore.error("Something went wrong");
          });
      }
    }
  }, []);

  const handleDeleteCard = (data) => {
    deleteStroredCard(data && data)
      .then((res) => {
        if (res.success === 1) {
          fetchStoredCard(props.match.params.token)
            .then((res) => {
              setCards(res.data.card || []);
            })
            .catch((err) => {
              console.error(err);
            })
            .finally(() => {
              setValidToken(true);
            });
          setCardToggle(!cardToggle);
          ToastsStore.success(res.message);
        } else {
          ToastsStore.error(res.message);
        }
      })
      .catch((err) => {
        console.error(err);
        ToastsStore.error("Something went wrong!");
      })
      .finally(() => {
        setIFrameLoading(false);
      });
  };

  const handleNext = () => {
    handleSubmit();
    if (isValid) {
      setIFrameLoading(true);
      setStep(2);
      const customStyle = {
        styles: {
          base: {
            color: "black",
            border: "1px solid grey",
            "border-top": "none",
            "border-right": "none",
            "border-left": "none",
            "font-weight": "200",
            "font-family": "Arial",
            padding: "0px",
            "margin-bottom": "5px",
            ":focus": {
              border: "2px solid #4db6ac",
              "border-top": "none",
              "border-right": "none",
              "border-left": "none",
            },
            "::placeholder": {
              "text-transform": "lowercase",
              color: "#D3D3D3",
              "font-size": "17px",
            },
          },
          invalid: {
            color: "#CD5C5C",
            "border-color": "#CD5C5C",
          },
          valid: {
            color: "#199b30",
            "border-color": "#199b30",
          },
          labels: {
            base: {
              color: "gray",
              "font-family": "Arial",
              "font-size": "13px",
              "font-weight": "1",
              "text-transform": "capitalize",
              padding: "0px",
              "padding-left": "0px",
            },
          },
          errors: {
            invalid: {
              color: "#CD5C5C",
            },
          },
        },
      };
      const options = {
        custom_style: customStyle,
        show_labels: true,
        show_placeholders: true,
        show_error_messages: true,
        show_error_messages_when_unfocused: true,
      };
      if (!isFailed) {
        const creditCard = window.WePay.createCreditCardIframe(
          "credit_card_iframe",
          options
        );
        setCreditCard(creditCard);
        if (!creditCard || !creditCard.tokenize) {
          iFrameMessage = "Failed to load credit card iFrame";
        } else {
          setIFrameSuccess(true);
        }
      } else {
        setIFrameSuccess(true);
      }

      setIFrameLoading(false);
    }
  };

  const onToken = (response) => {
    setProcessing(true);
    const paymentObj = {
      cardHolder: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        phoneCode: values.phoneCode,
        address: {
          addressLine1: values.addressLine1,
          countryCode: values.countryCode,
          postalCode: values.postalCode,
          city: values.city,
        },
      },
      saveCard: values.saveCard || false,
      useSavedCard: !cardToggle ? true : false,
      referralCoupon:
        props.location &&
        props.location.state &&
        props.location.state.referralCode
          ? props.location.state.referralCode
          : "",
      paymentMethodId: !cardToggle ? parseInt(checkedCard) : null,
      paymentToken: response ? response.id : null,
    };

    createPayment(paymentObj, props.match.params.token)
      .then((res) => {
        if (res.success === 1) {
          setStep(3);
          if (
            props.location &&
            props.location.state &&
            props.location.state.fromWebsite
          ) {
            setTimeout(() => {
              props.history.push("/dues");
            }, 2000);
          } else {
            setTimeout(() => {
              props.history.push("/membership/success");
              window.location.reload();
            }, 2000);
          }
        } else {
          ToastsStore.error(res.message);
          setFailed(true);
          setProcessing(false);
          setStep2Suceess(false);
          setIFrameLoading(true);
          setIFrameSuccess(false);
          setStep(1);
        }
      })
      .catch((err) => {
        console.error(err);
        setFailed(true);
        ToastsStore.error("Something went wrong");
        setProcessing(false);
        setStep2Suceess(false);
        setIFrameLoading(true);
        setIFrameSuccess(false);
        setStep(1);
      });
  };

  return validating ? (
    <div className="custom-spinner">
      <Spinner color="danger" />
    </div>
  ) : (
    <Wrapper>
      <section className="site-spacing ptb-50">
        <h5 className="text-bold mb-15">Membership Payment</h5>
        {isValidToken ? (
          <>
            <Steps labelPlacement="vertical" current={step - 1} size="small">
              <Step
                title="User Details"
                icon={
                  step === 1 ? (
                    <i className="fa fa-square-o" aria-hidden="true"></i>
                  ) : (
                    <i className="fa fa-check-square-o" aria-hidden="true"></i>
                  )
                }
              />
              <Step
                title="Card Details"
                icon={
                  step2Success ? (
                    <i className="fa fa-check-square-o" aria-hidden="true"></i>
                  ) : (
                    <i className="fa fa-square-o" aria-hidden="true"></i>
                  )
                }
              />
              <Step
                title="Process Payment"
                icon={
                  step3Success ? (
                    <i className="fa fa-check-square-o" aria-hidden="true"></i>
                  ) : (
                    <i className="fa fa-square-o" aria-hidden="true"></i>
                  )
                }
              />
            </Steps>

            <div className="shadow plr-20 ptb-20 mt-35 position-relative payment">
              {step === 1 && (
                <Form className="payment-form">
                  <FormGroup>
                    <Label for="firstName" className="text-bold">
                      First Name <span className="text-danger">*</span>
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="First Name"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName || ""}
                    />
                    <Error field="firstName" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="lastName" className="text-bold">
                      Last Name <span className="text-danger">*</span>
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Last Name"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lastName || ""}
                    />
                    <Error field="lastName" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="email" className="text-bold">
                      Email <span className="text-danger">*</span>
                    </Label>
                    <Input
                      id="email"
                      placeholder="Email"
                      type="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email || ""}
                    />
                    <Error field="email" />
                  </FormGroup>
                  <FormGroup>
                    <Label className="text-bold">Address</Label>
                    <Input
                      id="addressLine1"
                      placeholder="Address Line 1"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.addressLine1 || ""}
                    />
                    <Error field="addressLine1" />
                  </FormGroup>
                  <FormGroup>
                    <Label className="text-bold">City</Label>
                    <Input
                      id="city"
                      placeholder="City"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.city || ""}
                    />
                    <Error field="city" />
                  </FormGroup>
                  <FormGroup>
                    <Label className="text-bold">State</Label>
                    <Input
                      id="state"
                      placeholder="State"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.state || ""}
                    />
                    <Error field="state" />
                  </FormGroup>
                  <FormGroup>
                    <Label className="text-bold">
                      Country Code <span className="red--text">*</span>
                    </Label>
                    <Input id="countryCode" name="select" type="select">
                      {COUNTRY_CODE.map((code, index) => {
                        return (
                          <option value={code.countryCode} key={index}>
                            {code.countryCode}
                          </option>
                        );
                      })}
                    </Input>
                    <Error field="countryCode" />
                  </FormGroup>
                  <FormGroup>
                    <Label className="text-bold">
                      Postal code <span className="text-danger">*</span>
                    </Label>
                    <Input
                      id="postalCode"
                      placeholder="Postal code"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.postalCode || ""}
                    />
                    <Error field="postalCode" />
                  </FormGroup>
                  <FormGroup>
                    <Label className="text-bold mb-0">Phone Number</Label>
                    <p className="red--text mb-7">
                      Please use the format: **********
                    </p>
                    <div className="row mlr-0">
                      <div className="col-5 col-sm-5 col-md-5 col-lg-3 col-xl-3 pl-0">
                        <Input id="phoneCode" name="select" type="select">
                          {COUNTRY_CODE.map((code, index) => {
                            return (
                              <option value={code.phoneCode} key={index}>
                                {code.phoneCode} - {code.label}
                              </option>
                            );
                          })}
                        </Input>
                      </div>
                      <div className="col-7 col-sm-7 col-md-7 col-lg-9 col-xl-9 plr-0">
                        <Input
                          id="phoneNumber"
                          placeholder="Phone Number"
                          type="number"
                          onKeyPress={(event) => {
                            if (
                              (event.which != 8 &&
                                event.which != 0 &&
                                event.which < 48) ||
                              event.which > 57
                            ) {
                              event.preventDefault();
                            }
                          }}
                          onChange={(event) => {
                            event.preventDefault();
                            setFieldTouched("phoneNumber", true, true);
                            setFieldValue("phoneNumber", event.target.value);
                          }}
                          onBlur={handleBlur}
                          value={values.phoneNumber}
                        />
                      </div>
                    </div>
                    <Error field="phoneNumber" />
                  </FormGroup>
                  <div className="text-right">
                    <button
                      type="button"
                      className={
                        "btn btn-rounded border-radius-41 text-bold plr-25 ptb-7 red text-white"
                      }
                      onClick={handleNext}
                      // disabled={loading}
                    >
                      NEXT
                    </button>
                  </div>
                </Form>
              )}
              {step === 3 && (
                <p className="red--text ptb-50 text-center text-bold border">
                  Processing your payment. Please wait...
                </p>
              )}
              {/* 
              Keep this code out of condition to avoid any run time exception while creating creditCardIFrame
              */}
              <div className={step === 2 ? "d-block" : "d-none"}>
                {cards && cards.length > 0 && (
                  <>
                    <div className="text-right mb-20">
                      <Button
                        type="button"
                        color="danger"
                        onClick={() => {
                          setCardChecked(null);
                          setFieldValue("saveCard", false);
                          setCardToggle(!cardToggle);
                        }}
                      >
                        {cardToggle ? "My Cards" : "Hide Cards"}
                      </Button>
                    </div>
                    {!cardToggle &&
                      cards.map((card) => {
                        return (
                          <div key={card.id} className="row mlr-0 mt-10">
                            <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                              <Input
                                id={"radio_" + card.id}
                                type="radio"
                                onChange={() => setCardChecked(card.id)}
                                className="radio-button"
                                checked={checkedCard === card.id}
                              />
                            </div>
                            <div className="col-10 col-sm-10 col-md-10 col-lg-9 col-xl-8 plr-10 ptb-15 rounded card text-white position-relative">
                              <div className="d-flex flex-row justify-content-md-between text-bold fs-18 mb-5">
                                {card.cardBrand}
                                <i
                                  className="fa fa-trash"
                                  style={{ height: 16, width: 16 }}
                                  onClick={() => handleDeleteCard(card.id)}
                                ></i>
                              </div>
                              <label className="text-bold card-name">
                                {card.cardDisplayName}
                              </label>
                              <div className="row mt-15 mlr-0 position-relative box">
                                <div className="col-7 col-sm-7 col-md-7 col-lg-7 col-xl-7 plr-0 card-holder">
                                  {card.cardHolderName}
                                </div>
                                <div className="col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5 plr-0 valid-through">
                                  <div className="text-right">
                                    Valid Through
                                  </div>
                                  <div className="text-right">
                                    {(card.expirationMonth < 10 ? "0" : "") +
                                      card.expirationMonth}
                                    /{card.expiration_year}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </>
                )}
                <div
                  id="credit_card_iframe"
                  className={step === 2 && cardToggle ? "d-block" : "d-none"}
                ></div>
                <div
                  className={step === 2 && cardToggle ? "d-block" : "d-none"}
                >
                  <Input
                    type="checkbox"
                    id="saveCard"
                    className="ml-0"
                    style={{
                      height: 17,
                      width: 17,
                    }}
                    checked={values.saveCard}
                    onChange={(e) => {
                      setFieldValue("saveCard", e.target.checked);
                    }}
                  />
                  <Label
                    style={{
                      paddingLeft: 20,
                    }}
                    for="saveCard"
                  >
                    Save card for future use
                  </Label>
                </div>
                {iFrameLoading ? (
                  <div className="custom-spinner">
                    <Spinner color="danger" />
                  </div>
                ) : (
                  <>
                    {!iFrameSuccess ? (
                      <p className="red--text ptb-50 text-center text-bold border">
                        {iFrameMessage}
                      </p>
                    ) : (
                      <div className="row mt-20">
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                          <button
                            type="button"
                            className={
                              "btn btn-rounded border-radius-41 text-bold plr-25 ptb-7 red text-white"
                            }
                            disabled={!iFrameSuccess}
                            onClick={() => {
                              setFailed(true);
                              setProcessing(false);
                              setStep2Suceess(false);
                              setIFrameLoading(true);
                              setIFrameSuccess(false);
                              setStep(1);
                            }}
                          >
                            BACK
                          </button>
                        </div>
                        <div className="col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-right">
                          <button
                            type="button"
                            id="submit-credit-card-button"
                            className={
                              "btn btn-rounded border-radius-41 text-bold plr-25 ptb-7 red text-white"
                            }
                            disabled={
                              !iFrameSuccess ||
                              step !== 2 ||
                              (!cardToggle && !checkedCard)
                            }
                            onClick={(event) => {
                              if (cardToggle) {
                                creditCardIFrame
                                  .tokenize()
                                  .then((response) => {
                                    //get the promise response from the console
                                    if (
                                      step === 2 ||
                                      (step === 3 &&
                                        !processing &&
                                        !step3Success)
                                    ) {
                                      setStep2Suceess(true);
                                      setStep(3);
                                      onToken(response);
                                    }
                                  })
                                  .catch((error) => {
                                    console.error(
                                      "error while tokenizing payment, ",
                                      error
                                    );
                                    // Move the focus to the first error
                                    if (Array.isArray(error)) {
                                      const key = error[0].target[0];
                                      creditCardIFrame.setFocus(key);
                                    }
                                  });
                              } else {
                                if (
                                  step === 2 ||
                                  (step === 3 && !processing && !step3Success)
                                ) {
                                  setStep2Suceess(true);
                                  setStep(3);

                                  onToken();
                                }
                              }
                            }}
                          >
                            SUBMIT
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          <p className="red--text ptb-50 text-center text-bold border">
            {message}
          </p>
        )}
      </section>
    </Wrapper>
  );
};

export default enhancer(Payment);
