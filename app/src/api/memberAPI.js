import axios from "axios";
import { BASE_URL } from "../helper/constant";
import { setHeaders } from "./apiHelpers";

export const viewProfile = () => {
  setHeaders();
  return axios
    .get(`${BASE_URL}/member/?method=profile-view`)
    .then((response) => {
      return response.data;
    });
};

export const updateNotificationStatus = (status) => {
  setHeaders();
  return axios
    .get(
      `${BASE_URL}/member/updatenotificationstatus?sendNotification=${status}`
    )
    .then((response) => {
      return response.data;
    });
};

export const createProfile = (body) => {
  setHeaders();
  return axios
    .post(`${BASE_URL}/member/profile/build`, body)
    .then((response) => {
      return response.data;
    });
};

export const updateProfile = (body) => {
  setHeaders();
  return axios
    .post(`${BASE_URL}/member/profile/update`, body)
    .then((response) => {
      return response.data;
    });
};

export const getContactUsQue = () => {
  setHeaders();
  return axios.get(`${BASE_URL}/contactus/view`).then((response) => {
    return response.data;
  });
};

export const contactUs = (body) => {
  setHeaders();
  return axios.post(`${BASE_URL}/contactus/add`, body).then((response) => {
    return response.data;
  });
};

export const getDropdown = () => {
  return axios.get(`${BASE_URL}/member/profile/dropdown`).then((response) => {
    return response.data;
  });
};

export const getNation = () => {
  return axios
    .get(`${BASE_URL}/member/profile/dropdown/nation`)
    .then((response) => {
      return response.data;
    });
};

export const getRegion = (nationId) => {
  return axios
    .get(`${BASE_URL}/member/profile/dropdown/region?nationId=${nationId}`)
    .then((response) => {
      return response.data;
    });
};

export const getStateFromRegion = (regionId) => {
  return axios
    .get(
      `${BASE_URL}/member/profile/dropdown/state-from-region-id?regionId=${regionId}`
    )
    .then((response) => {
      return response.data;
    });
};

export const getState = (countryId) => {
  return axios
    .get(`${BASE_URL}/member/profile/dropdown/state?countryId=${countryId}`)
    .then((response) => {
      return response.data;
    });
};

export const getCity = (stateId) => {
  return axios
    .get(`${BASE_URL}/member/profile/dropdown/city?stateId=${stateId}`)
    .then((response) => {
      return response.data;
    });
};

export const getChapter = (stateId) => {
  return axios
    .get(`${BASE_URL}/member/profile/dropdown/chapter?stateId=${stateId}`)
    .then((response) => {
      return response.data;
    });
};

export const uploadImage = (body) => {
  setHeaders();
  return axios.post(
    BASE_URL + '/member/?method=avatar-upload',
    body
  ).then((response) => {
    return response.data;
  });
};

export const getReferralDetails = () => {
  setHeaders();
  return axios.post(`${BASE_URL}/member/referral/info`).then((response) => {
    return response.data;
  });
};

export const getRecommendationLetter = (memberId) => {
  // setHeaders()
  // setContentType('application/pdf')
  return axios
    .get(
      `${BASE_URL}/member/website/recommendation-letter?memberId=${memberId}`
    )
    .then((response) => {
      return response.data;
    });
};
