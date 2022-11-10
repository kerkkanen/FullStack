import React from 'react';

const Filter = ({searched, handleSearch}) => {
    return (
        <div>
            filter shown with <input value={searched}
            onChange={handleSearch}
          />
        </div>
    )
  }

export default Filter;