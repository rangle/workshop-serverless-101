import axios from "axios";

export default axios.create({
  baseURL:
    "https://rs2n110fhj.execute-api.us-east-2.amazonaws.com/dev/trex-scoreboard",
  headers: { "x-api-key": process.env.REACT_APP_API_KEY }
});
