import { useEffect, useState } from 'react'
import ContactForm from './components/ContactForm'
import Filter from './components/Filter'
import Contacts from './components/Contacts'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterBy, setFilterBy] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    if(!persons.map( person => person.name ).includes(newName)){

      setPersons(persons.concat({
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }))

      setNewName('')
      setNewNumber('')

    }else{
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilterBy(event.target.value)
  }

  const filteredList = filterBy 
      ? persons.filter(person => person.name.toLowerCase().includes(filterBy.toLowerCase())) 
      : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterBy={filterBy} handleFilter={handleFilter}/>
      <h2>add a new</h2>
      <ContactForm newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Contacts people={filteredList}/>
    </div>
  )
}

export default App