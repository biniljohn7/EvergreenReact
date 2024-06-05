import { ToastsStore } from 'react-toasts'
import enhancer from './contactUsEnhancer'
import React, { useEffect, useState } from 'react'
import FooterWrapper from './footer.style'
import Input from '../../UI/input/input'
import Textarea from '../../UI/textarea/textarea'
import { contactUs as contactAPI } from '../../api/commonAPI'
import { PAGE_ID } from '../../helper/constant'
import { getPage } from '../../api/staticPage'

import Spinner from '../../UI/Spinner/Spinner'
import Toast from '../../UI/Toast/Toast'

const ContactUs = (props) => {
  const [content, setContent] = useState(null)
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

  useEffect(() => {
    setLoading(true)
    getPage(PAGE_ID.contactus)
      .then((res) => {
        if (res.success === 1) {
          setContent(decodeHTMLEntities(res.data.content))
        }
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        ToastsStore.error('Something went wrong!')
        console.log(error)
      })
  }, [])

  if (props.isFooter != 1) {
    document.title = 'Contact Us - ' + window.seoTagLine;
  }

  const decodeHTMLEntities = (encodedString) => {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = encodedString;
    return textArea.value;
  }

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

  const Tst = Toast();
  const Spn = Spinner();

  const handleContactUs = (e) => {
    e.preventDefault()
    handleSubmit()
    if (isValid) {

      Spn.Show();
      contactAPI({
        name: values.contact_name,
        email: values.contact_email,
        description: values.contact_msg,
      })
        .then((res) => {
          if (res.success === 0) {
            Tst.Error(res.message)
          } else {
            Tst.Success(res.message)
          }
          props.resetForm();
        })
        .catch((err) => {
          Tst.Error('Something went wrong! Please try again later.')
        })
        .finally(() => {
          Spn.Hide();
        });
    }
  }

  return (
    <>
      {Tst.Obj}
      {Spn.Obj}
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
          <form>
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
          {
            props.isFooter != 1 && (
              <div
                className="text-justify mt-20 "
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )
          }
        </div>
      </FooterWrapper>
    </>
  )
}

export default enhancer(ContactUs)
