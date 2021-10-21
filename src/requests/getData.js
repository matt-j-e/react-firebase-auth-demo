import axios from "axios";

const getData = async (token) => {

  const response = await axios.get("http://localhost:5050/api/quotes", {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return response;
};

export default getData;