import React, { useState } from 'react'
import ForgotPasswordWrapper from './pwdFlow.style'
import Input from '../../UI/input/input'
import Button from '../../UI/button/button'
import { Modal } from 'reactstrap'
import { compose } from 'redux'
import { resetPwdValidation as enhancer } from './enhancer.js'
//import { ToastsStore } from 'react-toasts'
import { resetPassword } from '../../api/commonAPI'

import Toast from "../../UI/Toast/Toast";
import Spinner from "../../UI/Spinner/Spinner";

const ResetPassword = (props) => {
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
    const [passwordType, setPasswordType] = useState('password')
    const [isLoading, setLoading] = useState(false)

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

    const handleResetPwd = (e) => {
        Spn.Show()
        e.preventDefault()
        handleSubmit()
        if (isValid) {
            resetPassword({
                email: props.memberEmail,
                otp: props.otp,
                password: values.password,
            })
                .then((res) => {
                    if (res.success === 0) {
                        //ToastsStore.error(res.message)
                        Tst.Error(res.message)
                        //setLoading(false)
                        Spn.Hide()
                    } else {
                        //setLoading(false)
                        Spn.Hide()
                        props.resetForm()
                        props.reset()
                        //ToastsStore.info(res.message)
                        Tst.Show(res.message)
                    }
                })
                .catch((error) => {
                    //setLoading(false)
                    Spn.Hide()
                    //ToastsStore.error('Something went wrong!')
                    Tst.Error('Something went wrong!')
                })
        }
    }

    if (props.show) {
        document.title = 'Password Reset - ' + window.seoTagLine;
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
                                Reset Password
                            </h4>
                            <div className="justify-content-center row mtb-20">
                                <div className="mb-20 col-12 col-sm-12 col-md-9 col-lg-10 col-xl-10">
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
                                <div className="mb-20 col-12 col-sm-12 col-md-9 col-lg-10 col-xl-10">
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
                            <div className="flex-container">
                                <Button
                                    className="button mt-20"
                                    name="RESET"
                                    clicked={handleResetPwd}
                                    disabled={isLoading}
                                />
                            </div>
                        </section>
                    ) : null}
                </ForgotPasswordWrapper>
            </Modal>
        </>
    )
}

export default compose(enhancer)(ResetPassword)
