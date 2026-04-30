const Contact = ({person, hanldeClick}) => {
    return (
        <>
            <p>
                {person.name} {person.number}
                <button onClick={() => hanldeClick(person.id)}>delete</button>
            </p>
        </>
    )
}

const Contacts = ({ people, deleteContact}) => {
    return (
        <>
        {people.map((person) =>
            <Contact key={person.id} person={person} hanldeClick={deleteContact}/>
        )}
        </>
    )
}

export default Contacts