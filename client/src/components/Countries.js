import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import CountryItem from './CountryItem';

const COUNTRIES_QUERY = gql`
  query CitiesTempQuery {
    citiesWeather {
      countryName
      capital
      currentTemp
      error {
        status
        message
      }
    }
  }
`;

class Countries extends Component {
  render() {
    return (
      <div>
        <h1>Countries</h1>
        <Query query={COUNTRIES_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);

            return (
              <React.Fragment>
                {data.citiesWeather.map(country => (
                  <CountryItem key={country.countryName} country={country} />
                ))}
              </React.Fragment>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default Countries;
