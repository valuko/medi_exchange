const Companies = require('../models/companies');

module.exports = {
    getByBaseTargeting: function(countryCode, category) {
        return new Promise(function (resolve, reject) {
            Companies.find({"category": category, "countries": countryCode}, function (err, companies) {
                if (err) return reject(err);
                resolve(companies);
            });
        });
    },

    shortlistCompany: function(shortlisted, currentCompany) {
        if (!!shortlisted) {
            return (currentCompany.bid > shortlisted.bid) ? currentCompany : shortlisted;
        }
        return currentCompany;
    },

    updateCompanyBudget: function(company, baseBid) {
        return new Promise(function (resolve, reject) {
            const newBudget = company.budget - baseBid;
            Companies.update({company_id: company.company_id}, { $set: { budget : newBudget }}, function (err, updateResult) {
                if (err) return reject(err);

                console.log("Raw response: ", updateResult);
                resolve(company, updateResult);
            });
        });
    },
};
