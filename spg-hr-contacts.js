const searchInput = document.getElementById("contactSearch");
const resultCount = document.getElementById("resultCount");
const cards = Array.from(document.querySelectorAll(".contact-card"));
const toast = document.getElementById("toast");
let toastTimer;

function updateResults() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  cards.forEach((card) => {
    const matches = card.dataset.search.toLowerCase().includes(query);
    card.hidden = !matches;
    if (matches) visibleCount += 1;
  });

  resultCount.textContent = `عدد النتائج: ${visibleCount}`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value);
    showToast("تم النسخ بنجاح");
  } catch (error) {
    showToast("تعذر النسخ من المتصفح");
  }
}

if (searchInput && resultCount && cards.length) {
  searchInput.addEventListener("input", updateResults);
}

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", () => copyText(button.dataset.copy));
});
