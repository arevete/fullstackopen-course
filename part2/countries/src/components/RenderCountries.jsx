import SingleCountry from "./SingleCountry"

const RenderCountries = ({countries, handleSelection}) => {
    if(countries.length > 10) return <p>muchas coincidencias, se más especifico</p>

    if(countries.length === 1) return <SingleCountry country={countries[0]}/>

    return (
        <>
            {countries.map(c => 
                <p key={c.cca3}>{c.name.common} <button onClick={() => handleSelection(c.name.common)}>Show</button></p>
            )}
        </>
    )
}

export default RenderCountries