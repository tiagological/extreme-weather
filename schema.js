const axios = require('axios');
require('dotenv').config();

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLList,
  GraphQLSchema
} = require('graphql');

const GraphQLLong = require('graphql-type-long');

// Country Type
const CountryType = new GraphQLObjectType({
  name: 'Country',
  fields: () => ({
    name: { type: GraphQLString },
    alpha2Code: { type: GraphQLString },
    capital: { type: GraphQLString }
  })
});

// Error Type

const ErrorType = new GraphQLObjectType({
  name: 'Error',
  fields: () => ({
    status: { type: GraphQLBoolean },
    message: { type: GraphQLString }
  })
});

const CitiesTempType = new GraphQLObjectType({
  name: 'CitiesTemp',
  fields: () => ({
    countryName: { type: GraphQLString },
    code: { type: GraphQLString },
    capital: { type: GraphQLString },
    currentTemp: { type: GraphQLFloat },
    humidity: { type: GraphQLFloat },
    windSpeed: { type: GraphQLFloat },
    cloudiness: { type: GraphQLFloat },
    visibility: { type: GraphQLFloat },
    error: { type: ErrorType }
  })
});

const TimeType = new GraphQLObjectType({
  name: 'TimeType',
  fields: () => ({
    lastFetchedAt: { type: GraphQLLong }
  })
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    countries: {
      type: new GraphQLList(CountryType),
      resolve(parent, args) {
        return axios({
          method: 'get',
          url: 'https://ajayakv-rest-countries-v1.p.rapidapi.com/rest/v1/all',
          headers: {
            'X-RapidAPI-Host': process.env.COUNTRIES_API_HOST,
            'X-RapidAPI-Key': process.env.COUNTRIES_API_KEY
          }
        }).then(res => res.data);
      }
    },
    citiesWeather: {
      type: new GraphQLList(CitiesTempType),
      async resolve(parent, args) {
        try {
          const countryListResponse = await axios({
            method: 'get',
            url: 'https://ajayakv-rest-countries-v1.p.rapidapi.com/rest/v1/all',
            headers: {
              'X-RapidAPI-Host': process.env.COUNTRIES_API_HOST,
              'X-RapidAPI-Key': process.env.COUNTRIES_API_KEY
            }
          });

          const countryList = countryListResponse.data;

          const fullResults = await Promise.all(
            countryList.map(async country => {
              try {
                const cityDataResponse = await axios({
                  method: 'get',
                  url:
                    'https://community-open-weather-map.p.rapidapi.com/weather',
                  headers: {
                    'X-RapidAPI-Host': process.env.OPENWEATHER_API_HOST,
                    'X-RapidAPI-Key': process.env.OPENWEATHER_API_KEY
                  },
                  params: {
                    q: `${country.capital},${country.alpha2Code}`,
                    units: 'metric'
                  }
                });

                const cityTempMetric = cityDataResponse.data.main.temp;

                const humidity = cityDataResponse.data.main.humidity;

                const windSpeed = cityDataResponse.data.wind.speed;

                const cloudiness = cityDataResponse.data.clouds.all;

                const visibility = cityDataResponse.data.visibility;

                return {
                  countryName: country.name,
                  code: country.alpha2Code,
                  capital: country.capital,
                  currentTemp: cityTempMetric,
                  humidity: humidity,
                  windSpeed: windSpeed,
                  cloudiness: cloudiness,
                  visibility: visibility,
                  error: {
                    status: false,
                    message: 'no error'
                  }
                };
              } catch (error) {
                return {
                  countryName: country.name,
                  capital: country.capital,
                  currentTemp: 0.0,
                  error: {
                    status: true,
                    message: error.response.data.message
                  }
                };
              }
            })
          );

          const filteredResults = fullResults.filter(
            country => country.error.status !== true
          );

          // returns list sorted by current temperature

          return filteredResults.sort((a, b) => b.currentTemp - a.currentTemp);
        } catch (error) {
          console.log(error);
          return error;
        }
      }
    },

    lastQuery: {
      type: TimeType,
      resolve() {
        return { lastFetchedAt: Date.now() };
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
