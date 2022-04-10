const axios = require('axios');
require('dotenv').config();
const { countryList } = require('./constants');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLList,
  GraphQLSchema
} = require('graphql');

const GraphQLLong = require('graphql-type-long');

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
    citiesWeather: {
      type: new GraphQLList(CitiesTempType),
      async resolve() {
        try {
          const fullResults = await Promise.all(
            countryList.map(async (country) => {
              try {
                const cityDataResponse = await axios({
                  method: 'get',
                  url: process.env.WEATHER_API_URL,
                  headers: {
                    'X-RapidAPI-Key': process.env.WEATHER_API_KEY
                  },
                  params: {
                    q: country.capital
                  }
                });

                const {
                  data: {
                    current: {
                      temp_c: cityTempMetric,
                      humidity,
                      wind_mph: windSpeed,
                      cloud: cloudiness,
                      vis_miles: visibility
                    }
                  }
                } = cityDataResponse;

                return {
                  countryName: country.name,
                  code: country.code,
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
            (country) => country.error.status !== true
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
