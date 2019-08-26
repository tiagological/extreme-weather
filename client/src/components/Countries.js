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
                      <option value='Driest'>Least Humid</option>
                      <option value='Least Visible'>Least Visible</option>
                    </StyledSelect>{' '}
                    Capitals
                  </Text>
                </HeadingContainer>
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

const HeadingContainer = styled.div`
  text-align: center;
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
        ? '0 0 0 3px #ebb788'
        : currentFilter === 'Coldest'
        ? '0 0 0 3px #000000FF'
        : '0 0 0 3px #909CC6'};
    border: ${({ currentFilter }) =>
      currentFilter === 'Hottest'
        ? '2px solid #ebb788'
        : currentFilter === 'Coldest'
        ? ' 2px solid #000000FF'
        : '2px solid #909CC6'};
  }
`;

const Text = styled.p`
  font-size: 1.3rem;
  margin: 1rem auto;
  color: ${({ currentFilter }) =>
    currentFilter === 'Windiest' ? '#fff' : '#000'};
`;

export default Countries;
