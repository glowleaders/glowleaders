document.addEventListener("DOMContentLoaded", () => {

    /* =========================
     POPUP BIENVENIDA
  ========================= */
  const popup = document.getElementById("welcomePopup");
  const closePopup = document.getElementById("closePopup");
  const popupImage = document.getElementById("popupImage");
  const popupCTA = document.getElementById("popupCta");
  const popupImageLink = document.getElementById("popupImageLink");

  let currentPopupLang = "es";

  function updatePopupContent(lang = "es") {
    if (!popup || !popupImage || !popupCTA) return;

    currentPopupLang = lang;

    if (lang === "en") {
      popupImage.src = "images/imagenpopin.png";
      popupImage.alt = "Glow experience for free";
      popupCTA.textContent = popupCTA.dataset.en;
    } else {
      popupImage.src = "images/imagenpopes.png";
      popupImage.alt = "Experiencia Glow gratis";
      popupCTA.textContent = popupCTA.dataset.es;
    }
  }

  function openPopup(lang = "es") {
    if (!popup || !popupImage) return;

    currentPopupLang = lang;

    const key = "popupShown_" + lang;
    if (sessionStorage.getItem(key) === "true") return;

    updatePopupContent(lang);
    popup.classList.remove("hidden");
  }

  function closePopupBox() {
    if (!popup) return;

    popup.classList.add("hidden");
    sessionStorage.setItem("popupShown_" + currentPopupLang, "true");
  }

  if (closePopup) {
    closePopup.addEventListener("click", closePopupBox);
  }

  if (popup) {
    popup.addEventListener("click", (e) => {
      if (e.target === popup) {
        closePopupBox();
      }
    });
  }

  if (popupCTA) {
    popupCTA.addEventListener("click", () => {
      closePopupBox();
    });
  }

  if (popupImageLink) {
    popupImageLink.addEventListener("click", () => {
      closePopupBox();
    });
  }

  /* =========================
     HERO SLIDER + IDIOMA
  ========================= */
  const heroImages = {
    es: [
      "images/hero/hero-es-1.png",
      "images/hero/hero-es-2.png",
      "images/hero/hero-es-3.png"
    ],
    en: [
      "images/hero/hero-en-1.png",
      "images/hero/hero-en-2.png",
      "images/hero/hero-en-3.png"
    ]
  };

  let currentHeroIndex = 0;
  let currentHeroLang = "es";
  let heroInterval;

  const heroImg = document.getElementById("hero-slide-image");
  const langButtons = document.querySelectorAll(".lang-btn");
  const translatableElements = document.querySelectorAll("[data-es][data-en]");

  function updateHeroImage() {
    if (!heroImg) return;
    heroImg.src = heroImages[currentHeroLang][currentHeroIndex];
  }

  function nextHeroSlide() {
    currentHeroIndex = (currentHeroIndex + 1) % heroImages[currentHeroLang].length;
    updateHeroImage();
  }

  function startHeroSlider() {
    clearInterval(heroInterval);
    heroInterval = setInterval(nextHeroSlide, 5000);
  }

  function updateLegalLinks() {
    document.querySelectorAll(".footer-legal a").forEach((link) => {
      const href = link.getAttribute("href");

      if (document.body.classList.contains("english")) {
        if (href === "aviso-legal.html") link.setAttribute("href", "legal-notice.html");
        if (href === "privacidad.html") link.setAttribute("href", "privacy-policy.html");
        if (href === "cookies.html") link.setAttribute("href", "cookies-policy.html");
      } else {
        if (href === "legal-notice.html") link.setAttribute("href", "aviso-legal.html");
        if (href === "privacy-policy.html") link.setAttribute("href", "privacidad.html");
        if (href === "cookies-policy.html") link.setAttribute("href", "cookies.html");
      }
    });
  }

  function setLanguage(lang) {
    currentHeroLang = lang;
    currentHeroIndex = 0;

    document.documentElement.lang = lang;
    document.body.classList.toggle("english", lang === "en");

    translatableElements.forEach((el) => {
      const newText = el.getAttribute(`data-${lang}`);
      if (newText) {
        el.textContent = newText;
      }
    });

    const placeholderFields = document.querySelectorAll("[data-placeholder-es][data-placeholder-en]");
    placeholderFields.forEach((field) => {
      field.placeholder = lang === "en"
        ? field.dataset.placeholderEn
        : field.dataset.placeholderEs;
    });

    langButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });

    updateHeroImage();
    startHeroSlider();
    updateLegalLinks();
    updatePopupContent(lang);
    openPopup(lang);
  }

  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      setLanguage(btn.dataset.lang);
    });
  });
  
  /* =========================
     CARRUSEL PRODUCTOS
  ========================= */
  document.querySelectorAll(".products-carousel").forEach((carousel) => {
    const slider = carousel.querySelector(".products-slider");
    const btnLeft = carousel.querySelector(".carousel-arrow-left");
    const btnRight = carousel.querySelector(".carousel-arrow-right");

    if (!slider || !btnLeft || !btnRight) return;

    btnLeft.addEventListener("click", () => {
      slider.scrollBy({
        left: -slider.clientWidth,
        behavior: "smooth"
      });
    });

    btnRight.addEventListener("click", () => {
      slider.scrollBy({
        left: slider.clientWidth,
        behavior: "smooth"
      });
    });
  });

  /* =========================
     CARRUSEL TESTIMONIOS
  ========================= */
  const testimonialSlider = document.querySelector(".testimonials-slider");
  const testimonialPrev = document.querySelector(".testimonials-arrow.prev");
  const testimonialNext = document.querySelector(".testimonials-arrow.next");

  if (testimonialSlider && testimonialPrev && testimonialNext) {
    testimonialPrev.addEventListener("click", () => {
      testimonialSlider.scrollBy({
        left: -testimonialSlider.clientWidth,
        behavior: "smooth"
      });
    });

    testimonialNext.addEventListener("click", () => {
      testimonialSlider.scrollBy({
        left: testimonialSlider.clientWidth,
        behavior: "smooth"
      });
    });
  }

 /* =========================
   FORMULARIO + GRACIAS + KLAVIYO
========================= */
const klaviyoForm = document.getElementById("klaviyo-form");
const thanksPopup = document.getElementById("thanksPopup");
const thanksTitle = document.getElementById("thanksTitle");
const thanksText = document.getElementById("thanksText");
const thanksBack = document.getElementById("thanksBack");
const closeThanksPopup = document.getElementById("closeThanksPopup");

