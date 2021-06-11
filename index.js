const express = require('express');
const axios = require('axios');
const ejsLayouts = require('express-ejs-layouts');
const db = require('./models');
const app = express();
const port = 4000 
const methodOverride = require('method-override')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public/'))


app.get('/', (req, res) => {
    res.render('index')
});

// redirect to /list page after clicking button on home page 
app.get('/list', (req, res) => {
    console.log(req.query)
  let apiUrl1 = `http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=${req.query.zipcode}`;
  axios.get(apiUrl1).then(apiResponse => {
    let farmMarket = apiResponse.data.results;
    res.render('list', { farmMarket, name:req.query.name, zipcode:req.query.zipcode });
    // console.log('it worked! 🐸 ')
  })
});

app.get('/details/:id', (req, res) => {
  let apiUrl2 = `http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=${req.params.id}`;
  axios.get(apiUrl2).then(apiResponse => {
    console.log(apiResponse.data)
    let farmMarketData = apiResponse.data;
    res.render('details', { farmMarketData, name:req.query.name, zipcode:req.query.zipcode, id:req.params.id, marketname:req.query.marketname });
  })
    console.log('🐧')
})

app.get('/favorite', (req, res) => {
    // Get all records from the DB of pokemons
    db.favorite.findAll()
      .then(result => {
        // render pokemon/index.ejs with returned pokemon data
        res.render('favorite', { favorites: result })
      })
  });

app.post('/favorite', (req, res) => {
    let marketName = req.body.marketname
    db.favorite.findOrCreate({
        where: {
            name: marketName

        }
    })
        .then((data) => {
            res.redirect('/favorite');
            console.log(data)
        })
        
        .catch((err) => {
            console.log('ahhhhh!')
        })
    });
  
app.delete('/favorite/:name', (req, res) => {
        console.log(req.params.name)
        // req.params.name
        res.redirect('favorite')
    })

    
    // find or create user
    // create a market and associate to user
    // res.redirect to get/favorite
     
;


app.use('/markets', require('./routes/markets'))


app.listen(port, () => {
    console.log('...listening on', port );
})

