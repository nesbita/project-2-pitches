const express = require('express');
const axios = require('axios');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const port = 4000 

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public/'))

app.get('/', (req, res) => {
    res.render('index')
})

app.use('/markets', require('./routes/markets'))

app.listen(port, () => {
    console.log('...listening on', port );
});