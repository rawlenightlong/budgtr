const express = require('express')
const app = express()
require('dotenv').config()
const PORT = process.env.PORT 
const budgetData = require('../models/budget.js')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

let allAmounts = 0
let backgroundStyle = 0

function addTotals(){
    for (let i = 0; i < budgetData.length; i++){
   allAmounts += budgetData[i].amount           
    }
}
addTotals()


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
    bankAccount: allAmounts,
    backgroundColor: backgroundStyle
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
    req.body.amount = parseInt(req.body.amount)
    budgetData.push(req.body)
    console.log(budgetData)
    allAmounts = 0
    addTotals()
    if (0 > allAmounts){
        backgroundStyle="red"
    }
    else if (allAmounts > 1000){
        backgroundStyle="green"
    }
    else backgroundStyle="white"
    res.redirect('/budgets')
})



app.listen(PORT, () => {
    console.log(`The app is listening on Port ${PORT}`)
})

