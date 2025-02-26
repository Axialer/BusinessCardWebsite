document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll('.nav-button');
    const iframe = document.querySelector('.embedded-page'); // Предположим, что у вас есть iframe для отображения страниц

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const page = button.getAttribute('data-page');
            console.log(`Нажата кнопка для загрузки: ${page}`);
            iframe.src = page; // Меняем источник iframe

            // Удаляем класс активной кнопки у всех кнопок и сбрасываем цвет иконок
            buttons.forEach(btn => {
                btn.classList.remove('active');
                const svg = btn.querySelector('svg');
                svg.style.fill = '#FFFFFF'; // Сбрасываем цвет кода иконки к изначальному
            });

            // Добавляем класс активной кнопки к нажатой кнопке и изменяем цвет иконки
            button.classList.add('active');
            const activeSvg = button.querySelector('svg');
            activeSvg.style.fill = '#a259ff'; // Меняем цвет иконки на красный (или любой другой)
        });
    });
});

// Слушаем события мыши в родительском документе
window.addEventListener('mousemove', function (e) {
    const x = ((e.clientX / window.innerWidth) * 20) + 40;
    const y = ((e.clientY / window.innerHeight) * 20) + 40;
    document.body.style.setProperty('--x', `${x}%`);
    document.body.style.setProperty('--y', `${y}%`);
});

// Обрабатываем сообщения от iframe
window.addEventListener('message', (e) => {
    if (e.data.type === 'mousemove') {
        const rect = document.querySelector('.rectangle-2').getBoundingClientRect();
        const x = e.data.x + rect.left;
        const y = e.data.y + rect.top;
        document.body.style.setProperty('--x', `${((x / window.innerWidth) * 20) + 40}%`);
        document.body.style.setProperty('--y', `${((y / window.innerHeight) * 20) + 40}%`);
    }
});

