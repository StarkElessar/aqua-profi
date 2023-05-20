// Импорт зависимостей (если необходимо)
// import ymaps from 'ymaps' (если вы используете сборщик модулей)

function initMap() {
  // Переменная для включения/отключения индикатора загрузки
  const spinner = document.querySelector('.map-loader');
  // Переменная для определения была ли хоть раз загружена Яндекс.Карта
  // (чтобы избежать повторной загрузки при наведении)
  let isLoad = false;
  const coords = [53.880613, 27.557304];

  // Функция создания карты сайта и затем вставки ее в блок с идентификатором "map-yandex"
  function init() {
    const myMapTemp = new ymaps.Map('map-yandex', {
      center: coords, // координаты центра на карте
      zoom: 18, // коэффициент приближения карты
      controls: ['zoomControl', 'fullscreenControl'], // выбираем только те функции, которые необходимы при использовании
    });

    const myPlacemarkTemp = new ymaps.Placemark(
      coords,
      {
        balloonContent: 'ООО "Аква-Профи Ко"',
      },
      {
        // Необходимо указать данный тип макета
        iconLayout: 'default#imageWithContent',
        // Своё изображение иконки метки
        iconImageHref: './../images/map-marker.png',
        // Размеры метки
        iconImageSize: [60, 80],
        // Смещение левого верхнего угла иконки относительно её "ножки" (точки привязки)
        iconImageOffset: [-25, -50],
      }
    );
    // помещаем флажок на карту
    myMapTemp.geoObjects.add(myPlacemarkTemp);

    // Получаем первый экземпляр коллекции слоев, потом первый слой коллекции
    const layer = myMapTemp.layers.get(0).get(0);

    // Решение по callback-у для определения полной загрузки карты
    // скрываем индикатор загрузки после полной загрузки карты
    waitForTilesLoad(layer).then(() => spinner.classList.remove('is-active'));
  }

  // Функция для определения полной загрузки карты (на самом деле проверяется загрузка тайлов)
  function waitForTilesLoad(layer) {
    return new ymaps.vow.Promise((resolve, reject) => {
      const tc = getTileContainer(layer);
      let readyAll = true;

      tc.tiles.each((tile, number) => {
        if (!tile.isReady()) {
          readyAll = false;
        }
      });

      readyAll ? resolve() : tc.events.once('ready', () => resolve());
    });
  }

  function getTileContainer(layer) {
    for (const k in layer) {
      if (layer.hasOwnProperty(k)) {
        if (
          layer[k] instanceof ymaps.layer.tileContainer.CanvasContainer ||
          layer[k] instanceof ymaps.layer.tileContainer.DomContainer
        ) {
          return layer[k];
        }
      }
    }

    return null;
  }

  // Функция загрузки API Яндекс.Карт по требованию (в нашем случае при наведении)
  function loadScript(url, callback) {
    const script = document.createElement('script');

    if (script.readyState) {
      // IE
      script.onreadystatechange = () => {
        if (
          script.readyState === 'loaded' ||
          script.readyState === 'complete'
        ) {
          script.onreadystatechange = null;
          callback();

          console.log(123);
        }
      };
    } else {
      // Другие браузеры
      script.onload = () => callback();
    }

    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
  }

  // Основная функция, которая проверяет,
  // когда мы навели на блок с классом "ymap-container"
  function ymap() {
    document
      .querySelector('.map-container')
      .addEventListener('mouseenter', () => {
        // проверяем первый ли раз загружается Яндекс.Карта, если да, то загружаем
        if (!isLoad) {
          // Чтобы не было повторной загрузки карты, мы изменяем значение переменной
          isLoad = true;

          // Показываем индикатор загрузки до тех пор, пока карта не загрузится
          spinner.classList.add('is-active');

          // Загружаем API Яндекс.Карт
          loadScript(
            'https://api-maps.yandex.ru/2.1/?apikey=6230005f-89df-4997-824a-04d4f6546864&lang=ru_RU&amp;loadByRequire=1',
            () => {
              // Как только API Яндекс.Карт загрузились,
              // сразу формируем карту и помещаем в блок
              // с идентификатором "map-yandex"
              ymaps.load(init);
            }
          );
        }
      });
  }

  // Запускаем основную функцию
  ymap();
}

export default initMap;