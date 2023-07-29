import React from 'react'

const Filter = ({search, handleChange}) => {
  return (
    <div>filter shown with <input name='search' value={search} onChange={handleChange}/></div>
  )
}

export default Filter