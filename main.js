const mainContainer = document.querySelector(".mainContainer");
const searchInput = document.querySelector(".searchInput");
const nowDay = document.querySelector(".nowDay");
const mainInfoDetail = document.querySelector(".mainInfoDetail");
const mainRight = document.querySelector(".mainRight");
const errorMessage = document.querySelector(".errorMessage");
const celsius = 273.15;
let url;
let isError = false;
let dataArray = [];
let clothesArr;

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

const bgChange = () => {
  let weather = dataArray.weather[0].icon;
  if (weather === "01d" || weather === "01n") {
    mainContainer.style.backgroundImage =
      "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url(./image/sky.jpg)";
  } else if (
    weather === "02d" ||
    weather === "02n" ||
    weather === "03d" ||
    weather === "03n" ||
    weather === "04d" ||
    weather === "04n"
  ) {
    mainContainer.style.backgroundImage =
      "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url(./image/clouds.jpg)";
  } else if (
    weather === "09d" ||
    weather === "09n" ||
    weather === "10d" ||
    weather === "10n"
  ) {
    mainContainer.style.backgroundImage =
      "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url(./image/rain.jpg)";
  } else if (weather === "11d" || weather === "11n") {
    mainContainer.style.backgroundImage =
      "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url(./image/thunderstorm.jpg)";
  } else if (weather === "13d" || weather === "13n") {
    mainContainer.style.backgroundImage =
      "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url(./image/snow.jpg)";
  } else if (weather === "50d" || weather === "50n") {
    mainContainer.style.backgroundImage =
      "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),url(./image/mist.jpg)";
  }
};

const mouseDown = () => {
  const cards = document.querySelector(".cards");
  let isMouseDown = false;
  let startX, scrollLeft;

  cards.addEventListener("mousedown", (e) => {
    isMouseDown = true;
    cards.classList.add("active");

    startX = e.pageX - cards.offsetLeft;
    scrollLeft = cards.scrollLeft;
  });

  cards.addEventListener("mouseleave", () => {
    isMouseDown = false;
    cards.classList.remove("active");
  });

  cards.addEventListener("mouseup", () => {
    isMouseDown = false;
    cards.classList.remove("active");
  });

  cards.addEventListener("mousemove", (e) => {
    if (!isMouseDown) return;

    e.preventDefault();
    const x = e.pageX - cards.offsetLeft;
    const walk = (x - startX) * 1;
    cards.scrollLeft = scrollLeft - walk;
  });
};

const htmlRender = () => {
  let getCityName = Object.keys(cityName).find(
    (key) => cityName[key] === dataArray.name
  );

  let temp = (dataArray.main.temp - celsius).toFixed(1);

  if (temp <= 8) {
    clothesArr = [
      {
        name: "털모자",
        url: "./image/clothes/털모자.jpg",
      },
      {
        name: "코트",
        url: "./image/clothes/코트.jpg",
      },

      {
        name: "패딩",
        url: "./image/clothes/패딩.jpg",
      },

      {
        name: "목도리",
        url: "./image/clothes/목도리.jpg",
      },
      {
        name: "장갑",
        url: "./image/clothes/장갑.jpg",
      },
      {
        name: "롱부츠",
        url: "./image/clothes/롱부츠.jpg",
      },
    ];
  } else if (8 < temp <= 11) {
    clothesArr = [
      {
        name: "후드티",
        url: "./image/clothes/후드티.jpg",
      },
      {
        name: "니트",
        url: "./image/clothes/니트.jpg",
      },
      {
        name: "청바지",
        url: "./image/clothes/청바지.jpg",
      },
      {
        name: "구두",
        url: "./image/clothes/구두.jpg",
      },
      {
        name: "롱부츠",
        url: "./image/clothes/롱부츠.jpg",
      },
    ];
  } else if (11 < temp <= 16) {
    clothesArr = [
      {
        name: "후드티",
        url: "./image/clothes/후드티.jpg",
      },
      {
        name: "긴팔티셔츠",
        url: "./image/clothes/긴팔티셔츠.jpg",
      },
      {
        name: "면바지",
        url: "./image/clothes/면바지.jpg",
      },
      {
        name: "청바지",
        url: "./image/clothes/청바지.jpg",
      },
      {
        name: "구두",
        url: "./image/clothes/구두.jpg",
      },
    ];
  } else if (16 < temp <= 19) {
    clothesArr = [
      {
        name: "긴팔티셔츠",
        url: "./image/clothes/긴팔티셔츠.jpg",
      },
      {
        name: "후드티",
        url: "./image/clothes/후드티.jpg",
      },
      {
        name: "면바지",
        url: "./image/clothes/면바지.jpg",
      },
      {
        name: "청바지",
        url: "./image/clothes/청바지.jpg",
      },
      {
        name: "하이힐",
        url: "./image/clothes/하이힐.jpg",
      },
    ];
  } else if (19 < temp <= 22) {
    clothesArr = [
      {
        name: "반팔셔츠",
        url: "./image/clothes/반팔셔츠.jpg",
      },
      {
        name: "긴치마",
        url: "./image/clothes/긴치마.jpg",
      },
      {
        name: "면바지",
        url: "./image/clothes/면바지.jpg",
      },
      {
        name: "청바지",
        url: "./image/clothes/청바지.jpg",
      },
      {
        name: "샌들",
        url: "./image/clothes/샌들.jpg",
      },
    ];
  } else if (22 < temp <= 27) {
    clothesArr = [
      {
        name: "모자",
        url: "./image/clothes/모자.jpg",
      },
      {
        name: "반팔셔츠",
        url: "./image/clothes/반팔셔츠.jpg",
      },
      {
        name: "원피스",
        url: "./image/clothes/원피스.jpg",
      },
      {
        name: "면바지",
        url: "./image/clothes/면바지.jpg",
      },
      {
        name: "반바지",
        url: "./image/clothes/반바지.jpg",
      },
      {
        name: "짧은치마",
        url: "./image/clothes/짧은치마.jpg",
      },
      {
        name: "샌들",
        url: "./image/clothes/샌들.jpg",
      },
    ];
  } else if (27 < temp) {
    clothesArr = [
      {
        name: "모자",
        url: "./image/clothes/모자.jpg",
      },
      {
        name: "반팔셔츠",
        url: "./image/clothes/반팔셔츠.jpg",
      },
      {
        name: "원피스",
        url: "./image/clothes/원피스.jpg",
      },
      {
        name: "반바지",
        url: "./image/clothes/반바지.jpg",
      },
      {
        name: "짧은치마",
        url: "./image/clothes/짧은치마.jpg",
      },
      {
        name: "샌들",
        url: "./image/clothes/샌들.jpg",
      },
    ];
  }

  let clothesMap = clothesArr.map((item, key) => {
    return `
    <div class="card" key=${key}>
      <img src=${item.url} alt="없음" />
      <span>${item.name}</span>
    </div>`;
  });

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
  <div class="mainBox">
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
    <div class="clothesBox">
      <span class="clothesTitle">- 오늘의 옷추천 -</span>
      <div class="cardsBox">
        <div class="cards">
        ${clothesMap}
        </div>
      </div>
    </div>
  </div>
</div>
  `;
  mainInfoDetail.innerHTML = resultHTMLLeft;
  mainRight.innerHTML = resultHTMLRight;
  mouseDown();
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
      bgChange();
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
