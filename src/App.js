import AppStyle from './App.module.css'

import PokemonCard from './components/PokemonCard.component'
import PokemonDesc from './components/PokemonDesc.component'
import PokemonStar from './components/PokemonStar.component'

import Pokemons from './data/pokemonsApi.json'

import { useState, useEffect } from 'react';

const App = () => {
        let nbPokePage = 24;
        let startPokes = Pokemons.slice(0, nbPokePage);


        let [isPokeDesc, setIsPokeDesc] = useState(false);
        let [isShiny, setIsShiny] = useState(false);


        let [currButt, setCurrButt] = useState(0);
        let [startIndex, setStartIndex] = useState(0);

        let [search, setSearch] = useState("");

        let [dataPokes, setDataPokes] = useState(startPokes);
        let [avPokemons, setAvPokemons] = useState(Pokemons)

        let [currPoke, setCurrPoke] = useState(dataPokes[0])

        let pages = []

        for (let i = 1; i < avPokemons.length; i += nbPokePage) {
            pages.push(Math.ceil(i / nbPokePage));
        }

        let pokeDescReturn = () => {
            setIsPokeDesc(false)
        }

        let setShinyness = () => {
            setIsShiny(!isShiny)
        }

        useEffect(() => {
            console.log(`setAvPokemons : ${setAvPokemons(Pokemons.filter((elem) => (elem.name.toLowerCase().includes(search))))}`);
            console.log(`search : ${search}`);
            console.log(`setDataPokes : ${setDataPokes(avPokemons.slice(startIndex, startIndex + nbPokePage))}`);
        //eslint-disable-next-line
        }, [search, nbPokePage, startIndex]);

        useEffect(() => {
            setDataPokes(avPokemons.slice(startIndex, startIndex + nbPokePage));
        //eslint-disable-next-line
        }, [startIndex, nbPokePage, currButt])

        return ( 
            <section className = {AppStyle.App}>
                {
                    /* <header className={AppStyle["App-header"]}>
                                    <PokemonTitle title={"Mon pokedex"} className={AppStyle.title}/>
                                </header> */
                } 
                <form className = {AppStyle["App-form"]}>
                    { 
                        // TODO FIX SEARCH BAR 
                    }
                    <input 
                        list = "pokeSearch"
                        className = {
                            AppStyle["App-search-bar"]
                        }
                        placeholder = 'Recherche'
                        type = "search"
                        onChange = {() => {
                                setStartIndex(currButt)
                        }}
                        onInput = {
                            (e) => {
                                console.log(e.target.value === "");
                                console.log(`setSearch : ${setSearch((e.target.value).toLowerCase())}`)
                            }
                        }
                    />
                    <datalist id = "pokeSearch" >
                        { dataPokes.map((elem) => ( 
                            <option key = {elem.name}> { elem.name } </option>
                        ))}
                    </datalist>
                    { !isPokeDesc && ( 
                        <section className = {AppStyle["App-pokemons"]}>
                            {
                                dataPokes.map((pokemon) => ( 
                                    <PokemonCard
                                        pokemon = {pokemon}
                                        key = {
                                            pokemon.name
                                        }
                                        isShiny = {
                                            isShiny
                                        }
                                        onClick = {
                                            () => {
                                                setIsPokeDesc(!isPokeDesc);
                                                setCurrPoke(pokemon)
                                            }
                                        }
                                    />
                                ))
                            }
                            <button className={AppStyle["App-shiny"]} type="button" onClick={setShinyness}><PokemonStar fill={isShiny ? "gold" : "gray"}/></button>
                        </section>
                    )}
                    { isPokeDesc && ( 
                        <section className = {AppStyle["App-poke-desc"]}>
                            <PokemonDesc 
                                pokemon = {currPoke}
                                isShiny = {isShiny}
                                setShinyness = {setShinyness}
                                setIsDesc = {pokeDescReturn}
                            /> 
                        </section>
                        )
                    }
                    <ul className = {AppStyle["App-buttons-ul"]}> {
                        pages.map((elem) => ( 
                            <button 
                                type = "button"
                                key = {elem}
                                className = {`${AppStyle["App-button"]} ${currButt === elem-1 && AppStyle["App-curr-butt"]}`}
                                onClick = {() => {
                                    setIsPokeDesc(false);
                                    setStartIndex((elem - 1) * nbPokePage);
                                    setCurrButt(elem - 1)
                                }}
                            >
                                {elem}
                            </button> 
                        ))
                    }
                    </ul>
                </form>
            </section>  
        )
    };

export default App;