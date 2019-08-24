import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components/macro';
import CountryItem from './CountryItem';
import { BounceLoader } from 'react-spinners';
import 'animate.css';

const COUNTRIES_QUERY = gql`
  query CitiesTempQuery {
    citiesWeather {
      countryName
      code
      capital
      currentTemp
      error {
        status
        message
      }
    }
    lastQuery {
      lastFetchedAt
    }
  }
`;

class Countries extends Component {
  render() {
    return (
      <React.Fragment>
        <Query query={COUNTRIES_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <BounceLoader />;
            if (error) console.log(error);

            return (
              <StyledDiv>
                <Text>
                  Top 20{' '}
                  <select
                    value={this.props.currentlySelected}
                    onChange={this.props.handleChange}>
                    <option value='Hottest'>Hottest</option>
                    <option value='Coldest'>Coldest</option>
                    <option value='Wettest'>Wettest</option>
                  </select>{' '}
                  Capitals
                </Text>
                {data.citiesWeather.slice(0, 20).map(country => (
                  <CountryItem
                    key={country.countryName}
                    country={country}
                    ownIndex={data.citiesWeather.indexOf(country)}
                  />
                ))}
              </StyledDiv>
            );
          }}
        </Query>
      </React.Fragment>
    );
  }
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  font-family: 'Montserrat', sans-serif;
  padding: 2rem 1rem;
`;

const Text = styled.p`
  font-size: 1.4rem;
  margin: 1rem auto;
`;

export default Countries;
