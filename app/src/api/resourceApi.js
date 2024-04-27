import axios from "axios";
import { BASE_URL } from "../helper/constant";
import { setHeaders } from "./apiHelpers";

const getResourceInfo = () => {
  setHeaders();
  return axios.get(`${BASE_URL}/member/?method=member-card-info`).then((response) => {
    return response.data;
  });
};
export { getResourceInfo };
