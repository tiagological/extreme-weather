import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import CountryItem from './CountryItem';

const COUNTRIES_QUERY = gql`
  query CountriesQuery {
    countries {
      name
      alpha2Code
      capital
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
                {data.countries.map(country => (
                  <CountryItem key={country.alpha2Code} country={country} />
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
