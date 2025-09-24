// Пример данных (ты их можешь подгрузить с API)
const objectsData = [
  { title: 'Дворовая территория по адресу: Путевой пр. 38', statusObject: 'Завершён', statusCheck: 'Проверено', percent: 100, fio: 'Андреев Ю.А.', dates: '15.04.2024-20.08.2024', district: 'СВАО', violations: 2, checks: 1, documents: '0%', photos: 3, lat: 55.8, lng: 37.6 },
  { title: 'Дворовая территория по адресу: Флотская ул. 54, 58 к.1', statusObject: 'Завершён', statusCheck: 'Ожидают проверки', percent: 100, fio: 'Семенов И.П.', dates: '15.04.2024-15.08.2024', district: 'САО', violations: 1, checks: 1, documents: '0%', photos: 3, lat: 55.83, lng: 37.5 },
  { title: 'Дворовая территория по адресу: Каргопольская ул. 18', statusObject: 'Завершён', statusCheck: 'Проверено', percent: 100, fio: 'Петров Д.С.', dates: '15.04.2024-28.08.2024', district: 'СВАО', violations: 3, checks: 2, documents: '0%', photos: 3, lat: 55.85, lng: 37.7 },
  { title: 'Дворовая территория по адресу: Бестужевых ул. 27А', statusObject: 'Завершён', statusCheck: 'Проблемные', percent: 80, fio: 'Иванова Н.А.', dates: '15.04.2024-23.08.2024', district: 'СВАО', violations: 5, checks: 2, documents: '0%', photos: 3, lat: 55.81, lng: 37.65 },
  { title: 'Дворовая территория по адресу: Челобитьевское шоссе 14 к.3,14 к.4,14 к.5', statusObject: 'Завершён', statusCheck: 'Ожидают проверки', percent: 60, fio: 'Кузнецов А.В.', dates: '15.04.2024-20.08.2024', district: 'СВАО', violations: 2, checks: 2, documents: '0%', photos: 2, lat: 55.90, lng: 37.8 },
  { title: 'Дворовая территория по адресу: Мира просп. 194', statusObject: 'Завершён', statusCheck: 'Проверено', percent: 100, fio: 'Фёдоров М.Г.', dates: '15.04.2024-20.08.2024', district: 'СВАО', violations: 0, checks: 1, documents: '0%', photos: 3, lat: 55.82, lng: 37.55 }
];

// Тема: переключатель
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  const html = document.documentElement;
  const cur = html.getAttribute('data-theme');
  const nxt = cur === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', nxt);
  localStorage.setItem('theme', nxt);
});
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('theme');
  if (saved) document.documentElement.setAttribute('data-theme', saved);
});

// Функции отрисовки

function renderPieStatus(data) {
  const counts = data.reduce((acc, obj) => {
    acc[obj.status] = (acc[obj.status] || 0) + 1;
    return acc;
  }, {});
  const series = Object.entries(counts).map(([status, cnt]) => ({
    name: status,
    y: cnt
  }));
  Highcharts.chart('status-pie', {
    chart: { type: 'pie', backgroundColor: 'transparent' },
    title: { text: 'Статусы объектов' },
    series: [{ name: 'Количество', colorByPoint: true, data: series }]
  });
}

function renderKpi(data) {
  const total = data.length;
  const avgPercent = (data.reduce((s, o) => s + (o.percent || 0), 0) / total).toFixed(1);
  const totalChecks = data.reduce((s, o) => s + (o.checks || 0), 0);
  const totalViolations = data.reduce((s, o) => s + (o.violations || 0), 0);
  const totalPhotos = data.reduce((s, o) => s + (o.photos || 0), 0);

  document.getElementById('total-objects').innerText = total;
  document.getElementById('avg-progress').innerText = avgPercent + '%';
  document.getElementById('metric-ready').innerText = avgPercent + '%';
  document.getElementById('metric-checks').innerText = totalChecks;
  document.getElementById('metric-violations').innerText = totalViolations;
  document.getElementById('metric-photos').innerText = totalPhotos;
}

