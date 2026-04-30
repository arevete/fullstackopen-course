import { useEffect, useState } from 'react'
import ContactForm from './components/ContactForm'
import Filter from './components/Filter'
import Contacts from './components/Contacts'
import PersonService from './services/contacts'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterBy, setFilterBy] = useState('')

  useEffect(() => {
    PersonService
      .getAll()
      .then(initContacts =>
        setPersons(initContacts)
      )
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.find( p => p.name === newName)
    if(!person){

      const personObject = {
        name: newName,
        number: newNumber,
      }
      

      PersonService
        .create(personObject)
        .then(savedNote => {
          setPersons(persons.concat(savedNote))
          setNewName('')
          setNewNumber('')
        })
    }else{
      updatePerson(person)
    }
  }

  const updatePerson = (person) => {
    if(window.confirm(`update ${newName} phone number to ${newNumber}`)){
        const changedContact = {...person, number: newNumber}
        
        PersonService
          .update(changedContact.id, changedContact)
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id === updatedPerson.id ? updatedPerson : p ))
            setNewName('')
            setNewNumber('')
          })
    }
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)

    if(window.confirm(`delete ${person.name}`)){
      PersonService
        .remove(id)
        .then(deletedPerson => {
          setPersons(persons.filter(p => p.id != deletedPerson.id))
        })
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
      <Contacts people={filteredList} deleteContact={deletePerson}/>
    </div>
  )
}

export default App