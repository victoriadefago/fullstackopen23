const Filter = ({search, handleChange}) => {
  return (
    <>
        <div>filter: <input onChange={handleChange} value={search} /></div>
    </>
  )
}

export default Filter