import React from 'react';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { persistCache } from 'apollo-cache-persist';
import gql from 'graphql-tag';
import Countries from './Countries';
import styled, { createGlobalStyle } from 'styled-components/macro';
import { Normalize } from 'styled-normalize';
import axios from 'axios';
import summerPic from '../assets/imgs/summer.jpg';
import againts from '../assets/fonts/againts.otf';

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
  state = {
    client: null,
    loaded: false
  };

  componentDidMount = async () => {
    const cache = new InMemoryCache();

    const client = new ApolloClient({
      uri: 'http://localhost:3001/graphql',
      cache
    });

    try {
      await persistCache({
        cache,
        storage: window.localStorage
      });
    } catch (error) {
      console.error('Error restoring Apollo cache', error);
    }

    this.setState({
      client,
      loaded: true
    });
  };

  render() {
    const { client, loaded } = this.state;

    if (!loaded) {
      return <div>Loading...</div>;
    }

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

  @import url('https://fonts.googleapis.com/css?family=Permanent+Marker&display=swap');

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
  font-family: 'Permanent Marker', cursive;
  letter-spacing: 2px;
  font-size: 3rem;
  color: #fff;
  text-align: center;
`;

export default GraphQLApp;
