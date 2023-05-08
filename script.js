const modeSwitch = document.getElementById('input-mode-switch');

modeSwitch.addEventListener('click', checkMode);

function checkMode(){
    if(modeSwitch.checked){
        darkModeOn();
    } else {
        darkModeOff();
    }
}

function darkModeOn(){
    document.querySelector('html').classList.add('dark-mode');
}

function darkModeOff(){
    document.querySelector('html').classList.remove('dark-mode');
}




const pokeContainer = document.querySelector("#pokeContainer");
const pokemonCount = 649
const colors = {
    fire: '#f2985c',
    grass: '#9bcc50',
    electric: '#eed535',
    water: '#4592c4',
    ground: '#b29e45',
    rock: '#8e8b8b',
    fairy: '#fdb9e9',
    poison: '#B97FC9',
    bug: '#729F3F',
    dragon: '#53A4CF',
    psychic: '#F366B9',
    flying: '#BDB9B8',
    fighting: '#D56723',
    normal: '#A4ACAF'
}

const mainTypes = Object.keys(colors);

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemons(i)
    }
}

const getPokemons = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`

    
    const resp = await fetch(url)
    const data = await resp.json() 
    createPokemonCard(data)
   
}

const createPokemonCard = (poke) => {
    const card = document.createElement('div')
    card.classList.add("pokemon")

    const name = poke.name[0].toUpperCase() + poke.name.slice(1)
    const id = poke.id.toString().padStart(3, '0')

    const pokeTypes = poke.types.map(type => type.type.name)
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1)
    const color = colors[type]

    card.style.backgroundColor = color
    const pokemonInnerHTML = `        

        <div class="imgContainer">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${poke.id}.gif" alt="${name}">
        </div>

        <div class="info">
            <span class="number">#${id}</span>
            <h3 class="name">${name}</h3>
            <small class="type">Tipo: <span>${type}</span></small>
        </div>
    ` 
    card.innerHTML = pokemonInnerHTML

    pokeContainer.appendChild(card)
}

fetchPokemons()