function closeThanksModal() {
  if (thanksPopup) thanksPopup.classList.add("hidden");
}

if (closeThanksPopup) {
  closeThanksPopup.addEventListener("click", closeThanksModal);
}

if (thanksBack) {
  thanksBack.addEventListener("click", (e) => {
    e.preventDefault();
    closeThanksModal();
  });
}

if (thanksPopup) {
  thanksPopup.addEventListener("click", (e) => {
    if (e.target === thanksPopup) {
      closeThanksModal();
    }
  });
}

/* DATOS ASESOR */
const advisorOptions = document.querySelectorAll('input[name="asesor"]');
const advisorName = document.getElementById("advisor_name");
const advisorEmail = document.getElementById("advisor_email");
const advisorPhone = document.getElementById("advisor_phone");
const rimanLink = document.getElementById("riman_link");

advisorOptions.forEach((option) => {
  option.addEventListener("change", function () {
    if (!advisorName || !advisorEmail || !advisorPhone || !rimanLink) return;

    if (this.value === "Firas") {
      advisorName.value = "Firas";
      advisorEmail.value = "firas@email.com";
      advisorPhone.value = "600000000";
      rimanLink.value = "https://growandglow.riman.com";
    }

    if (this.value === "Sandra") {
      advisorName.value = "Sandra";
      advisorEmail.value = "sandra@email.com";
      advisorPhone.value = "600000001";
      rimanLink.value = "https://sandraleader.riman.com";
    }

    if (this.value === "María") {
      advisorName.value = "María";
      advisorEmail.value = "maria@email.com";
      advisorPhone.value = "600000002";
      rimanLink.value = "https://haciatubelleza.riman.com";
    }
  });
});

