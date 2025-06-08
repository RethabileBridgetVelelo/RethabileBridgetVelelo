// Footer Year
document.getElementById("year").textContent = new Date().getFullYear();

// Meta: Keywords + Description
const metaDesc = document.createElement("meta");
metaDesc.name = "description";
metaDesc.content =
  "Explore how RethaNova AI Lab uses cryo-ET, AI, and bacterial flagellar motor detection to revolutionize structural biology and synthetic medicine.";
document.head.appendChild(metaDesc);

const metaKeywords = document.createElement("meta");
metaKeywords.name = "keywords";
metaKeywords.content =
  "flagellar motor detection, cryo-electron tomography, synthetic biology, bacterial imaging AI, microscopy machine learning, deep learning, AI biotech research";
document.head.appendChild(metaKeywords);

// Dynamic Title Changes
window.addEventListener("scroll", () => {
  const title = document.title;
  if (window.scrollY > 400 && !title.includes("Research")) {
    document.title = "Our Mission – RethaNova AI Lab";
  } else if (window.scrollY <= 400 && !title.includes("Home")) {
    document.title = "Flagellar Motor Detection | RethaNova AI Lab";
  }
});

// Lightbox Gallery
function openLightbox(img) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  lightboxImg.src = img.src;
  lightbox.style.display = "flex";
  lightbox.style.justifyContent = "center";
  lightbox.style.alignItems = "center";
  lightbox.style.position = "fixed";
  lightbox.style.top = 0;
  lightbox.style.left = 0;
  lightbox.style.width = "100%";
  lightbox.style.height = "100%";
  lightbox.style.backgroundColor = "rgba(0,0,0,0.8)";
  lightboxImg.style.maxWidth = "90%";
  lightboxImg.style.maxHeight = "80%";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

// Search with suggestions
const pageMap = {
  home: "index.html",
  research: "Research.html",
  datasets: "Datasets&Tools.html",
  tools: "Datasets&Tools.html",
  publications: "Publications.html",
  demo: "Interactive_demo.html",
  visualization: "VisualizationTools.html",
  chatbot: "AI Chatbot.html",
  contact: "contact.html",
  interactive: "Interactive_demo.html",
};

function liveSearch() {
  const query = document.getElementById("searchInput").value.toLowerCase();
  const suggestions = document.getElementById("suggestions");
  suggestions.innerHTML = "";

  if (query === "") return;

  for (const key in pageMap) {
    if (key.includes(query)) {
      const li = document.createElement("li");
      li.textContent = key.charAt(0).toUpperCase() + key.slice(1);
      li.style.cursor = "pointer";
      li.style.padding = "5px";
      li.style.backgroundColor = "#008000";
      li.onclick = () => (window.location.href = pageMap[key]);
      suggestions.appendChild(li);
    }
  }

  if (suggestions.innerHTML === "") {
    const li = document.createElement("li");
    li.textContent = "No matches found 😢";
    suggestions.appendChild(li);
  }
}
// Modal toggle
const openSurveyBtn = document.getElementById("openSurveyBtn");
const surveyModal = document.getElementById("surveyModal");
const closeSurveyBtn = document.getElementById("closeSurveyBtn");

openSurveyBtn.addEventListener("click", () => {
  surveyModal.style.display = "block";
});

closeSurveyBtn.addEventListener("click", () => {
  surveyModal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === surveyModal) {
    surveyModal.style.display = "none";
  }
});

// Optional form validation
document
  .getElementById("researchForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you for participating in the RethaNova survey! 💡");
    surveyModal.style.display = "none";
    this.reset();
  });
