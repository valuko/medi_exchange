//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var CompaniesSchema = new Schema({
    _id    : String,
    company_id: String,
    countries: [String],
    budget: Number,
    bid: Number,
    category: [String]
});

var Companies = mongoose.model('company_stocks', CompaniesSchema );

module.exports = Companies;
