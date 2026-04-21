import { useEffect, useState } from "react";
import fetchLogic from "./services/fetchLogic";
import CountryDetail from "./components/CountryDetail";
import CountryList from "./components/CountryList";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [countryDetail, setCountryDetail] = useState(null);

  useEffect(() => {
    fetchLogic.getAll().then(setCountries);
  }, []);

  const handleShow = (name) => {
    fetchLogic.getCountry(name).then((data) => {
      setCountryDetail(data);
    });
  };

  const renderResult = () => {
    const result = countries.filter((country) =>
      country.name.common.toLowerCase().includes(query.toLowerCase()),
    );
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
