document.addEventListener("DOMContentLoaded", async () => {
    // Obtener el idioma del navegador
    const language = navigator.language || navigator.userLanguage;
    let languageCode = language.split('-')[0]; // Eliminar cualquier parte después de '-'

    await loadTranslations(languageCode);

    // toggle de idioma
    const languageToggle = document.getElementById('language-toggle');
    languageToggle.addEventListener('click', async () => {
        languageCode = languageCode === 'es' ? 'en' : 'es';
        await loadTranslations(languageCode);
    });

    // Fondo animado
    document.body.addEventListener("pointermove", (e) => {
        const { currentTarget: el, clientX: x, clientY: y } = e;
        const { top: t, left: l, width: w, height: h } = el.getBoundingClientRect();
        el.style.setProperty('--posX', x - l - w / 2);
        el.style.setProperty('--posY', y - t - h / 2);
    })

    // Cargar traducciones y mostrarlas en la interfaz estática
    async function loadTranslations(languageCode) {
        const jsonPath = languageCode === 'es' ? './locales/es.json' : './locales/en.json';
        const translations = await loadJSON(jsonPath);

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[key]) {
                el.textContent = translations[key];
            } else {
                el.textContent = key; // Si no hay traducción, mostrar la clave
                console.warn(`No se encontró traducción para la clave: ${key}`);
            }
        });
    }

    async function loadJSON(path) {
        try {
            const response = await fetch(path);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }
});