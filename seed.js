const mongoose = require('mongoose');
const Quote = require('./models/Quote')

let dummyQuote = [
    {
        author:"Vikash",
        text:'Chal chod yar nikal ja'
    },
    {
        author:'Samarth vohra',
        text:'Syntax Over Sematics'
    },
    {
        author:'stalin',
        text:"chat pe soya the vahnoi"
    },
    {
        author:"hindu badi neta",
        text:'Jay shree ram'
    }
]


const seedDB = async ()=>{
    const Quotes = await Quote.insertMany(dummyQuote);
    console.log('Data seed successfully.');
}

module.exports = seedDB;