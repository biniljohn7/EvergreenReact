import React, { useState, useEffect } from 'react'
import Wrapper from './benefit.style.js'
import { listBenefit } from '../../api/benefit'
import { ToastsStore } from 'react-toasts'
import Pagination from '../../UI/pagination/pagination'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import { BENEFIT_LOCATION } from '../../helper/constant'
import Select from 'react-select'
import AuthActions from '../../redux/auth/actions'
import { connect } from 'react-redux'
import { Spinner } from 'reactstrap'

const { logout } = AuthActions
const COL_NO = window.innerWidth < 768 ? 1 : 2
const COL_WIDTH = window.innerWidth < 768 ? '100%' : '50%'
const LIMIT = 10

const Benefit = (props) => {
  const [benefit, setBenefit] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [currentPage, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [type, setType] = useState(BENEFIT_LOCATION[0])

  useEffect(() => {
    if (
      !props.location.state ||
      !props.location.state.categoryId ||
      !props.location.state.name
    ) {
      props.history.replace({
        pathname: '/benefits',
      })
    } else {
      setLoading(true)
      listBenefit({
        categoryId: props.location.state.categoryId,
        page: currentPage,
        type: type.value,
      })
        .then((res) => {
          if (res.success === 1) {
            setBenefit(res.data.list || [])
            setTotalPage(res.data.totalPages)
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
  }, [currentPage, type])

  return (
    <Wrapper col={COL_NO} width={COL_WIDTH}>
      <div className="red bread-nav pt-20">
        <Breadcrumb className="container">
          <BreadcrumbItem>
            <Link to="/benefits" className="text-white">
              Benefits
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem active className="text-white">
            {props.location.state ? (props.location.state.name || '') : ''}
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div className="benefits-section inner-benefits inner-section">
        <div className="head-box">
            <div className="container">
                <h2>{props.location.state ? (props.location.state.name || '') : ''}</h2>
            </div>
        </div>


        <div className="container">
        <div
          className={'ben-filter filter ' + (window.innerWidth >= 768 ? 'wp-20' : 'wp-60')}
        >
          <Select
            options={BENEFIT_LOCATION}
            onChange={(op) => setType(op)}
            value={type}
          />
        </div>
        {isLoading ? (
          <div className="text-center mtp-10">
            <Spinner color="danger" />
          </div>
        ) : (
          <React.Fragment>
            {benefit.length > 0 ? (
              <div className="benefit-box">
                <div className="container">
                  {benefit.map((el) => {
                    return (
                      <div
                        className="benefit-item cursor-pointer"
                        key={el.benefitId}
                        onClick={(e) =>
                          props.history.push(
                            `/benefits/${el.categoryName.replaceAll('/', '')}/${
                              el.categoryId
                            }/${el.benefitId}`,
                          )
                        }
                      >
                        <div className="per">{el.discount}{' '} OFF</div>
                        <div className="title">{el.shortDetails}</div>
                        <div className="title">Terms & Conditions Applied*</div>
                        
                        
                      </div>
                    )
                  })}
                </div>
              </div>
            ) : (
              <div className="mt-100 fs-20 text-center text-danger">
                No record found!
              </div>
            )}
            {benefit.length > 0 && (
              <div className="pagination">
                <Pagination
                  activePage={currentPage}
                  length={totalPage * LIMIT}
                  count={LIMIT}
                  handler={(pageNumber) => setPage(pageNumber)}
                />
              </div>
            )}
          </React.Fragment>
        )}
        </div>
      </div>
    </Wrapper>
  )
}

// export default Benefit
export default connect(null, { logout })(Benefit)
