import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  //위치 가져오기
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

  //api 가져오기
  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_APIKEY}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return <div></div>;
}

export default App;
