import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import styled from 'styled-components/macro';
import CountryItem from './CountryItem';
import { BounceLoader } from 'react-spinners';
import 'animate.css';
import orderBy from 'lodash.orderby';

const COUNTRIES_QUERY = gql`
  query CitiesTempQuery {
    citiesWeather {
      countryName
      code
      capital
      currentTemp
      humidity
      windSpeed
      cloudiness
      visibility
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
    const currentFilter = this.props.currentlySelected;

    return (
      <React.Fragment>
        <Query query={COUNTRIES_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <BounceLoader />;
            if (error) console.log(error);

            const sortParameter =
              currentFilter === 'Hottest' || currentFilter === 'Coldest'
                ? 'currentTemp'
                : 'windSpeed';

            const sortOrder =
              currentFilter === 'Hottest'
                ? 'desc'
                : currentFilter === 'Coldest'
                ? 'asc'
                : 'desc';

            const sortedData = orderBy(
              data.citiesWeather,
              [sortParameter],
              [sortOrder]
            );
            return (
              <StyledDiv>
                <Text>
                  Top 20{' '}
                  <select
                    value={this.props.currentlySelected}
                    onChange={this.props.handleChange}>
                    <option value='Hottest'>Hottest</option>
                    <option value='Coldest'>Coldest</option>
                    <option value='Windiest'>Windiest</option>
                  </select>{' '}
                  Capitals
                </Text>
                {sortedData.slice(0, 20).map(country => (
                  <CountryItem
                    key={country.countryName}
                    country={country}
                    ownIndex={sortedData.indexOf(country)}
                    currentFilter={currentFilter}
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
  font-size: 1.3rem;
  margin: 1rem auto;
`;

export default Countries;
