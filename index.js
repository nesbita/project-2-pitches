const express = require('express');
const axios = require('axios');
const ejsLayouts = require('express-ejs-layouts');
const db = require('./models');
const app = express();
const PORT = 4000 
const methodOverride = require('method-override')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public/'))

// displays current user favorites from db
// app.get('/favorite', (req, res) => {
//     let currentUser = req.query.user

// (HOME) Home index.ejs route
app.get('/', (req, res) => {
    res.render('index')
});

app.use('/', require('./routes/markets'))

app.listen(PORT, () => {
    console.log('...listening on', PORT);
})

