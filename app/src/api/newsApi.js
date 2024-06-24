import axios from "axios";
import { BASE_URL } from "../helper/constant";
import { setHeaders } from "./apiHelpers";

export const ViewNews = (newsId) => {
  setHeaders();
  return axios
    .get(`${BASE_URL}/member/?method=news-details&id=${newsId}`)
    .then((response) => {
      return response.data;
    });
};

// export const listNews = (id, type) => {
//   setHeaders()
//   return axios
//     .get(`${BASE_URL}/home/news/${type}?pageId=${id}`)
//     .then((response) => {
//       return response.data
//     })
// }

export const listNews = (id, type) => {
  setHeaders();
  return axios
    .get(`${BASE_URL}/member/?method=news-list&scope=${type}`)
    .then((response) => {
      return response.data;
    });
};

export const reactToNews = (id) => {
  setHeaders();
  return axios
    .get(`${BASE_URL}/home/news/like?newsId=${id}`)
    .then((response) => {
      return response.data;
    });
};
