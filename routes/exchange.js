const express = require('express');
const router = express.Router();
const ExchangeController = require('../controller/exchange');
const errorLog = require('../components/logger').errorlog;
const successLog = require('../components/logger').successlog;

/* GET exchange listing. */
router.get('/', function(req, res, next) {
    req.checkQuery('country_code').exists();
    req.checkQuery('category').exists();
    req.checkQuery('base_bid').exists();

    const countryCode = req.query.country_code;
    const category = req.query.category;
    const baseBid = parseFloat(req.query.base_bid);

    // Base Targeting
    ExchangeController.getByBaseTargeting(countryCode, category)
        .then(function (companies) {
            successLog.info(`BaseTargeting`);
            if (companies.length < 1) {
                successLog.info(`No companies passed from Targeting check`);
                return res.json({"code": 404, "message": "No companies passed from Targeting check"});
            }

            companies.forEach(company => successLog.info(`${company.company_id}, Passed`));

            // Budget Check
            const budgetCompanies = companies.filter(company => company.budget > 0);
            successLog.info(`BudgetCheck`);
            if (budgetCompanies.length < 1) {
                successLog.info(`No companies passed from Budget check`);
                return res.json({"code": 404, "message": "No companies passed from Budget check"});
            }
            budgetCompanies.forEach(company => successLog.info(`${company.company_id}, Passed`));

            // BaseBid Check
            const baseBidCompanies = budgetCompanies.filter(company => company.bid > baseBid);
            successLog.info(`BaseBidCheck`);
            if (baseBidCompanies.length < 1) {
                successLog.info(`No companies passed from Basebid check`);
                return res.json({"code": 404, "message": "No companies passed from Basebid check"});
            }
            baseBidCompanies.forEach(company => successLog.info(`${company.company_id}, Passed`));

            // Shortlist company
            const shortlistedCompany = baseBidCompanies.reduce(ExchangeController.shortlistCompany);

            //successLog.info(`Shortlisted Company: ${shortlistedCompany}`);
            return ExchangeController.updateCompanyBudget(shortlistedCompany, baseBid)
                .then((function (shortlistCompany, updateResult) {
                    successLog.info(`Selected Company ID: ${shortlistCompany.company_id}`);

                    return res.json(shortlistCompany.company_id);
                }));
        })
        .catch(function (err) {
            console.log(err);
            errorLog.error(`Error Message : ${err}`);
        });
});

router.post('/', function(req, res, next) {
    res.send(req.body);
});

module.exports = router;
