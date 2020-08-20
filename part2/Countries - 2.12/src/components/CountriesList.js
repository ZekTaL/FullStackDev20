import React from 'react'

const CountriesList = ({countriesList}) => {
  return (
    <div>
        Found {countriesList.length} matches:
        <ul>
            {countriesList.map(country => <li key={country.alpha3Code}>{country.name}</li>)}
        </ul>
    </div>
  )
}

export default CountriesList