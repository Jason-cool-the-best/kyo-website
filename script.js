
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const send = document.getElementById("send");

function reply() {
  const text = question.value.trim().toLowerCase();

  if (!text) {
    answer.textContent = "Type a message first.";
  } else if (text.includes("hello") || text.includes("hi")) {
    answer.textContent =
      "Hello! I'm the KYO website demo.";
  } else if (text.includes("who are you")) {
    answer.textContent =
      "I'm KYO, an experimental independent AI project.";
  } else {
    answer.textContent =
      "This demo is not connected to the KYO neural network yet.";
  }
}

send.addEventListener("click", reply);

question.addEventListener("keydown", (event) => {
  if (event.key === "Enter") reply();
});
