export interface City {
  [key: string]: Coords;
}

export interface Coords {
  lat: string;
  lng: string;
}

export interface WeatherCardProps {
  locations: City[];
}
