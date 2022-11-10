import React from 'react';

const Person = ({person, handleDelete}) => {
    return (
      <div>
        <p>
        {person.name} {person.number}  <button onClick={(event) => handleDelete(person.id, person.name)} >Delete</button>
        
        </p>
      </div>
    )
  }

  export default Person;