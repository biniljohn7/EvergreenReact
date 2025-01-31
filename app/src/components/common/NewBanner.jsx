import React from 'react'
import { Link } from 'react-router-dom'

import SiteLogo from '../../assets/images/site-logo.png'
import BannerImg from '../../assets/images/new-here.png'
import { store } from '../../redux/store'

export default function NewBanner() {
    return (
        // <div className="banner-section">
        //     <div className="container">
        //         <div className="image-box">
        //             <img src={BannerImg} alt='' />
        //         </div>
        //         <div className="cnt-box">
        //             <div className="b-logo"><img src={SiteLogo} alt='logo' /></div>
        //             <p>The National Council of Negro Women (NCNW) is presents of our highest award at the Biennial Uncommon Height Awards Gala, in honor of our iconic leader, Dr. Dorothy Irene Height. </p>
        //             <div className="button-box">
        //                 {store.getState().auth.isLogin &&
        //                     store.getState().auth.accessToken ? (
        //                     <Link to="/account">
        //                         GET STARTED
        //                     </Link>
        //                 ) : (
        //                     <Link to="/signup">
        //                         GET STARTED
        //                     </Link>
        //                 )}
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <div className="new-banner">
            <div className="img">
                <img src={BannerImg} alt='' />
            </div>
            <div className="cnt-sec">
                <div className="welcom">Welcome,</div>
                <div className="mbr-nam">Member NAme!,</div>
                <div className="msg">We’re glad you’re here!</div>
            </div>
        </div>
    )
}
