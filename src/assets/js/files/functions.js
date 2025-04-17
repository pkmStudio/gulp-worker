/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
export function isWebp() {
	// Проверка поддержки webp
	function testWebP(callback) {
		let webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}
	// Добавление класса _webp или _no-webp для HTML
	testWebP(function (support) {
		let className = support === true ? 'webp' : 'no-webp';
		document.documentElement.classList.add(className);
	});
}
/* Проверка мобильного браузера */
export let isMobile = { Android: function () { return navigator.userAgent.match(/Android/i); }, BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); }, iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); }, Opera: function () { return navigator.userAgent.match(/Opera Mini/i); }, Windows: function () { return navigator.userAgent.match(/IEMobile/i); }, any: function () { return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows()); } };
/* Добавление класса touch для HTML если браузер мобильный */
export function addTouchClass() {
	// Добавление класса _touch для HTML если браузер мобильный
	if (isMobile.any()) document.documentElement.classList.add('touch');
}
// Добавление loaded для HTML после полной загрузки страницы
export function addLoadedClass() {
	window.addEventListener("load", function () {
		setTimeout(function () {
			document.documentElement.classList.add('loaded');
		}, 0);
	});
}
// Вспомогательные модули блокировки прокрутки и скочка ====================================================================================================================================================================================================================================================================================
export let bodyLockToggle = () => {
    if (document.documentElement.classList.contains("lock")) {
        bodyUnlock();
    } else {
        bodyLock();
    }
};

export let bodyUnlock = () => {
    let body = document.querySelector("body");
    document.documentElement.classList.remove("lock");
    body.style.paddingRight = "0px";
};

export let bodyLock = () => {
    let body = document.querySelector("body");
    body.style.paddingRight =
        window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
    document.documentElement.classList.add("lock");
};

// Модуль работы с меню (бургер) =======================================================================================================================================================================================================================
/*
Сниппет (HTML): smenu
*/
export function menuInit() {
	if (document.querySelector(".icon-menu")) {
		document.addEventListener("click", function (e) {
			if (e.target.closest('.icon-menu')) {
				bodyLockToggle();
				document.documentElement.classList.toggle("menu-open");
			}
		});
	};
}
export function menuOpen() {
	bodyLock();
	document.documentElement.classList.add("menu-open");
}
export function menuClose() {
	bodyUnlock();
	document.documentElement.classList.remove("menu-open");
}


// Модуль работы с подменю ========================================================================================================================================================
export function subMenu() {
	let menuDropdown = document.querySelectorAll(".menu__item ._icon-chevron-down");
	if (menuDropdown.length > 0) menuDropdown.forEach((element => {
		let parent = element.closest(".menu__item");
		parent.addEventListener("click", (function(e) {
			let openElement = document.querySelector(".menu__item._active");
			if (openElement && openElement !== parent) openElement.classList.toggle("_active");
			parent.classList.toggle("_active");
		}));
	}));
}