function parseRangeToTimestamps(rangeStr) {
  const [start, end] = rangeStr.split('-');
  const parse = ds => {
    const [d, m, y] = ds.split('.');
    return Date.UTC(+y, +m - 1, +d);
  };
  return { start: parse(start), end: parse(end) };
}

function renderGantt(data) {
  const tasks = data.map((o, idx) => {
    const { start, end } = parseRangeToTimestamps(o.dates);
    return {
      id: 'task-' + idx,
      name: o.title,
      start: start,
      end: end,
      color: o.percent >= 100 ? undefined : '#e74c3c'
    };
  });
  Highcharts.ganttChart('gantt-chart', {
    title: { text: 'График Ганта объектов' },
    series: [{ name: 'Объекты', data: tasks }]
  });
}

function renderMap(data) {
  const map = L.map('map').setView([55.8, 37.6], 10);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);

  data.forEach(o => {
const color = o.statusObject === 'Завершён' ? 'green' : 'orange';

    const marker = L.circleMarker([o.lat, o.lng], {
      radius: 8,
      color: color,
      fillOpacity: 0.8
    }).addTo(map);
    marker.on('click', () => {
  const popupHtml = `
  <strong>${o.title}</strong><br/>
  🏗 Статус объекта: ${o.statusObject}<br/>
  ✅ Статус проверки: ${o.statusCheck}<br/>
  Готовность: ${o.percent}%<br/>
  Нарушений: ${o.violations}<br/>
  Проверок: ${o.checks}<br/>
  Ответственный: ${o.fio}
`;

      marker.bindPopup(popupHtml).openPopup();
    });
  });
}

function renderLineChart(data) {
  const months = [];
  const counts = [];
  const year = 2024; // ← жёстко задаём 2024 год

  for (let m = 0; m < 12; m++) {
    const dt = Date.UTC(year, m, 1);
    months.push(dt);
    const cnt = data.filter(o => {
      const { start, end } = parseRangeToTimestamps(o.dates);
      return dt >= start && dt <= end;
    }).length;
    counts.push(cnt);
  }

  Highcharts.chart('year-dynamics', {
    chart: { type: 'line', backgroundColor: 'transparent' },
    title: { text: `Активных объектов по месяцам (${year})` },
    xAxis: { type: 'datetime', title: { text: 'Месяц' } },
    yAxis: { title: { text: 'Количество' } },
    series: [{ name: 'Активные объекты', data: counts.map((c, i) => [months[i], c]) }]
  });
}


function renderRanking(data) {
  const sorted = [...data].sort((a, b) => (b.violations || 0) - (a.violations || 0));
  const top5 = sorted.slice(0, 5);
  const ul1 = document.querySelector('#top-objects');
  ul1.innerHTML = '';
  top5.forEach(o => {
    const li = document.createElement('li');
    li.innerText = `${o.title} — нарушений: ${o.violations || 0}`;
    ul1.appendChild(li);
  });

  const countsByFio = data.reduce((acc, o) => {
    acc[o.fio] = (acc[o.fio] || 0) + (o.violations || 0);
    return acc;
  }, {});
  const arr = Object.entries(countsByFio).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const ul2 = document.querySelector('#top-contractors');
  ul2.innerHTML = '';
  arr.forEach(([fio, violCount]) => {
    const li = document.createElement('li');
    li.innerText = `${fio} — нарушений: ${violCount}`;
    ul2.appendChild(li);
  });
}

function initDashboard() {
  renderPieStatus(objectsData);
  renderKpi(objectsData);
  renderGantt(objectsData);
  renderMap(objectsData);
  renderLineChart(objectsData);
  renderRanking(objectsData);
}

document.addEventListener('DOMContentLoaded', initDashboard);
