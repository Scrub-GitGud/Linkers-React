import axios from "axios";
import BaseUrl from "./BaseURL";

const setDefaultHeader = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }

  axios.defaults.baseURL = BaseUrl;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
};

export default setDefaultHeader;