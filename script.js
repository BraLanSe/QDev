let currentContact = null;
const messageStore = {}; // Stocke les messages par contact

function selectContact(name) {
  currentContact = name;
  document.getElementById('chatWith').textContent = `Chat avec ${name}`;
  loadMessages(name);
}

function loadMessages(name) {
  const chatBox = document.getElementById('chatBox');
  chatBox.innerHTML = '';
  const messages = messageStore[name] || [];

  messages.forEach(msg => {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${msg.sender}`;
    msgDiv.innerHTML = msg.text;
    chatBox.appendChild(msgDiv);
  });

  chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById('messageInput');
  const message = input.value.trim();
  if (!message || !currentContact) return;

  const chatBox = document.getElementById('chatBox');
  const msgDiv = document.createElement('div');
  msgDiv.className = 'message user';
  msgDiv.innerHTML = message;
  chatBox.appendChild(msgDiv);

  // Enregistre le message
  if (!messageStore[currentContact]) messageStore[currentContact] = [];
  messageStore[currentContact].push({ sender: 'user', text: message });

  input.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;
}

document.getElementById('messageInput').addEventListener("keypress", function(e) {
  if (e.key === "Enter") sendMessage();
});

// Emoji picker
const emojiBtn = document.getElementById("emojiBtn");
const emojiPicker = document.getElementById("emojiPicker");
emojiBtn.addEventListener("click", () => {
  emojiPicker.style.display = emojiPicker.style.display === "none" ? "block" : "none";
});
emojiPicker.addEventListener("emoji-click", e => {
  const input = document.getElementById('messageInput');
  input.value += e.detail.unicode;
});
