const loadingScreen = document.querySelector(".loading-screen");
const homeScreen = document.querySelector(".home-screen");
const mailboxImage = document.querySelector(".mailbox-layer");
const mailboxButton = document.querySelector(".mailbox-button");
const envelopeImage = document.querySelector(".envelope-layer");
const envelopeButton = document.querySelector(".envelope-button");
const buttonPageImage = document.querySelector(".button-page-layer");
const letterImage = document.querySelector(".letter-layer");
const buttonPageLinks = document.querySelectorAll(".button-page-link");
const openMailbox = new Image();
openMailbox.src = "assets/images/Home%20Screen/Mailbox%20Open.png";
const closedEnvelope = new Image();
closedEnvelope.src = "assets/images/Home%20Screen/Closed%20Envelope.png";
const openEnvelope = new Image();
openEnvelope.src = "assets/images/Home%20Screen/Open%20Envelope.png";
const letterAsset = new Image();
letterAsset.src = "assets/images/Home%20Screen/Letter.png";
const buttonPageAsset = new Image();
buttonPageAsset.src = "assets/images/Home%20Screen/Button%20Page.png";

let letterSwipeStartX = 0;
let letterSwipeStartY = 0;
let buttonPageSwipeStartX = 0;
let buttonPageSwipeStartY = 0;
const pageSwitchThreshold = 45;
let buttonPageReadyAt = 0;

const setPageHeight = () => {
  document.documentElement.style.setProperty("--page-height", `${window.innerHeight}px`);
};

const showButtonPage = () => {
  homeScreen?.classList.add("button-page-is-front");
  buttonPageReadyAt = window.performance.now() + 260;
};

const showLetterPage = () => {
  homeScreen?.classList.remove("button-page-is-front");
  buttonPageReadyAt = 0;
};

setPageHeight();

document.addEventListener("DOMContentLoaded", () => {
  setPageHeight();

  window.setTimeout(() => {
    loadingScreen?.classList.add("is-lifting");
  }, 250);

  window.setTimeout(() => {
    loadingScreen?.classList.add("is-complete");
    document.body.style.overflow = "auto";
  }, 6150);
});

window.addEventListener("resize", setPageHeight);
window.addEventListener("orientationchange", () => {
  window.setTimeout(setPageHeight, 250);
});

mailboxButton?.addEventListener("click", () => {
  if (!mailboxImage) {
    return;
  }

  mailboxImage.src = "assets/images/Home%20Screen/Mailbox%20Open.png";
  mailboxImage.classList.add("is-open");
  envelopeImage?.classList.add("is-visible");
  homeScreen?.classList.add("mailbox-is-open");
  mailboxButton.setAttribute("aria-label", "Mailbox open");
  mailboxButton.disabled = true;
});

envelopeButton?.addEventListener("click", () => {
  if (envelopeImage) {
    envelopeImage.src = "assets/images/Home%20Screen/Open%20Envelope.png";
    envelopeImage.classList.add("is-open");
  }

  buttonPageImage?.classList.add("is-visible");
  letterImage?.classList.add("is-visible");
  envelopeButton.setAttribute("aria-label", "Envelope open");
  envelopeButton.disabled = true;
});

letterImage?.addEventListener("pointerdown", (event) => {
  if (!letterImage.classList.contains("is-visible")) {
    return;
  }

  letterSwipeStartX = event.clientX;
  letterSwipeStartY = event.clientY;
});

letterImage?.addEventListener("pointerup", (event) => {
  if (!letterImage.classList.contains("is-visible")) {
    return;
  }

  const deltaX = event.clientX - letterSwipeStartX;
  const deltaY = event.clientY - letterSwipeStartY;

  if (Math.abs(deltaX) > pageSwitchThreshold || Math.abs(deltaY) > pageSwitchThreshold || (Math.abs(deltaX) < 8 && Math.abs(deltaY) < 8)) {
    showButtonPage();
  }
});

buttonPageImage?.addEventListener("pointerdown", (event) => {
  if (!buttonPageImage.classList.contains("is-visible")) {
    return;
  }

  buttonPageSwipeStartX = event.clientX;
  buttonPageSwipeStartY = event.clientY;
});

buttonPageImage?.addEventListener("pointerup", (event) => {
  if (!buttonPageImage.classList.contains("is-visible")) {
    return;
  }

  const deltaX = event.clientX - buttonPageSwipeStartX;
  const deltaY = event.clientY - buttonPageSwipeStartY;

  if (Math.abs(deltaX) > pageSwitchThreshold || Math.abs(deltaY) > pageSwitchThreshold || (Math.abs(deltaX) < 8 && Math.abs(deltaY) < 8)) {
    showLetterPage();
  }
});

buttonPageLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const isButtonPageFront = homeScreen?.classList.contains("button-page-is-front");

    if (!isButtonPageFront || window.performance.now() < buttonPageReadyAt) {
      event.preventDefault();
      event.stopPropagation();
    }
  });
});
