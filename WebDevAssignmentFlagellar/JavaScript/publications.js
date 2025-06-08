document.addEventListener("DOMContentLoaded", () => {
  // Publication data - add as many details as you want here
  const publications = [
    {
      title: "Deep Learning for Bacterial Motor Detection",
      journal: "Nature Methods (2024)",
      summary:
        "This paper presents a deep learning approach to detect bacterial flagellar motors using cryo-electron tomography data.",
    },
    {
      title: "AI-Driven Structure Analysis",
      journal: "Cell (2025)",
      summary:
        "Explores AI methods to analyze molecular structures with enhanced accuracy and speed.",
    },
    {
      title: "Novel ML Approaches in Cryo-ET",
      journal: "Science (2023)",
      summary:
        "Introduces novel machine learning techniques to improve cryo-ET imaging and interpretation.",
    },
  ];

  // Create popup container
  const popup = document.createElement("div");
  popup.id = "pub-info-popup";
  popup.style.position = "absolute";
  popup.style.background = "rgba(0,0,0,0.85)";
  popup.style.color = "#fff";
  popup.style.padding = "12px";
  popup.style.borderRadius = "8px";
  popup.style.maxWidth = "300px";
  popup.style.zIndex = "1000";
  popup.style.display = "none";
  popup.style.boxShadow = "0 4px 12px rgba(0,0,0,0.5)";
  popup.style.fontFamily = "Arial, sans-serif";
  popup.style.fontSize = "14px";
  popup.style.lineHeight = "1.4";
  popup.style.cursor = "default";
  popup.style.transition = "opacity 0.3s ease";

  // Add search input inside popup
  const searchInput = document.createElement("input");
  searchInput.type = "search";
  searchInput.placeholder = "Search publications...";
  searchInput.style.width = "100%";
  searchInput.style.marginBottom = "10px";
  searchInput.style.padding = "6px";
  searchInput.style.border = "none";
  searchInput.style.borderRadius = "4px";
  searchInput.style.fontSize = "14px";
  popup.appendChild(searchInput);

  // Container for results below search
  const resultsContainer = document.createElement("div");
  popup.appendChild(resultsContainer);

  document.body.appendChild(popup);

  // Utility to show popup near element
  function showPopup(element, htmlContent) {
    resultsContainer.innerHTML = htmlContent;
    popup.style.display = "block";
    popup.style.opacity = "1";

    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;

    // Position popup below the element with some offset
    popup.style.top = `${rect.bottom + scrollTop + 8}px`;
    popup.style.left = `${rect.left + scrollLeft}px`;
  }

  // Utility to hide popup
  function hidePopup() {
    popup.style.opacity = "0";
    setTimeout(() => {
      popup.style.display = "none";
      resultsContainer.innerHTML = "";
      searchInput.value = "";
    }, 300);
  }

  // Build HTML for a single publication info block with a Google search link
  function buildPubHtml(pub) {
    return `
      <strong>${pub.title}</strong><br>
      <em>${pub.journal}</em><br>
      <p>${pub.summary}</p>
      <a href="https://www.google.com/search?q=${encodeURIComponent(
        pub.title
      )}" target="_blank" 
         style="color:#4da6ff; text-decoration: underline;">Search on Google</a>
    `;
  }

  // Attach event listeners to all "Read Paper" links
  const links = document.querySelectorAll(".pub-link");

  links.forEach((link, index) => {
    const pub = publications[index];
    if (!pub) return;

    // On hover - show popup with info
    link.addEventListener("mouseenter", (e) => {
      showPopup(e.target, buildPubHtml(pub));
    });

    // Hide popup when mouse leaves the link and popup area
    link.addEventListener("mouseleave", () => {
      // Delay hiding to allow moving mouse into popup
      setTimeout(() => {
        if (!popup.matches(":hover")) {
          hidePopup();
        }
      }, 200);
    });

    popup.addEventListener("mouseleave", hidePopup);

    // On click - toggle popup
    link.addEventListener("click", (e) => {
      e.preventDefault();
      if (popup.style.display === "block") {
        hidePopup();
      } else {
        showPopup(e.target, buildPubHtml(pub));
      }
    });
  });

  // Search functionality inside popup
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase().trim();

    if (!query) {
      resultsContainer.innerHTML = "Type to search publications above.";
      return;
    }

    const filtered = publications.filter(
      (pub) =>
        pub.title.toLowerCase().includes(query) ||
        pub.journal.toLowerCase().includes(query) ||
        pub.summary.toLowerCase().includes(query)
    );

    if (filtered.length === 0) {
      resultsContainer.innerHTML = "<em>No matching publications found.</em>";
      return;
    }

    resultsContainer.innerHTML = filtered
      .map(
        (pub) =>
          `<div style="margin-bottom:10px;">
         ${buildPubHtml(pub)}
       </div>`
      )
      .join("");
  });

  // Initially show prompt inside results
  resultsContainer.innerHTML =
    'Hover over or click "Read Paper" for details, or search above.';
});
