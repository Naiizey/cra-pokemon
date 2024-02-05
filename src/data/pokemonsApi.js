import { writeFileSync } from 'fs'

const PokemonsApi = async () => {
    let url = "https://pokeapi.co/api/v2/pokemon?limit=1302"
    const response = await fetch(url);
    if(!response.ok){
        throw new Error(`Erreur HTTP : ${response.status}`);
    }
    const data = await response.json();
    const pokemonPromises = data.results.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        if(!response.ok){
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const json = await response.json();
        let name = json.name;
        name = name.charAt(0).toUpperCase() + name.substring(1)
        return {
            id: json.id,
            name,
            height: json.height,
            weight: json.weight,
            sprites: {
                default: json.sprites.other.showdown["front_default"] ? json.sprites.other.showdown["front_default"] : json.sprites["front_default"],
                shiny: json.sprites.other.showdown["front_shiny"] ? json.sprites.other.showdown["front_shiny"] : json.sprites["front_shiny"]
            },
            types: json.types.map((elem) => (
                {
                    name: elem.type.name,
                    url: `https://github.com/msikma/pokesprite/blob/master/misc/types/gen8/${elem.type.name}.png?raw=true`
                }
            ))
        };
    });
    const pokemons = await Promise.all(pokemonPromises);
    writeFileSync("cra-pokemon/src/data/pokemonsApi.json", JSON.stringify(pokemons), 'UTF-8')
}

PokemonsApi();