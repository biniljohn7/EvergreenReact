import React, { Fragment } from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import { store } from '../redux/store'
import PageContainer from '../layout/PageContainer'

// Not used for my-account path
const ProtectedLayout = ({ mainComponent: Component, ...rest }) => {
  const location = useLocation()

  return (
    <PageContainer>
      {store.getState().auth.isLogin && store.getState().auth.accessToken ? (
        location.pathname !== 'my-account' ? (
          store.getState().auth.isProfileCreated ? (
            <Fragment>
              <Component {...rest} />
            </Fragment>
          ) : (
            <Redirect to={'/account'} />
          )
        ) : (
          <Fragment>
            <Component {...rest} />
          </Fragment>
        )
      ) : (
        <Redirect to={'/signin'} />
      )}
      {/* {store.getState().auth.isLogin && store.getState().auth.accessToken ? (
        <Fragment>{children}</Fragment>
      ) : (
        <Redirect to={'/signin'} />
      )} */}
    </PageContainer>
  )
}

export default ProtectedLayout
