import axios from "axios";
import { BASE_URL } from "../helper/constant";
import { setHeaders } from "./apiHelpers";

export const viewMemebership = () => {
  setHeaders();
  return axios.get(`${BASE_URL}/member/?method=dues-view`).then((response) => {
    return response.data;
  });
};

export const getMembershipType = () => {
  setHeaders();
  return axios
    .get(`${BASE_URL}/member/?method=dues-membership-types-list`)
    .then((response) => {
      return response.data;
    });
};

export const getAttachment = (id) => {
  setHeaders();
  return axios
    .get(`${BASE_URL}/member/?method=dues-attachments&type=${id}`)
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
    .post(`${BASE_URL}/member/?method=payment-summary`, body)
    .then((response) => {
      return response.data;
    });
};

export const addMembership = (body) => {
  setHeaders();
  return axios.post(`${BASE_URL}/member/?method=membership-add`, body).then((response) => {
    return response.data;
  });
};

export const validateToken = (token) => {
  // setHeaders()
  return axios.get(`${BASE_URL}/public/?method=payment-verify&token=${token}`).
    then((response) => {
      return response.data;
    });
};

export const fetchStoredCard = (token) => {
  // setHeaders()
  return axios.get(`${BASE_URL}/public/?method=dues-fetch-card&token${token}`).then((response) => {
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
  return axios.get(`${BASE_URL}/member/?method=dues-history`).then((response) => {
    return response.data;
  });
};

export const getAllMembers = (body) => {
  setHeaders();
  return axios
    .post(`${BASE_URL}/member/?method=get-all-members`, body)
    .then((response) => {
      return response.data;
    });
};
/**_**/
export const FetchGiftList = (data) => {
  setHeaders();
  //console.log(data);
  return axios
    .post(`${BASE_URL}/member/?dummy-url&gift-list`, data)
    .then((response) => {






      let
        dummy = {
          status: 'ok',
          list: [],
          pages: 3
        },
        i;

      function getRandom(list) {
        return list[
          Math.floor(Math.random() * list.length)
        ];
      }
      for (i = 1; i <= 4; i++) {
        dummy.list.push({
          "id": i + (data.pgn * 1000),
          "validity": getRandom([
            '1 Year',
            '6 Months',
            '3 Months',
            '1 Month',
            '10 Days',
          ]),
          "gifter": getRandom([
            'Ethan Hunt',
            'Steve Rogers',
            'Sunny Leone',
            'Mia Khalifa',
          ]),
          "price": (Math.random() * 5000).toFixed(2),
          "plans": getRandom([
            "Legacy life membership",
            'Regular',
            'Medium'
          ]),
          "grade": Math.random() > .5 ? 'high' : "low",
          "currentplan": Math.random() > .5,
          "date": new Date(
            new Date().getTime() -
            Math.random() * 9999999999
          ).toDateString(),
          "section": "received"
        });
      }
      response.data = dummy;





      return response.data;
    });
};


export const FetchGiftedList = (data) => {
  setHeaders();
  //console.log(data);
  return axios
    .post(`${BASE_URL}/member/?dummy-url&gifted-list`, data)
    .then((response) => {






      let
        dummy = {
          status: 'ok',
          list: [],
          pages: 3
        },
        i;

      function getRandom(list) {
        return list[
          Math.floor(Math.random() * list.length)
        ];
      }
      for (i = 1; i <= 4; i++) {
        dummy.list.push({
          "id": i + (data.pgn * 1000),
          "validity": getRandom([
            '1 Year',
            '6 Months',
            '3 Months',
            '1 Month',
            '10 Days',
          ]),
          "receiver": getRandom([
            'Ethan Hunt',
            'Steve Rogers',
            'Sunny Leone',
            'Mia Khalifa',
          ]),
          "price": (Math.random() * 5000).toFixed(2),
          "plans": getRandom([
            "Legacy life membership",
            'Regular',
            'Medium'
          ]),
          "grade": Math.random() > .5 ? 'different' : "same",
          "currentplan": Math.random() > .5,
          "date": new Date(
            new Date().getTime() -
            Math.random() * 9999999999
          ).toDateString(),
          "section": "gifted",
          "action": getRandom([
            "accepted",
            "declined"
          ])
        });
      }
      response.data = dummy;






      return response.data;
    });
};
/**_**/
export const declineGift = (data) => {
  setHeaders();
  return axios
    .post(`${BASE_URL}/member/?dummy-url`, data)
    .then((response) => {
      return { "success": 1, "msg": "Gift Membership" };
    });
};

export const acceptGift = (data) => {
  setHeaders();
  return axios
    .post(`${BASE_URL}/member/?dummy-url`, data)
    .then((response) => {
      return { "success": 1, "msg": "Gift Membership" };
    });
}