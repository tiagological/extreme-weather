const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();
const port = 3001 || process.env.PORT;

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

app.get('/get-countries', async (req, res) => {
  try {
    console.log(`Request received on 'get/countries'...`);
    const response = await axios({
      method: 'get',
      url: 'https://***REMOVED***/rest/v1/all',
      headers: {
        'X-RapidAPI-Host': process.env.COUNTRIES_API_HOST,
        'X-RapidAPI-Key': process.env.COUNTRIES_API_KEY
      }
    });
    console.log('Sending response to client...');
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.send('Oops! There was an error sending the request.');
  }
});

app.post('/get-city-temperature', async (req, res) => {
  try {
    console.log(`Request received on '/get-city-temperature'...`);
    const city = req.body.capital;
    const countryCode = req.body.countryCode;
    const response = await axios({
      method: 'get',
      url: `http://dataservice.accuweather.com/locations/v1/cities/{${countryCode}}/search`,
      params: {
        apikey: '***REMOVED***',
        q: city,
        details: true
      }
    });
    console.log(`Response: ${response}`);
  } catch (error) {
    console.error(error);
    res.send('Oops! There was an error sending the request.');
  }
});

app.listen(port, () =>
  console.log(`Capital cities weather app listening on port ${port}!`)
);
