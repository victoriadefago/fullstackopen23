const Weather = ({country, weather}) => {

    if (weather.current) {
        return (
            <>
                <h2>Weather in {country.capital}</h2>
                <p><strong>Temperature:</strong> {weather.current.temperature} °C</p>
                <img src={weather.current.weather_icons} alt={`Current weather in ${country.capital}`} />
                <p><strong>Wind:</strong> {weather.current.wind_speed} mph direction {weather.current.wind_dir}</p>
            </>
        )
    }
    return null
}
    

export default Weather