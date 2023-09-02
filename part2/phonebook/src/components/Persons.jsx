import React from 'react'

const Persons = ({persons, handleDelete}) => {
  return (
    <>
      {persons.map(person => (
        <p key={person.name}>{person.name} {person.number} {' '}<button type="button" onClick={() => handleDelete(person)}>delete</button></p>
      ))}
    </>
  )
}

export default Persons