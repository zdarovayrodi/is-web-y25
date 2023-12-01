document.addEventListener('DOMContentLoaded', function () {
    const scheduleForm = document.getElementById('scheduleForm');
    const scheduleResults = document.getElementById('scheduleResults');

    scheduleForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const weekdays = document.getElementById('weekdays').value;
        const excursions = document.getElementById('excursions').value;
        const language = document.getElementById('language').value;

        const selectedImages = Array.from(document.getElementsByName('images'))
            .filter(input => input.checked)
            .map(input => {
                const descriptionMap = {
                    'image1': 'тихий, спокойный, размеренный',
                    'image2': 'насыщенный, познавательный',
                    'image3': 'экстремальный'
                };

                return {
                    value: input.value,
                    description: descriptionMap[input.value] || ''
                };
            });

        const descriptions = selectedImages.map(image => image.description).filter(Boolean);

        const scheduleHTML = `
            <h2 class="text-xl font-bold mb-2">Ваш идеальный отдых включает в себя:</h2>
            <p>Количество дней в путешествии: ${weekdays}</p>
            <p>Максимальное количество экскурсий: ${excursions}</p>
            <p>Язык (гида): ${language}</p>
            <p>Приоритеты: ${descriptions.join(', ')}</p>
      `;

        scheduleResults.innerHTML = scheduleHTML;

        // Сохранение параметров в локальное хранилище
        const scheduleParams = {
            weekdays,
            excursions,
            language,
            selectedImages
        };

        localStorage.setItem('scheduleParams', JSON.stringify(scheduleParams));
    });

    // Загрузка параметров из локального хранилища при загрузке страницы
    const storedParams = JSON.parse(localStorage.getItem('scheduleParams'));
    if (storedParams) {
        document.getElementById('weekdays').value = storedParams.weekdays;
        document.getElementById('excursions').value = storedParams.excursions;

        storedParams.selectedImages.forEach(image => {
            const checkbox = document.querySelector(`input[name="images"][value="${image.value}"]`);
            if (checkbox) {
                checkbox.checked = true;
            }
        });
    }
});
