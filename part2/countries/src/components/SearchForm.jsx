const SearchForm = ({country, handleChange}) => {
    return (
        <>
            <p>find countries</p>
            <input value={country} onChange={handleChange}/>
        </>
    )
}

export default SearchForm