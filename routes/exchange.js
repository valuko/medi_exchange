const express = require('express');
const router = express.Router();
const Companies = require('../models/companies');
const ExchangeController = require('../controller/exchange');


/* GET exchange listing. */
router.get('/', function(req, res, next) {
    //res.send("My response");
    const countryCode = req.query.country_code;
    const category = req.query.category;
    const baseBid = req.query.base_bid;

    // Base Targeting
    ExchangeController.getByBaseTargeting(countryCode, category)
        .then(function (companies) {
            console.log("BaseTargeting: ");
            if (companies.length < 1) {
                console.log("No companies passed from Targeting check");
                return res.json({"code": 404, "message": "No companies passed from Targeting check"});
            }

            companies.forEach(company => console.log(company.company_id + ", Passed"));

            // Budget Check
            const budgetCompanies = companies.filter(company => company.budget > 0);
            console.log("BudgetCheck: ");
            if (budgetCompanies.length < 1) {
                console.log("No companies passed from Budget check");
                return res.json({"code": 404, "message": "No companies passed from Budget check"});
            }
            budgetCompanies.forEach(company => console.log(company.company_id + ", Passed"));

            // BaseBid Check
            const baseBidCompanies = budgetCompanies.filter(company => company.bid > baseBid);
            console.log("BaseBidCheck: ");
            if (baseBidCompanies.length < 1) {
                console.log("No companies passed from Basebid check");
                return res.json({"code": 404, "message": "No companies passed from Basebid check"});
            }
            baseBidCompanies.forEach(company => console.log(company.company_id + ", Passed"));

            // Shortlist company
            const shortlistedCompany = baseBidCompanies.reduce(ExchangeController.shortlistCompany);

            console.log("Shortlisted Company: ", shortlistedCompany);
            return ExchangeController.updateCompanyBudget(shortlistedCompany, baseBid);
        })
        .then(function (shortlistCompany, updateResult) {
            console.log("Selected Company ID: "+ shortlistCompany.company_id);

            return res.json(shortlistCompany.company_id);
        })
        .catch(err => console.log(err));
});

router.post('/', function(req, res, next) {
    response.send(request.body);
});

module.exports = router;
