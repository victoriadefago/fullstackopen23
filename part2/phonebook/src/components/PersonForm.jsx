import React from 'react'

const PersonForm = ({handleSubmit, handleChange, newName, newNumber}) => {
  return (
    <>
        <form onSubmit={handleSubmit}>
            <div>name: <input onChange={handleChange} name='name' value={newName} /></div>
            <div>number: <input onChange={handleChange} name='number' value={newNumber} /></div>
            <div><button type="submit">add</button></div>
        </form>
    </>
  )
}

export default PersonForm