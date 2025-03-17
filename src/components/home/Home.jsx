import { Link } from 'react-router-dom'
import './Home.sass'
import { useState, useEffect } from 'react'

function Home({data, search, affichage}) {

    const [pokemons, setPokemons] = useState(data)
    
    

    useEffect(() => {
        setPokemons(
            data.filter(pokemon => pokemon.name.toLowerCase().includes(search.toLowerCase()))
        )
    }, [data, search])

    return(
        <div id='home'>
            <h1 className='text-center text-4xl mb-15 mt-5'>POKEDEX</h1>
            <div id='card' className='flex flex-wrap w-full justify-evenly gap-5'>

            {pokemons.map((pokemon, index) => (
                <div key={index} className='text-center'>
                    <Link to={`/detail/${pokemon.id}`} onClick={affichage}>
                    <div id='pokemon'>

                <img src={pokemon.image} alt="" className='m-auto'/>
                <p className='text-2xl'>{pokemon.id} : {pokemon.name}</p>
                    </div>

                    </Link>
                </div>
            ))}
            </div>
        </div>
    )
}

export default Home
