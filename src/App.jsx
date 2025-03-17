import './App.sass'
import Detail from './components/detail/Detail'
import Home from './components/home/Home'
import Error from './components/error/Error'
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [affichage, setAffichage] = useState(true)
  const [filteredData, setFilteredData] = useState(null)

  const types = ["normal", "combat", "vol", "poison", "sol", "roche", "insecte", "spectre", "acier", "feu", "eau", "plante", "électrik", "psy", "glace", "dragon", "ténèbres", "fée"]

  useEffect(() => {
    axios.get('https://pokebuildapi.fr/api/v1/pokemon')
      .then(respons => {
        setData(respons.data)
        setFilteredData(respons.data)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
      })
  }, [])

  const filterByType = (type) => {
    if (type === 'tous') {
      setFilteredData(data)
    } else {
      axios.get(`https://pokebuildapi.fr/api/v1/pokemon/type/${type}`)
        .then(respons => {
          setFilteredData(respons.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  if (loading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  const cacherInput = () => {
    setAffichage(false)
    setSearch('')
  }

  return (
    <div id='app'>
      <Router>
        <div className='flex gap-5'>
          <NavLink to='/' onClick={() => { setAffichage(true) }}> <p>HOME</p> </NavLink>
          {affichage ?
            <>
              <input type="text" className="mb-5 pointer" onChange={(e) => setSearch(e.target.value)} placeholder='Search' />
              <div className='flex flex-wrap justify-center gap-6'>

              <button onClick={() => filterByType('tous')} className='cursor-pointer'>Tous</button>
              {types.map((type, index) => (
                <button key={index} onClick={() => filterByType(type)} className={`cursor-pointer ${type} type`}>{type}</button>
              ))}
              </div>
            </>
            :
            ''
          }
        </div>
        <Routes>
          <Route path='/' element={<Home data={filteredData} search={search} affichage={cacherInput} />} />
          <Route path='/detail/:id' element={<Detail data={data} />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App