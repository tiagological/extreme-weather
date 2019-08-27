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
                : currentFilter === 'Windiest'
                ? 'windSpeed'
                : currentFilter === 'Cloudiest'
                ? 'cloudiness'
                : currentFilter === 'Most Humid' || currentFilter === 'Driest'
                ? 'humidity'
                : 'visibility';

            const sortOrder =
              currentFilter === 'Coldest' ||
              currentFilter === 'Least Visible' ||
              currentFilter === 'Driest'
                ? 'asc'
                : 'desc';

            const sortedData = orderBy(
              data.citiesWeather,
              [sortParameter],
              [sortOrder]
            );
            return (
              <StyledDiv>
                <HeadingContainer>
                  <Text currentFilter={currentFilter}>
                    Top 20{' '}
                    <StyledSelect
                      value={currentFilter}
                      onChange={this.props.handleChange}
                      currentFilter={currentFilter}>
                      <option value='Hottest'>Hottest</option>
                      <option value='Coldest'>Coldest</option>
                      <option value='Windiest'>Windiest</option>
                      <option value='Cloudiest'>Cloudiest</option>
                      <option value='Most Humid'>Most Humid</option>
                      <option value='Driest'>Driest</option>
                      <option value='Least Visible'>Foggiest</option>
                    </StyledSelect>{' '}
                    Capitals
                  </Text>
                </HeadingContainer>
                <CountryList>
                  {sortedData.slice(0, 20).map(country => (
                    <CountryItem
                      key={country.countryName}
                      country={country}
                      ownIndex={sortedData.indexOf(country)}
                      currentFilter={currentFilter}
                    />
                  ))}
                </CountryList>
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

const HeadingContainer = styled.div`
  text-align: center;
`;

const CountryList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  font-family: 'Montserrat', sans-serif;
  padding: 2rem 1rem;

  @media only screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1rem;
  }
`;

const StyledSelect = styled.select`
  outline: none;
  border-radius: 5px;
  border: 2px solid transparent;
  text-align: center;

  :hover {
    border: ${({ currentFilter }) =>
      currentFilter === 'Hottest'
        ? '2px solid #ebb788'
        : currentFilter === 'Coldest'
        ? ' 2px solid #000000FF'
        : '2px solid #909CC6'};
  }

  :focus {
    box-shadow: ${({ currentFilter }) =>
      currentFilter === 'Hottest'
        ? '0 0 5px 2px #ebb788'
        : currentFilter === 'Coldest'
        ? '0 0 5px 2px #000000FF'
        : currentFilter === 'Driest'
        ? '0 0 5px 2px #8C5E45'
        : '0 0 5px 2px #909CC6'};
    border: ${({ currentFilter }) =>
      currentFilter === 'Hottest'
        ? '2px solid #ebb788'
        : currentFilter === 'Coldest'
        ? ' 2px solid #000000FF'
        : '2px solid #909CC6'};
  }
`;

const Text = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  margin: 1rem auto;
  color: ${({ currentFilter }) =>
    currentFilter === 'Windiest' ||
    currentFilter === 'Cloudiest' ||
    currentFilter === 'Most Humid' ||
    currentFilter === 'Driest'
      ? '#fff'
      : '#000'};
  text-shadow: ${({ currentFilter }) =>
    currentFilter === 'Most Humid' ? '0 0 5px #000' : null};

  @media only screen and (min-width: 768px) {
    font-size: 1.75rem;
  }
`;

export default Countries;
