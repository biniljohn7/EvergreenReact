import React, { useState, useEffect } from 'react'
import Wrapper from './benefit.style.js'
import { viewBenefit } from '../../api/benefit'
import { ToastsStore } from 'react-toasts'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import AuthActions from '../../redux/auth/actions'
import { Spinner } from 'reactstrap'

const { logout } = AuthActions

const TEXT_LENGTH = window.innerWidth >= 768 ? 20 : 10

const Benefit = (props) => {
  const [benefit, setBenefit] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [contactAvailable, setContact] = useState(false)

  useEffect(() => {
    if (
      !props.match.params ||
      !props.match.params.categoryId ||
      !props.match.params.benefitId
    ) {
      props.history.replace({
        pathname: '/benefits',
      })
    } else {
      viewBenefit({
        categoryId: props.match.params.categoryId,
        benefitId: props.match.params.benefitId,
      })
        .then((res) => {
          if (res.success === 1) {
            setBenefit(res.data)
            if (res.data.providerEmail || res.data.providerContactNo) {
              setContact(true)
            }
            setLoading(false)
          } else {
            setLoading(false)
            ToastsStore.error(res.message)
          }
        })
        .catch((err) => {
          console.error(err)

          if (err.response) {
            if (err.response.status === 401) {
              props.logout()
              ToastsStore.error('Session Expire! Please login again.')
              setTimeout(() => props.history.replace('/signin'), 800)
            } else {
              setLoading(false)
              ToastsStore.error('Something went wrong!')
            }
          } else if (err.request) {
            setLoading(false)
            ToastsStore.error('Unable to connect to server!')
          } else {
            setLoading(false)
            ToastsStore.error('Something went wrong!')
          }
        })
    }
  }, [])

  document.title = 'Benefits | Benefit Details - ' + window.seoTagLine;

  const copyToClipboard = () => {
    const el = document.createElement('textarea')
    el.value = benefit.code
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    ToastsStore.info('Code copied!')
  }

  return (
    <Wrapper>
      {isLoading ? (
        <div className="text-center custom-spinner mt-20">
          <Spinner color="danger" />
        </div>
      ) : (
        <React.Fragment>
          <div className="red pt-20 bread-nav">
            <Breadcrumb className="container">
              <BreadcrumbItem>
                <Link to="/benefits" className="text-white">
                  Benefits
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <Link
                  to={{
                    pathname:
                      '/benefits/' + (benefit ? benefit.categoryName : '').replaceAll('/', ' '),
                    state: {
                      categoryId: benefit ? benefit.categoryId : '',
                      name: (benefit ? benefit.categoryName : ''),
                    },
                  }}
                  className="text-white"
                >
                  {benefit ? benefit.categoryName : ''}
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem active className="text-white">
                {benefit ? (benefit.shortDetails.substr(0, TEXT_LENGTH) + '...') : ''}
              </BreadcrumbItem>
            </Breadcrumb>
          </div>

          <div className="container ptb-50">
            {!benefit ? (
              <div className="mt-50 fs-20 text-center text-bold text-danger">
                No record found!
              </div>
            ) : (
              <React.Fragment>
                <section className=" ben-det-bnr ">
                  <div className="ben-dis"><span>{benefit.discount}</span>{' '} OFF</div>
                  <p>{benefit.shortDetails}</p>
                  <p className="terms-app">Terms & Conditions Applied*</p>
                </section>
                {/* <div className="red--text text-bold mt-10 text-right">
                  <span className="cursor-pointer">Report</span>
                </div> */}
                <section className="row mt-30">
                  <div className="col-3 col-sm-3 col-md-1 col-lg-1 col-xl-1 pr-0">
                    <img
                      src={benefit.companyLogo}
                      className="border rounded-circle company-logo"
                    />
                  </div>
                  <div
                    // className={
                    //   benefit.code
                    //     ? 'col-9 col-sm-9 col-md-7 col-lg-7 col-xl-7 pl-0' +
                    //       (window.innerWidth === 768 ? ' pl-10' : '')
                    //     : 'col-9 col-sm-9 col-md-11 col-lg-11 col-xl-11 pl-0'
                    // }
                    className={
                      'col-9 col-sm-9 col-md-7 col-lg-7 col-xl-7 pl-0' +
                      (window.innerWidth === 768 ? ' pl-10' : '')
                    }
                  >
                    <span className="align-top text-bold">
                      {benefit.companyName}
                    </span>
                    {benefit.address && (
                      <div className="text-secondary">{benefit.address}</div>
                    )}
                  </div>
                  {benefit.code && (
                    <div
                      className={
                        'col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4' +
                        (window.innerWidth < 768 ? ' mt-15' : '')
                      }
                    >
                      <div
                        className="coupon coupon-box plr-10 ptb-7 text-center cursor-pointer"
                        onClick={copyToClipboard}
                      >
                        {benefit.code}
                      </div>
                      <span className="float-right text-secondary mt-3">
                        Tap to copy
                      </span>
                    </div>
                  )}
                </section>
                <section className="row mt-30">
                  <div
                    className={
                      'col-12 col-sm-12 ' +
                      (contactAvailable
                        ? 'col-md-8 col-lg-8 col-xl-8'
                        : 'col-md-12 col-lg-12 col-xl-12')
                    }
                  >
                    <h5 className="text-bold">{benefit.shortDetails}</h5>
                    <p className="mt-10 text-secondary text-justify break-description">
                      {benefit.details}
                    </p>
                  </div>
                  {contactAvailable && (
                    <div
                      className={
                        'col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4' +
                        (window.innerWidth < 768 ? ' mt-20' : '')
                      }
                    >
                      <label className="text-bold mb-10">
                        Contact Provider
                      </label>
                      <div className="pa-10 text-secondary cus-pro-box ash">
                        {benefit.providerEmail && (
                          <div>
                            <i
                              className="fa fa-envelope fs-14"
                              aria-hidden="true"
                            ></i>
                            <span className="ml-10">
                              {benefit.providerEmail}
                            </span>
                          </div>
                        )}
                        {benefit.providerContactNo && (
                          <div>
                            <i
                              className="fa fa-phone-square fs-14 mt-17"
                              aria-hidden="true"
                            ></i>
                            <span className="ml-10">
                              {benefit.phoneCode +
                                ' ' +
                                benefit.providerContactNo}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </section>
              </React.Fragment>
            )}
          </div>
        </React.Fragment>
      )}
    </Wrapper>
  )
}

// export default Benefit
export default connect(null, { logout })(Benefit)
