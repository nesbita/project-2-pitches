const express = require('express');
let router = express.Router();
const db = require('../models')
const axios = require('axios');

// (LIST) go to /list page after clicking submit button on home page / first API call
router.get('/list', (req, res) => {
    console.log(req.query)
  let apiUrl1 = `http://search.ams.usda.gov/farmersmarkets/v1/data.svc/zipSearch?zip=${req.query.zipcode}`;
  axios.get(apiUrl1).then(apiResponse => {
    let farmMarket = apiResponse.data.results;
    res.render('list', { farmMarket, name:req.query.name, zipcode:req.query.zipcode });
    // console.log('it worked! 🐸 ')
  })
});

// (DETAILS) go to /details page after clicking button / second API call
router.get('/details/:id', (req, res) => {
    let apiUrl2 = `http://search.ams.usda.gov/farmersmarkets/v1/data.svc/mktDetail?id=${req.params.id}`;
    axios.get(apiUrl2).then(apiResponse => {
      console.log(apiResponse.data)
      let farmMarketData = apiResponse.data;
      res.render('details', { farmMarketData, name:req.query.name, zipcode:req.query.zipcode, id:req.params.id, marketname:req.query.marketname });
    })
      console.log('🐧')
})

// (FAVORITES) post information to /favorites page
router.post('/favorite', async(req, res) => {
    let marketName = req.body.marketname
    let currentUser = req.body.name
    console.log(req.body, '🐣')

    // find a user
    let foundUser = await db.user.findOne({
        where: {
            name: currentUser
        }
    // associate the user and their favorite market(s)    
    })
        // user.createFavorite({
        //     name: marketName 
        // })
        // .then((favorite) => {
        //     console.log('favorite was added to the database 🦄', favorite)
        // })
        // }).catch(err => 
        //     console.log(err))
    // })
        // res.redirect('/favorite')
    // }).catch(err => 
    //     console.log(err))

    // find or create a market
    let favorite = await db.favorite.findOrCreate({
        where: {
            name: marketName
        }
    })
    await foundUser.addFavorite(favorite[0])
    // console.log(favorite[1], '🦋')
        // .then((data) => {
            res.redirect(`/favorite?name=${currentUser}`);
        //     console.log(data)
        // })
        // .catch((err) => {
        //     console.log('ahhhhh!')
        // })
    });

// (FAVORITES) go to /favorites page after clicking button 
router.get('/favorite', async (req, res) => {
    // Get all records from the DB of favorites
    let currentUser = req.query.name
        console.log(currentUser, '🦆')
        
    let user = await db.user.findOne({
        where: {
        name: currentUser
        }
        })
        console.log(user, '🦊')
    let fav = await user.getFavorites()
        console.log(fav, '🐼')
            res.render('favorite', {favorites: fav, user:currentUser})
})

//2nd
// router.get('/favorite', (req, res) => {
//     // Get all market records from API database
//     db.favorite.findAll()
//       .then(result => {
//         // render /favorite.ejs with returned favorites data 
//         res.render('favorite', { favorites: result })
//       })
// });
        

// (DELETE) delete a favorite from favorites list
router.delete('/favorite/:name', (req, res) => {
    let currentUser = req.body.name
    console.log(req.params.name)
    console.log(currentUser, 'USE YOUR WORDS!!!!')
            // req.params.name
    db.favorite.destroy({
        where: {
            name: req.params.name
            }
        })
        .then ((data) => {
            console.log('success 🐮')
            // res.redirect('/favorite?name=Ariana')
            res.redirect(`/favorite?name=${currentUser}`);
        })
        .catch((err) => {
            console.log('noooo')
        })
    });

// record the information from the login page on list
router.post('/list', (req, res) => {
    let currentUser = req.body.name
    db.user.findOrCreate({
        where: {
            name: currentUser,
            zipcode: req.body.zipcode
        }
    })
        .then((data) => {
            console.log(data)
            res.redirect(`/list?name=${req.body.name}&zipcode=${req.body.zipcode}`)
        })
        .catch((err) => {
            console.log(err, '🐞')
        })
});

// get route so we can redirect to update page
router.get('/update', (req, res) => {
    res.render('update')
})

router.put('/update', (req, res) => {
    console.log(req.body)
db.user.update(
    {zipcode: req.body.zipcode
    },
    {
     where: {name:req.body.name}
    }
)
    // find user in database
    // update their zipcode
    
    res.redirect(`/list?name=${req.body.name}&zipcode=${req.body.zipcode}`)
    

})

// (LOGOUT) logout route
router.get('/logout', (req, res) => {
    res.render('index', {logout: true})
})

module.exports = router