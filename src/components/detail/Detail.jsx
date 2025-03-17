import { Link, useParams } from 'react-router-dom'
import './Detail.sass'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Detail({ data }) {
    const { id } = useParams()
    const [types, setTypes] = useState(null)
    const [loading, setLoading] = useState(true)
    const [evo, setEvo] = useState(0)
    const [evo2, setEvo2] = useState(0)
    const [pokemonEvo, setPokemonEvo] = useState(null)
    const [pokemonEvo2, setPokemonEvo2] = useState(null)
    const [pokemonPreEvo, setPokemonPreEvo] = useState(null)
    const [pokemonPreEvo2, setPokemonPreEvo2] = useState(null)
    const [preevo, setPreevo] = useState(0)
    const [preevo2, setPreevo2] = useState(0)
    const [pokemon, setPokemon] = useState(null)

    // Récupérer le Pokémon actuel en fonction de l'ID
    useEffect(() => {
        const selectedPokemon = data.find((e) => e.id === parseInt(id))
        setPokemon(selectedPokemon)
    }, [id, data])

    // Charger les types
    useEffect(() => {
        axios.get('https://pokebuildapi.fr/api/v1/types')
            .then(respons => {
                setTypes(respons.data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }, [])

    // Mettre à jour les évolutions et pré-évolutions
    useEffect(() => {
        if (pokemon && pokemon.apiEvolutions && pokemon.apiEvolutions.length >= 1) {
            setEvo(pokemon.apiEvolutions[0].pokedexId)
        } else {
            setEvo(0)
        }

        if (pokemon && pokemon.apiPreEvolution) {
            setPreevo(pokemon.apiPreEvolution.pokedexIdd)
        } else {
            setPreevo(0)
        }

        if (pokemonEvo && pokemonEvo.apiEvolutions && pokemonEvo.apiEvolutions.length >= 1) {
            setEvo2(pokemonEvo.apiEvolutions[0].pokedexId)
        } else {
            setEvo2(0)
        }

        if (pokemonPreEvo && pokemonPreEvo.apiPreEvolution) {
            setPreevo2(pokemonPreEvo.apiPreEvolution.pokedexIdd)
        } else {
            setPreevo2(0)
        }
    }, [pokemon, pokemonEvo, pokemonPreEvo])

    useEffect(() => {
        if (evo) {
            axios.get(`https://pokebuildapi.fr/api/v1/pokemon/${evo}`)
                .then(respons => {
                    setPokemonEvo(respons.data)
                })
                .catch(error => {
                    console.log(error)
                })
        }

        if (evo2) {
            axios.get(`https://pokebuildapi.fr/api/v1/pokemon/${evo2}`)
                .then(respons => {
                    setPokemonEvo2(respons.data)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, [evo, evo2])

    useEffect(() => {
        if (preevo) {
            axios.get(`https://pokebuildapi.fr/api/v1/pokemon/${preevo}`)
                .then(respons => {
                    setPokemonPreEvo(respons.data)
                })
                .catch(error => {
                    console.log(error)
                })
        }

        if (preevo2) {
            axios.get(`https://pokebuildapi.fr/api/v1/pokemon/${preevo2}`)
                .then(respons => {
                    setPokemonPreEvo2(respons.data)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }, [preevo, preevo2])

    if (loading) {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }

    if (!pokemon) {
        return <div>Pokemon not found</div>
    }

    const prevId = pokemon.id === 1 ? 898 : pokemon.id - 1
    const nextId = pokemon.id === 898 ? 1 : pokemon.id + 1

    return (
        <div id='detail'>
            <div className='flex justify-center gap-30'>
                <div className='arrow flex items-center'>
                    <Link to={`/detail/${prevId}`}>
                        <i className="bi bi-chevron-left text-5xl"></i>
                    </Link>
                </div>
                <div id='card' className='flex justify-center gap-20 mt-25 pr-20'>
                    <div id='leftCard'>
                        <div id='image' className='w-50 m-auto mt-10 pb-10'>
                            <p className='text-center text-xl'>{pokemon.name}</p>
                            <img src={pokemon.image} alt={pokemon.name} />
                            <p className='text-center pt-5'>n° {pokemon.id}</p>
                        </div>
                        <div id='sprite'>
                            <img src={pokemon.sprite} alt={pokemon.name} className='m-auto mt-5' />
                        </div>
                    </div>
                    <div id='rightCard' className='p-5'>
                        <div id='type' className='flex justify-center gap-5'>
                            {pokemon.apiTypes.map((type, index) => (
                                <div key={index} className='text-center'>
                                    <img src={type.image} alt={type.name} className='w-10 m-auto' />
                                    <p>{type.name}</p>
                                </div>
                            ))}
                        </div>
                        <div id='resistances' className='flex flex-wrap justify-center gap-3 mt-10 text-center'>
                            {pokemon.apiResistances.map((res, index) => (
                                <div key={index}>
                                    <img src={types[index].image} alt={res.name} className='w-10 m-auto' />
                                    {res.name}
                                    <p className={res.damage_multiplier > 1 ? 'bg-red-500' : res.damage_multiplier < 1 ? 'bg-green-500' : ''}>x{res.damage_multiplier}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='arrow flex items-center'>
                    <Link to={`/detail/${nextId}`}>
                        <i className="bi bi-chevron-right text-5xl"></i>
                    </Link>
                </div>
            </div>
            {evo || preevo ? (
                <div id='evolution'>
                    <h1 className='text-center mt-10'>EVOLUTION</h1>
                    <div className='flex justify-center gap-40 text-center items-center'>
                        {preevo2 && pokemonPreEvo2 ? (
                            <div>
                                <p>n° {pokemonPreEvo2.id} : {pokemonPreEvo2.name}</p>
                                <img src={pokemonPreEvo2.image} alt="" className='w-50' />
                            </div>
                        ) : (
                            ''
                        )}
                        {preevo && pokemonPreEvo ? (
                            <div className='flex justify-center gap-40'>
                                <div>
                                    <p>n° {pokemonPreEvo.id} : {pokemonPreEvo.name}</p>
                                    <img src={pokemonPreEvo.image} alt="" className='w-50' />
                                </div>
                                <div>
                                    <p>n° {pokemon.id} : {pokemon.name}</p>
                                    <img src={pokemon.image} alt="" className='w-50' />
                                </div>
                            </div>
                        ) : (
                            <div>
                                <p>n° {pokemon.id} : {pokemon.name}</p>
                                <img src={pokemon.image} alt="" className='w-50' />
                            </div>
                        )}
                        {evo && pokemonEvo ? (
                            <div>
                                <p>n° {pokemonEvo.id} : {pokemonEvo.name}</p>
                                <img src={pokemonEvo.image} alt="" className='w-50' />
                            </div>
                        ) : (
                            ''
                        )}
                        {evo2 && pokemonEvo2 ? (
                            <div>
                                <p>n° {pokemonEvo2.id} : {pokemonEvo2.name}</p>
                                <img src={pokemonEvo2.image} alt="" className='w-50' />
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            ) : (
                <p>Aucune évolution ou pré-évolution disponible</p>
            )}
        </div>
    )
}

export default Detail