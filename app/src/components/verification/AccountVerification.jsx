import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../helper/constant'
import { useParams } from 'react-router-dom';

const AccountVerification = () => {
  const { t } = useParams();
  const [verificationResult, setVerificationResult] = useState(null);

  useEffect(() => {
    const verifyAccount = async (token) => {
      try {
        const response = await axios.post(`${BASE_URL}/public/?method=account-verify`, { token });
        setVerificationResult(response.data.message);
      } catch (error) {
        setVerificationResult('Verification failed');
      }
    };

    if (t) {
      verifyAccount(t);
    }
  }, [t]);

  return (
    <div>
      <h1>Account Verification</h1>
      {verificationResult && <p>{verificationResult}</p>}
    </div>
  );
};

export default AccountVerification;
