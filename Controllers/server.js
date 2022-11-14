const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT 
const budgetData = require('../models/budget.js')






///////////////
//ROUTES
///////////////


//INDEX ROUTE - GET Request
app.get('/budgets', (req, res) => {
res.render('show_index.ejs', {
    budget: budgetData,
    })
})

//SHOW ROUTE - GET Request
app.get('/budgets/:index', (req, res) => {
    res.render('show_budget.ejs', {
        budgetInfo: budgetData[req.params.index],
        index: req.params.index
        
    })
})

//NEW ROUTE - GET Request
app.get('/budgets/new', (req, res) => {

})

//CREATE ROUTE - POST Request
app.post('/budgets', (req, res) => {
    
})

app.listen(PORT, () => {
    console.log(`The app is listening on Port ${PORT}`)
})