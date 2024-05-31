import React, { useState, useEffect } from 'react'
// import Image from '../../assets/images/landing.png'
import { PAGE_ID } from '../../helper/constant'
import { getPage } from '../../api/staticPage'
import ToastsStore from 'react-toasts'

const AboutUs = (props) => {
  const [content, setContent] = useState(null)
  const [isLoading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    getPage(PAGE_ID.aboutUs)
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

  document.title = 'About Us - ' + window.seoTagLine;
  
  const decodeHTMLEntities=(encodedString) =>{
    const textArea = document.createElement('textarea');
    textArea.innerHTML = encodedString;
    return textArea.value;
  }

  return isLoading ? (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  ) : (
    <section
      className={
        (window.innerWidth < 768 ? 'pa-20 ' : 'pa-40') +
        (props.fromRoute ? ' site-spacing ptb-50' : '')
      }
    >
      {/* <div className="text-center">
        <img src={Image} alt={SITE_NAME} />
      </div> */}
      {/* <h4 className="text-justify text-bold">{content.title}</h4> */}
      <div
        className="text-justify mt-20"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </section>
  )
}

export default AboutUs
