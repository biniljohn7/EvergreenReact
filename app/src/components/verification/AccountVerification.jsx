import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../helper/constant'
import { useParams } from 'react-router-dom';
import successImg from '../../assets/images/email-sucess.png';
import failedImg from '../../assets/images/email-failed.png';
import {
  WEBSITE_URL
} from '../../helper/constant'

const AccountVerification = () => {
  const { t } = useParams();
  const [verificationResult, setVerificationResult] = useState(null);
  const [verificationSts, setVerificationSts] = useState(null);

  useEffect(() => {
    const verifyAccount = async (token) => {
      try {
        const response = await axios.post(`${BASE_URL}/public/?method=account-verify`, { token });
        setVerificationResult(response.data.message);
        setVerificationSts(response.data.success);
      } catch (error) {
        setVerificationResult('Verification failed');
      }
    };

    if (t) {
      verifyAccount(t);
    }
  }, [t]);

  document.title = 'Verification - ' + window.seoTagLine;

  return (
    <div>
      <div class="verification-box">
        <div class="img-box">
          <img src={verificationSts ? successImg : failedImg} alt='' />
        </div>
        <h1>Account Verification</h1>
        {verificationResult && <p className='msg'>{verificationResult}</p>}

        {
          verificationSts ?
            <div class="text-box">
              <p>
                <a href={WEBSITE_URL + 'signin'} className='login-lnk'>
                  Login to your account
                </a>
              </p>
            </div>
            :
            <p></p>
        }
      </div>
    </div>
  );
};

export default AccountVerification;
