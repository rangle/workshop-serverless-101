import axios from "axios";

export default axios.create({
  baseURL: "https://rs2n110fhj.execute-api.us-east-2.amazonaws.com/dev/trex-scoreboard",
  headers: {'x-api-key': 'aZ0qRaDvO71roLf7Xz5iO2n6Li0AEP4e1T9ZXs9i'}
});
