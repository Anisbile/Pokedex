//dependencies
const express = require('express');
const pokemon = require('./models/pokemon');

//app express
const app = express();
const methodOverride = require("method-override")

require('dotenv').config();


//middleware
app.use(express.static('public'))
app.use(express.json()); 
app.use(methodOverride('_method'))

app.use(express.urlencoded({ extended: false }));

//Index Route

app.get('/pokemon', (req, res) => {
    res.render('index.ejs', {
        allPokemons: pokemon
    });
});

//New Route

app.get('/pokemon/new', (req, res) => {
    res.render('new.ejs');
});

//Delete Route

app.delete('/pokemon/:indexOfPokemonArray', (req, res) => {
    console.log(req.method)
    pokemon.splice(req.params.indexOfPokemonArray, 1)
    res.redirect('/pokemon')
})

//Update Route

app.put('/pokemon/:indexOfPokemonArray', (req, res) => {
    console.log('Update route has been accessed')
    pokemon[req.params.indexOfPokemonArray] = req.body
    res.redirect("/pokemon")
})

//Create Route

app.post('/pokemon', (req, res) => {
    pokemon.push(req.body);
    res.redirect('/pokemon');
});


//Edit Route

app.get('/pokemon/:indexOfPokemonArray/edit', (req, res) => {
    res.render(
        "edit.ejs",
        {
            pokemon: pokemon[req.params.indexOfPokemonArray],
            index: req.params.indexOfPokemonArray
        }
    )
})



//Show Route

app.get('/pokemon/:indexOfPokemonArray', (req, res) => {
    res.render('show.ejs', {
        pokemon: pokemon[req.params.indexOfPokemonArray]
    });
});




const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Express is listening on port:${port}`);
});
