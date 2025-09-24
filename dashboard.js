// Тема
document.getElementById('themeToggle').addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});
document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'light');

// === Прогресс по округам ===
new Chart(document.getElementById('okrugChart'), {
  type: 'bar',
  data: {
    labels: ['САО', 'СВАО', 'ЦАО'],
    datasets: [{
      label: 'Завершено объектов',
      data: [4, 6, 2],
      backgroundColor: '#1e88e5',
      borderRadius: 6
    }]
  },
  options: {
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 }
      }
    }
  }
});

// === Распределение по статусам ===
new Chart(document.getElementById('statusChart'), {
  type: 'doughnut',
  data: {
    labels: ['Завершено', 'В работе', 'Проблемные'],
    datasets: [{
      data: [12, 8, 4],
      backgroundColor: ['#43a047', '#fbc02d', '#e53935']
    }]
  },
  options: {
    cutout: '60%',
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  }
});

// === Нарушения по неделям ===
new Chart(document.getElementById('violationsChart'), {
  type: 'line',
  data: {
    labels: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'],
    datasets: [{
      label: 'Нарушения',
      data: [1, 3, 2, 4, 2, 1, 0],
      borderColor: '#e53935',
      fill: false,
      tension: 0.4
    }]
  },
  options: {
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 }
      }
    }
  }
});
