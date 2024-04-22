import { ToastsStore } from 'react-toasts'
import enhancer from './contactUsEnhancer'
import React, { useState } from 'react'
import FooterWrapper from './footer.style'
import Input from '../../UI/input/input'
import Textarea from '../../UI/textarea/textarea'
import { contactUs as contactAPI } from '../../api/commonAPI'

const ContactUs = (props) => {
  const [loading, setLoading] = useState(false)
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

  const Error = (fields) => {
    const field1 = fields.field
    if ((errors[field1] && touched[field1]) || submitCount > 0) {
      return (
        <div className={props.isFooter ? 'text-white' : 'error-msg'}>
          {errors[field1]}
        </div>
      )
    } else {
      return <div />
    }
  }

  const handleContactUs = (e) => {
    e.preventDefault()
    handleSubmit()
    if (isValid) {
      setLoading(true)
      contactAPI({
        name: values.contact_name,
        email: values.contact_email,
        description: values.contact_msg,
      })
        .then((res) => {
          if (res.success === 0) {
            ToastsStore.error(res.message)
          } else {
            ToastsStore.info(res.message)
          }
          setLoading(false)
          props.resetForm()
        })
        .catch((err) => {
          console.error(err)
          setLoading(false)
          props.resetForm()
          ToastsStore.error('Something went wrong! Please try again later.')
        })
    }
  }

  return (
    <FooterWrapper>
      <div className={!props.isFooter ? 'ptb-50 site-spacing' : ''}>
        <h4 className={'text-bold ' + (props.isFooter ? 'white--text' : '')}>
          Contact Us
          <div className="contact-horizontal-line" />
        </h4>
        <label
          className={
            props.isFooter === 1 ? 'sub-text mt-30 mb-40' : 'mt-20 mb-30'
          }
        >
          Questions? Comments? We’d love to hear from you.
        </label>
        <form className={window.innerWidth < 768 ? 'wp-100' : 'wp-80'}>
          <div className="mb-20">
            <Input
              label="Name"
              type="text"
              placeholder="Name"
              id="contact_name"
              fontSize={'fs-16' + (!props.isFooter ? ' text-dark' : '')}
              contentFontSize={'fs-14'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.contact_name || ''}
            />
            <Error field="contact_name" />
          </div>
          <div className="mb-20">
            <Input
              label="Email"
              type="email"
              placeholder="Email"
              id="contact_email"
              fontSize={'fs-16' + (!props.isFooter ? ' text-dark' : '')}
              contentFontSize="fs-14"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.contact_email || ''}
            />
            <Error field="contact_email" />
          </div>
          <div className="mb-20">
            <Textarea
              label="Message"
              placeholder="Type here ..."
              id="contact_msg"
              rows="4"
              fontSize={'fs-16' + (!props.isFooter ? ' text-dark' : '')}
              contentFontSize="fs-14 !important"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.contact_msg || ''}
            />
            <Error field="contact_msg" />
          </div>
          <button
            type="button"
            className={
              'btn btn-rounded border-radius-41 text-bold plr-25 ptb-7 ' +
              (props.isFooter === 1 ? 'bg-white red--text' : 'red text-white')
            }
            onClick={handleContactUs}
            disabled={loading}
          >
            SUBMIT
          </button>
        </form>
      </div>
    </FooterWrapper>
  )
}

export default enhancer(ContactUs)
