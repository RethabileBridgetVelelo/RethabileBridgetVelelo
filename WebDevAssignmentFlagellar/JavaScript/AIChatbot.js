const input = document.getElementById("myInput");
const button = document.getElementById("myButton");
const responseDiv = document.querySelector(".response");
const commandList = document.getElementById("command-list");
const successMessage = document.getElementById("success-message");

// Command options
const commands = {
  help: "Available commands: help, mission, tools, research, publications, demo, contact, quit",
  mission:
    "Our mission at RethaNova AI Lab is to revolutionize bacterial imaging by detecting flagellar motors through machine learning, offering clarity in biological structures.",
  tools:
    "We provide specialized datasets and visualization tools to support flagellar motor detection in cryo-electron tomography (cryo-ET) data.",
  research:
    "Our research dives deep into advanced bioinformatics, cryo-ET segmentation, and automated analysis of microbial structures.",
  publications:
    "You'll find our published work under the 'Publications' tab, covering methods, case studies, and innovations in computational biology.",
  demo: "The Interactive Demo page allows users to test our tool on sample cryo-ET data and experience real-time flagellar detection.",
  contact:
    "Reach out via our contact page — we’re excited to collaborate, assist, or answer any academic and research queries!",
  quit: "Goodbye! Refresh the page if you want to chat again. 💬",
};

// Generate response logic
function generateResponse(userInput) {
  const input = userInput.toLowerCase().trim();
  return (
    commands[input] ||
    `Sorry, I couldn’t understand your request. Try typing help to see what I can do.`
  );
}

// Typing effect + speech
function displayChat(userText, botReply) {
  const userP = document.createElement("p");
  userP.className = "user";
  userP.style.color = "#facc15";
  userP.textContent = "You: " + userText;
  responseDiv.appendChild(userP);

  const botP = document.createElement("p");
  botP.className = "AI";
  botP.textContent = "Retha: ";
  responseDiv.appendChild(botP);

  // Typing animation
  let index = 0;
  function typeEffect() {
    if (index < botReply.length) {
      botP.textContent += botReply.charAt(index);
      index++;
      setTimeout(typeEffect, 20);
    } else {
      speak(botReply);
    }
  }
  typeEffect();
}

// Voice response
function speak(text) {
  if ("speechSynthesis" in window) {
    const msg = new SpeechSynthesisUtterance(text);
    msg.lang = "en-US";
    msg.pitch = 1.1;
    msg.rate = 1;
    msg.volume = 1;
    window.speechSynthesis.speak(msg);
  }
}

// Button click logic
button.addEventListener("click", () => {
  const userText = input.value;
  if (userText !== "") {
    const botReply = generateResponse(userText);
    displayChat(userText, botReply);
    input.value = "";

    if (userText.toLowerCase().trim() === "quit") {
      input.disabled = true;
      button.disabled = true;
      successMessage.textContent = "Session ended. Thank you!";
    } else {
      successMessage.textContent = "Message sent!";
    }

    // Show command list for help
    if (userText.toLowerCase().trim() === "help") {
      commandList.innerHTML = `<ul style="margin-left: 20px;">
        <li><b>mission</b> - Learn about our lab’s purpose</li>
        <li><b>tools</b> - Overview of datasets & visualization tools</li>
        <li><b>research</b> - Information about our studies</li>
        <li><b>publications</b> - Access our academic work</li>
        <li><b>demo</b> - Try our interactive cryo-ET demo</li>
        <li><b>contact</b> - How to reach us</li>
        <li><b>quit</b> - End the chat</li>
      </ul>`;
    }
  }
});

// Enter key support
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    button.click();
  }
});
