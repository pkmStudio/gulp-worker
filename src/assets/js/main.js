/*
(i) Код попадает в итоговый файл,
только когда вызвана функция,
например pkmFunctions.isWeb();
Или когда импортирован весь файл,
например import "files/script.js";
Неиспользуемый (не вызванный)
код в итоговый файл не попадает.

Если мы хотим добавить модуль
следует его расскоментировать
*/

// ========================================================================================================================================================================================================================================================
// Функционал ========================================================================================================================================================================================================================================================
// ========================================================================================================================================================================================================================================================
import * as pkmFunctions from "./files/functions.js";

/* Проверка поддержки webp, добавление класса webp или no-webp для HTML */
/* (i) необходимо для корректного отображения webp из css  */
pkmFunctions.isWebp();
/* Добавление класса touch для HTML если браузер мобильный */
pkmFunctions.addTouchClass();
/* Добавление loaded для HTML после полной загрузки страницы */
// pkmFunctions.addLoadedClass();
/* Модуль для работы с меню (Бургер) */
// pkmFunctions.menuInit();

import '../components/accordion/accordion.js';
