import React from 'react'
// import {store} from '../redux/store'

const CommonLayout = (props) => {
  return (
    <div
      className="common-layout"
      // style={{
      //   marginTop: store.getState().auth.isLogin ? 190 : 116,
      // }}
    >
      {props.children}
    </div>
  )
}

export default CommonLayout
