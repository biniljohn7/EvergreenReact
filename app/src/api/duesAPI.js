import axios from "axios";
import { BASE_URL } from "../helper/constant";
import { setHeaders } from "./apiHelpers";

export const viewMemebership = () => {
  setHeaders();
  return axios.get(`${BASE_URL}/dues/view`).then((response) => {
    return response.data;
  });
};

export const getMembershipType = () => {
  setHeaders();
  return axios
    .get(`${BASE_URL}/dues/membership/types/dropdown`)
    .then((response) => {
      return response.data;
    });
};

export const isMembershipExpired = (membershipId) => {
  setHeaders();
  return axios
    .get(`${BASE_URL}/dues/isMembershipExpired?membershipId=${membershipId}`)
    .then((response) => {
      return response;
    });
};

export const getAttachment = (id) => {
  setHeaders();
  return axios
    .get(`${BASE_URL}/dues/attachments/dropdown?membershipTypeId=${id}`)
    .then((response) => {
      return response.data;
    });
};

export const applyCode = (code) => {
  setHeaders();
  return axios
    .post(`${BASE_URL}/member/referral?referralCoupon=${code}`)
    .then((response) => {
      return response.data;
    });
};

export const getMembership = (body) => {
  setHeaders();
  return axios
    .post(`${BASE_URL}/dues/payment-summary`, body)
    .then((response) => {
      return response.data;
    });
};

export const addMembership = (body) => {
  setHeaders();
  return axios.post(`${BASE_URL}/member/membership`, body).then((response) => {
    return response.data;
  });
};

export const validateToken = (token) => {
  // setHeaders()
  return axios.get(`${BASE_URL}/dues/verify/${token}`).then((response) => {
    return response.data;
  });
};

export const fetchStoredCard = (token) => {
  // setHeaders()
  return axios.get(`${BASE_URL}/dues/credit-card/${token}`).then((response) => {
    return response.data;
  });
};

export const deleteStroredCard = (id) => {
  setHeaders();
  return axios.delete(`${BASE_URL}/dues/credit-card/${id}`).then((response) => {
    return response.data;
  });
};

export const createPayment = (body, token) => {
  // setHeaders()
  return axios
    .post(`${BASE_URL}/member/payment/${token}`, body)
    .then((response) => {
      return response.data;
    });
};

export const fetchPayment = (id) => {
  return axios.get(`${BASE_URL}/dues/payment/${id}`).then((response) => {
    return response.data;
  });
};

export const cancelPayment = (id) => {
  return axios.delete(`${BASE_URL}/dues/payment/${id}`).then((response) => {
    return response.data;
  });
};

export const cancelSubscription = (id) => {
  return axios
    .delete(`${BASE_URL}/dues/cancel-payment/${id}`)
    .then((response) => {
      return response.data;
    });
};

export const viewPaymentHistory = (id) => {
  return axios.get(`${BASE_URL}/dues/view/history`).then((response) => {
    return response.data;
  });
};
