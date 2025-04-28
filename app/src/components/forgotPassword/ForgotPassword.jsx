import React, { useState } from 'react'
import ForgotPasswordWrapper from './pwdFlow.style'
import Input from '../../UI/input/input'
import Button from '../../UI/button/button'
import { Modal } from 'reactstrap'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { forgotPwdValidation as enhancer } from './enhancer'
//import { ToastsStore } from 'react-toasts'
// import { connect } from 'react-redux'
// import AuthActions from '../../redux/auth/actions'
import OtpVerification from './OtpVerification'
import { forgotPassword } from '../../api/commonAPI'
// const { forgotPwd } = AuthActions

import Toast from "../../UI/Toast/Toast";
import Spinner from "../../UI/Spinner/Spinner";

const ForgotPassword = (props) => {
    const Tst = Toast();
    const Spn = Spinner();

    const {
        values,
        handleChange,
        handleBlur,
        isValid,
        errors,
        touched,
        submitCount,
        handleSubmit,
    } = props
    const [otpVerification, setOtpVerification] = useState(false)
    const [isLoading, setLoading] = useState(false)
    const [memberEmail, setEmail] = useState('')

    const toggleOtpVerification = () => {
        setOtpVerification(!otpVerification)
    }
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

    const reset = () => {
        setOtpVerification(false)
        props.reset()
    }

    const handleForgotPwd = (e) => {
        e.preventDefault()
        handleSubmit()
        if (isValid) {
            //setLoading(true)
            Spn.Show();
            forgotPassword({ email: values.email })
                .then((res) => {
                    if (res.success === 0) {
                        //ToastsStore.error(res.message)
                        Tst.Error(res.message)
                        setEmail('')
                        //setLoading(false)
                        Spn.Hide()
                    } else {
                        //setLoading(false)
                        Spn.Hide()
                        setEmail(values.email)
                        props.resetForm()
                        toggleOtpVerification()
                        //ToastsStore.info(res.message)
                        Tst.Show(res.message)
                    }
                })
                .catch((error) => {
                    console.log(error)
                    //setLoading(false)
                    Spn.Hide()
                    setEmail('')
                    //ToastsStore.error('Something went wrong!')
                    Tst.Error('Something went wrong!')
                })
        }
    }

    if (props.show) {
        document.title = 'Forgot Password - ' + window.seoTagLine;
    }

    return (
        <>
            {Tst.Obj}
            {Spn.Obj}

            <Modal
                isOpen={props.show}
                toggle={props.clicked}
                centered
                size="lg"
                className="signin"
            >
                <ForgotPasswordWrapper>
                    {props.show ? (
                        <section className="ptb-50 container-padding">
                            <div
                                className="cancelmain text-bold cursor-pointer"
                                onClick={(e) => {
                                    props.resetForm()
                                    props.clicked(e)
                                }}
                            >
                                X
                            </div>
                            <h4 className="flex-container text-bold mt-30 mb-10 flex-item">
                                Forgot Password
                            </h4>
                            <div className="justify-content-center row mlr-0 mtb-20">
                                <div className="mb-20 col-12 col-sm-12 col-md-9 col-lg-10 col-xl-10">
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
                            <div className="flex-container">
                                <Button
                                    className="button mt-20"
                                    name="GET OTP"
                                    clicked={handleForgotPwd}
                                    disabled={isLoading}
                                />
                            </div>
                        </section>
                    ) : null}
                </ForgotPasswordWrapper>
            </Modal>
            <OtpVerification
                show={otpVerification}
                clicked={toggleOtpVerification}
                reset={reset}
                memberEmail={memberEmail || ''}
            />
        </>
    )
}

export default compose(withRouter, enhancer)(ForgotPassword)
