# medi_exchange
Medi exchange app to get the best bids for the company stocks

To run the app, run `npm install` and then run `npm start`

### Request Params
- `country_id` -> Required, String. 2 character country code (e.g. US, FR). It is case-insensitive
- `category` -> Required, String. Case-insensitive category name of the company (e.g. finance, IT).
- `base_bid` -> Required, Float. Amount of the client bid, usually to the nearest cent

### API example
Sample API call: `curl http://localhost:3000/exchange?country_id=US&category=Finance&base_bid=0.02`