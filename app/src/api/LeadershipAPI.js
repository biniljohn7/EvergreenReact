import axios from "axios";
import { BASE_URL } from "../helper/constant";
import { setHeaders } from "./apiHelpers";

export const viewDashboard = () => {
    setHeaders();
    return axios
        .get(`${BASE_URL}/leader/?method=dashboard`)
        .then((response) => {
            return response.data;
        });
};
