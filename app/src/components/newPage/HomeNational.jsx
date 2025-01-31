import React from 'react'
import NatiImg from '../../assets/images/nation.jpg'

function HomeNational() {
  return (
    <div className="national-section">
        <div className="image-box"><img src={NatiImg} /></div>
        <div className="cnt-box">
            <h2>national council of negro women</h2>
            <div className="n-date">EST. 1930</div>
        </div>
    </div>
  )
}

export default HomeNational
