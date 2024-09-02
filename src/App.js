import { useEffect, useState } from "react";
import "./App.css";

const coordinates = {
  Seoul: { lat: 37.5665, lon: 126.978 },
  Busan: { lat: 35.1796, lon: 129.0756 },
  Daegu: { lat: 35.8714, lon: 128.6014 },
  Daejeon: { lat: 36.3504, lon: 127.3845 },
  Gwangju: { lat: 35.1595454, lon: 126.8526012 },
  Jeju: { lat: 33.4996, lon: 126.5312 },
  Incheon: { lat: 37.4563, lon: 126.7052 },
  Dokdo: { lat: 37.2394, lon: 131.8683 },
};

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState(null);

  // 위치 가져오기
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const currentLocation = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          name: "Current Location",
        };
        fetchWeatherData(currentLocation);
      },
      (error) => {
        setError("위치 정보를 가져오는데 실패했습니다.");
      }
    );
  };

  // API 가져오기
  const fetchWeatherData = async (currentLocation) => {
    const locations = [
      currentLocation,
      ...Object.entries(coordinates).map(([name, coords]) => ({
        ...coords,
        name,
      })),
    ];

    try {
      const responses = await Promise.all(
        locations.map((location) =>
          fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&lang=kr&units=metric&appid=${process.env.REACT_APP_APIKEY}`
          ).then((response) => response.json())
        )
      );

      const updatedData = responses.map((data) => {
        // Gwangju의 잘못된 이름을 수정
        if (
          data.name === "Yach’on" &&
          data.coord.lat === 35.1595454 &&
          data.coord.lon === 126.8526012
        ) {
          data.name = "Gwangju";
        }

        // 독도의 경우 이름을 수동으로 설정
        if (
          !data.name &&
          data.coord.lat === 37.2394 &&
          data.coord.lon === 131.8683
        ) {
          data.name = "Dokdo";
        }

        return data;
      });

      setWeatherData(updatedData);
    } catch (err) {
      setError("날씨 데이터를 가져오는데 실패했습니다.");
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="container">
      {weatherData.length > 0 ? (
        <>
          <div className="current-location-card">
            {/* 현재 위치의 날씨 정보를 표시 */}
            <div className="weather-card">
              <div className="left">
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData[0].weather[0].icon}@4x.png`}
                  alt="Weather icon"
                />
              </div>
              <div className="right">
                <div className="weather-info">
                  <h2>지역:</h2>
                  <p>{weatherData[0].name}</p>
                </div>
                <div className="weather-info">
                  <h2>날씨:</h2>
                  <p>{weatherData[0].weather[0].description}</p>
                </div>
                <div className="weather-info">
                  <h2>온도 (°C):</h2>
                  <p>{weatherData[0].main.temp}</p>
                </div>
                <div className="weather-info">
                  <h2>습도:</h2>
                  <p>{weatherData[0].main.humidity}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="other-locations-container">
            <div className="sub-container">
              {/* 상단 4개 위치의 날씨 정보를 표시 */}
              {weatherData.slice(1, 5).map((data, index) => (
                <div key={index} className="weather-card">
                  <div className="left">
                    <img
                      src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                      alt="Weather icon"
                    />
                  </div>
                  <div className="right">
                    <div className="weather-info">
                      <h2>지역:</h2>
                      <p>{data.name}</p>
                    </div>
                    <div className="weather-info">
                      <h2>날씨:</h2>
                      <p>{data.weather[0].description}</p>
                    </div>
                    <div className="weather-info">
                      <h2>온도 (°C):</h2>
                      <p>{data.main.temp}</p>
                    </div>
                    <div className="weather-info">
                      <h2>습도:</h2>
                      <p>{data.main.humidity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="sub-container">
              {/* 하단 4개 위치의 날씨 정보를 표시 */}
              {weatherData.slice(5, 9).map((data, index) => (
                <div key={index} className="weather-card">
                  <div className="left">
                    <img
                      src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                      alt="Weather icon"
                    />
                  </div>
                  <div className="right">
                    <div className="weather-info">
                      <h2>지역:</h2>
                      <p>{data.name}</p>
                    </div>
                    <div className="weather-info">
                      <h2>날씨:</h2>
                      <p>{data.weather[0].description}</p>
                    </div>
                    <div className="weather-info">
                      <h2>온도 (°C):</h2>
                      <p>{data.main.temp}</p>
                    </div>
                    <div className="weather-info">
                      <h2>습도:</h2>
                      <p>{data.main.humidity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default App;
