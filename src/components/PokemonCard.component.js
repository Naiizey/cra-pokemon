import PokecardStyle from './PokemonCard.module.css'

import PropTypes from 'prop-types';

const Pokecard = ({pokemon, onClick, isShiny}) => {
    return (
        <section key={pokemon.name} className={PokecardStyle["PokemonCard"]} onClick={onClick}>
            <img src={!isShiny ? pokemon.sprites.default : pokemon.sprites.shiny} alt={pokemon.name} className={PokecardStyle["PokemonCard-image"]} loading="lazy"/>
            <h2 className={PokecardStyle["PokemonCard-name"]}>{pokemon.name}</h2>
            <section className={PokecardStyle["PokemonCard-types"]}>
            {pokemon?.types.map((type) => (
                <aside key={type.name} className={PokecardStyle["PokemonCard-type"]}>
                    <img src={type.url} alt={type.name} className={PokecardStyle["PokemonCard-type-image"]} loading="lazy"/>
                    <p className={PokecardStyle["PokemonCard-type-text"]}>{type.name}</p>
                </aside>
            ))}
            </section>
        </section>
    )
};

Pokecard.propTypes = {
    pokemon: PropTypes.object,
    onClick: Function,
    isShiny: PropTypes.bool
};

export default Pokecard;