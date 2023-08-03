import Weather from "./Weather"
import CountryDetails from "./CountryDetails"

const Country = ({country, weather}) => {

  return (
    <>
        
        <CountryDetails country={country} />

        <Weather country={country} weather={weather} />
    </>
  )
}

export default Country