import React, { useState, useEffect } from 'react'
import Wrapper from './benefit.style.js'
import Input from '../../UI/input/input'
import { getBenefitCategory } from '../../api/benefit'
import { ToastsStore } from 'react-toasts'
import AuthActions from '../../redux/auth/actions'
import Banner from "../common/Banner";
import { connect } from 'react-redux'
import { Spinner } from 'reactstrap'


const { logout } = AuthActions
const COL_NO = window.innerWidth < 768 ? 2 : window.innerWidth <= 1024 ? 3 : 4
const COL_WIDTH =
  window.innerWidth < 768 ? '50%' : window.innerWidth <= 1024 ? '33%' : '25%'

const Benefit = (props) => {
  const [category, setCategory] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    getBenefitCategory()
      .then((res) => {
        if (res.success === 1) {
          setCategory(res.data || [])
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
  }, [])

  const searchBenefit = () => {
    const searchText = document.getElementById('benefit_search').value
    if (searchText.length > 2) {
      props.history.push(`/benefits/search/list?text=${searchText}`)
    } else {
      alert('Please enter minimum 3 characters!')
    }
  }

  return (
    <Wrapper col={COL_NO} width={COL_WIDTH}>
      {isLoading ? (
        <div className="text-center custom-spinner">
          <Spinner color="danger" />
        </div>
      ) : (
        <React.Fragment>
          <Banner />
          <div className="benefits-section inner-benefits">
              <div className="head-box">
                  <div className="container">
                      <h2>benefits</h2>
                  </div>
              </div>
            <div className="container">
              <div className="ben-search-box">
                    <Input
                      type="text"
                      placeholder="Search from here..."
                      id="benefit_search"
                      contentFontSize={'fs-14'}
                      className="search"
                      onEnter={searchBenefit}
                    />
                    <i
                      className="fa fa-search eye pwd cursor-pointer"
                      id="benefit_search_apply"
                      onClick={searchBenefit}
                    ></i>
                </div>
            </div>
            {category && category.length > 0 ? (
              <div className="benefit-box">
                <div className="container">
                {category.map((cat) => {
                  return (
                    <div
                      className="benefit-item cursor-pointer"
                      key={cat.categoryId}
                      onClick={(e) =>
                        props.history.push(
                          `/benefits/${cat.name.replaceAll('/', ' ')}`,
                          {
                            categoryId: cat.categoryId,
                            name: cat.name,
                          },
                        )
                      }
                    >
                      <div className="per">{cat.name}</div>
                      <div class="button-box white">
                          <span>GET STARTED</span>
                      </div>
                      {/*
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="image-size mt-15"
                      /> */}
                    </div>
                  )
                })}
                </div>
              </div>
            ) : (
              <div className="text-center">
                No record found!
              </div>
            )}
          </div>
        </React.Fragment>
      )}
    </Wrapper>
  )
}

// export default Benefit
export default connect(null, { logout })(Benefit)
