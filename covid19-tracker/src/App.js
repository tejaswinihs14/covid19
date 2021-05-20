import {
  CardContent,
  FormControl,
  MenuItem,
  Select,
  Card,
} from "@material-ui/core";
import "./App.css";
import React, { useState, useEffect } from "react";
import InfoBox from "./InfoBox";
import Map from "./Map";

function App() {
  const [countries, SetCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");

  //STATE = how to write a variable in react
  // USEEFFCET = runs a piece of code based on a given condition

  useEffect(() => {
    //async = send a request ,wait for it, do something with that info
    // the code runs only once when component is loaded or changed
    const getCountriesData = async () => {
      await fetch("https://api.caw.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          SetCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onChangeCountry = (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  };

  return (
    <div className="app">
      <div className="app__left">
        {/* Header */}
        <div className="app__header">
          {/* title + dropdown */}
          <h1>COVID-19 TRACKER</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onChangeCountry}
            >
              {/* loop through all contries and provide a dropdown*/}
              <MenuItem value="Worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* info boxes */}
        {/* info boxes */}
        {/* info boxes */}

        <div className="app__stats">
          <InfoBox title="CoronaVirus Cases" cases={124} total={2000} />
          <InfoBox title="Recovered" cases={1134} total={2300} />
          <InfoBox title="Deaths" cases={1444} total={2500} />
        </div>
        {/* map */}
        <Map />
      </div>

      <Card className="app__right">
        <CardContent>
          {/* table */}
          <h3>Live cases by country</h3>

          {/* graph */}
          <h3>Worldwide new cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
