import React, { useState, useEffect } from 'react'
import Wrapper from './career.style.js'
import { listCareer } from '../../api/careerAPI'
import { ToastsStore } from 'react-toasts'
import Pagination from '../../UI/pagination/pagination'
import Input from '../../UI/input/input'
import { Spinner } from 'reactstrap'

import Banner from '../common/Banner.jsx'

const COL_NO = window.innerWidth < 768 ? 2 : window.innerWidth <= 1024 ? 3 : 4
const COL_WIDTH =
  window.innerWidth < 768 ? '50%' : window.innerWidth <= 1024 ? '33%' : '25%'

const IMAGE_SIZE =
  window.innerWidth < 768
    ? '100px'
    : window.innerWidth <= 1440
      ? '150px'
      : '200px'

const LIMIT = 10;

const Career = (props) => {
  const [career, setCareer] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [currentPage, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setLoading(true)
    listCareer({
      search: search,
      pageId: currentPage,
    })
      .then((res) => {
        if (res.success === 1) {
          setCareer(res.data.list || [])
          setTotalPage(res.data.totalPages)
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
  }, [currentPage, search])

  document.title = 'Careers - ' + window.seoTagLine;

  return (
    // <ProtectLayout>
    <Wrapper col={COL_NO} width={COL_WIDTH} size={IMAGE_SIZE}>
      <Banner />
      <div className="benefits-section inner-benefits">
        <div className="head-box">
          <div className="container">
            <h2>careers</h2>
          </div>
        </div>
        <div className="container">
          <div
            className={
              'position-relative float-right' +
              (window.innerWidth < 768 ? ' wp-80' : ' wp-50')
            }
          >
            <Input
              type="text"
              placeholder="Search from here..."
              id="category_search"
              contentFontSize={'fs-14'}
              className="search"
              disabled={isLoading}
              onEnter={() => {
                const searchText = document.getElementById('category_search')
                  .value
                setSearch(searchText || '')
              }}
            />
            <i
              className="fa fa-search eye pwd cursor-pointer"
              onClick={(e) => {
                const searchText = document.getElementById('category_search')
                  .value
                setSearch(searchText || '')
              }}
            ></i>
          </div>
        </div>
        <div className='benefit-box'>
          <div className="container">
            {
              isLoading ? (
                <div className="custom-spinner mtp-20">
                  <Spinner color="danger" />
                </div>
              ) :
                career.length > 0 ? (
                  <React.Fragment>
                    {career.map((car) => {
                      // const startDate = car.startDate.split('T')[0]
                      return (
                        <div
                          className="benefit-item"
                          key={car.careerId}
                          onClick={(e) =>
                            props.history.push(
                              `/careers/${car.title.replaceAll('/', ' ')}`,
                              {
                                careerId: car.careerId,
                              },
                            )
                          }
                        >
                          <div className="per career-bg">
                            {car.image ? (
                                <img
                                alt=''
                                src={car.image}
                                />
                            ) : null}
                          </div>
                          <div className="title">
                            {car.title}
                          </div>
                          <div className="cat">
                            {car.careerType}
                            {' | '}
                            {car.sourceOfCareer}
                          </div>
                        </div>
                      );
                    })}


                  </React.Fragment>
                ) : (
                  <div className="border ptb-50 plr-20 text-center text-bold mt-50">
                    No Record Found!
                  </div>
                )}
          </div>
          <div className="pagination">
            <Pagination
              activePage={currentPage}
              length={totalPage * LIMIT}
              count={LIMIT}
              handler={(pageNumber) => setPage(pageNumber)}
            />
          </div>
        </div>
      </div>

    </Wrapper>
    // </ProtectLayout>
  )
}

export default Career
