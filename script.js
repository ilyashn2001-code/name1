// Переключение вкладок
document.querySelectorAll(".sidebar li").forEach(item => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".sidebar li").forEach(li => li.classList.remove("active"));
    item.classList.add("active");

    let pageId = item.getAttribute("data-page");
    if (pageId) {
      document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
      document.getElementById(pageId).classList.add("active");
    }
  });
});

// Открытие модалки загрузки
const uploadBtn = document.getElementById("uploadBtn");
const uploadModal = document.getElementById("uploadModal");
const addPhotoModal = document.getElementById("addPhotoModal");

if (uploadBtn) {
  uploadBtn.addEventListener("click", () => {
    uploadModal.style.display = "flex";
  });
}

// Закрытие модалок
document.querySelectorAll(".closeBtn").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.closest(".modal").style.display = "none";
  });
});

// Переход к модалке добавления фото
const nextBtn = document.getElementById("nextBtn");
if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    uploadModal.style.display = "none";
    addPhotoModal.style.display = "flex";
  });
}

// Chart.js графики
if (document.getElementById("progressChart")) {
  new Chart(document.getElementById("progressChart"), {
    type: "doughnut",
    data: {
      labels: ["Выполнено", "Осталось"],
      datasets: [{ data: [30, 70], backgroundColor: ["#6c5ce7", "#e0e0e0"] }]
    },
    options: { plugins: { legend: { display: false } } }
  });
}

if (document.getElementById("violationsChart")) {
  new Chart(document.getElementById("violationsChart"), {
    type: "line",
    data: {
      labels: ["ПН","ВТ","СР","ЧТ","ПТ","СБ","ВС"],
      datasets: [{ label: "Нарушения", data: [0,1,2,3,4,5,6], borderColor: "#6c5ce7", fill: false }]
    },
    options: { plugins: { legend: { display: false } } }
  });
}
