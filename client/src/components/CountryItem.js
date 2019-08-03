import React from 'react';
import styled from 'styled-components/macro';

export default function CountryItem({ country: { name, capital } }) {
  return (
    <StyledDiv>
      <CountryContainer>
        <h4>Country: {name}</h4>
      </CountryContainer>
      <CountryContainer>
        <h5>Capital: {capital}</h5>
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
