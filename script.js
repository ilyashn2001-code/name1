// Плагин для текста по центру в круговой диаграмме
const centerText = {
  id: 'centerText',
  beforeDraw(chart) {
    if (chart.config.type === 'doughnut') {
      const {ctx, chartArea: {width, height}} = chart;
      ctx.save();
      ctx.font = 'bold 20px Arial';
      ctx.fillStyle = '#333';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('30%', width / 2, height / 2);
    }
  }
};

// Круговая диаграмма
const progressCtx = document.getElementById('progressChart').getContext('2d');
new Chart(progressCtx, {
  type: 'doughnut',
  data: {
    labels: ['Завершено', 'Осталось'],
    datasets: [{
      data: [30, 70],  // пример: прогресс 30%
      backgroundColor: ['#5a4fcf', '#e0e0e0'],
      borderWidth: 1
    }]
  },
  options: {
    cutout: '75%',
    plugins: {
      legend: { display: false }
    },
    responsive: true,
    maintainAspectRatio: false
  },
  plugins: [centerText]
});

// Линейный график
const violationsCtx = document.getElementById('violationsChart').getContext('2d');
new Chart(violationsCtx, {
  type: 'line',
  data: {
    labels: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'],
    datasets: [{
      label: 'Нарушения',
      data: [0, 1, 2, 3, 4, 5, 6], // пример
      fill: false,
      borderColor: '#5a4fcf',
      tension: 0.3
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
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
