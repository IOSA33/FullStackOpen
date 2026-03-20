import {useState, useEffect} from 'react'
import axios from 'axios'

const Form = ({ filter, onChangeFilter }) => {
  return (
    <div>
      find countries <input value={filter} onChange={onChangeFilter}></input>
    </div>
  )
}

const RenderCountries = ({ countriesList, oneCountry, buttonOnChange }) => {
  if (countriesList.length > 10) {
    return ( 
      <div> Too many mathces, specify another filter </div>
    )
  } 
  if (oneCountry !== null) {
    return (
      <div>
        <h1> {oneCountry.name.common} </h1>
        <p> Capital {oneCountry.capital} </p>
        <p> Area {oneCountry.area} </p>
        <h1> Languages </h1>
        {Object.values(oneCountry.languages).map(language => (
          <ul key={language}>
             <li>{language}</li>
          </ul>
        ))}
        <img src={oneCountry.flags.png} alt="flag" />
      </div>
    )    
  }
  return (
    <div>
      {countriesList.map((country) => {
        return (
          <li key={country.name.common}>
            {country.name.common} <button onClick={() => buttonOnChange(country.name.common)}>Show</button>
          </li>
        )
      })}
    </div>
  )
}

const App = () => {
  const [filter, setFilter] = useState("")
  const [matches, setMatches] = useState([])
  const [oneCountry, setOneCountry] = useState(null)

  const handleFilterChange = event => {
    setFilter(event.target.value)
  }

  useEffect(() => {
      axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`).then(response => {
        setMatches(response.data)
      }).catch(() => setMatches([]))
  }, [])

  let filteredList = []
  if (filter.length !== 0) {
    filteredList = matches.filter(country =>
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    )
  }

  const handleShowCountry = (country) => {
    setFilter(country.toLowerCase())
  }

  let countryForUseEffect
  if(filteredList.length === 1) {
    countryForUseEffect = filteredList[0].name.common
  }
  
  useEffect(() => {
    if (filteredList.length === 1) {
      axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryForUseEffect}`).then(response => {
        setOneCountry(response.data)
      }).catch(() => setOneCountry(null)) 
    } else {
      setOneCountry(null)
    }
  }, [countryForUseEffect])

  return (
    <div>
      <Form filter={filter} onChangeFilter={handleFilterChange}/>

      <RenderCountries countriesList={filteredList} oneCountry={oneCountry} buttonOnChange={handleShowCountry} />
    </div>
  )
}

export default App