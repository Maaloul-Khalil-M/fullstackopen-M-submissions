import axios from "axios";
import { useEffect, useState } from "react";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = () => axios.get(`${baseUrl}/all`).then((res) => res.data);

const CountryDetail = ({ country }) => {
  const languages = Object.values(country.languages);
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>Capital: {country.capital[0]}</div>
      <div>Area: {country.area}</div>
      <h3>Languages</h3>
      <ul>
        {languages.map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} width={180} />
    </div>
  );
};

const CountryList = ({ countries }) => {
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name.common}>{country.name.common}</li>
      ))}
    </ul>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getAll().then(setCountries);
  }, []);

  const result = countries.filter((country) =>
    country.name.common.toLowerCase().includes(query.toLowerCase()),
  );

  const renderResult = () => {
    if (result.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    }
    if (result.length > 1 && result.length <= 10) {
      return <CountryList countries={result} />;
    }
    if (result.length === 1) {
      return <CountryDetail country={result[0]} />;
    }
    return <div>no countries found</div>;
  };

  return (
    <div>
      <div>find countries</div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      {renderResult()}
    </div>
  );
};

export default App;
