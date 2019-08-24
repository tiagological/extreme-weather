import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { getCities } from '../actions';
import AutoSuggest from './AutoSuggest';
import styled from 'styled-components/macro';

class App extends React.Component {
  componentDidMount = () => {
    this.props.getCities();
  };

  getCityWeather = async userInput => {
    const { citiesList } = this.props;

    const filteredCities = citiesList.filter(
      city => city.capital.toLowerCase() === userInput.toLowerCase()
    );

    const filteredCity = filteredCities[0];

    if (filteredCities.length < 1) {
      console.log('City does NOT exist in the list');
    } else if (filteredCities.length > 0) {
      console.log('City DOES exist in the list');
      console.log(filteredCities);
    }

    try {
      const response = await axios({
        url: '/get-city-temperature',
        method: 'post',
        data: {
          capital: filteredCity.capital,
          countryCode: filteredCity.id
        }
      });
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const citiesList = this.props.citiesList.map(country => {
      return country.capital;
    });

    const { userInput } = this.props;

    return (
      <Container>
        <Text>Autocomplete Testing</Text>
        <AutoSuggest citiesList={citiesList} />
        <button onClick={() => this.getCityWeather(userInput)}>Search</button>
      </Container>
    );
  }
}

const Container = styled.div`
  height: 100%;
  box-sizing: border-box;
`;

const Text = styled.h1`
  margin: 0;
`;

const mapStateToProps = state => {
  return {
    citiesList: state.citiesData,
    userInput: state.userInput
  };
};

export default connect(
  mapStateToProps,
  { getCities }
)(App);
