const main = document.querySelector(".main");
const citySearchInput = document.querySelector(".citySearchInput");
const todayBox = document.querySelector(".todayBox");
const cityInfoDetail = document.querySelector(".cityInfoDetail");
const rightSection = document.querySelector(".rightSection");
const errorMessage = document.querySelector(".errorMessage");
const CELSIUS = 273.15;
let url;
let isError = false;
let dataArray = [];
let clothesArr;

const init = () => {
  main.classList.add("BgDefault");
  todayBox.innerHTML = showToday();
};

const showToday = () => {
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
  let weatherIcon = dataArray.weather[0].icon;
  if (weatherIcon.includes("01")) {
    main.className = "main BgSky";
  } else if (
    weatherIcon.includes("02") ||
    weatherIcon.includes("03") ||
    weatherIcon.includes("04")
  ) {
    main.className = "main BgClouds";
  } else if (weatherIcon.includes("09") || weatherIcon.includes("10")) {
    main.className = "main BgRain";
  } else if (weatherIcon.includes("11")) {
    main.className = "main BgThunderstorm";
  } else if (weatherIcon.includes("13")) {
    main.className = "main BgSnow";
  } else if (weatherIcon.includes("50")) {
    main.className = "main BgMist";
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

const clothesRenderByTemp = (temp) => {
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
};

const clothesCardRender = () => {
  return clothesArr.map((item, key) => {
    return `
    <div class="card" key=${key}>
      <img src=${item.url} alt="없음" />
      <span>${item.name}</span>
    </div>`;
  });
};

const cityInfoDetailRender = () => {
  return (resultHTMLLeft = `
    <div class="InfoItems">
      <span>최대 / 최저 기온</span>
      <span>${(dataArray.main.temp_max - CELSIUS).toFixed(1)}
      &nbsp;&#8451;&nbsp;/&nbsp;
      ${(dataArray.main.temp_min - CELSIUS).toFixed(1)}&nbsp;&#8451;
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
    </div>`);
};

const cityInfoMainRender = (getCityName) => {
  return (resultHTMLRight = `
  <div class="todayBox">${showToday()}</div>
  <div class="mainInfoBox">
  <div class="cityInfo">
    <div class="infoBox">
    <span class="cityTemp">${(dataArray.main.temp - CELSIUS).toFixed(
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
        ${clothesCardRender()}
        </div>
      </div>
    </div>
  </div>
</div>
  `);
};

const htmlRender = () => {
  let getCityName = Object.keys(cityName).find(
    (key) => cityName[key] === dataArray.name
  );
  let temp = (dataArray.main.temp - CELSIUS).toFixed(1);

  clothesRenderByTemp(temp);

  cityInfoDetail.innerHTML = cityInfoDetailRender();
  rightSection.innerHTML = cityInfoMainRender(getCityName);

  mouseDown();
};

const fetchApiData = async (url) => {
  await fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw Error("데이터 불러오기 실패");
      }
      return response.json();
    })
    .then((fetchedData) => {
      dataArray = fetchedData;
      bgChange();
      htmlRender();
    });
};

const errorRender = () => {
  let leftErrorMessage = `  <span class="leftErrorMessage">등록되지 않은 지역입니다.</span>`;
  let rightErrorMessage = `
  <div class="todayBox">${showToday()}</div>
  <span class="rightErrorMessage">등록되지 않은 지역입니다.</span>
  `;
  cityInfoDetail.innerHTML = leftErrorMessage;
  rightSection.innerHTML = rightErrorMessage;
};

const searchLocation = (e) => {
  if (e.keyCode == 13) {
    let location = citySearchInput.value;
    let cityNameEn = cityName[location];
    if (cityNameEn) {
      url = new URL(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityNameEn}&lang=Kr&appid=ba377ee3d7d4e51eeb16cebe61239877`
      );
      isError = false;
      fetchApiData(url);
      citySearchInput.value = "";
    } else {
      isError = true;
      errorRender();
      citySearchInput.value = "";
    }
  }
};

init();

citySearchInput.addEventListener("keyup", (e) => searchLocation(e));
