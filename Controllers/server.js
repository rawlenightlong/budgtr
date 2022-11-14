const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT 
const budgetData = require('../models/budget.js')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
let allAmounts = 0

for (let i = 0; i < budgetData.length; i++){
   allAmounts += budgetData[i].amount               
}
console.log(allAmounts)


//Middleware
app.use(express.urlencoded({extended: true}))
app.use(methodOverride("_method"))
app.use(bodyParser.urlencoded({extended: true}))





///////////////
//ROUTES
///////////////


//INDEX ROUTE - GET Request
app.get('/budgets', (req, res) => {
res.render('show_index.ejs', {
    budget: budgetData,
    bankAccount: allAmounts
    })
})


//NEW ROUTE - GET Request
app.get('/budgets/new', (req, res) => {
    res.render('new.ejs')
    })


//SHOW ROUTE - GET Request
app.get('/budgets/:index', (req, res) => {
    res.render('show_budget.ejs', {
        budgetInfo: budgetData[req.params.index],
        index: req.params.index
        
    })
})

//CREATE ROUTE - POST Request
app.post('/budgets', (req, res) => {
    console.log(req.body)
    budgetData.push(req.body)
    res.redirect('/budgets')
})

app.listen(PORT, () => {
    console.log(`The app is listening on Port ${PORT}`)
})