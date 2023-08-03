import { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import Result from './components/Result'
import Country from './components/Country'

import axios from 'axios'

function App() {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [weather, setWeather] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  }, [])

  useEffect(() => {
    const WEATHER_API_KEY = process.env.REACT_APP_API_KEY

    const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
    if(countriesToShow.length === 1){
      const capital = countriesToShow[0].capital
      axios
      .get(`http://api.weatherstack.com/current?access_key=${WEATHER_API_KEY}&query=${capital}`)
      .then(response => setWeather(response.data))
    }
  },[countries, search])

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleClick = (e) => {
    setSearch(e.target.value)
  }

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <h2>Countries</h2>
      <Filter search={search} handleChange={handleChange} />
      {countriesToShow.length !== 1 ? (
        <Result search={search} countries={countriesToShow} handleClick={handleClick} />
      ) : (
        <Country country={countriesToShow[0]} weather={weather} />
      )}
    </>
  );
}

export default App;
