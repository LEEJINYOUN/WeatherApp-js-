const searchInput = document.querySelector(".searchInput");
const nowDay = document.querySelector(".nowDay");
const errorMessage = document.querySelector(".errorMessage");
const mainInfoDetail = document.querySelector(".mainInfoDetail");
const mainRight = document.querySelector(".mainRight");
const celsius = 273.15;
let url;
let isError = false;
let dataArray = [];

const todayTime = () => {
  let now = new Date();
  let todayYear = now.getFullYear();
  let todayMonth =
    now.getMonth() + 1 > 9 ? now.getMonth() + 1 : "0" + (now.getMonth() + 1);
  let todayDate = now.getDate() > 9 ? now.getDate() : "0" + now.getDate();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  let dayOfWeek = week[now.getDay()];
  return (
    todayYear + ". " + todayMonth + ". " + todayDate + " " + dayOfWeek + "요일"
  );
};

nowDay.innerHTML = todayTime();

const cityName = {
  서울: "Seoul",
  부산: "Busan",
  대구: "Daegu",
  인천: "Incheon",
  광주: "Gwangju",
  대전: "Daejeon",
  울산: "Gyeongju",
  세종: "Sejong",
  수원: "Suwon-si",
  춘천: "Chuncheon",
  청주: "Cheongju-si",
  예산: "Yesan",
  홍성: "Hongseong",
  전주: "Jeonju",
  무안: "Muan",
  목포: "Mokpo",
  안동: "Andong",
  예천: "Yecheon",
  포항: "Pohang",
  창원: "Changwon",
  진주: "Jinju",
  제주도: "Jeju City",
};

const htmlRender = () => {
  let getCityName = Object.keys(cityName).find(
    (key) => cityName[key] === dataArray.name
  );
  let resultHTMLLeft = `
    <div class="InfoItems">
      <span>최대 / 최저 기온</span>
      <span>${(dataArray.main.temp_max - celsius).toFixed(1)}
      &nbsp;&#8451;&nbsp;/&nbsp;
      ${(dataArray.main.temp_min - celsius).toFixed(1)}&nbsp;&#8451;
      </span>
    </div>
    <div class="InfoItems">
      <span>습도</span>
      <span>${dataArray.main.humidity}%</span>
    </div>
    <div class="InfoItems">
      <span>풍속</span>
      <span>${dataArray.wind.speed}km/h</span>
    </div>
    <div class="InfoItems">
      <span>구름</span>
      <span>${dataArray.clouds.all}%</span>
    </div>
    <div class="InfoItems">
      <span>날씨 설명</span>
      <span>${dataArray.weather[0].description}</span>
    </div>`;
  let resultHTMLRight = `
  <div class="nowDay">${todayTime()}</div>
        <div class="mainInfo">
          <div class="infoBox">
            <span class="cityTemp">${(dataArray.main.temp - celsius).toFixed(
              1
            )}&nbsp;&#8451;</span>
            <span class="cityName">${getCityName}</span>
            <img class="cityImage" src='http://openweathermap.org/img/wn/${
              dataArray.weather[0].icon
            }@2x.png' alt="이미지 없음" />
          </div>
        </div>`;

  mainInfoDetail.innerHTML = resultHTMLLeft;
  mainRight.innerHTML = resultHTMLRight;
};

const getApiData = async () => {
  await fetch(url)
    .then(function (res) {
      if (!res.ok) {
        throw Error("데이터 불러오기 실패");
      }
      return res.json();
    })
    .then(function (data) {
      dataArray = data;
      htmlRender();
    });
};

const errorRender = () => {
  let errorMessageLeft = `  <span class="errorMessageLeft">등록되지 않은 지역입니다.</span>`;
  let errorMessageRight = `
  <div class="nowDay">${todayTime()}</div>
  <span class="errorMessageRight">등록되지 않은 지역입니다.</span>
  `;
  mainInfoDetail.innerHTML = errorMessageLeft;
  mainRight.innerHTML = errorMessageRight;
};

const inputLocation = (e) => {
  if (e.keyCode == 13) {
    let location = searchInput.value;
    let val = cityName[location];
    if (val) {
      url = new URL(
        `https://api.openweathermap.org/data/2.5/weather?q=${val}&lang=Kr&appid=ba377ee3d7d4e51eeb16cebe61239877`
      );
      isError = false;
      getApiData();
      searchInput.value = "";
    } else {
      isError = true;
      errorRender();
      searchInput.value = "";
    }
  }
};

searchInput.addEventListener("keyup", (e) => inputLocation(e));
