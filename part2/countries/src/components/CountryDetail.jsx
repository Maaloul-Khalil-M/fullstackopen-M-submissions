import { useEffect, useState } from "react";
import fetchLogic from "../services/fetchLogic";

const CapitalWeather = ({ capital, weather }) => {
  if (!weather) {
    return <div>Loading weather...</div>;
  }

  const temp = weather.main.temp;
  const windSpeed = weather.wind.speed;
  const icon = weather.weather[0].icon;
  const iconUrl = `https://openweathermap.org/payload/api/media/file/${icon}.png`;

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>Tempreature {temp} Celcius</p>
      <img src={iconUrl} alt={"weather icon"} width={180} />
      <p>Wind {windSpeed} m/s</p>
    </div>
  );
};

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState(null);

  const languages = Object.values(country.languages);
  const [lat, lon] = country.capitalInfo.latlng;

  useEffect(() => {
    fetchLogic.getWeather(lat, lon).then((data) => setWeather(data));
  }, [lat, lon]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>Capital {country.capital[0]}</div>
      <div>Area {country.area}</div>
      <h3>Languages</h3>
      <ul>
        {languages.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} width={180} />
      <CapitalWeather capital={country.capital[0]} weather={weather} />
    </div>
  );
};

export default CountryDetail;
