import axios from 'axios';

export const getCities = () => async dispatch => {
  try {
    const response = await axios.get('/get-countries');
    const data = response.data;
    let countryData = [];
    data.forEach(country => {
      if (country.capital.length > 0) {
        countryData.push({
          id: country.alpha2Code,
          name: country.name,
          capital: country.capital
        });
      }
    });

    dispatch({
      type: 'GET_CITIES',
      payload: countryData
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateUserInput = value => {
  return {
    type: 'UPDATE_USER_INPUT',
    payload: value
  };
};
