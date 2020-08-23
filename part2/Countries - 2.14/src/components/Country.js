import React from 'react'
import Weather from './Weather'

const Country = ({countriesList}) => {

    // It's only one so It's the first
    let country = countriesList[0]  

    return (
        <div>
            Found 1 match:
            <h1>{country.name}</h1>
            <ul>
                <li>capital: {country.capital}</li>
                <li>population: {country.population}</li>
            </ul>
            <h3>Languages</h3>
            <ul>
                {country.languages.map (language => <li key={language.iso639_2}>{language.name}</li>)}
            </ul>
            <img src={country.flag} alt='' height='150' border='1'/>
            <Weather capital={country.capital} />
        </div>
    )
}

export default Country