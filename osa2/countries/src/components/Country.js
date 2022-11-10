import { useState, useEffect } from 'react'
import React from 'react';
import axios from 'axios'

const Country = ({country}) => {

    const [weather, setWeather] = useState('')
  
    useEffect(() => {
      axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`)
      .then(response => {
        setWeather(response.data.current)
      })
    }, [])
  
    return (
      <div>
        <Info key={country.name.common} country={country}/>
        <Languages key={country.name.common} languages={Object.values(country.languages)}/>
        <img src={country.flags.png} style={{ width: '50%' }}></img>
        <h3>Weather in {country.capital}</h3>
        <p>tempterature {weather.temperature} Celsius</p>
        <img src={weather.weather_icons}></img>
        <p>wind {weather.wind_speed} m/s</p>
      </div>
    )
  }

  const Info = ({country}) => {
    return (
      <div>
        <h2>{country.name.common}</h2>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
      </div>
    )
  }
  
  const Languages = ({languages}) => {
    return (
      <div>
        <p><strong>languages:</strong></p>
        <ul>
          {languages.map(language =>
            <li key={language}>
              {language}
            </li>
          )}
        </ul>
      </div>
    )
  }

  export default Country;