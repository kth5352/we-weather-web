import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [weatherData, setWeather] = useState(null);
  const [error, setError] = useState(null);

  // 위치 가져오기
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        getWeatherByCurrentLocation(lat, lon);
      },
      (error) => {
        setError("위치 정보를 가져오는데 실패했습니다.");
      }
    );
  };

  // API 가져오기
  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=kr&units=metric&appid=${process.env.REACT_APP_APIKEY}`;
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
    console.log(data);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="container">
      <div className="left">
        {weatherData && (
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
            alt="Weather icon"
          />
        )}
      </div>
      <div className="right">
        <div className="weather-info">
          <h2>지역:</h2>
          <p>{weatherData ? weatherData.name : "Loading..."}</p>
        </div>
        <div className="weather-info">
          <h2>날씨:</h2>
          <p>
            {weatherData ? weatherData.weather[0].description : "Loading..."}
          </p>
        </div>
        <div className="weather-info">
          <h2>온도 (°C):</h2>
          <p>{weatherData ? weatherData.main.temp : "Loading..."}</p>
        </div>
        <div className="weather-info">
          <h2>습도:</h2>
          <p>{weatherData ? weatherData.main.humidity : "Loading..."}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
