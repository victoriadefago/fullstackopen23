import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import personService from './services/persons'


const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
      .catch(err => {
        console.log(err)
      })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    if(persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      const person = persons.find(pers => pers.name === newName)
      const result = window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)
      if(result){
        const changedPerson = {
          ...person,
          number: newNumber
        }
        personService
          .update(person.id, changedPerson)
          .then(updatedPerson => {
            setPersons(persons.map(pers => pers.id !== updatedPerson.id ? pers : updatedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(err => console.log(err))
      }
    } else {

      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(err => {
          console.log(err)
        })
    }
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

  const handleDelete = person => {
    const result = window.confirm(`Delete ${person.name} from phonebook?`)
    if(result){
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(pers => pers.id !== person.id))
        })
        .catch(err => console.log(err))
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
      <Persons persons={persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))} handleDelete={handleDelete} />
    </div>
  )
}

export default App
