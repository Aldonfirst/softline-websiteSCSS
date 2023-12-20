const mapData = [
  {
    region: "Все",
    cities: ["Все"],
    image: "./img/for-map/Map.svg"
  },
  {
    region: "Москва",
    cities: ["Москва"],
    image: "./img/for-map/moscow.svg"
  },
  {
    region: "Центр",
    cities: ["Воронеж", "Ярославль", "Белгород"],
    image: "./img/for-map/centr.svg"
  },
  {
    region: "Северо-Запад",
    cities: ["Санкт-Петербург", "Калининград"],
    image: "./img/for-map/northwest.svg"
  },
  {
    region: "Юг",
    cities: ["Ростов-на-Дону", "Краснодар", "Волгоград"],
    image: "./img/for-map/south.svg"
  },
  {
    region: "Волга",
    cities: ["Казань", "Самара", "Уфа", "Оренбург", "Нижний Новгород"],
    image: "./img/for-map/volga.svg"
  },
  {
    region: "Урал",
    cities: ["Екатеринбург", "Челябинск", "Пермь", "Сургут", "Тюмень", "Ижевск"],
    image: "./img/for-map/ural.svg"
  },
  {
    region: "Сибирь",
    cities: ["Новосибирск", "Омск", "Томск", "Красноярск", "Иркутск"],
    image: "./img/for-map/Siberian.svg"
  },
  {
    region: "Дальний Восток",
    cities: ["Хабаровск", "Владивосток"],
    image: "./img/for-map/farEast.svg"
  },
];


// Функция для  меню и навигации
function initMapMenu() {
  const mapButton = document.querySelector('.map__button');
  const mapMenu = document.querySelector('.map__menu');
  const mapNav = document.querySelector('.map__nav');
  const mapWrapper = document.querySelector('.map__wrapper');

  //навигация только с регионами
  mapData.forEach(item => {
    const navItem = document.createElement('a');
    navItem.textContent = item.region;
    navItem.dataset.region = item.region;
    navItem.onclick = function () { navigate(item.region); };
    mapNav.appendChild(navItem);
  });

  // беру карты всех регионов
  mapData.forEach(item => {
    const image = document.createElement('img');
    image.src = item.image;
    image.className = 'map__image';
    image.id = item.region;
    mapWrapper.appendChild(image);
  });


  navigate('Все');  // карта по дефолту 

  // Обработчик клика по кнопке для показа/скрытия меню
  mapButton.addEventListener('click', function () {
    const isMenuActive = mapMenu.classList.contains('menu-active');
    if (!isMenuActive) {
      createMenuItems();
    }
    mapMenu.classList.toggle('menu-active');
    mapNav.classList.toggle('nav-inactive');
    this.classList.toggle('is-active'); // переворот стрелки 
  });
}
function toggleMenu() {
  const mapMenu = document.querySelector('.map__menu');
  const mapButton = document.querySelector('.map__button');
  const mapNav = document.querySelector('.map__nav');
  
  mapMenu.classList.toggle('menu-active');
  mapButton.classList.toggle('is-active');
  mapNav.classList.toggle('nav-inactive');
}
// Функция для навигации и отображения карты региона
function navigate(region) {
  const images = document.querySelectorAll('.map__image');
  const navLinks = document.querySelectorAll('.map__nav a');

  images.forEach(image => {
    image.style.display = image.id === region ? 'block' : 'none';
  });

  navLinks.forEach(link => {
    if (link.dataset.region === region) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Функция для создания элементов меню с регионами и городами
function createMenuItems() {
  // Для  добавляем и регионы, и города
  const mapMenu = document.querySelector('.map__menu');
  mapMenu.innerHTML = '';

  // Создаю колонки меню (без "Все") 
  mapData.filter(item => item.region !== "Все").forEach(item => {
    const menuItem = document.createElement('div');
    menuItem.classList.add('menu__item');

    const regionItem = document.createElement('div');
    regionItem.classList.add('region');
    regionItem.textContent = item.region;
    menuItem.appendChild(regionItem);

    item.cities.forEach(city => {
      const cityItem = document.createElement('div');
      cityItem.classList.add('city');
      cityItem.textContent = city;
      cityItem.addEventListener('click', function (event) {
        event.stopPropagation();
        navigate(item.region);
        toggleMenu();
      });
      menuItem.appendChild(cityItem);
    });

    menuItem.addEventListener('click', function () {
      navigate(item.region);
      toggleMenu();
    });

    mapMenu.appendChild(menuItem);
  });
}

// Инициализация меню и карты при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
  initMapMenu();
});