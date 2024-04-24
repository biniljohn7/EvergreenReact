import React from 'react'
import { Link } from 'react-router-dom'

import SiteLogo from '../../assets/images/site-logo.png'
import BannerImg from '../../assets/images/banner.jpg'

export default function Banner() {
    return (
        <div className="banner-section">
            <div className="container">
                <div className="image-box">
                    <img src={BannerImg} alt='' />
                </div>
                <div className="cnt-box">
                    <div className="b-logo"><img src={SiteLogo} alt='logo' /></div>
                    <p>The National Council of Negro Women (NCNW) is presents of our highest award at the Biennial Uncommon Height Awards Gala, in honor of our iconic leader, Dr. Dorothy Irene Height. </p>
                    <div className="button-box">
                        <Link to="/signup">
                            GET STARTED
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
