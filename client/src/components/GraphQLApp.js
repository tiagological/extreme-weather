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
//           error {
//             status
//             message
//           }
//         }
//       }
//     `
//   })
//   .then(result => console.log(result.data))
//   .catch(err => console.log(err));

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

const color1 = '#00A4CCFF';
const color2 = '#F95700FF';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 500%;
  /* overflow: auto; */
  background-image: linear-gradient(
    to top,
    #00a4ccff,
    #fee715ff 20%,
    #f95700ff 70%
  );
`;

export default GraphQLApp;
