import { useState, useEffect } from 'react'
import contactService from './services/contacts'
import Filter from './components/Filter'
import Add from './components/Add'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searched, setSearched] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    contactService
    .getAll()
    .then(initialContacts => {
      setPersons(initialContacts)
    })
  }, [])

  const addNew = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }
    
    if (persons.some((person) => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatablePerson = persons.find(p => p.name == newName)
        const changedPerson = {...updatablePerson, number: newNumber}

        contactService
        .update(changedPerson.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
          setSuccessMessage(`Updated ${newName}`)

          setTimeout(() => {
          setSuccessMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(
            `Information of ${newName} has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
            }, 5000)

          setPersons(persons.filter(p => p.id !== updatablePerson.id))
          setNewName('')
          setNewNumber('')

          return
          
        })        
        
      }
      setNewName('')
      setNewNumber('')

      return
      
    }
    contactService
    .create(person)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
    setNewName('')
    setNewNumber('')
    })

    setSuccessMessage(`Added ${newName}`)

    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)

    setPersons(persons.concat(person))
    
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)

  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {    
    setSearched(event.target.value)    
    
  }

  const handleDelete = (id, name) => {    
    if (window.confirm((`Delete ${name}?`))) {
      contactService
      .remove(id)

      setErrorMessage(`Deleted ${name}`)

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

      setPersons(persons.filter(person => person.id !==id))

    }

    
  }

  const personsToShow = searched === '' ? persons : persons.filter((person) => person.name.toLocaleLowerCase().includes(searched.toLocaleLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} className="success"/>
      <Notification message={errorMessage} className="error"/>
      <Filter searched={searched} handleSearch={handleSearch}/>
      
      <h2>Add a new</h2>
      <Add addNew={addNew} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>

      <h2>Numbers</h2>
        <Persons personsToShow={personsToShow} handleDelete={handleDelete}/>
    </div>
  )

}

export default App