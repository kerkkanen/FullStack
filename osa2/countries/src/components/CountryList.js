import React from 'react';

const CountryList = ({countries, showCountryHandler}) => {
    return (
      <div>
          {countries.map(country => 
            <p key={country.name.common} >
            {country.name.common} <button onClick={(event) => showCountryHandler(country.name.common)} >Show</button>
            </p>
            )}
      </div>
    )
  }

  export default CountryList;