// Прогресс круговая диаграмма
const progressCtx = document.getElementById('progressChart').getContext('2d');
new Chart(progressCtx, {
  type: 'doughnut',
  data: {
    labels: ['Завершено', 'Осталось'],
    datasets: [{
      data: [0, 100],
      backgroundColor: ['#5a4fcf', '#e0e0e0'],
      borderWidth: 1
    }]
  },
  options: {
    cutout: '70%',
    plugins: {
      legend: { display: false }
    }
  }
});

// Линейный график нарушений
const violationsCtx = document.getElementById('violationsChart').getContext('2d');
new Chart(violationsCtx, {
  type: 'line',
  data: {
    labels: ['ПНТ', 'ВТ', 'СР', 'ПТ', 'СБ', 'ВС'],
    datasets: [{
      label: 'Нарушения',
      data: [0, 1, 2, 3, 4, 5],
      fill: false,
      borderColor: '#5a4fcf',
      tension: 0.3
    }]
  },
  options: {
    plugins: {
      legend: { display: false }
    }
  }
});

Create script.js
