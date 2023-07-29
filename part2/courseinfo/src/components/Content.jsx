import React from 'react'
import Part from './Part'

const Content = (props) => {

    const parts = props.parts.map((part, i) => (
        <Part key={i} part={part.name} exercise={part.exercises} />
    ))
    
  return (
    <>
        {parts}
    </>
  )
}

export default Content
