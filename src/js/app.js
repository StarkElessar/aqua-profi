/**
 * !(i)
 * Код попадает в итоговый файл, только когда вызвана функция, например FLSFunctions.spollers();
 * Или когда импортирован весь файл, например import "files/script.js";
 * Неиспользуемый (не вызванный) код в итоговый файл не попадает.

 * Если мы хотим добавить модуль следует его раскомментировать
 */
// import { MousePRLX } from './libs/parallaxMouse'
// import AOS from 'aos'
import Inputmask from 'inputmask/lib/inputmask';
import Swiper, { Thumbs, Autoplay } from 'swiper';
import { Fancybox } from '@fancyapps/ui';

import BurgerMenu from './modules/BurgerMenu';
import Tabs from './modules/Tabs';
import FormSending from './modules/FormSending';
import initMap from './modules/yandexMapLoad';

import {
	addLoadedClass,
	addTouchClass,
	isWebp,
	togglePopupWindows,
} from './modules';
import { addButton, footerMenu, html } from './helpers/elementsNodeList';
import { handleAddKitButtonClick } from './helpers/eventHandlers';
import { addListeners } from './store/addListeners';
import { createStore } from './store';
import createProductTag from './components/createProductTag';
import createSpecsTable, { tableRow } from './components/createSpecsTable';
import createSlider from './components/createSlider.js';

/* Проверка поддержки webp, добавление класса webp или no-webp для HTML
 ! (i) необходимо для корректного отображения webp из css
 */
addTouchClass();
addLoadedClass();
isWebp();

/* Добавление класса touch для HTML если браузер мобильный */
// addTouchClass();

/* Добавление loaded для HTML после полной загрузки страницы */
// addLoadedClass();

/* Модуль для работы с меню (Бургер) */
new BurgerMenu().init();

/**
 *  Библиотека для анимаций
 *  документация: https://michalsnik.github.io/aos
 */
// AOS.init();

/** Параллакс мышей */
// const mousePrlx = new MousePRLX({});

/** Фиксированный header */
// headerFixed();

/**
 * Открытие/закрытие модальных окон
 * Чтобы модальное окно открывалось и закрывалось
 * На окно повешай атрибут data-popup="<название окна>"
 * И на кнопку, которая вызывает окно так же повешай атрибут data-type="<название окна>"

 * На обертку(враппер) окна добавь класс _overlay-bg
 * На кнопку для закрытия окна добавь класс button-close
 */
togglePopupWindows();

const urlReq =
	location.host === 'starkelessar.github.io'
		? 'https://starkelessar.github.io/aqua-profi/static/db.json'
		: '/static/db.json';

if (document.querySelector('.main-slider')) {
	new Swiper('.main-slider', {
		modules: [Autoplay],
		direction: 'horizontal',
		autoplay: { delay: 3000 },
		speed: 800,
		grabCursor: true,
		spaceBetween: 20,
		slidesPerView: 'auto',
	});
}

if (document.querySelector('.form-rent')) {
	const lastBreadcrumb = document.getElementById('last-breadcrumb');
	const thumbsSwiper = document.getElementById('swiper-thumbs');
	const mainSwiper = document.getElementById('main-swiper');
	const title = document.getElementById('title');
	const productTagContainer = document.getElementById('product-tag');
	const usingOptions = document.getElementById('using-options');
	const featuresTable = document.getElementById('features-table');
	const specsTable = document.getElementById('table-specs');
	const imagePopup = document.getElementById('image-popup');
	const productNameInPopup = document.getElementById('product-name-hidden');

	const updateProductPage = async () => {
		const { searchParams } = new URL(location.href);
		const { category = 'antistaticheskaya', id = '11' } =
			Object.fromEntries(searchParams);

		try {
			const res = await fetch(urlReq);

			if (res.ok) {
				const { categories } = await res.json();
				const [data] = categories[category].filter(
					(product) => product.id === id,
				);

				document.title = `Спецодежда ${data['category']} - ${data['title']}`;
				lastBreadcrumb.textContent = data['category'];
				thumbsSwiper.append(createSlider(data['images'], false, category, id));
				mainSwiper.append(createSlider(data['images'], true, category, id));
				title.textContent = data['title'];
				usingOptions.textContent = `Варианты носки: ${data['usingOptions']}`;

				data['kit'].forEach((item) =>
					productTagContainer.append(createProductTag(item)),
				);
				data['moreInfo'].forEach(({ title, specs }) =>
					specsTable.append(createSpecsTable(title, specs)),
				);

				for (const key in data['features']) {
					featuresTable.append(tableRow(key, data['features'][key]));
				}

				imagePopup.innerHTML = `
					<img src="images/products/${category}/${id}/${data['images'][0]}" alt="${data['title']}">
				`;

				if (document.querySelector('.product-slider')) {
					const thumbsSwiper = new Swiper('.product-slider__thumbs', {
						direction: 'vertical',
						spaceBetween: 10,
						slidesPerView: 3,
						watchSlidesProgress: true,
					});

					new Swiper('.product-slider__main', {
						modules: [Thumbs],
						spaceBetween: 10,
						thumbs: {
							swiper: thumbsSwiper,
						},
					});
				}

				const defaultSize = data['size'][0];
				const defaultGrow = data['grow'][0];

				productNameInPopup.value = data['title'];

				window.store = createStore(defaultSize, defaultGrow);
				addListeners(store, data['size'], data['grow']); // в два главных события передаём текущее состояние, для первого рендера

				addButton.addEventListener('click', handleAddKitButtonClick(store));
			}
		} catch (error) {
			console.log('Что-то пошло не так.. \n', error);
		}
	};

	updateProductPage();
}

