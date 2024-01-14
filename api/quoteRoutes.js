const express = require('express');
const routes = express.Router();
const Quote = require('../models/Quote');
const { isLogined } = require('../middleware');



// show all Quotes
routes.get('/allquotes',isLogined, async (req,res)=>{
    const allQuotes = await Quote.find({});
    const responseObj = {
        allQuotes: allQuotes,
        User: req.user
      };
    res.status(200).json(responseObj);

})

// Add new quote
routes.post('/addquotes',async (req,res)=>{
    try{
        const {author,text} = req.body;
        const newQuote = await Quote.create({author,text});
        
        res.status(201).json({msg:'new quote created successfully'});
       
    }
    catch(e){
        console.log(e);
    }
})


routes.get('/quotes/:id',async (req,res)=>{
    let {id} = req.params;
    const quote = await Quote.findById(id);
    res.status(200).json(quote);
})


// route for edit/update the quotes
routes.patch('/quotes/:id',isLogined,async (req,res)=>{
    let {id} = req.params;
    let {author,text} = req.body;
    const quotes = await Quote.findByIdAndUpdate(id,{author,text});
    res.status(201).json(quotes);
})


// to delete the quote
routes.delete('/quotes/:id',async (req,res)=>{
    let {id} = req.params;
    await Quote.findByIdAndDelete(id);
    res.status(200).json({msg:"Quotes delete successfully"});
})




module.exports = routes;