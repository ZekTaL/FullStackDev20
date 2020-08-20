import React from 'react'

const Country = ({countriesList}) => {

    // It's only one so It's the first
    let country = countriesList[0]  

    return (
        <div>
            Found 1 match:
            <h2>{country.name}</h2>
            <ul>
                <li>capital: {country.capital}</li>
                <li>population: {country.population}</li>
            </ul>
            <h3>Languages</h3>
            <ul>
                {country.languages.map (language => <li key={language.iso639_2}>{language.name}</li>)}
            </ul>
            <img src={country.flag} alt='' height='150' border='1'/>

        </div>
    )
}

export default Country