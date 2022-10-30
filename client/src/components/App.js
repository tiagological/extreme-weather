import React from 'react';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { CachePersistor } from 'apollo-cache-persist';
import BackgroundPics from './BackgroundPics';
import Countries from './Countries';
import styled, { createGlobalStyle } from 'styled-components/macro';
import { Normalize } from 'styled-normalize';
import againts from '../assets/fonts/againts.otf';

const uri =
    process.env.NODE_ENV === 'production'
        ? '/graphql'
        : 'http://localhost:3001/graphql';

class App extends React.Component {
    state = {
        client: null,
        loaded: false,
        currentlySelected: 'Hottest',
    };

    componentDidMount = async () => {
        const parsedCache = JSON.parse(
            localStorage.getItem('apollo-cache-persist')
        );

        const oneHour = 3600000;

        const timeNow = Date.now();

        const cache = new InMemoryCache();

        const client = new ApolloClient({
            uri,
            cache,
        });

        const persistor = new CachePersistor({
            cache,
            storage: window.localStorage,
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
            loaded: true,
        });
    };

    state = {
        currentlySelected: 'Hottest',
    };

    handleChange = (e) => {
        this.setState({
            currentlySelected: e.target.value,
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
                    <BackgroundPics currentlySelected={currentlySelected} />
                    <Heading theme={currentlySelected}>
                        Extreme Weather App
                    </Heading>
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
    height: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
  }
  
  #root {
    height: 100%;
    width: 100%;
    position: fixed;
  }
`;

const StyledDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    overflow: auto;

    padding: 0 1rem 2rem;
`;

const Heading = styled.h1`
    font-family: 'Permanent Marker', cursive;
    letter-spacing: 2px;
    font-size: 3rem;
    color: ${({ theme }) =>
        theme === 'Coldest'
            ? '#000000FF'
            : theme === 'Driest'
            ? '#8C5E45'
            : '#fbfbf8'};
    text-align: center;
    text-shadow: ${({ theme }) =>
        theme === 'Driest' || theme === 'Coldest'
            ? '0 0 5px #fbfbf8'
            : '0 0 5px #000'};
    transition: color 1s ease-in-out;
`;

export default App;
