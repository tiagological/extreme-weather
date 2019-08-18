import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';
import Countries from './Countries';
import styled, { createGlobalStyle } from 'styled-components/macro';
import { Normalize } from 'styled-normalize';
import axios from 'axios';
import summerPic from '../assets/imgs/summer.jpg';
import againts from '../assets/fonts/againts.otf';

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
        <GlobalStyles />
        <Normalize />
        <StyledDiv>
          <Heading style={{}}>Extreme Weather App</Heading>
          <Countries />
        </StyledDiv>
      </ApolloProvider>
    );
  }
}

const color1 = '#00A4CCFF';
const color2 = '#F95700FF';

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Againts';
    src: url(${againts});
  }

  @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');

  body {
    box-sizing: border-box;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  overflow: auto;
  /* background-image: linear-gradient(
    to top,
    #00a4ccff,
    #fee715ff 20%,
    #f95700ff 70%
  ); */
  background-image: url(${summerPic});
  background-size: cover;
  padding: 0 1rem 2rem;
`;

const Heading = styled.h1`
  font-family: Againts;
  letter-spacing: 2px;
  font-size: 3rem;
  color: #fff;
`;

export default GraphQLApp;
