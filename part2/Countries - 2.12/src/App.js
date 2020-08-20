import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import CountriesList from './components/CountriesList'
import Country from './components/Country'
import axios from 'axios'

const App = () => { 
  
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('') 

  useEffect(() => {     
    axios      
      .get('https://restcountries.eu/rest/v2/all')      
      .then(response => {setCountries(response.data)})
  }, [])  

  const handleFilterChange = (event) => {  
    setNewFilter(event.target.value)  
  }

  const countriesList = newFilter === '' ? countries : countries.filter(country => country.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h1>Search</h1>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Filtered Countries</h2> 
      {
        (countriesList.length >= 10) 
          ? <div>More then 10 matches. Improve your filter!</div>
          : (countriesList.length > 1)
            ? <CountriesList countriesList={countriesList} />
            : (countriesList.length === 1)
              ? <Country countriesList={countriesList} />
              : <div>No matches! Try another filter!</div>  
      }
      {/*CountriesList.length <= 10 ? CountriesList.map(country => <ul key={country.name}>{country.name}</ul>) : <ul>More then 10 matches</ul>*/}
    </div>
  )
}

export default App 
