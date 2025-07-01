document.addEventListener('DOMContentLoaded', () => {
    const accordionItems = document.querySelectorAll('.accordion__item');

    // Если элементов нет - прекращаем выполнение
    if (!accordionItems) return;

    accordionItems.forEach((accordion) => {
        const button = accordion.querySelector('.accordion__button');
        const content = accordion.querySelector('.accordion__content');

        button.addEventListener('click', () => {
            const isOpen = accordion.classList.toggle('open');

            // Анимация появления контента
            content.classList.toggle('active');

            // Поворот кнопки
            button.classList.toggle('active');
        });
    });
});