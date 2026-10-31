// Lógica del reloj mundial.
// Usa la API Intl del navegador, que ya conoce las zonas horarias y el horario de verano.

const state = {
  region: "todas",
  query: "",
  hour12: false
};

const els = {
  grid: document.getElementById("grid"),
  tabs: document.getElementById("tabs"),
  search: document.getElementById("search"),
  toggle: document.getElementById("format-toggle"),
  empty: document.getElementById("empty"),
  localTime: document.getElementById("local-time"),
  localZone: document.getElementById("local-zone")
};

// ---------- Utilidades de formato ----------

// Devuelve la hora como HTML; en formato 12 h el "a. m." / "p. m." va en tamaño pequeño.
function formatTime(date, tz) {
  const parts = new Intl.DateTimeFormat("es", {
    timeZone: tz,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: state.hour12
  }).formatToParts(date);

  const period = parts.find((p) => p.type === "dayPeriod");
  const clock = parts
    .filter((p) => p.type !== "dayPeriod")
    .map((p) => p.value)
    .join("")
    .trim();

  return period ? `${clock}<small class="period">${period.value}</small>` : clock;
}

function formatDate(date, tz) {
  const text = new Intl.DateTimeFormat("es", {
    timeZone: tz,
    weekday: "long",
    day: "numeric",
    month: "long"
  }).format(date);
  return text.charAt(0).toUpperCase() + text.slice(1); // solo la primera letra en mayúscula
}

function getHour(date, tz) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: tz,
    hour: "2-digit",
    hour12: false
  }).formatToParts(date);
  const hour = parts.find((p) => p.type === "hour").value;
  return Number(hour) % 24;
}

// Devuelve algo como "UTC−5" o "UTC+5:30".
function getOffset(date, tz) {
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: tz,
    timeZoneName: "shortOffset"
  }).formatToParts(date);
  const raw = parts.find((p) => p.type === "timeZoneName").value; // "GMT-5", "GMT+5:30", "GMT"
  const text = raw.replace("GMT", "UTC").replace("-", "−");
  return text === "UTC" ? "UTC±0" : text;
}

function isDaytime(hour) {
  return hour >= 6 && hour < 18;
}

// ---------- Construcción de la interfaz ----------

function allCities() {
  return REGIONS.flatMap((region) =>
    region.cities.map((city) => ({ ...city, regionId: region.id, regionName: region.name }))
  );
}

function buildTabs() {
  const items = [{ id: "todas", name: "Todas" }, ...REGIONS.map((r) => ({ id: r.id, name: r.name }))];
  els.tabs.innerHTML = "";
  items.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "tab";
    button.textContent = item.name;
    button.dataset.region = item.id;
    button.setAttribute("aria-pressed", String(item.id === state.region));
    button.addEventListener("click", () => {
      state.region = item.id;
      els.tabs.querySelectorAll(".tab").forEach((tab) => {
        tab.setAttribute("aria-pressed", String(tab.dataset.region === state.region));
      });
      renderCards();
    });
    els.tabs.appendChild(button);
  });
}

function matches(city) {
  const inRegion = state.region === "todas" || city.regionId === state.region;
  const q = state.query.trim().toLowerCase();
  const inQuery = !q || `${city.name} ${city.country}`.toLowerCase().includes(q);
  return inRegion && inQuery;
}

function renderCards() {
  const cities = allCities().filter(matches);
  els.grid.innerHTML = "";
  els.empty.hidden = cities.length > 0;

  cities.forEach((city) => {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.tz = city.tz;
    card.innerHTML = `
      <div class="card__head">
        <div>
          <h2 class="card__city">${city.name}</h2>
          <p class="card__country">${city.country}</p>
        </div>
        <span class="card__phase" data-role="phase"></span>
      </div>
      <p class="card__time" data-role="time">--:--:--</p>
      <div class="card__foot">
        <span data-role="date"></span>
        <span class="card__offset" data-role="offset"></span>
      </div>
    `;
    els.grid.appendChild(card);
  });

  tick();
}

// ---------- Actualización cada segundo ----------

function tick() {
  const now = new Date();

  els.grid.querySelectorAll(".card").forEach((card) => {
    const tz = card.dataset.tz;
    const hour = getHour(now, tz);
    const day = isDaytime(hour);

    card.classList.toggle("is-day", day);
    card.classList.toggle("is-night", !day);
    card.querySelector('[data-role="phase"]').textContent = day ? "Día" : "Noche";
    card.querySelector('[data-role="time"]').innerHTML = formatTime(now, tz);
    card.querySelector('[data-role="date"]').textContent = formatDate(now, tz);
    card.querySelector('[data-role="offset"]').textContent = getOffset(now, tz);
  });

  const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  els.localTime.innerHTML = formatTime(now, localTz);
  els.localZone.textContent = localTz.replace("_", " ");
}

// ---------- Eventos ----------

els.search.addEventListener("input", (event) => {
  state.query = event.target.value;
  renderCards();
});

els.toggle.addEventListener("click", () => {
  state.hour12 = !state.hour12;
  els.toggle.textContent = state.hour12 ? "12 h" : "24 h";
  els.toggle.setAttribute("aria-pressed", String(!state.hour12));
  tick();
});

// ---------- Inicio ----------

buildTabs();
renderCards();
setInterval(tick, 1000);