if (document.querySelectorAll('form')) {
	const forms = document.querySelectorAll('form');
	const phoneInputs = document.querySelectorAll('input[type="tel"]');

	forms.forEach((form) => {
		new FormSending(`[data-sending="${form.dataset.sending}"]`);
	});

	const instanceMask = new Inputmask('+375 (99) 999-99-99');
	phoneInputs.forEach((input) => {
		instanceMask.mask(input);
	});
}

if (document.querySelector('[data-tabs="catalog"]')) {
	const tabsNav = document.querySelector('.tabs__nav');
	const categories = tabsNav.querySelectorAll('[data-category]');
	const idCategories = Array.from(categories).map(
		(item) => `#${item.dataset.category}`,
	);
	const categoryId = idCategories.indexOf(location.hash);
	const tabId = categoryId < 0 ? 0 : categoryId;

	new Tabs('catalog', {
		defaultTab: tabId,
		onChanged: ({ nextTab }) => (location.hash = nextTab.dataset.category),
		onHashChange: ({ data, eventObject: { newURL } }) => {
			const currentHash = newURL.split('#')[1];
			data.triggers.forEach((trigger) => {
				trigger.dataset.category === currentHash ? trigger.click() : null;
			});
		},
	});
}

const setClassCollapsable = () => {
	footerMenu.classList.toggle('collapsable', innerWidth <= 510);
};

const footerMenuCollapsable = ({ target }) => {
	if (footerMenu.classList.contains('collapsable')) {
		const trigger = target.closest('.column-footer__title');

		if (trigger) {
			if (!trigger.parentElement.classList.contains('open')) {
				footerMenu
					.querySelector('.column-footer.open')
					?.classList.remove('open');
			}

			trigger.parentElement.classList.toggle('open');
		}
	}
};

setClassCollapsable();

if (document.getElementById('map-yandex')) {
	initMap();
}

document.addEventListener('click', footerMenuCollapsable);

window.addEventListener('resize', () => {
	setClassCollapsable();

	if (footerMenu.classList.contains('collapsable')) {
		document.addEventListener('click', footerMenuCollapsable);
	} else {
		document.removeEventListener('click', footerMenuCollapsable);
	}
});
const toggleSubList = () => {
	const closeElements = (elements, className) => {
		elements.forEach((element) => element.classList.remove(className));
	};

	const handleLinkClick = (link) => {
		const activeLinks = document.querySelectorAll(
			'[data-target="sublist"]._active',
		);
		const visibleSublists = document.querySelectorAll('.menu__sublist._open');

		if (!link.classList.contains('_active')) {
			closeElements(activeLinks, '_active');
			closeElements(visibleSublists, '_open');

			link.classList.add('_active');
			link.nextElementSibling.classList.add('_open');
		} else {
			link.classList.remove('_active');
			link.nextElementSibling.classList.remove('_open');
		}
	};

	const handleLinkHover = (link) => {
		const activeLinks = document.querySelectorAll(
			'[data-target="sublist"]._active',
		);
		const visibleSublists = document.querySelectorAll('.menu__sublist._open');
		const activeLink = document.querySelector(
			'[data-target="sublist"]._active',
		);
		const visibleSublist = document.querySelector('.menu__sublist._open');

		if (link !== activeLink) {
			closeElements(activeLinks, '_active');
			closeElements(visibleSublists, '_open');

			link.classList.add('_active');
			link.nextElementSibling.classList.add('_open');
		}
	};

	const handleMouseOut = (event) => {
		const isMouseOutSubList = event.target.closest('.menu__sublist._open');
		const isMouseOutLink =
			event.relatedTarget &&
			event.relatedTarget.closest('.menu__sublist._open');

		if (isMouseOutSubList && !isMouseOutLink) {
			const subList = event.target.closest('.menu__sublist._open');

			subList.classList.remove('_open');
			subList.previousElementSibling.classList.remove('_active');
		}
	};

	document.addEventListener('click', (event) => {
		const { target } = event;
		const currentLink = target.closest('[data-target="sublist"]');

		if (currentLink) {
			event.preventDefault();
			handleLinkClick(currentLink);
		}

		if (
			!target.closest('.menu__sublist._open') &&
			!target.closest('[data-target="sublist"]')
		) {
			closeElements(
				document.querySelectorAll('[data-target="sublist"]._active'),
				'_active',
			);
			closeElements(document.querySelectorAll('.menu__sublist._open'), '_open');
		}
	});

	if (!html.classList.contains('touch')) {
		document.addEventListener('mouseover', (event) => {
			const { target } = event;
			const currentLink = target.closest('[data-target="sublist"]');

			if (currentLink) {
				handleLinkHover(currentLink);
			}
		});

		document.addEventListener('mouseout', handleMouseOut);
	}
};

toggleSubList();

Fancybox.bind('[data-fancybox="gallery"]');
