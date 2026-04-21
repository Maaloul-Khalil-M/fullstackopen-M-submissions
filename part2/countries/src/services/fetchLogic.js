import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";
const weatherBaseUrl = "https://api.openweathermap.org/data/2.5/weather";

const weatherApiKey = import.meta.env.VITE_WEATHER_KEY;
console.log(weatherApiKey);

const getAll = () => axios.get(`${baseUrl}/all`).then((res) => res.data);

const getCountry = (name) =>
  axios.get(`${baseUrl}/name/${name}`).then((res) => res.data);

const getWeather = (lat, lon) =>
  axios
    .get(weatherBaseUrl, {
      params: {
        lat,
        lon,
        appid: weatherApiKey,
        units: "metric", //convert temp to celcius
      },
    })
    .then((res) => res.data)
    .catch((err) => console.error("weather fetch failed:", err));

export default { getAll, getCountry, getWeather };
