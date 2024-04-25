import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BASE_URL = 'http://localhost/evergreenadmin/api';

const AccountVerification = () => {
  const { t } = useParams();
  const method = 'verifyAccount';
  const [verificationResult, setVerificationResult] = useState(null);

  useEffect(() => {
    const verifyAccount = async (token) => {
      try {
        const response = await axios.post(`${BASE_URL}/public/`, { token, method });
        setVerificationResult(response.data.message);
      } catch (error) {
        console.error('Error verifying account:', error);
        setVerificationResult('Verification failed');
      }
    };

    if (t) {
      console.log('Verification token:', t);
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
