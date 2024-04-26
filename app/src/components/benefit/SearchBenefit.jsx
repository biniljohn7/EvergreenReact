import React, { useState, useEffect } from 'react'
import Wrapper from './benefit.style.js'
import Pagination from '../../UI/pagination/pagination'
import { searchBenefit } from '../../api/benefit'
import { ToastsStore } from 'react-toasts'
import AuthActions from '../../redux/auth/actions'
import { connect } from 'react-redux'
import { Spinner } from 'reactstrap'
const { logout } = AuthActions
const queryString = require('query-string')

const COL_NO = window.innerWidth < 768 ? 1 : 2
const COL_WIDTH = window.innerWidth < 768 ? '100%' : '50%'
const LIMIT = 10

const SearchBenefit = (props) => {
  const [benefit, setBenefit] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [currentPage, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)

  useEffect(() => {
    const search = '';//queryString.parse(props.location.search).text

    if (search && search !== '') {
      searchBenefit({
        pageId: currentPage,
        search: search,
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
    } else {
      // props.replace({ pathname: '/benefits' })
    }
  }, [currentPage])

  return (
    <Wrapper col={COL_NO} width={COL_WIDTH}>
      {isLoading ? (
        // <div className="d-flex justify-content-center">
        //   <div className="spinner-border" role="status">
        //     <span className="sr-only">Loading...</span>
        //   </div>
        // </div>
        <div className="text-center custom-spinner">
          <Spinner color="danger" />
        </div>
      ) : (
        <div className="bg-white">
          <div className="site-spacing ptb-50">
            {benefit.length > 0 ? (
              <React.Fragment>
                <div className="grid-container mt-20">
                  {benefit.map((el) => {
                    return (
                      <div
                        className="benefit-container position-relative benefit-item box plr-15 text-white cursor-pointer"
                        key={el.benefitId}
                        onClick={(e) =>
                          props.history.push(
                            `/benefits/${el.categoryName.replaceAll(
                              '/',
                              ' ',
                            )}/${el.categoryId}/${el.benefitId}`,
                          )
                        }
                      >
                        <div className="benefit-part1 fs-20 text-center">
                          <span className="fs-40 text-bold">{el.discount}</span>{' '}
                          OFF
                        </div>
                        <span className="benefit-part2">
                          <p className="text-justify">{el.shortDetails}</p>
                          <div className="terms">
                            Terms & Conditions Applied*
                          </div>
                        </span>
                      </div>
                    )
                  })}
                </div>
              </React.Fragment>
            ) : (
              <div className="mt-50 fs-20 text-center text-bold text-danger">
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
          </div>
        </div>
      )}
    </Wrapper>
  )
}

// export default SearchBenefit
export default connect(null, { logout })(SearchBenefit)
