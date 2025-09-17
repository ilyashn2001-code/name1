// -------- NAV TABS ----------
document.querySelectorAll('.nav-link').forEach(link=>{
  link.addEventListener('click', ()=>{
    document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('active'));
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    link.classList.add('active');
    const id = link.getAttribute('data-page');
    document.getElementById(id).classList.add('active');
  });
});

// -------- CHARTS -------------
const doughnutEl = document.getElementById('progressChart');
const lineEl     = document.getElementById('violationsChart');

// plugin: center text for doughnut
const centerText = {
  id: 'centerText',
  afterDraw(chart, args, opts){
    if (chart.config.type !== 'doughnut') return;
    const {ctx, chartArea:{width,height}} = chart;
    const ds = chart.data.datasets[0].data;
    const total = ds.reduce((a,b)=>a+b,0) || 1;
    const p = Math.round(ds[0]/total*100);
    ctx.save();
    ctx.fillStyle = '#1c1c1c';
    ctx.font = '700 22px Inter, Arial, sans-serif';
    ctx.textAlign='center';
    ctx.textBaseline='middle';
    ctx.fillText(`${p}%`, width/2, height/2);
    ctx.restore();
  }
};

if (doughnutEl){
  new Chart(doughnutEl.getContext('2d'), {
    type:'doughnut',
    data:{
      labels:['Завершено','Осталось'],
      datasets:[{
        data:[30,70],
        backgroundColor:['#5a4fcf','#e6e8ef'],
        borderWidth:0
      }]
    },
    options:{
      cutout:'70%',
      plugins:{legend:{display:false}},
      responsive:true,
      maintainAspectRatio:false
    },
    plugins:[centerText]
  });
}

if (lineEl){
  new Chart(lineEl.getContext('2d'), {
    type:'line',
    data:{
      labels:['ПН','ВТ','СР','ЧТ','ПТ','СБ','ВС'],
      datasets:[{
        label:'Нарушения',
        data:[0,1,2,3,4,5,6],
        borderColor:'#5a4fcf',
        backgroundColor:'rgba(90,79,207,.08)',
        tension:.35,
        pointRadius:3,
        pointBackgroundColor:'#fff',
        pointBorderColor:'#5a4fcf',
        borderWidth:3,
        fill:false
      }]
    },
    options:{
      plugins:{legend:{display:false}},
      responsive:true,
      maintainAspectRatio:false,
      scales:{
        x:{grid:{color:'rgba(0,0,0,.03)'}},
        y:{beginAtZero:true,ticks:{stepSize:1,color:'#65707a'},grid:{color:'rgba(0,0,0,.03)'}}
      }
    }
  });
}

// -------- MODALS (photos) --------
const uploadBtn     = document.getElementById('uploadBtn');
const uploadModal   = document.getElementById('uploadModal');
const addPhotoModal = document.getElementById('addPhotoModal');
const nextBtn       = document.getElementById('nextBtn');
const closeBtns     = document.querySelectorAll('.closeBtn');

if (uploadBtn){
  uploadBtn.addEventListener('click', ()=> uploadModal.style.display='flex');
}
closeBtns.forEach(btn=>btn.addEventListener('click', e=>{
  e.target.closest('.modal').style.display='none';
}));
if (nextBtn){
  nextBtn.addEventListener('click', ()=>{
    uploadModal.style.display='none';
    addPhotoModal.style.display='flex';
  });
}

// Drag & Drop highlight (visual only)
const dz = document.getElementById('dropzone');
if (dz){
  ['dragenter','dragover'].forEach(ev=>dz.addEventListener(ev,e=>{
    e.preventDefault(); dz.style.background='#f6f8ff';
  }));
  ['