if (klaviyoForm) {
  klaviyoForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const lang = document.documentElement.lang || "es";

    const nombre = klaviyoForm.querySelector('input[name="nombre"]')?.value.trim() || "";
    const email = klaviyoForm.querySelector('input[name="email"]')?.value.trim() || "";
    const telefono = klaviyoForm.querySelector('input[name="telefono"]')?.value.trim() || "";
    const ciudad = klaviyoForm.querySelector('input[name="ciudad"]')?.value.trim() || "";
    const asesor = klaviyoForm.querySelector('input[name="asesor"]:checked')?.value || "";

    const advisor_name = klaviyoForm.querySelector('input[name="advisor_name"]')?.value || "";
    const advisor_email = klaviyoForm.querySelector('input[name="advisor_email"]')?.value || "";
    const advisor_phone = klaviyoForm.querySelector('input[name="advisor_phone"]')?.value || "";
    const riman_link = klaviyoForm.querySelector('input[name="riman_link"]')?.value || "";

    const payload = {
      data: {
        type: "subscription",
        attributes: {
          profile: {
            data: {
              type: "profile",
              attributes: {
                email: email,
                first_name: nombre,
                properties: {
                  telefono: telefono,
                  ciudad: ciudad,
                  asesor: asesor,
                  advisor_name: advisor_name,
                  advisor_email: advisor_email,
                  advisor_phone: advisor_phone,
                  riman_link: riman_link,
                  experience_booked: "no"
                }
              }
            }
          },
          custom_source: "Glow Leaders Landing"
        },
        relationships: {
          list: {
            data: {
              type: "list",
              id: "TtUdz8"
            }
          }
        }
      }
    };

    try {
      const response = await fetch(
        "https://a.klaviyo.com/client/subscriptions/?company_id=XZjNH6",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "revision": "2024-10-15"
          },
          body: JSON.stringify(payload)
        }
      );

      const responseText = await response.text();
      console.log("STATUS KLAVIYO:", response.status);
      console.log("RESPUESTA KLAVIYO:", responseText);
      console.log("PAYLOAD ENVIADO:", payload);

      if (response.ok) {
        if (lang === "en") {
          thanksTitle.textContent = "Thank you for registering!";
          thanksText.textContent = "Your advisor will contact you soon to share all the details of your Riman experience.";
          thanksBack.textContent = "BACK TO PAGE";
        } else {
          thanksTitle.textContent = "¡Gracias por registrarte!";
          thanksText.textContent = "Muy pronto, tu asesor se pondrá en contacto contigo para compartirte todos los detalles de tu Experiencia con Riman.";
          thanksBack.textContent = "VOLVER A LA PÁGINA";
        }

        if (thanksPopup) {
          thanksPopup.classList.remove("hidden");
        }

        klaviyoForm.reset();
      } else {
        alert(lang === "en" ? "Error submitting form" : "Error al enviar datos a Klaviyo");
      }
    } catch (error) {
      console.error("ERROR FETCH:", error);
      alert(lang === "en" ? "Connection error" : "Error de conexión");
    }
  });
}
    
  /* =========================
     INICIO
  ========================= */
  setLanguage("es");

 /* =========================
   COOKIE BANNER
========================= */
const cookieBanner = document.getElementById("cookieBanner");
const cookieModal = document.getElementById("cookieModal");

const acceptCookies = document.getElementById("acceptCookies");
const rejectCookies = document.getElementById("rejectCookies");
const configCookies = document.getElementById("configCookies");
const closeCookieModal = document.getElementById("closeCookieModal");
const saveCookieSettings = document.getElementById("saveCookieSettings");
const analyticsCookies = document.getElementById("analyticsCookies");

function getCookieConsent() {
  const saved = localStorage.getItem("cookieConsent");
  if (!saved) return null;

  try {
    return JSON.parse(saved);
  } catch (error) {
    return null;
  }
}

const savedCookieConsent = getCookieConsent();

if (!savedCookieConsent && cookieBanner) {
  cookieBanner.classList.remove("hidden");
}

if (savedCookieConsent && analyticsCookies) {
  analyticsCookies.checked = !!savedCookieConsent.analytics;
}

if (acceptCookies) {
  acceptCookies.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", JSON.stringify({
      necessary: true,
      analytics: true
    }));

    if (analyticsCookies) analyticsCookies.checked = true;
    if (cookieBanner) cookieBanner.classList.add("hidden");
    if (cookieModal) cookieModal.classList.add("hidden");
  });
}

if (rejectCookies) {
  rejectCookies.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", JSON.stringify({
      necessary: true,
      analytics: false
    }));

    if (analyticsCookies) analyticsCookies.checked = false;
    if (cookieBanner) cookieBanner.classList.add("hidden");
    if (cookieModal) cookieModal.classList.add("hidden");
  });
}

if (configCookies) {
  configCookies.addEventListener("click", () => {
    const currentConsent = getCookieConsent();

    if (analyticsCookies) {
      analyticsCookies.checked = currentConsent ? !!currentConsent.analytics : false;
    }

    if (cookieModal) cookieModal.classList.remove("hidden");
  });
}

if (closeCookieModal) {
  closeCookieModal.addEventListener("click", () => {
    if (cookieModal) cookieModal.classList.add("hidden");
  });
}

if (saveCookieSettings) {
  saveCookieSettings.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", JSON.stringify({
      necessary: true,
      analytics: analyticsCookies ? analyticsCookies.checked : false
    }));

    if (cookieModal) cookieModal.classList.add("hidden");
    if (cookieBanner) cookieBanner.classList.add("hidden");
  });
}

if (cookieModal) {
  cookieModal.addEventListener("click", (e) => {
    if (e.target === cookieModal) {
      cookieModal.classList.add("hidden");
    }
  });
}
    
     /* =========================
     INICIO
  ========================= */
  setLanguage("es");
  openPopup("es");

});
                        
