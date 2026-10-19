const clockElement = document.querySelector("#clock");
const mainTimeElement = document.querySelector("#clock-main");
const secondsElement = document.querySelector("#seconds");
const periodElement = document.querySelector("#period");
const dateElement = document.querySelector("#date");
const formatToggle = document.querySelector("#format-toggle");

let use24HourTime = false;

function updateClock() {
  const now = new Date();
  const timeFormatter = new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: use24HourTime ? "h23" : "h12",
  });
  const timeParts = Object.fromEntries(
    timeFormatter.formatToParts(now).map(({ type, value }) => [type, value]),
  );

  mainTimeElement.textContent = `${timeParts.hour}:${timeParts.minute}`;
  secondsElement.textContent = timeParts.second;
  periodElement.textContent = timeParts.dayPeriod ?? "";
  dateElement.textContent = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(now);
  clockElement.dateTime = now.toISOString();
  clockElement.setAttribute(
    "aria-label",
    `Current local time: ${timeFormatter.format(now)}`,
  );
}

formatToggle.addEventListener("click", () => {
  use24HourTime = !use24HourTime;
  formatToggle.textContent = `Switch to ${use24HourTime ? "12" : "24"}-hour time`;
  updateClock();
});

updateClock();
window.setInterval(updateClock, 1000);
