import React from 'react'
import CommonLayout from './CommonLayout'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import { withRouter } from 'react-router-dom'

const PageContainer = (props) => {
  return (
    <React.Fragment>
      <Header {...props} />
      <CommonLayout {...props}>{props.children}</CommonLayout>
      <Footer {...props} />
    </React.Fragment>
  )
}

export default withRouter(PageContainer)
