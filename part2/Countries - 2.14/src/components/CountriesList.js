import React from 'react'

const CountriesList = (props) => {

    let countriesList = props.countriesList

    return (
        <div>
            Found {countriesList.length} matches:
            <ul>
                {countriesList.map(country => 
                    <li key={country.alpha3Code}>
                        {country.name + ' '}
                        <button onClick={props.onShowBtnClick} value={country.name}>show</button>
                    </li>               
                )}
            </ul>
        </div>
    )
}

export default CountriesList