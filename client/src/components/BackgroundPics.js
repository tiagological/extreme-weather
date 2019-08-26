import React from 'react';
import styled from 'styled-components/macro';

const BackgroundPics = ({ currentlySelected }) => (
  <React.Fragment>
    <SummerPic
      src='https://res.cloudinary.com/tiagological/image/upload/q_auto/f_auto/v1566754501/extreme-weather/summer_ej4xdq.jpg'
      alt='Summer'
      theme={currentlySelected}
    />
    <WinterPic
      src='https://res.cloudinary.com/tiagological/image/upload/q_auto/f_auto/v1566754495/extreme-weather/winter_tp5fj7.jpg'
      alt='Winter'
      theme={currentlySelected}
    />
    <WindyPic
      src='https://res.cloudinary.com/tiagological/image/upload/q_auto/f_auto/v1566754493/extreme-weather/wind_uya9x8.jpg'
      alt='Wind'
      theme={currentlySelected}
    />
    <CloudyPic
      src='https://res.cloudinary.com/tiagological/image/upload/q_auto/f_auto/v1566754509/extreme-weather/cloudy_jr5x1s.jpg'
      alt='Cloudy'
      theme={currentlySelected}
    />
    <HumidPic
      src='https://res.cloudinary.com/tiagological/image/upload/q_auto/f_auto/v1566754510/extreme-weather/humid_eh5sit.jpg'
      alt='Humid'
      theme={currentlySelected}
    />
    <DryPic
      src='https://res.cloudinary.com/tiagological/image/upload/q_auto/v1566756570/extreme-weather/dry_bwvepc.jpg'
      alt='Dry'
      theme={currentlySelected}
    />
    <FoggyPic
      src='https://res.cloudinary.com/tiagological/image/upload/q_auto/v1566754514/extreme-weather/fog_j82fnf.jpg'
      alt='Foggy'
      theme={currentlySelected}
    />
  </React.Fragment>
);

const SummerPic = styled.img`
  z-index: -1;
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
  opacity: ${({ theme }) => (theme === 'Hottest' ? 1 : 0)};
  transition: opacity 1s ease-in-out;
`;

const WinterPic = styled.img`
  z-index: -1;
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
  opacity: ${({ theme }) => (theme === 'Coldest' ? 1 : 0)};
  transition: opacity 1s ease-in-out;
`;

const WindyPic = styled.img`
  z-index: -1;
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
  opacity: ${({ theme }) => (theme === 'Windiest' ? 1 : 0)};
  transition: opacity 1s ease-in-out;
`;

const CloudyPic = styled.img`
  z-index: -1;
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
  opacity: ${({ theme }) => (theme === 'Cloudiest' ? 1 : 0)};
  transition: opacity 1s ease-in-out;
`;

const HumidPic = styled.img`
  z-index: -1;
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
  opacity: ${({ theme }) => (theme === 'Most Humid' ? 1 : 0)};
  transition: opacity 1s ease-in-out;
`;

const DryPic = styled.img`
  z-index: -1;
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
  opacity: ${({ theme }) => (theme === 'Driest' ? 1 : 0)};
  transition: opacity 1s ease-in-out;
`;

const FoggyPic = styled.img`
  z-index: -1;
  position: absolute;
  height: 100%;
  width: 100%;
  object-fit: cover;
  opacity: ${({ theme }) => (theme === 'Least Visible' ? 1 : 0)};
  transition: opacity 1s ease-in-out;
`;

export default BackgroundPics;
