const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

//DOM constants 
const trainersContainer = document.querySelector('main')


//API functions 
//get trainers 
const getTrainers = () => fetch(TRAINERS_URL).then(res => res.json())
const postPokemon = (trainer_id) => 
fetch(POKEMONS_URL,{
    method:'POST', 
    headers: {
        'Content-Type': 'application/json', 
        'Accept': 'application/json'
    }, 

    body: JSON.stringify({trainer_id})
    //dont need trainer_id if the id name is same as trainer
    
    }).then(res => res.json())
    const deletePokemon = pokemon_id => 
    fetch(`${POKEMONS_URL}/${pokemon_id}`,{ 
        method: 'DELETE'

    }).then(resp => resp.json())


//DOM Manipulation 
//array of trainers 

const renderTrainers = trainers => trainers.forEach(trainer => renderTrainer(trainer))


//rendering pokemon

const renderPokemon = (pokemon, parentEl, callback) => {
    const li = document.createElement('li')
    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    const releaseButton = document.createElement('button')
    releaseButton.innerText ='Release'
    releaseButton.className = 'release'

    releaseButton.addEventListener('click', () => 
    deletePokemon(pokemon.id).then(pokemon => li.remove())).then(callback)

    li.insertAdjacentElement('beforeend', releaseButton)
    parentEl.append(li)

}

const createAddPokemonButton = (trainer_id, pokemonParentEl, callback) => { 
    const addPokemonButton = document.createElement('button')
    addPokemonButton.innerText ='Add Pokemon'

    addPokemonButton.addEventListener('click',() =>
    postPokemon(trainer_id).then(console.log)
    )
    postPokemon(trainer_id).then(pokemon => renderPokemon(pokemon, pokemonParentEL))
    callback(pokemon)

    return addPokemonButton
}


const toggleAbilityOfAddButton = ( trainer, button) => 
(button.disabled = trainer.pokemons.length >=6)

const renderTrainer = trainer => { 

const div = document.createElement('div')
div.className = 'card'

const p = document.createElement('p')
p.innerText = trainer.name

const ul = document.createElement('ul')


// iterating over pokemon 
trainer.pokemons.forEach(pokemon => renderPokemon(pokemon, ul, () => { 
  trainer.pokemons = trainer.pokemons.filter(p => p.id !== pokemon.id)  
}))

const addPokemonButton = createAddPokemonButton(trainer.id, ul, (pokemon) => {
    trainer.pokemons.push(pokemon)
toggleAbilityOfAddButton(trainer , addPokemonButton)
}
) 

toggleAbilityOfAddButton(trainer , addPokemonButton)



div.append(p, addPokemonButton, ul)

trainersContainer.append(div)

}
getTrainers().then(trainers => renderTrainers(trainers))