import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Success from '../txn/Success';
import Cancel from '../txn/Cancel';

const Transaction = () => {
  const { s } = useParams();
  const [shwStatus, setShwStatus] = useState(null);

//   useEffect(() => {
//     setShwStatus(s);
//   }, [s]);

  useEffect(() => {
    const verifyTxn = async (token) => {
      try {
        const response = await axios.post(`${BASE_URL}/member/?method=txn->status`, { token });
        setVerificationResult(response.data.message);
        setVerificationSts(response.data.success);
      } catch (error) {
        setVerificationResult('Verification failed');
      }
    };

    if (s) {
      verifyTxn(t);
    }
  }, [s]);

  document.title = 'Payment - ' + window.seoTagLine;

  return (
    <>
      {shwStatus=='success' && <Success/>}
      {shwStatus=='cancel' && <Cancel/>}
    </>
  );
};

export default Transaction;
