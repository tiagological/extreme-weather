import React from 'react';
import axios from 'axios';
// import Autocomplete from './Autocomplete';
import { connect } from 'react-redux';
import { getCities } from '../actions';
import AutoSuggest from './AutoSuggest';
import styled from 'styled-components/macro';
import '../styles/globalStyles.css';

class App extends React.Component {
  componentDidMount = () => {
    this.props.getCities();
  };

  render() {
    const citiesList = this.props.cities.map(country => {
      return country.capital;
    });

    return (
      <Container>
        <Text>Autocomplete Testing</Text>
        <AutoSuggest citiesList={citiesList} />
        <button>Search</button>
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
    cities: state.citiesData
  };
};

export default connect(
  mapStateToProps,
  { getCities }
)(App);
