import React, { useState, useEffect } from 'react'
import { contactUs as enhancer } from './enhancer'
import Input from '../../UI/input/input'
import Textarea from '../../UI/textarea/textarea'
import Select from 'react-select'
import { getContactUsQue, contactUs as addQuery } from '../../api/memberAPI'
import { Spinner } from 'reactstrap'
import { ToastsStore } from 'react-toasts'
import { compose } from 'redux'
import AuthActions from '../../redux/auth/actions'
import { connect } from 'react-redux'
const { logout } = AuthActions

const ContactUs = (props) => {
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

  const [initialLoading, setInitialLoading] = useState(true)
  const [processing, setProcessing] = useState(false)
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    getContactUsQue()
      .then((res) => {
        setQuestions(res.data || [])
        setInitialLoading(false)
      })
      .catch((err) => {
        console.error(err)
        if (err.response && err.response.status === 401) {
          props.logout()
          ToastsStore.error('Session Expire! Please login again.')
          setTimeout(() => props.history.push('/signin'), 800)
        } else {
          ToastsStore.error('Something Went Wrong!')
          // props.history.push('/home')
        }
      })
  }, [])

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

  const handleContactUs = (e) => {
    e.preventDefault()
    handleSubmit()
    if (isValid) {
      setProcessing(true)
      addQuery({
        contactUsQuestionId: values.question,
        name: values.name,
        subject: values.subject,
        description: values.message,
      })
        .then((res) => {
          if (res.success === 0) {
            ToastsStore.error(res.message)
          } else {
            ToastsStore.info(res.message)
          }
          setProcessing(false)
          props.resetForm()
        })
        .catch((err) => {
          console.error(err)

          if (err.response && err.response.status === 401) {
            props.logout()
            ToastsStore.error('Session Expire! Please login again.')
            setTimeout(() => props.history.push('/signin'), 800)
          } else {
            setProcessing(false)
            props.resetForm()
            ToastsStore.error('Something Went Wrong!')
          }
        })
    }
  }

  document.title = 'Contact Us - ' + window.seoTagLine;

  return initialLoading ? (
    <div className="custom-spinner">
      <Spinner color="danger" />
    </div>
  ) : (
    <section className={props.isMobile ? ' border plr-15 ptb-30' : ''}>
      <h3 className="text-bold">Contact Us</h3>
      <form
        className={'mt-20 ' + (window.innerWidth < 768 ? 'wp-100' : 'wp-70')}
      >
        <div className="mb-20">
          <label className="fs-16 mb-10">How can we help you?</label>
          <Select
            id="question"
            placeholder="Select One"
            options={questions}
            getOptionLabel={(op) => op.name}
            getOptionValue={(op) => op.id}
            styles={{
              control: (value) => {
                return {
                  ...value,
                  minHeight: '44px',
                }
              },
              placeholder: (defaultStyles) => {
                return {
                  ...defaultStyles,
                  paddingTop: '10px',
                  paddingBottom: '10px',
                  fontSize: '14px',
                }
              },
            }}
            onChange={(selectedOp) => {
              props.setFieldValue('question', selectedOp.id) 
            }}
            value={questions.find(option => option.id === values.question) || null}
            onBlur={handleBlur}
          />
          <Error field="question" />
        </div>
        <div className="mb-20">
          <Input
            label="Name"
            type="text"
            placeholder="Name"
            id="name"
            fontSize={'fs-16 text-dark'}
            contentFontSize="fs-14"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name || ''}
          />
          <Error field="name" />
        </div>
        <div className="mb-20">
          <Input
            label="Subject"
            type="text"
            placeholder="Subject"
            id="subject"
            fontSize={'fs-16 text-dark'}
            contentFontSize="fs-14"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.subject || ''}
          />
          <Error field="subject" />
        </div>
        <div className="mb-20">
          <Textarea
            label="Message"
            placeholder="Message"
            id="message"
            rows="4"
            fontSize="fs-16 text-dark"
            contentFontSize="fs-14 !important"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.message || ''}
          />
          <Error field="message" />
        </div>
        <button
          type="button"
          className="btn btn-rounded button plr-30 ptb-10"
          onClick={handleContactUs}
          disabled={processing}
        >
          SAVE
        </button>
      </form>
    </section>
  )
}

export default compose(enhancer, connect(null, { logout }))(ContactUs)
