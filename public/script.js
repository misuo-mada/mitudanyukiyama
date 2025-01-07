const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const chatOutput = document.getElementById('chat-output');

chatForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // ユーザーの入力を取得
  const message = userInput.value;
  userInput.value = '';

  // ユーザーのメッセージを表示
  const userMessage = document.createElement('div');
  userMessage.textContent = `あなた: ${message}`;
  chatOutput.appendChild(userMessage);

  try {
    // サーバーにリクエストを送信
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: message }),
    });

    const data = await response.json();

    // キャラクターの応答を表示
    const characterMessage = document.createElement('div');
    characterMessage.textContent = `真島: ${data.reply}`;
    chatOutput.appendChild(characterMessage);

    // チャット画面をスクロール
    chatOutput.scrollTop = chatOutput.scrollHeight;
  } catch (error) {
    console.error('エラー:', error.message);
  }
});
