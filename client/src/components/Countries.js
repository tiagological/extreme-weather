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
      <React.Fragment>
        <Query query={COUNTRIES_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <BounceLoader />;
            if (error) console.log(error);

            return (
              <StyledDiv className='animated slideInLeft faster'>
                <Text>Top 20 Hottest Capitals</Text>
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
  align-items: flex-start;
  font-family: 'Montserrat', sans-serif;
  border-radius: 5px;
  background-color: #fff;
  opacity: 0.5;
  height: 100%;
  overflow: auto;
  padding: 2rem 1rem;
`;

const Text = styled.h2`
  font-size: 2rem;
  margin: 1rem auto;
`;

export default Countries;
