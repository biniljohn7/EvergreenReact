import React from 'react'
import { withRouter } from 'react-router-dom'
// import { Link } from 'react-router-dom'
import CommonWrapper from './common.style'
import { store } from '../redux/store'
import { WEBSITE_URL } from '../helper/constant'

const NotFound = () => {
  return (
    <CommonWrapper>
      <div className="flex-container not-found m-auto bg-light plr-30">
        <i className="fa fa-frown-o fs-100 mb-20" aria-hidden="true"></i>
        {window.innerWidth < 768 ? (
          <React.Fragment>
            <h3>Oops! The page you are looking for is not found!</h3>
            <div className="mt-55">
              <a
                href={
                  WEBSITE_URL +
                  (store.getState().auth.isLogin &&
                  store.getState().auth.accessToken
                    ? 'home'
                    : '')
                }
                className="btn btn-md cursor-pointer header-link download"
                role="button"
              >
                <i className="fa fa-share pr-7" aria-hidden="true"></i>
                Home
              </a>
            </div>
            {/* <h4 className="mt-30">
              Go to{' '}
              <Link
                to={
                  store.getState().auth.isLogin &&
                  store.getState().auth.accessToken
                    ? '/home'
                    : '/'
                }
                className="label7--text"
              >
                Home
              </Link>{' '}
              page
            </h4> */}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h1>Oops! The page you are looking for is not found!</h1>
            {/* <h2 className="mt-30">
              Go to{' '}
              <Link
                to={
                  store.getState().auth.isLogin &&
                  store.getState().auth.accessToken
                    ? '/home'
                    : '/'
                }
                className="label7--text"
              >
                Home
              </Link>{' '}
              page
            </h2> */}
            <div className="mt-55 ptb-7 prl-25">
              <a
                href={
                  WEBSITE_URL +
                  (store.getState().auth.isLogin &&
                  store.getState().auth.accessToken
                    ? 'home'
                    : '')
                }
                className="btn btn-md cursor-pointer header-link download"
                role="button"
              >
                <i className="fa fa-share pr-7" aria-hidden="true"></i>
                Home
              </a>
            </div>
          </React.Fragment>
        )}
      </div>
    </CommonWrapper>
  )
}

export default withRouter(NotFound)
