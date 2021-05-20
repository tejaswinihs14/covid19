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
import LineGraph from "./LineGraph";
import Table from "./Table";
import Map from "./Map";
import { sortData } from "./util";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, SetCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  //STATE = how to write a variable in react
  // USEEFFCET = runs a piece of code based on a given condition

  useEffect(() => {
    fetch("https://api.caw.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

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
          const sortedData = sortData(data);
          setTableData(sortedData);
          SetCountries(countries);
        });
    };
    getCountriesData();
  }, []);

  const onChangeCountry = async (event) => {
    const countryCode = event.target.value;

    const url =
      countryCode === "Worldwide"
        ? "https://api.caw.sh/v3/covid-19/all"
        : `https://api.caw.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
      });
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
          <InfoBox
            title="CoronaVirus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoBox
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoBox
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
        {/* map */}
        <Map />
      </div>

      <Card className="app__right">
        <CardContent>
          {/* table */}
          <h3>Live cases by country</h3>
          <Table countries={tableData} />

          {/* graph */}
          <h3>Worldwide new cases</h3>
          <LineGraph />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
