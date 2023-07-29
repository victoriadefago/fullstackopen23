import React, { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if(persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} is already added to phonebook.`)
      setNewName('')
      setNewNumber('')
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const handleChange = (event) => {
    if (event.target.name === "name") {
        setNewName(event.target.value);
    } else if (event.target.name === "number") {
        setNewNumber(event.target.value);
    } else if (event.target.name === "search") {
        setSearch(event.target.value);
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Search</h3>
      <Filter search={search} handleChange={handleChange}/>
      <h3>Add a new</h3>
      <PersonForm handleSubmit={handleSubmit} handleChange={handleChange} newName={newName} newNumber={newNumber} />
      <h3>Numbers</h3>
      <Persons persons={persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))} />
    </div>
  )
}

export default App
