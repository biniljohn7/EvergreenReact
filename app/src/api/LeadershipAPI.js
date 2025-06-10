import axios from "axios";
import { BASE_URL } from "../helper/constant";
import { setHeaders } from "./apiHelpers";

export const viewDashboard = () => {
  setHeaders();
  return axios.get(`${BASE_URL}/leader/?method=dashboard`).then((response) => {
    return response.data;
  });
};

export const getOfficers = () => {
  setHeaders();
  return axios.get(`${BASE_URL}/leader/?method=officers`).then((response) => {
    return response.data;
  });
};

export const electOfficers = (body) => {
  return axios
    .post(BASE_URL + "/leader/?method=elect-officers", body)
    .then((response) => {
      return response.data;
    });
};

export const removeOfficer = (body) => {
  setHeaders();
  return axios
    .post(`${BASE_URL}/leader/?method=remove-officer`, body)
    .then((response) => {
      return response.data;
    });
};
