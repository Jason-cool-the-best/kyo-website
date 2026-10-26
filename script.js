

const question = document.getElementById("question");
const answer = document.getElementById("answer");
const send = document.getElementById("send");

const history = [];

async function reply() {
  const message = question.value.trim();

  if (!message) {
    answer.textContent = "Type a message first.";
    return;
  }

  send.disabled = true;
  answer.textContent = "KYO is thinking...";

  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/chat",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message,
          history: history.slice(-3)
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Request failed");
    }

    answer.textContent = data.reply;

    history.push({
      user: message,
      assistant: data.reply
    });

    question.value = "";
  } catch (error) {
    answer.textContent =
      "Could not reach KYO. Check that its Python server is running.";
    console.error(error);
  } finally {
    send.disabled = false;
  }
}

send.addEventListener("click", reply);

question.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    reply();
  }
});
