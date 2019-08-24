import React from 'react';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { persistCache, CachePersistor } from 'apollo-cache-persist';
import Countries from './Countries';
import styled, { createGlobalStyle } from 'styled-components/macro';
import { Normalize } from 'styled-normalize';
import summerPic from '../assets/imgs/summer.jpg';
import againts from '../assets/fonts/againts.otf';
import gql from 'graphql-tag';

class GraphQLApp extends React.Component {
  state = {
    client: null,
    loaded: false
  };

  componentDidMount = async () => {
    const parsedCache = JSON.parse(
      localStorage.getItem('apollo-cache-persist')
    );

    const lastFetchedTime = parsedCache['$ROOT_QUERY.lastQuery'].lastFetchedAt;

    const oneHour = 3600000;

    const timeNow = Date.now();

    const cache = new InMemoryCache();

    const client = new ApolloClient({
      uri: 'http://192.168.1.82:3001/graphql',
      cache
    });

    const persistor = new CachePersistor({
      cache,
      storage: window.localStorage
    });

    if (timeNow - lastFetchedTime > oneHour) {
      await persistor.purge();
      console.log('Purging the Apollo cache...');
    } else {
      try {
        await persistor.restore();
        console.log('Restoring the Apollo cache...');
      } catch (error) {
        console.error('Error restoring Apollo cache', error);
      }
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

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Againts';
    src: url(${againts});
  }

  @import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');

  @import url('https://fonts.googleapis.com/css?family=Permanent+Marker&display=swap');

  html {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  *,
  *:before,
  *:after {
    -webkit-box-sizing: inherit;
    box-sizing: inherit;
  }
  
  html,
  body {
    height: 100vh;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
  }
  
  #root {
    height: 100%;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  overflow: auto;
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
