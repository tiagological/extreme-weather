import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import Countries from './Countries';
import styled from 'styled-components/macro';
import axios from 'axios';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql'
});

// client
//   .query({
//     query: gql`
//       query GetCitiesTemp {
//         citiesWeather {
//           countryName
//           capital
//           currentTemp
//         }
//       }
//     `
//   })
//   .then(result => console.log(result))
//   .catch(err => console.log(err));

class GraphQLApp extends React.Component {
  componentDidMount = async () => {
    try {
      const countryListResponse = await axios({
        method: 'get',
        url: 'https://***REMOVED***/rest/v1/all',
        headers: {
          'X-RapidAPI-Host': '***REMOVED***',
          'X-RapidAPI-Key': '***REMOVED***'
        }
      });

      const countryList = countryListResponse.data;

      const currentCitiesTempArray = Promise.all(
        countryList.map(async country => {
          try {
            const cityDataResponse = await axios({
              method: 'get',
              url: 'https://***REMOVED***/weather',
              headers: {
                'X-RapidAPI-Host': '***REMOVED***',
                'X-RapidAPI-Key':
                  '***REMOVED***'
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
              currentTemp: cityTempMetric
            };
          } catch (error) {
            return {
              countryName: country.name,
              capital: country.capital,
              currentTemp: 'N/A'
            };
          }
        })
      );

      console.log(currentCitiesTempArray);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <ApolloProvider client={client}>
        <StyledDiv>
          <h1>Extreme Weather App</h1>
          <Countries />
        </StyledDiv>
      </ApolloProvider>
    );
  }
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default GraphQLApp;
