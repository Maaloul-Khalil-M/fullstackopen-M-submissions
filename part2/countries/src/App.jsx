import axios from "axios";
import { useEffect, useState } from "react";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = () => axios.get(`${baseUrl}/all`).then((res) => res.data);

const getCountry = (name) =>
  axios.get(`${baseUrl}/name/${name}`).then((res) => res.data);

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

const CountryList = ({ countries, onShow }) => {
  return (
    <div>
      {countries.map((country) => (
        <div key={country.name.common}>
          {country.name.common}
          <button onClick={() => onShow(country.name.common)}>show</button>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [countryDetail, setCountryDetail] = useState(null);

  useEffect(() => {
    getAll().then(setCountries);
  }, []);

  const handleShow = (name) => {
    getCountry(name).then((data) => {
      setCountryDetail(data);
    });
  };

  const result = countries.filter((country) =>
    country.name.common.toLowerCase().includes(query.toLowerCase()),
  );

  const renderResult = () => {
    if (countryDetail) {
      return <CountryDetail country={countryDetail} />;
    } else if (result.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    } else if (result.length > 1) {
      return <CountryList countries={result} onShow={handleShow} />;
    } else if (result.length === 1) {
      return <CountryDetail country={result[0]} />;
    }
    return <div>No countries found</div>;
  };

  return (
    <div>
      <div>find countries</div>
      <input
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setCountryDetail(null);
        }}
      />
      {renderResult()}
    </div>
  );
};

export default App;
