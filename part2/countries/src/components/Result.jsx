const Result = ({search, countries, handleClick}) => {
  return (
    <>
        {search === '' ? '' : countries.length > 1  && countries.length <= 10 ? (
            countries.map(country => (
                <div key={country.name.common}>
                    {country.name.common}<button type="button" value={country.name.common} onClick={handleClick}>show</button>
                </div>
            ))
        ) : (
            <p>Too many matches, specify another filter</p>
        )}
    </>
  )
}

export default Result