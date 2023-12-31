import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Message from './components/Message'
import personService from './services/persons'


const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ message, setMessage ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
      .catch(err => {
        console.log(err)
      })
  }, [])

  const handleMessage = (message, type) => {
    if(type !== 'error') {
        setNewName('');
        setNewNumber('');
    }
    setMessage({
        message: message,
        type: type
    })
    setTimeout(() => {
        setMessage(null)
    }, 5000)
  }

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
            handleMessage(`${updatedPerson.name} is already updated`, 'inform')
          })
          .catch(err => {
            console.log(err)
            console.log(err.response.data.error)
            if(err.name === 'ValidationError' || err.name === 'AxiosError'){
              handleMessage(err.response.data.error, 'error')
            } else {
              handleMessage(`${err.message}. Information of ${person.name} has already been removed from server`, 'error')
            }
          })
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
          handleMessage(`Added ${returnedPerson.name}`, 'inform')
        })
        .catch(err => {
          console.log(err)
          console.log(err.response.data.error)
          if(err.name === 'ValidationError' || err.name === 'AxiosError'){
            handleMessage(err.response.data.error, 'error')
          } else {
          handleMessage(err.message, 'error')
          }
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
          handleMessage(`Deleted ${person.name}`, 'inform')
        })
        .catch(err => {
          console.log(err)
          handleMessage(`${err.message}. Information of ${person.name} has already been removed from server`, 'error')
        })
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Message message={message} />
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
