const locale = "en";
let translations = {};
document.addEventListener("DOMContentLoaded", () => {
  setLocale(locale);
});
async function setLocale() {
  response = await fetch(`/lang/${locale}/details.json`);
  translations = await response.json();
  translatePage();
}

function translatePage() {
  document
    .querySelectorAll("[data-key]")
    .forEach(elem => {
        const key = elem.getAttribute("data-key");
        const translation = translations[key];
        elem.innerText = translation;
    });
}



