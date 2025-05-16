import React, { useState, useEffect } from 'react'
import Wrapper from './advocacy.style.js'
import { viewAdvocacy } from '../../api/advocacyApi'
import Pdf from '../../assets/images/pdf.png'
import { ToastsStore } from 'react-toasts'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import Button from '../../UI/button/button'
import { Spinner } from 'reactstrap'
// import TimeAgo from 'javascript-time-ago'
// import en from 'javascript-time-ago/locale/en'
// import ReactTimeAgo from 'react-time-ago'
import Modal from './TakeAction'

const TEXT_LENGTH = window.innerWidth >= 768 ? 20 : 10
// console.log(en);
// TimeAgo.addDefaultLocale(en)
// TimeAgo.addLocale(en)

const AdvocacyDetails = (props) => {
  const [advocacy, setAdvocacy] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    if (
      !props.location.state ||
      !props.location.state.advocacyId ||
      !props.location.state.advocacyType
    ) {
      props.history.replace({
        pathname: '/advocacy',
      })
    } else {
      viewAdvocacy(
        props.location.state.advocacyId,
        props.location.state.advocacyType,
      )
        .then((res) => {
          if (res.success === 1) {
            setAdvocacy(res.data)
            setLoading(false)
          } else {
            setLoading(false)
            ToastsStore.error(res.message)
          }
        })
        .catch((err) => {
          // console.error(err)
          // setLoading(false)
          // ToastsStore.error('Something went wrong!')
        })
    }
  }, [])

  document.title = 'Advocacy | Advocacy Details - ' + window.seoTagLine;

  return (
    <Wrapper>
      {isLoading ? (
        <div className="custom-spinner">
          <Spinner color="danger" />
        </div>
      ) : (
        <React.Fragment>
          <div className="red pt-20 bread-nav">
            <Breadcrumb className="site-spacing">
              <BreadcrumbItem>
                <Link to="/advocacy" className="text-white">
                  Advocacy
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link
                  to={{
                    pathname: '/advocacy',
                    state: {
                      advocacyType: props.location.state.advocacyType,
                    },
                  }}
                  className="text-white"
                >
                  {props.location.state.advocacyType}
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem active className="text-white">
                {advocacy.title.substr(0, TEXT_LENGTH) + '...'}
              </BreadcrumbItem>
            </Breadcrumb>
          </div>

          <div className="site-spacing ptb-50">
            {!advocacy ? (
              <div className="mt-50 fs-20 text-center text-bold text-danger">
                No record found!
              </div>
            ) : (
              <React.Fragment>
                <section className="mt-30">
                  <label className="text-secondary">
                    <span className="fa fa-circle mr-5"></span>
                    {advocacy.recipientName}
                  </label>
                  <span className="float-right red--text">&nbsp;
                    <i className="fa fa-clock-o mr-5" aria-hidden="true"></i>
                    {/* <ReactTimeAgo
                      date={new Date(advocacy.createdAt)}
                      locale="en-US"
                    /> */}
                  </span>
                </section>
                <section className="row mt-20">
                  <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-9">
                    <h5 className="text-bold mb-5">{advocacy.title}</h5>
                    {/* <div className="">
                      <img src={Pdf} alt="pdf" />
                      <span>
                        <a
                          href={advocacy.pdf}
                          target="_blank"
                          rel="noreferrer"
                          className="pl-5 red--text"
                        >
                          View Advocacy Letter
                        </a>
                      </span>
                    </div> */}
                    {advocacy.image ? (<img
                      src={advocacy.image}
                      alt={advocacy.title.substr(0, 10) + '...'}
                    />) : null}
                    <p className="mt-25 text-secondary text-justify">
                      {advocacy.description}
                    </p>
                  </div>
                  <div
                    className={
                      'col-12 col-sm-12 col-md-4 col-lg-4 col-xl-3' +
                      (window.innerWidth < 768 ? ' mt-20' : '')
                    }
                  >
                    <Button
                      name="TAKE ACTION"
                      className="wp-100"
                      disabled={
                        props.location.state.advocacyType === 'Submitted'
                      }
                      clicked={() => setOpen(!isOpen)}
                    />
                  </div>
                </section>
              </React.Fragment>
            )}
          </div>

          {isOpen && (
            <Modal
              isOpen={isOpen}
              toggle={() => setOpen(!isOpen)}
              advocacy={{
                title: advocacy.title,
                description: advocacy.description,
                advocacyId: advocacy.advocacyId,
              }}
              onSuccess={() => {
                props.history.push('/advocacy', {
                  advocacyType: 'Submitted',
                })
              }}
            />
          )}
        </React.Fragment>
      )}
    </Wrapper>
  )
}

export default AdvocacyDetails
