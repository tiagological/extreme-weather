import React from 'react';
import styled from 'styled-components/macro';

export default function CountryItem({
  country: { countryName, capital, currentTemp, error },
  ownIndex
}) {
  return (
    <StyledDiv>
      <CountryContainer>
        <p>
          {ownIndex + 1} -{capital}, {countryName} -{' '}
          {currentTemp % 1 === 0 ? currentTemp : currentTemp.toFixed(1)} C
        </p>
      </CountryContainer>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CountryContainer = styled.div`
  margin: 0 1rem;
  flex-direction: row;
  align-self: stretch;
`;

const TempContainer = styled.div``;
