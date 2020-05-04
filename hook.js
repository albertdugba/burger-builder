import { useState, useEffect } from "react";
import Axios from "axios";

const useFetch = (url, response) => {
  const [data, setData] = useState(response);

  const httpRequest = url => {
    Axios.get(url)
      .then(res => setData(res.data))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    httpRequest();
  }, [url]);

  return data;
};

export default useFetch;
