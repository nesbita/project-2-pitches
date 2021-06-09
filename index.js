const express = require('express');
const axios = require('axios');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const port = 4000 

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);
