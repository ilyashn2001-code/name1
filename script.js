// Init charts after DOM ready
document.addEventListener('DOMContentLoaded', () => {
  // Doughnut (progress)
  const progressCanvas = document.getElementById('progressChart');
  const progressCtx = progressCanvas.getContext('2d');

  // Keep the visual donut a bit smaller with cutout
  new Chart(progressCtx, {
    type: 'doughnut',
    data: {
      labels: ['Завершено', 'Осталось'],
      datasets: [{
        data: [30, 70], // пример: 30% завершено
        backgroundColor: ['#5a4fcf', '#e6e6e6'],
        borderWidth: 0
      }]
    },
    options: {
      cutout: '70%',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true }
      }
    }
  });

  // Line chart (violations over week)
  const violCanvas = document.getElementById('violationsChart');
  const violCtx = violCanvas.getContext('2d');

  new Chart(violCtx, {
    type: 'line',
    data: {
      labels: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'],
      datasets: [{
        label: 'Нарушения',
        data: [0, 1, 2, 3, 4, 5, 6], // примерные данные
        borderColor: '#5a4fcf',
        backgroundColor: 'rgba(90,79,207,0.06)',
        tension: 0.35,
        pointRadius: 4,
        pointBackgroundColor: '#fff',
        pointBorderColor: '#5a4fcf',
        borderWidth: 3,
        fill: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { mode: 'index', intersect: false }
      },
      scales: {
        x: {
          grid: { color: 'rgba(0,0,0,0.03)' }
        },
        y: {
          beginAtZero: true,
          ticks: { stepSize: 1, color: '#5f6b76' },
          grid: { color: 'rgba(0,0,0,0.03)' }
        }
      }
    }
  });

});
