import React from 'react'
import Wrapper from './accountCreated.style';
import { Link, useLocation } from 'react-router-dom'

export default function AccountCreated() {

    document.title = 'Account Created - ' + window.seoTagLine;

    return (
        <Wrapper>
            <div className='heading'>Your Account Created!</div>
            <div className="body-txt">
                Account created successfully! &nbsp;
                <Link
                    to="/signin"
                >
                    Log In
                </Link>
            </div>
        </Wrapper>
    )
}
