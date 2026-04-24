const Filter = ({ filterBy, handleFilter}) => {
    return (
        <p>filter shown with <input value={filterBy} onChange={handleFilter}/></p>
    )
}

export default Filter