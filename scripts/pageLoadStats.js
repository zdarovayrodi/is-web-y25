(function () {
    function showPageLoadStats() {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
        const statsElement = document.createElement('p');
        statsElement.innerHTML = `Страница загружена за ${loadTime} миллисекунд.`;
        statsElement.style.color = `darkgrey`

        const footer = document.getElementById('stats');
        footer.appendChild(statsElement);
    }

    window.addEventListener('load', showPageLoadStats);
})();
