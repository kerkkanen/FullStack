import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Country from './components/Country'
import CountryList from './components/CountryList'
import matchers from '@testing-library/jest-dom/matchers'

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [searched, setSearched] = useState('')

  useEffect(() => {
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  const handleSearch = (event) => {    
    setSearched(event.target.value)    
    
  }

  const handleShowCountry = (country) => {
    setSearched(country)
  }

  const countriesToShow = countries.filter((country) => country.name.common.toLocaleLowerCase().includes(searched.toLocaleLowerCase()));

  const showCountries = () => {
    if (countriesToShow.length > 10 ) {
      return (
        <div>Too many matches, specify another filter</div>
      )
    }
  
    if (countriesToShow.length == 1) {
      return (
        <Country key={countriesToShow[0].name.common} country={countriesToShow[0]}/>
      )
    }
  
    return (
        <CountryList countries={countriesToShow} showCountryHandler={handleShowCountry}/>
    )
  }

  return (

    <div>
      <Filter searched={searched} handleSearch={handleSearch}/>
      {showCountries()}     
    </div>
   
  )

}

export default App