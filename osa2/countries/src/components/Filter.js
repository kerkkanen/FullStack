import React from 'react';

const Filter = ({searched, handleSearch}) => {
    return (
        <div>
            find countries <input value={searched}
            onChange={handleSearch}
            />
        </div>
    )
  }

export default Filter;