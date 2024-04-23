import React, { useState } from 'react'
import ForgotPasswordWrapper from './pwdFlow.style'
import Input from '../../UI/input/input'
import Button from '../../UI/button/button'
import { Modal } from 'reactstrap'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { otpValidation as enhancer } from './enhancer.js'
import { ToastsStore } from 'react-toasts'
import ResetPassword from './ResetPassword'
import { verifyOTP } from '../../api/commonAPI'

const OtpVerification = (props) => {
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
  const [resetPassword, setResetPassword] = useState(false)
  const [isLoading, setLoading] = useState(false)

  const toggleResetPassword = () => {
    setResetPassword(!resetPassword)
  }

  const reset = () => {
    setResetPassword(false)
    props.reset()
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

  const otpHandler = (e) => {
    e.preventDefault()
    handleSubmit()
    if (isValid) {
      verifyOTP({
        otp: values.otp,
        email: props.memberEmail,
      })
        .then((res) => {
          if (res.success === 0) {
            ToastsStore.error(res.message)
            setLoading(false)
          } else {
            setLoading(false)
            props.resetForm()
            setResetPassword(!resetPassword)
            ToastsStore.info(res.message)
          }
        })
        .catch((error) => {
          console.log(error)
          setLoading(false)
          ToastsStore.error('Something went wrong!')
        })
    }
  }

  return (
    <>
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
                Verify OTP
              </h4>
              <div className="justify-content-center row mtb-20">
                <div className="mb-20 col-12 col-sm-12 col-md-9 col-lg-10 col-xl-10">
                  <Input
                    label="OTP"
                    type="text"
                    placeholder="OTP"
                    id="otp"
                    fontSize={'fs-16 text-dark'}
                    contentFontSize={'fs-14'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.otp || ''}
                  />
                  <Error field="otp" />
                </div>
              </div>
              <div className="flex-container">
                <Button
                  className="button mt-20"
                  name="VERIFY"
                  clicked={otpHandler}
                  disabled={isLoading}
                />
              </div>
            </section>
          ) : null}
        </ForgotPasswordWrapper>
      </Modal>
      <ResetPassword
        show={resetPassword}
        clicked={toggleResetPassword}
        reset={reset}
        memberEmail={props.memberEmail}
      />
    </>
  )
}

export default compose(withRouter, enhancer)(OtpVerification)
