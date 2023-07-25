import React from 'react'

const Total = (props) => {

  let total = 0
  props.parts.forEach(part => total += part.exercises)

  return (
    <>
        <p>Number of exercises {total}</p>
    </>
  )
}

export default Total