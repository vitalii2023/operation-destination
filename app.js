let totalClicks = 0;
let maxClicks = 5;

function Location(name, weather, currency, img, views, clicks) {
  this.name = name;
  this.weather = weather;
  this.currency = currency;
  this.img = img;
  this.views = views;
  this.clicks = clicks;
  Location.allLocations.push(this);
}

Location.allLocations = [];

const locationNames = [
  "canada",
  "mexico",
  "brazil",
  "colombia",
  "cuba",
  "california",
  "england",
  "netherlands",
  "norway",
  "france",
  "italy",
  "ukraine",
  "thailand",
  "philippines",
  "bali",
  "australia",
  "new zealand",
  "tanzania",
  "madagascar",
  "india",
];

function randomWeatherCondition() {
  const randomTemp = Math.floor(Math.random() * 50);
  return randomTemp;
}

if (localStorage.getItem("locationData") === null) {
  for (let i = 0; i < locationNames.length; i++) {
    new Location(
      locationNames[i],
      "weather",
      "dollars",
      `images/${locationNames[i]}.jpg`,
      0,
      0
    );
  }
} else {
  const locationData = JSON.parse(localStorage.getItem("locationData"));
  for (let i = 0; i < locationData.length; i++) {
    // console.log(locationData[i]);

    const locoName =
      locationData[i].name.charAt(0).toUpperCase() +
      locationData[i].name.slice(1);

    new Location(
      //   locationData[i].name,
      locoName,
      randomWeatherCondition(),
      "pound",
      locationData[i].img,
      locationData[i].clicks,
      locationData[i].views
    );
  }
}

function randomLocationIndex() {
  let randomNumber = Math.floor(Math.random() * Location.allLocations.length);
  return randomNumber;
}

function renderImages() {
  let index1 = randomLocationIndex();
  let index2 = randomLocationIndex();
  let index3 = randomLocationIndex();

  while (index1 === index2 || index1 === index3 || index2 === index3) {
    index2 = randomLocationIndex();
    index3 = randomLocationIndex();
  }
  const image1 = document.getElementById("img1");
  const image2 = document.getElementById("img2");
  const image3 = document.getElementById("img3");
  console.log(Location.allLocations);
  image1.src = Location.allLocations[index1].img;
  image2.src = Location.allLocations[index2].img;
  image3.src = Location.allLocations[index3].img;

  image1.alt = Location.allLocations[index1].name;
  image2.alt = Location.allLocations[index2].name;
  image3.alt = Location.allLocations[index3].name;

  Location.allLocations[index1].views++;
  Location.allLocations[index2].views++;
  Location.allLocations[index3].views++;

  document.getElementById(
    "img-card-destination1"
  ).innerHTML = `${Location.allLocations[index1].name}`;
  document.getElementById(
    "img-card-weather1"
  ).innerHTML = `Current Temperature: ${Location.allLocations[index1].weather}`;
  document.getElementById(
    "img-card-currency1"
  ).innerHTML = `Currency: ${Location.allLocations[index1].currency}`;
  //
  //
  document.getElementById(
    "img-card-destination2"
  ).innerHTML = `${Location.allLocations[index2].name}`;
  document.getElementById(
    "img-card-weather2"
  ).innerHTML = `Current Temperature: ${Location.allLocations[index2].weather}`;
  document.getElementById(
    "img-card-currency2"
  ).innerHTML = `Currency: ${Location.allLocations[index2].currency}`;

  document.getElementById(
    "img-card-destination3"
  ).innerHTML = `${Location.allLocations[index3].name}`;
  document.getElementById(
    "img-card-weather3"
  ).innerHTML = `Current Temperature: ${Location.allLocations[index3].weather}`;
  document.getElementById(
    "img-card-currency3"
  ).innerHTML = `Currency: ${Location.allLocations[index3].currency}`;
}

// write a function so whenever you click on the image, it shows 3 new images
function imageClick(event) {
  console.log(event.target);
  // using event.target.alt, and a for loop, increase the clicks value for the image you clicked on

  for (let i = 0; i < Location.allLocations.length; i++) {
    if (event.target.alt === Location.allLocations[i].name) {
      Location.allLocations[i].clicks++;

      break;
    }
  }

  // each time this function runs
  // set local storage to be our Location.allLocations array
  const locationsStr = JSON.stringify(Location.allLocations);
  localStorage.setItem("locationData", locationsStr);

  renderImages();
  renderChart();
}
// here is where teh chart code goes

function renderChart() {
  const myChart = document.getElementById("chart");
  let labels = [];
  let viewsData = [];
  let clicksData = [];

  for (let i = 0; i < Location.allLocations.length; i++) {
    labels.push(Location.allLocations[i].name);
    viewsData.push(Location.allLocations[i].views);
    clicksData.push(Location.allLocations[i].clicks);
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "# of Views",
        data: viewsData,
        borderWidth: 1,
      },
      {
        label: "# of Votes",
        data: clicksData,
        borderWidth: 1,
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
  };
  new Chart(myChart, config);
}
const imgContainer = document.getElementById("img-container");
imgContainer.addEventListener("click", imageClick);

renderImages();

console.log(Location.allLocations);
