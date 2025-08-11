import React from 'react'
import { Link } from 'react-router-dom'

import { store } from '../../redux/store'
import Energy from '../../assets/images/Energy.png'
import Dots from '../../assets/images/Dots.png'
import Man from '../../assets/images/Man.png'


export default function WhatYouCanDo() {
    return (
        <div className="what-do">
            <div className="container">
                <div className="do-head">here's what you can do:</div>

                <div className="three-cl-row">
                    <div className="col-3">
                        <Link to={'/benefits'} className={'lnk-three'}>
                            <img src={Energy} alt='' />
                            <div className="">Explore<br></br> Benefits</div>
                        </Link>
                    </div>

                    <div className="col-3">
                        <Link to={'/home'} className={'lnk-three'}>
                            <img src={Dots} alt='' />
                            <div className="">Latest<br></br> News</div>
                        </Link>
                    </div>

                    <div className="col-3">
                        <Link to={'/account'} className={'lnk-three'}>
                            <img src={Dots} alt='' />
                            <div className="">Profile<br></br> Management</div>
                        </Link>
                    </div>

                    <div className="col-3">
                        <Link to={'/dues'} className={'lnk-three'}>
                            <img src={Man} alt='' />
                            <div className="">Manage Your<br></br> Membership</div>
                        </Link>
                    </div>
                </div>


                <div className="ful-row-sec">
                    <div className="ech-itm">
                        <Link to={'/events'} className={'lnk-itm'}>
                            <div className="content-part">
                                <div className="txt-sec">
                                    <div className="main-h">Upcoming Events</div>
                                    <div className="sub-h">View & RSVP for NCNW gatherings and key events.</div>
                                </div>
                                <div className="icn-sec">
                                    <span className="material-symbols-outlined icn">event_note</span>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="ech-itm">
                        <Link to={'/dues'} className={'lnk-itm'}>
                            <div className="content-part">
                                <div className="txt-sec">
                                    <div className="main-h">Check Your Dues</div>
                                    <div className="sub-h">Ensure your membership is active and in good standing.</div>
                                </div>
                                <div className="icn-sec">
                                    <span className="material-symbols-outlined icn">visibility</span>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="ech-itm">
                        <Link to={'/inbox'} className={'lnk-itm'}>
                            <div className="content-part">
                                <div className="txt-sec">
                                    <div className="main-h">Your Inbox</div>
                                    <div className="sub-h">See important updates and messages from leadership.</div>
                                </div>
                                <div className="icn-sec">
                                    <span className="material-symbols-outlined icn">mail</span>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="ech-itm">
                        <Link to={'/advocacy'} className={'lnk-itm'}>
                            <div className="content-part">
                                <div className="txt-sec">
                                    <div className="main-h">Advocacy Actions</div>
                                    <div className="sub-h">Get involved in initiatives that impact our community.</div>
                                </div>
                                <div className="icn-sec">
                                    <span className="material-symbols-outlined icn">groups_2</span>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="ech-itm">
                        <Link to={'/careers'} className={'lnk-itm'}>
                            <div className="content-part">
                                <div className="txt-sec">
                                    <div className="main-h">Career Hub</div>
                                    <div className="sub-h">Find mentorship, networking, and job opportunities.</div>
                                </div>
                                <div className="icn-sec">
                                    <span className="material-symbols-outlined icn">hub</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}