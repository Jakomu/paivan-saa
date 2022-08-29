import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { City, Coords, WeatherCardProps } from "../interfaces/interfaces";

const WeatherCard = ({ locations }: WeatherCardProps) => {
  const [weatherData, setWeatherData] = useState<any>("");

  const city = useParams();
  const cityKey = Object.keys(city)[0];
  const cityString = city[cityKey]?.slice(1);

  useEffect(() => {
    //gets weatherinfo from openweathermap.org
    const getWeatherInfo = () => {
      const cityCoords: City | undefined = locations.find(
        (place) => Object.keys(place)[0] === cityString
      );
      if (cityCoords && cityString) {
        const key: string = Object.keys(cityCoords)[0];
        const coords: Coords = cityCoords[key];
        axios(
          `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&appid=${process.env.REACT_APP_API_KEY}`
        )
          .then((res) => {
            res.data.time = Date.now();
            setWeatherData(res.data);
            localStorage.setItem(cityString, JSON.stringify(res.data));
          })
          .catch((e) => {
            console.log(e.message);
          });
      }
    };

    // checks if the data is older thant 10 minutes and either gets new data, or uses old one
    if (localStorage.getItem(cityString || "")) {
      const data: string = localStorage.getItem(cityString || "") || "";
      const parsedData = JSON.parse(data);
      if (parsedData.time + 600000 < Date.now()) {
        getWeatherInfo();
      } else {
        setWeatherData(parsedData);
      }
    } else {
      getWeatherInfo();
    }
  }, []);

  if (weatherData != "") {
    const weatherIconUrl: string = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

    return (
      <div className="weatherCard">
        <div>
          <h1>{weatherData.name}</h1>
          <section>
            <img src={weatherIconUrl} alt={weatherData.weather[0].main} />
            <h3>{weatherData.weather[0].description}</h3>
          </section>
          <section>
            <p>
              Temperature:{" "}
              <span>{(weatherData.main.temp - 273.15).toFixed(2)} °C</span>
            </p>
            <p>
              Feels like:{" "}
              <span>
                {(weatherData.main.feels_like - 273.15).toFixed(2)} °C
              </span>
            </p>
          </section>
          <section>
            <p>
              Wind speed: <span>{weatherData.wind.speed} m/s</span>
            </p>
          </section>
        </div>
      </div>
    );
  } else
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
};

export default WeatherCard;
