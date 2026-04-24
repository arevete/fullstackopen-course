const Contact = ({person}) => {
    return (
        <p>
            {person.name} {person.number}
        </p>
    )
}

const Contacts = ({people}) => {
    return (
        <>
        {people.map((person) => 
            <Contact key={person.id} person={person}/>
        )}
        </>
    )
}

export default Contacts