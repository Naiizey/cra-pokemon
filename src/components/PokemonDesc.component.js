import PokeDescStyle from './PokemonDesc.module.css'

import Star from './PokemonStar.component'

import PropTypes from 'prop-types';

const PokeDesc = ({pokemon, isShiny, setShinyness, setIsDesc}) => (
    <section className={PokeDescStyle["PokeDesc-main"]}>
        <aside>
            <img className={PokeDescStyle["PokeDesc-sprite"]} src={!isShiny ? pokemon.sprites.default : pokemon.sprites.shiny} alt={pokemon.name}/>
        </aside>
        <section className={PokeDescStyle["PokeDesc-infos"]}>
            <h2 className={PokeDescStyle["PokeDesc-name"]}>{pokemon.name}</h2>
            <h4 className={PokeDescStyle["PokeDesc-id"]}>Pokemon n°{pokemon.id}</h4>
            <h4>Types :</h4>
            <section className={PokeDescStyle["PokeDesc-types"]}>
                {pokemon?.types.map((type) => (
                    <aside key={type.name} className={PokeDescStyle["PokeDesc-type"]}>
                        <img src={type.url} alt={type.name} className={PokeDescStyle["PokeDesc-type-image"]}/>
                        <p className={PokeDescStyle["PokeDesc-type-text"]}>{type.name}</p>
                    </aside>
                ))}
            </section>
            <h4 className={PokeDescStyle["PokeDesc-height"]}>Taille : {pokemon.height/10}m</h4>
            <h4 className={PokeDescStyle["PokeDesc-weight"]}>Poids : {pokemon.weight/10}kg</h4>
            <button className={PokeDescStyle["PokeDesc-shiny"]} type="button" onClick={setShinyness}><Star fill={isShiny ? "gold" : "gray"}/></button>
        </section>
        <button className={PokeDescStyle["PokeDesc-close-butt"]} type="button" onClick={setIsDesc}>&#8617;</button>
    </section>
);

PokeDesc.propTypes = {
    pokemon: PropTypes.object,
    isShiny: PropTypes.bool,
    setShinyness: PropTypes.func,
    setIsDesc: PropTypes.func
}

export default PokeDesc;