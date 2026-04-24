import { useState } from 'react'
import ContactForm from './components/ContactForm'
import Filter from './components/Filter'
import Contacts from './components/Contacts'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterBy, setFilterBy] = useState('')

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

  const filteredList = filterBy ? 
      persons.filter(person => person.name.toLowerCase().includes(filterBy.toLowerCase())) : 
      persons

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