import React from 'react';
import styled from 'styled-components/macro';
import { FaThermometerHalf } from 'react-icons/fa';

export default function CountryItem({
  country: {
    countryName,
    code,
    capital,
    currentTemp,
    windSpeed,
    cloudiness,
    humidity,
    visibility
  },
  ownIndex,
  currentFilter
}) {
  return (
    <StyledDiv>
      <RankingContainer>
        <Ranking>
          {ownIndex + 1}
          {ownIndex + 1 === 1
            ? 'st'
            : ownIndex + 1 === 2
            ? 'nd'
            : ownIndex + 1 === 3
            ? 'rd'
            : 'th'}
        </Ranking>
      </RankingContainer>
      <FlagContainer>
        <CountryFlag
          src={`https://flagcdn.com/60x45/${code.toLowerCase()}.png`}
          alt={`${countryName} flag`}
        />
      </FlagContainer>
      <CountryContainer>
        <p>
          {capital}, {countryName}
        </p>
      </CountryContainer>
      <InfoContainer>
        {(currentFilter === 'Hottest' || currentFilter === 'Coldest') && (
          <React.Fragment>
            <Text>
              {currentTemp % 1 === 0 ? currentTemp : currentTemp.toFixed(1)} C
            </Text>
            <Thermometer temp={currentTemp} />
          </React.Fragment>
        )}
        {currentFilter === 'Windiest' && (
          <Text>{((windSpeed * 60 * 60) / 1000 / 1.60934).toFixed(1)} mph</Text>
        )}
        {currentFilter === 'Cloudiest' && <Text>{cloudiness}% cloudy</Text>}
        {(currentFilter === 'Most Humid' || currentFilter === 'Driest') && (
          <Text>{humidity}% humidity</Text>
        )}
        {currentFilter === 'Least Visible' && (
          <Text>
            {(visibility / 1000 / 1.60934).toFixed(1)} miles visibility
          </Text>
        )}
      </InfoContainer>
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
  margin: 1rem 0;
`;

const Ranking = styled.p`
  font-size: 2rem;
  font-weight: 800;
  margin: 0;
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

const InfoContainer = styled.div`
  align-items: center;
  margin: 1rem 0;
  text-align: center;
  margin-top: auto;
`;

const Text = styled.span`
  font-size: 2rem;
`;

const Thermometer = styled(FaThermometerHalf)`
  transform: scale(2);
  margin: 0 1rem;
  color: ${({ temp }) =>
    temp >= 40
      ? 'red'
      : temp >= 35
      ? '#ff3700'
      : temp < 0
      ? 'blue'
      : temp < 10
      ? '#00a9ff'
      : temp < 15
      ? '#00ff7f'
      : temp < 20
      ? '#ffd800'
      : '#ff6e00'};
`;
