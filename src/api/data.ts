import { getWeather , getLocationName } from "./index";

export  function getWeatherInfo( lonlat: string ) {
  return Promise.all([getWeather( lonlat ), getLocationName( lonlat )]);
}
