import React from 'react'
import Wrapper from './accountCreated.style';

export default function AccountCreated() {

    document.title = 'Account Created - ' + window.seoTagLine;

    return (
        <Wrapper>
            <div className='heading'>Your Account Created!</div>
            <div className="body-txt">
                Account created successfully! We have sent you an email on registered email address, please verify your account first!
            </div>
        </Wrapper>
    )
}
