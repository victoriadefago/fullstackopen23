const CountryDetails = ({country}) => {

    const lang = Object.values(country.languages)

    return (
        <>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital}</p>
            <p>Population {country.population}</p>

            <h2>Spoken languages</h2>
            <ul>
                {lang.map((language, i) => (
                    <li key={i}>{language}</li>
                ))}
            </ul>
            <img src={country.flags.png} alt={`${country.name.common}'s flag`} />
        </>
    )
}

export default CountryDetails