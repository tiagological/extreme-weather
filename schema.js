const axios = require('axios');
require('dotenv').config();

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLList,
  GraphQLSchema
} = require('graphql');

// Country Type
const CountryType = new GraphQLObjectType({
  name: 'Country',
  fields: () => ({
    name: { type: GraphQLString },
    alpha2Code: { type: GraphQLString },
    capital: { type: GraphQLString }
  })
});

// City Type

const CityKeyType = new GraphQLObjectType({
  name: 'CityKey',
  fields: () => ({
    Key: { type: GraphQLInt }
  })
});

// Metric Temp Type

const MetricTempType = new GraphQLObjectType({
  name: 'MetricTemp',
  fields: () => ({
    Value: { type: GraphQLFloat },
    Unit: { type: GraphQLString }
  })
});

// Temp Type

const TempType = new GraphQLObjectType({
  name: 'Temperature',
  fields: () => ({
    Metric: { type: MetricTempType }
  })
});

// CityTemp Type

const CityTempType = new GraphQLObjectType({
  name: 'CityTemp',
  fields: () => ({
    Temperature: { type: TempType }
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
    capital: { type: GraphQLString },
    currentTemp: { type: GraphQLFloat },
    error: { type: ErrorType }
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
          url: 'https://***REMOVED***/rest/v1/all',
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
            url: 'https://***REMOVED***/rest/v1/all',
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
                    'https://***REMOVED***/weather',
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

                return {
                  countryName: country.name,
                  capital: country.capital,
                  currentTemp: cityTempMetric,
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
    cityTemperature: {
      type: new GraphQLList(CityTempType),
      args: {
        countryCode: { type: GraphQLString },
        cityName: { type: GraphQLString }
      },
      async resolve(parent, args) {
        const firstResponse = await axios({
          method: 'get',
          url: `http://dataservice.accuweather.com/locations/v1/cities/${
            args.countryCode
          }/search`,
          params: {
            apikey: process.env.ACCUWEATHER_API_KEY,
            q: args.cityName,
            language: 'en-gb',
            details: true
          }
        });

        const locationKey = firstResponse.data[0].Key;

        const secondResponse = await axios({
          method: 'get',
          url: `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}`,
          params: {
            apikey: process.env.ACCUWEATHER_API_KEY,
            language: 'en-gb',
            details: false
          }
        });

        return secondResponse.data;
      }
    },
    cityWeather: {
      type: new GraphQLList(CityTempType),
      args: {
        locationKey: { type: GraphQLInt }
      },
      resolve(parents, args) {
        return axios({
          method: 'get',
          url: `http://dataservice.accuweather.com/currentconditions/v1/${
            args.locationKey
          }`,
          params: {
            apikey: process.env.ACCUWEATHER_API_KEY,
            language: 'en-gb',
            details: false
          }
        }).then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
