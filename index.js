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
});

// redirect to /list page after clicking button on home page 
app.post('/list', (req, res) => {
    console.log(req.body.zipcode)
  let apiUrl1 = `http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=${req.body.zipcode}`;
  axios.get(apiUrl1).then(apiResponse => {
    let farmMarket = apiResponse.data.results;
    res.render('list', { farmMarket });
    // console.log('it worked! 🐸 ')
  })
});

app.get('/details/:id', (req, res) => {
  let apiUrl2 = `http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=${req.params.id}`;
  axios.get(apiUrl2).then(apiResponse => {
    console.log(apiResponse.data)
    let farmMarketData = apiResponse.data;
    res.render('details', { farmMarketData });
  })
    console.log('🐧')
})

app.use('/markets', require('./routes/markets'))


app.listen(port, () => {
    console.log('...listening on', port );
})