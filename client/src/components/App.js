import React from 'react';
import axios from 'axios';
import Autocomplete from './Autocomplete';

class App extends React.Component {
  state = {
    countryData: []
  };

  componentDidMount = async () => {
    try {
      const response = await axios.get('/get-countries');
      const data = response.data;
      let countryData = [];
      data.forEach(country => {
        if (country.capital.length > 0) {
          countryData.push({
            id: country.alpha3Code,
            name: country.name,
            capital: country.capital
          });
        }
      });
      this.setState({
        countryData
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const mappedCountries = this.state.countryData.map(country => {
      return `${country.capital} (${country.name})`;
    });

    return (
      <div>
        <h1>Autocomplete Testing</h1>
        <Autocomplete suggestions={mappedCountries} />
      </div>
    );
  }
}

export default App;
