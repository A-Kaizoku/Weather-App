const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUI = (data) => {
  const cityDets = data.cityDets;
  const weather = data.weather;

  //update details template
  details.innerHTML = ` <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>`;

  //update the night/day & icon images

  const iconSrc = `/icons/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  let timeSrc = null;
  if (weather.IsDayTime) timeSrc = "/icons/day.svg";
  else timeSrc = "/icons/night.svg";

  time.setAttribute("src", timeSrc);

  //remove the d-none class if present
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCity = async (city) => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);
  return { cityDets: cityDets, weather: weather };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //get city value
  const city = cityForm.city.value.trim();
  cityForm.reset;

  //update ui with new city
  updateCity(city)
    .then((data) => {
      updateUI(data);
      console.log(data);
    })
    .catch((err) => console.log(err));

    //set localStorage for Weather App
    localStorage.setItem('city',city);
});

if(localStorage.getItem('city'))
  {updateCity(localStorage.getItem('city'))
    .then((data) => {
      updateUI(data);
      console.log(data);
    })
    .catch((err) => console.log(err));
  }


// //store data in local storage
// localStorage.setItem('name','mario');
// localStorage.setItem('age',50);

// //get data from local storage
// let name=localStorage.getItem('name');
// console.log(name)

// //deleting data from local storage
// // localStorage.removeItem('name')
// // name=localStorage.getItem('name');
// // console.log(name)
// // localStorage.clear(); // clears everything inside localStorage

// //stringifying and parsing data

// const todos=[
//   {test:'buy play station', author:'mario'},
//   {test:'buy milk',author:'limka'},
//   {test:'buy beverages',author:'mihir'}
// ];

// // console.log(JSON.stringify(todos))
// localStorage.setItem('todos',JSON.stringify(todos));
// const stored=localStorage.getItem('todos');
// console.log(JSON.parse(stored));

