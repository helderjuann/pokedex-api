         

var pokemonName = document.getElementById('pokemonName');
pokemonName.addEventListener('keyup',()=>{
    catchPokemons();
})

catchPokemons(151);

function catchPokemons(howMuch){

    fetch('https://pokeapi.co/api/v2/pokemon?limit='+howMuch)
    .then(response => response.json())
    .then(allpokemon => {

        var pokemons = [];

        allpokemon.results.map((val)=>{
            
            fetch(val.url)
            .then(response => response.json())
            .then(pokemonSingle => {
                pokemons.push({
                    name:val.name,
                    image:pokemonSingle.sprites.front_default
                });
                
                if(pokemons.length == howMuch){

                    var pokemonBoxes = document.querySelector('.box-wrapper');
                    pokemonBoxes.innerHTML = "";
                    pokemons.map(function(val){
                    pokemonBoxes.innerHTML+=`
                    <div class="box-pokemon">
                        <img src="`+val.image+`" />
                        <p>`+val.name+`</p>
                    </div>          
                    `;
    
                    })
                }
            })
        })
    })
}