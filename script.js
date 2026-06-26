const TEST_UNLOCK = false;
const TEST_COVER_SECONDS = 0;
const targetDate = new Date("2026-06-28T00:00:00+08:00").getTime();

const birthdayBook = document.getElementById("birthdayBook");
const frontHint = document.getElementById("frontHint");
const coverCountdown = document.getElementById("coverCountdown");
const unlocked = document.getElementById("unlocked");
const birthdaySong = document.getElementById("birthdaySong");
const siteCover = document.getElementById("siteCover");
const siteCoverCountdown = document.getElementById("siteCoverCountdown");

const daysText = document.getElementById("days");
const hoursText = document.getElementById("hours");
const minutesText = document.getElementById("minutes");
const secondsText = document.getElementById("seconds");

const confettiBtn = document.getElementById("confettiBtn");
const closeBookBtn = document.getElementById("closeBookBtn");

function pad(value) {
  return String(value).padStart(2, "0");
}

function updateSiteCover() {
  const now = new Date().getTime();

  const revealDate =
    TEST_COVER_SECONDS > 0
      ? window.siteCoverTestStart + TEST_COVER_SECONDS * 1000
      : targetDate - 5 * 60 * 1000;

  const distance = revealDate - now;

  if (distance <= 0) {
    document.body.classList.remove("site-covered");
    siteCover.classList.add("is-hidden");
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  siteCoverCountdown.textContent = `${pad(days)}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
}

function playBirthdaySong() {
  birthdaySong.volume = 0.4;

  birthdaySong.play();
}

function showUnlocked() {
  birthdayBook.classList.remove("locked-book");
  frontHint.textContent = "Birthday message unlocked! Click Me!";
  coverCountdown.classList.add("hidden");
  unlocked.classList.remove("hidden");
}

function updateCountdown() {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (TEST_UNLOCK || distance <= 0) {
    showUnlocked();
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  daysText.textContent = pad(days);
  hoursText.textContent = pad(hours);
  minutesText.textContent = pad(minutes);
  secondsText.textContent = pad(seconds);
}

function launchConfetti() {
  for (let i = 0; i < 70; i++) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.animationDelay = Math.random() * 1.2 + "s";
    piece.style.background = [
      "#fff3bf",
      "#ffb8e0",
      "#d8b4ff",
      "#ffffff",
      "#ffd6a5",
    ][Math.floor(Math.random() * 5)];
    document.body.appendChild(piece);

    setTimeout(() => piece.remove(), 5200);
  }
}

birthdayBook.addEventListener("click", (event) => {
  if (birthdayBook.classList.contains("locked-book")) {
    return;
  }

  if (event.target.closest("button")) {
    return;
  }

  playBirthdaySong();
  birthdayBook.classList.toggle("is-open");

  if (birthdayBook.classList.contains("is-open")) {
    launchConfetti();
  }
});

confettiBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  launchConfetti();
});

window.siteCoverTestStart = new Date().getTime();

updateSiteCover();
updateCountdown();

setInterval(() => {
  updateSiteCover();
  updateCountdown();
}, 1000);
