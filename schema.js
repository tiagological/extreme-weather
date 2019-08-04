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
