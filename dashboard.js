document.addEventListener('DOMContentLoaded', () => {
  const objects = [ // 🧠 Можно импортировать из другого файла
    { title: 'Путевой пр. 38', status: 'Завершён', percent: 100, district: 'СВАО', violations: '2, проверок: 1', photos: 12 },
    { title: 'Флотская ул. 54', status: 'Завершён', percent: 100, district: 'САО', violations: '1, проверок: 1', photos: 8 },
    { title: 'Каргопольская ул. 18', status: 'Завершён', percent: 100, district: 'СВАО', violations: '3, проверок: 2', photos: 10 },
    { title: 'Бестужевых ул. 27А', status: 'Завершён', percent: 100, district: 'СВАО', violations: '0, проверок: 1', photos: 6 },
    { title: 'Челобитьевское ш. 14', status: 'Завершён', percent: 100, district: 'СВАО', violations: '2, проверок: 2', photos: 11 },
    { title: 'Мира просп. 194', status: 'Завершён', percent: 100, district: 'СВАО', violations: '0, проверок: 1', photos: 9 }
  ];

  // ==== Заполняем карточки ====
  document.getElementById('totalCount').textContent = objects.length;
  document.getElementById('totalPhotos').textContent = objects.reduce((sum, o) => sum + (o.photos || 0), 0);
  document.getElementById('totalViolations').textContent = objects.reduce((sum, o) => {
    const n = parseInt(o.violations);
    return sum + (isNaN(n) ? 0 : n);
  }, 0);
  const districts = [...new Set(objects.map(o => o.district))];
  document.getElementById('totalDistricts').textContent = districts.length;

  // ==== Статусы ====
  const statusMap = {};
  objects.forEach(o => {
    statusMap[o.status] = (statusMap[o.status] || 0) + 1;
  });

  new Chart(document.getElementById('statusChart'), {
    type: 'doughnut',
    data: {
      labels: Object.keys(statusMap),
      datasets: [{
        label: 'Статусы',
        data: Object.values(statusMap),
        backgroundColor: ['#4caf50', '#fbc02d', '#f44336']
      }]
    },
    options: {
      plugins: { legend: { position: 'bottom' } }
    }
  });

  // ==== Округа ====
  const districtMap = {};
  objects.forEach(o => {
    districtMap[o.district] = (districtMap[o.district] || 0) + 1;
  });

  new Chart(document.getElementById('districtChart'), {
    type: 'bar',
    data: {
      labels: Object.keys(districtMap),
      datasets: [{
        label: 'Количество объектов',
        data: Object.values(districtMap),
        backgroundColor: '#1e88e5'
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true }
      }
    }
  });

  // ==== Тема ====
  document.getElementById('themeToggle').addEventListener('click', () => {
    document.documentElement.dataset.theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  });
});
