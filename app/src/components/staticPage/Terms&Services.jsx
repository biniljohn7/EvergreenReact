import React, { useState, useEffect } from 'react'
import { PAGE_ID } from '../../helper/constant'
import { getPage } from '../../api/staticPage'
import ToastsStore from 'react-toasts'
import { Spinner } from 'reactstrap'

const TermsAndService = (props) => {
  const [content, setContent] = useState(null)
  const [isLoading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    getPage(PAGE_ID.terms)
      .then((res) => {
        if (res.success === 1) {
          setContent(res.data)
        }
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        ToastsStore.error('Something went wrong!')
        console.error(error)
      })
  }, [])

  return isLoading ? (
    <div className="custom-spinner">
      <Spinner color="danger" />
    </div>
  ) : (
    <section
      className={
        (props.isMobile ? ' border plr-15 ptb-30' : '') +
        (props.fromRoute ? ' site-spacing ptb-50' : '')
      }
    >
      {/* <h4 className="text-justify text-bold">{content.title}</h4> */}
      <div
        className="text-justify"
        dangerouslySetInnerHTML={{ __html: content.content }}
      />
    </section>
  )
}

export default TermsAndService
