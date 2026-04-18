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
    let posX = 0;
    let posY = 0;
    let randomXValue = 0;
    let randomYValue = 0;
    // Dimenciones de la ventana
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    while (true) {
        // Aplicar el valor aleatorio a las variables CSS
        if (posX < randomXValue) {
            posX += 1;
        } else if (posX > randomXValue) {
            posX -= 1;
        } else {
            randomXValue = Math.floor(Math.random() * windowWidth);
        }

        if (posY < randomYValue) {
            posY += 1;
        } else if (posY > randomYValue) {
            posY -= 1;
        } else {
            randomYValue = Math.floor(Math.random() * windowHeight);
        }

        document.documentElement.style.setProperty('--posX', posX);
        document.documentElement.style.setProperty('--posY', posY);
        // Esperar un tiempo antes de generar nuevos valores
        await new Promise(resolve => setTimeout(resolve, 5));
    }


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