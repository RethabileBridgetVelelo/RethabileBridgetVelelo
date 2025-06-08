// === CONFIGURATION ===
const destinationAddress =
  "97 St Andrews Street, Bloemfontein, Free State, South Africa";

// === LANGUAGE DETECTION OR SELECTION ===
let selectedLanguage = "en"; // 'en', 'af', 'st'

function setLanguage(lang) {
  selectedLanguage = lang;
  const voiceLang = {
    en: "Directions to RethaNova Innovation Center. Please travel safely.",
    af: "Rigting na RethaNova Innovasie Sentrum. Reis asseblief versigtig.",
    st: "Kena letsohong la hao le letona ho RethaNova Innovation Center. Tsela tshweu!",
  };
  speak(voiceLang[lang]);
}

// === VOICE SYNTHESIS FUNCTION ===
function speak(text, langCode = selectedLanguage) {
  if (!("speechSynthesis" in window)) return;

  const utterance = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();

  utterance.lang = {
    en: "en-ZA",
    af: "af-ZA",
    st: "en-ZA", // fallback
  }[langCode];

  utterance.voice = voices.find((v) => v.lang === utterance.lang) || null;
  utterance.rate = 1;
  utterance.pitch = 1;
  speechSynthesis.speak(utterance);
}

// === GET DIRECTIONS FUNCTION ===
function showDirections() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported.");
    speak("Geolocation is not supported by your browser.");
    return;
  }

  const mode = prompt(
    "How will you be traveling? Type 'walk' or 'drive':",
    "drive"
  ).toLowerCase();
  if (!["walk", "drive"].includes(mode)) {
    alert("Please enter either 'walk' or 'drive'.");
    speak("Please enter walk or drive.");
    return;
  }

  speak("Getting your location. Please wait...");

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      const destination = encodeURIComponent(destinationAddress);
      const travelMode = mode === "walk" ? "walking" : "driving";

      const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${destination}&travelmode=${travelMode}`;
      const travelMsg = {
        en:
          travelMode === "walking"
            ? "Walking directions are opening."
            : "Driving directions are opening.",
        af:
          travelMode === "walking"
            ? "Staprigtinge word oopgemaak."
            : "Ry-rigtinge word oopgemaak.",
        st:
          travelMode === "walking"
            ? "Litaelo tsa ho tsamaea li bula."
            : "Litaelo tsa ho khanna li bula.",
      };

      speak(travelMsg[selectedLanguage]);
      window.open(url, "_blank");

      setTimeout(() => {
        const arrivedMsg = {
          en: "You have arrived at RethaNova Innovation Center.",
          af: "Jy het by RethaNova Innovasie Sentrum aangekom.",
          st: "U fihlile ho RethaNova Innovation Center.",
        };
        speak(arrivedMsg[selectedLanguage]);
      }, 12000);
    },
    () => {
      alert("Unable to retrieve your location.");
      speak("Unable to retrieve your location.");
    }
  );
}

// === FORM SUBMISSION ===
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");

  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      const plainData = Object.fromEntries(formData.entries());

      try {
        const response = await fetch(
          "https://formsubmit.co/YOUR_EMAIL@example.com",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(plainData),
          }
        );

        if (response.ok) {
          showSuccessMessage();
        } else {
          alert("Submission failed. Please try again.");
          speak("Form submission failed.");
        }
      } catch (err) {
        console.error("Error submitting form", err);
        alert("Network error. Please try again.");
        speak("There was a network error.");
      }
    });
  }

  // === BUTTON SETUP ===
  const btn = document.createElement("button");
  btn.textContent = "🧭 Get Directions to RethaNova";
  btn.style.margin = "20px";
  btn.style.padding = "10px 15px";
  btn.style.background = "#005fa3";
  btn.style.color = "#fff";
  btn.style.border = "none";
  btn.style.borderRadius = "8px";
  btn.style.cursor = "pointer";
  btn.onclick = showDirections;

  document.body.appendChild(btn);

  // === Language Selector ===
  const langSelector = document.createElement("div");
  langSelector.innerHTML = `
    <label>Select Language:</label>
    <select onchange="setLanguage(this.value)">
      <option value="en">English</option>
      <option value="af">Afrikaans</option>
      <option value="st">Sesotho</option>
    </select>
  `;
  langSelector.style.marginTop = "10px";
  document.body.appendChild(langSelector);

  window.speechSynthesis.onvoiceschanged = () => speak("");
});

// === SHOW SUCCESS SCREEN ===
function showSuccessMessage() {
  document.body.innerHTML = `
    <div style="text-align:center;padding:50px;font-family:sans-serif">
      <div style="font-size:80px;color:green;">✔️</div>
      <h2 style="color:green;">Submitted Successfully</h2>
      <p>Thank you for your submission.</p>
      <button onclick="window.location.href='index.html'"
              style="margin-top:20px;padding:10px 20px;background:#005fa3;color:white;border:none;border-radius:5px;cursor:pointer;">
        Go Back to Homepage
      </button>
    </div>
  `;

  const successMsg = {
    en: "Form submitted successfully. Thank you!",
    af: "Vorm suksesvol ingedien. Dankie!",
    st: "Foromo e rometswe ka katleho. Kea leboha!",
  };
  speak(successMsg[selectedLanguage]);
}
