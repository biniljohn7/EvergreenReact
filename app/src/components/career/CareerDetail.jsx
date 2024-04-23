import React, { useState, useEffect } from 'react'
import Wrapper from './career.style.js'
import { viewCareer } from '../../api/careerAPI'
import { ToastsStore } from 'react-toasts'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { Link } from 'react-router-dom'
// import Button from '../../UI/button/button'
// import CareerImage from '../../assets/images/career_dummy_image.png'
import { Spinner } from 'reactstrap'

const TEXT_LENGTH = window.innerWidth >= 768 ? 20 : 10

const Career = (props) => {
  const [career, setCareer] = useState(null)
  const [isLoading, setLoading] = useState(true)
  // const [startDate, setStartDate] = useState(null)
  // const [endDate, setEndDate] = useState(null)

  useEffect(() => {
    if (!props.location.state || !props.location.state.careerId) {
      props.history.replace({
        pathname: '/careers',
      })
    } else {
      viewCareer(props.location.state.careerId)
        .then((res) => {
          if (res.success === 1) {
            // setStartDate(new Date(res.data.startDate).toString().split(' '))
            // setEndDate(new Date(res.data.endDate).toString().split(' '))
            setCareer(res.data)
            setLoading(false)
          } else {
            setLoading(false)
            ToastsStore.error(res.message)
          }
        })
        .catch((err) => {
          console.error(err)
          setLoading(false)
          ToastsStore.error('Something went wrong!')
        })
    }
  }, [])

  return (
    <Wrapper>
      {isLoading ? (
        <div className="custom-spinner">
          <Spinner color="danger" />
        </div>
      ) : (
        <React.Fragment>
          <div className="red pt-20 careers-bc-head">
            <Breadcrumb className="site-spacing">
              <BreadcrumbItem>
                <Link to="/careers" className="text-white">
                  Careers
                </Link>
              </BreadcrumbItem>
              <BreadcrumbItem active className="text-white">
                {career.title.substr(0, TEXT_LENGTH) + '...'}
              </BreadcrumbItem>
            </Breadcrumb>
          </div>

          <div className="site-spacing ptb-50">
            {!career ? (
              <div className="mt-50 fs-20 text-center text-bold text-danger">
                No record found!
              </div>
            ) : (
              <React.Fragment>
                <section>
                  <img
                    src={career.image}
                    // src={CareerImage}
                    className="full-image"
                    alt={career.title.substr(0, 10) + '...'}
                  />
                </section>
                <section className="row mt-30">
                  <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                    <h5 className="text-bold">{career.title}</h5>

                    {career.address && (
                      <div className="mt-5">{career.address}</div>
                    )}

                    {career.description && (
                      <p className="mt-20 text-secondary text-justify break-description">
                        {career.description}
                      </p>
                    )}
                  </div>
                  {/* <div
                    className={
                      'col-12 col-sm-12 col-md-4 col-lg-3 col-xl-2' +
                      (window.innerWidth < 768 ? ' mt-20' : '')
                    }
                  >
                    <Button name="APPLY TO JOB" className="wp-100" /> */}

                  {/* <div className="mt-15">
                        From:{' '}
                        <span className="text-secondary">
                          {startDate[0] +
                            ', ' +
                            startDate[1] +
                            ' ' +
                            startDate[2] +
                            ', ' +
                            startDate[3] +
                            ' - ' +
                            startDate[4]}
                        </span>
                      </div> */}

                  {/* <div className="">
                        To:{' '}
                        <span className="text-secondary">
                          {endDate[0] +
                            ', ' +
                            endDate[1] +
                            ' ' +
                            endDate[2] +
                            ', ' +
                            endDate[3] +
                            ' - ' +
                            endDate[4]}
                        </span>
                      </div> */}

                  {/* <React.Fragment> */}
                  {/* <label className="mt-15 text-bold">
                          {career.place}
                        </label> */}
                  {/* {career.address && (
                        <div className="mt-15"> */}
                  {/* {career.addressLine1 +
                            (career.addressLine2
                              ? ', ' + career.addressLine2
                              : '') +
                            ', ' +
                            career.city +
                            ', ' +
                            career.state +
                            ', ' +
                            career.country +
                            ' - ' +
                            career.zipCode} */}
                  {/* {career.address}
                        </div>
                      )}
                    </React.Fragment>
                  </div> */}
                </section>
              </React.Fragment>
            )}
          </div>
        </React.Fragment>
      )}
    </Wrapper>
  )
}

export default Career
