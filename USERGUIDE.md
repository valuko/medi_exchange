# User Guide for Medi exchange

Medi Exchange is an exchange app which checks for the best bid figure in a MongoDB exchange and returns the appropriate company name.
It is built with NodeJS/ExpressJS. This is currently v0.5.

A lot of the code is done in the router which is not appropriate but works so far. Improvements will be added by v1.0

### Version
0.5

Tech stack
-------------

### Database
MongoDB on free mLabs instance

### Framework
ExpressJS 4.16


Installation
----------
- Run `npm install`

Usage
---------
- Run `npm start` to start the expressJS server
- Make a request to the exchange endpoint: `/exchange?country_id=<countryId>&category=<cat>&base_bid=<bid>`
- `<countryId>` -> 2 character country code (e.g. US, FR). It is case-insensitive
- `<cat>` -> Case-insensitive category name of the company (e.g. finance, IT).
- `<bid>` -> Float amount of the client bid, usually to the nearest cent

### API example
Sample API call: `curl http://localhost:3000/exchange?country_id=US&category=Finance&base_bid=0.02`

TODOs
---------
- Add integration tests
- Add entity model diagram
- Authentication
- Endpoint for adding exchange data
- Endpoint for listing all exchange data (debug purpose only)
