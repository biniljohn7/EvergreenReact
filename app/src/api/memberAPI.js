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
    .post(`${BASE_URL}/member/?method=profile-update`, body)
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
  setHeaders();
  return axios
    .get(
      `${BASE_URL}/member/?method=profile-get-all-dropdown`
    )
    .then((response) => {
      return response.data;
    });
};

export const getNation = () => {
  setHeaders();
  return axios
    .get(
      `${BASE_URL}/member/?method=profile-get-nation`
    )
    .then((response) => {
      return response.data;
    });
};

export const getRegion = (nationId) => {
  setHeaders();
  return axios
    .get(
      `${BASE_URL}/member/?method=profile-get-region&nationId=${nationId}`
    )
    .then((response) => {
      return response.data;
    });
};

export const getStateFromRegion = (regionId) => {
  setHeaders();
  return axios
    .get(
      `${BASE_URL}/member/?method=profile-get-state-from-region-id&regionId=${regionId}`
    )
    .then((response) => {
      return response.data;
    });
};

export const getState = (countryId) => {
  setHeaders();
  return axios
    .get(
      `${BASE_URL}/member/?method=profile-get-state&countryId=${countryId}`
    )
    .then((response) => {
      return response.data;
    });
};

export const getCity = (stateId) => {
  setHeaders();
  return axios
    .get(
      `${BASE_URL}/member/?method=profile-get-city&stateId=${stateId}`
    )
    .then((response) => {
      return response.data;
    });
};

export const getChapter = (stateId) => {
  setHeaders();
  return axios
    .get(
      `${BASE_URL}/member/?method=profile-get-chapter&stateId=${stateId}`
    )
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
  return axios.post(`${BASE_URL}/member/?method=referral-info`).then((response) => {
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
