# We Weather Web (WWW)
이 웹 사이트 프로그램은 현재 위치를 기반으로 한 현재의 날씨를 보여줍니다.

react를 기반으로 만들어졌으며, OpenWeather API를 사용하였습니다.


이 프로그램을 사용하기 위해서는 OpenWeather의 API 키가 필요합니다.
아래의 링크에 접속하여 로그인 후, API키를 발급받아야합니다.
https://openweathermap.org/


설치 및 실행 방법
1. 설치하려는 경로에 터미널(cmd 또는 power shell)을 연다.
2. git clone https://github.com/kth5352/we-weather-web.git
   을 입력한다.
3. 파일 설치 후에는 npm install 을 입력한다.
4. 실행을 위해서는 .env 파일에 API key를 입력하거나, App.js 파일의 ${process.env.REACT_APP_APIKEY} 부분을 API key로 바꾼다.
5. 터미널에 npm start를 입력한다.


이 프로젝트를 진행 하면서 react를 실행하고 있는 도중에 .env 파일을 수정해도 실행중인 프로젝트에 적용되지 않아서 곤혹을 치렀다.
.env 파일의 환경변수들은 react가 실행될 때에 로드된다는 사실을 배웠다.

현재 GUI가 매우 단조롭게 구성되어 있고, 현재 위치의 현재 날씨만을 확인할 수 있다.
GUI를 개선하고, 다른 위치의 내일의 날씨도 확인할 수 있도록 개선할 수 있을 것이다.
