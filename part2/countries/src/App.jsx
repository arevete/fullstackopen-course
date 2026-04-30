import { useState, useEffect } from "react"
import SearchForm from "./components/SearchForm"
import CountryService from "./services/countries"
import RenderCountries from "./components/RenderCountries"


const App = () => {
  const [searchCountry, setSearchCountry] = useState('')
  const [countriesList, setCountriesList] = useState([])
  const [single, setSingle] = useState(null)

  useEffect(() =>{
    CountryService
      .getAll()
      .then(list => {
        setCountriesList(list)
      })
  }, [])

  const handleChange = (event) => {
    if(countriesList.length === 1){ 
      CountryService
        .getAll()
        .then(list => {
          setCountriesList(list)
        })}
    setSingle(null)
    setSearchCountry(event.target.value)
  }

  const filteredList = !single ? countriesList.filter(c => c.name.common.toLowerCase().includes(searchCountry.toLowerCase())) : [single]

  const handleSelection = (name) => {
    CountryService
      .getByName(name.toLowerCase())
      .then(c => {
        setSingle(c)
      })
  }

  return (
    <div>
      <h2>Countries</h2>
      <SearchForm country={searchCountry} handleChange={handleChange}/>
      <RenderCountries countries={filteredList} handleSelection={handleSelection}/>
    </div>
  )
}

export default App