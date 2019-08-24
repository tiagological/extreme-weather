import React from 'react';
import styled from 'styled-components/macro';
import { FaThermometerHalf } from 'react-icons/fa';

export default function CountryItem({
  country: { countryName, code, capital, currentTemp },
  ownIndex
}) {
  return (
    <StyledDiv className='animated fadeIn'>
      <RankingContainer>
        <h1>
          {ownIndex + 1}
          {ownIndex + 1 === 1
            ? 'st'
            : ownIndex + 1 === 2
            ? 'nd'
            : ownIndex + 1 === 3
            ? 'rd'
            : 'th'}
        </h1>
      </RankingContainer>
      <FlagContainer>
        <CountryFlag
          src={`https://www.countryflags.io/${code}/shiny/64.png`}
          alt={`${countryName} flag`}
        />
      </FlagContainer>
      <CountryContainer>
        <p>
          {capital}, {countryName} -{' '}
        </p>
      </CountryContainer>
      <TempContainer>
        <Temperature>
          {currentTemp % 1 === 0 ? currentTemp : currentTemp.toFixed(1)} C
        </Temperature>
        <Thermometer temp={currentTemp} />
      </TempContainer>
    </StyledDiv>
  );
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
  margin: 1rem 0;
  padding: 1rem;
  opacity: 0.8;
`;

const RankingContainer = styled.div`
  font-family: 'Permanent Marker', cursive;
`;

const FlagContainer = styled.div`
  justify-content: center;
`;

const CountryContainer = styled.div`
  margin: 0 1rem;
  flex-direction: row;
  align-self: stretch;
  text-align: center;
`;

const CountryFlag = styled.img``;

const TempContainer = styled.div`
  align-items: center;
`;

const Temperature = styled.span`
  font-size: 2rem;
`;

const Thermometer = styled(FaThermometerHalf)`
  transform: scale(2);
  margin: 0 1rem;
  color: ${({ temp }) =>
    temp >= 40 ? 'red' : temp >= 35 ? '#ff3700' : '#ff6e00'};
`;
