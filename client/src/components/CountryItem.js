import React from 'react';
import styled from 'styled-components/macro';

export default function CountryItem({
  country: { countryName, capital, currentTemp, error }
}) {
  return (
    <StyledDiv>
      <CountryContainer>
        <h4>Country: {countryName}</h4>
      </CountryContainer>
      <CountryContainer>
        <h5>Capital: {capital}</h5>
        <h5>Temperature: {error.status === true ? 'N/A' : currentTemp}</h5>
      </CountryContainer>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
`;

const CountryContainer = styled.div`
  margin: 0 1rem;
`;
