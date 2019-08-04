import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import Countries from './Countries';
import styled from 'styled-components/macro';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql'
});

client
  .query({
    query: gql`
      query GetCityTemp {
        cityTemperature(countryCode: "GB", cityName: "London") {
          Temperature {
            Metric {
              Value
            }
          }
        }
      }
    `
  })
  .then(result => console.log(result.data));

class GraphQLApp extends React.Component {
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
