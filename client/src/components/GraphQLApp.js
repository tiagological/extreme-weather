import React from 'react';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { CachePersistor } from 'apollo-cache-persist';
import Countries from './Countries';
import styled, { createGlobalStyle } from 'styled-components/macro';
import { Normalize } from 'styled-normalize';
import againts from '../assets/fonts/againts.otf';

class GraphQLApp extends React.Component {
  state = {
    client: null,
    loaded: false,
    currentlySelected: 'Hottest'
  };

  componentDidMount = async () => {
    const parsedCache = JSON.parse(
      localStorage.getItem('apollo-cache-persist')
    );

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

    if (parsedCache !== null) {
      const lastFetchedTime =
        parsedCache['$ROOT_QUERY.lastQuery'].lastFetchedAt;

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
    } else {
      try {
        await persistor.purge();
        console.log('Purging the Apollo cache...');
      } catch (error) {
        console.error('Error purging Apollo cache', error);
      }
    }

    this.setState({
      client,
      loaded: true
    });
  };

  state = {
    currentlySelected: 'Hottest'
  };

  handleChange = e => {
    this.setState({
      currentlySelected: e.target.value
    });
  };

  render() {
    const { client, loaded, currentlySelected } = this.state;

    if (!loaded) {
      return <div>Loading...</div>;
    }

    return (
      <ApolloProvider client={client}>
        <GlobalStyles />
        <Normalize />
        <StyledDiv theme={currentlySelected}>
          <Heading theme={currentlySelected}>Extreme Weather App</Heading>
          <Countries
            handleChange={this.handleChange}
            currentlySelected={currentlySelected}
          />
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
  background-image: ${({ theme }) =>
    theme === 'Hottest'
      ? `url(https://res.cloudinary.com/tiagological/image/upload/q_auto/f_auto/v1566754501/extreme-weather/summer_ej4xdq.jpg)`
      : theme === 'Windiest'
      ? `url(https://res.cloudinary.com/tiagological/image/upload/q_auto/f_auto/v1566754493/extreme-weather/wind_uya9x8.jpg)`
      : theme === 'Coldest'
      ? `url(https://res.cloudinary.com/tiagological/image/upload/q_auto/f_auto/v1566754495/extreme-weather/winter_tp5fj7.jpg)`
      : theme === 'Cloudiest'
      ? `url(https://res.cloudinary.com/tiagological/image/upload/q_auto/f_auto/v1566754509/extreme-weather/cloudy_jr5x1s.jpg)`
      : theme === 'Most Humid'
      ? `url(https://res.cloudinary.com/tiagological/image/upload/q_auto/f_auto/v1566754510/extreme-weather/humid_eh5sit.jpg)`
      : theme === 'Driest'
      ? `url(https://res.cloudinary.com/tiagological/image/upload/q_auto/v1566756570/extreme-weather/dry_bwvepc.jpg)`
      : `url(https://res.cloudinary.com/tiagological/image/upload/q_auto/v1566754514/extreme-weather/fog_j82fnf.jpg)`};
  background-size: cover;
  padding: 0 1rem 2rem;
`;

const Heading = styled.h1`
  font-family: 'Permanent Marker', cursive;
  letter-spacing: 2px;
  font-size: 3rem;
  color: ${({ theme }) => (theme === 'Coldest' ? '#000000FF' : '#fff')};
  text-align: center;
`;

export default GraphQLApp;
