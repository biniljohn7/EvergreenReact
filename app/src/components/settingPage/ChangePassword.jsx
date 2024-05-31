import React, { useState } from 'react'
import { changePwd as enhancer } from './enhancer'
import Input from '../../UI/input/input'
import Wrapper from './common.style'
import { changePassword } from '../../api/commonAPI'
import { ToastsStore } from 'react-toasts'

const ChangePassword = (props) => {
  const {
    values,
    handleChange,
    handleBlur,
    errors,
    touched,
    submitCount,
    handleSubmit,
    isValid,
  } = props
  const [passwordType, setPasswordType] = useState('password')
  const [loading, setLoading] = useState(false)

  const Error = (props) => {
    const field1 = props.field
    if ((errors[field1] && touched[field1]) || submitCount > 0) {
      return (
        <div className={props.class ? props.class : 'error-msg'}>
          {errors[field1]}
        </div>
      )
    } else {
      return <div />
    }
  }

  const handleChangePwd = (e) => {
    e.preventDefault()
    handleSubmit()
    if (isValid) {
      setLoading(true)
      changePassword({
        currentPassword: values.oldPassword,
        newPassword: values.newPassword,
      })
        .then((res) => {
          if (res.success === 0) {
            ToastsStore.error(res.message)
          } else {
            ToastsStore.info(res.message)
          }
        })
        .catch((err) => {
          console.error(err)
          ToastsStore.error('Something went wrong!')
        })
        .finally(() => {
          props.resetForm()
          setLoading(false)
        })
    }
  }

  document.title = 'Set Password - ' + window.seoTagLine;

  return (
    <Wrapper>
      <section className={props.isMobile ? ' border plr-15 ptb-30' : ''}>
        <h3 className="text-bold">Change Password</h3>
        <form
          className={'mt-20 ' + (window.innerWidth < 768 ? 'wp-100' : 'wp-70')}
        >
          <div className="mb-20">
            <Input
              label="Current Password"
              type="password"
              placeholder="Current Password"
              id="oldPassword"
              fontSize={'fs-16 text-dark'}
              contentFontSize="fs-14"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.oldPassword || ''}
            />
            <Error field="oldPassword" />
          </div>
          <div className="mb-20">
            <div className="position-relative">
              <Input
                label="New Password"
                type={passwordType}
                placeholder="New Password"
                id="newPassword"
                fontSize={'fs-16 text-dark'}
                contentFontSize={'fs-14'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.newPassword || ''}
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
            <Error field="newPassword" />
          </div>
          <div className="mb-20">
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
          <button
            type="button"
            className="btn btn-rounded button plr-30 ptb-10"
            onClick={handleChangePwd}
            disabled={loading}
          >
            SAVE
          </button>
        </form>
      </section>
    </Wrapper>
  )
}

export default enhancer(ChangePassword)
