const questions = [
  {
    question: "O que você gosta de fazer?",
    answer: "Eu gosto de ler e programar."
  },
  {
    question: "Onde você mora?",
    answer: "Eu moro na nuvem."
  },
  {
    question: "Qual é a sua cor favorita?",
    answer: "Minha cor favorita é azul."
  }
];

localStorage.setItem("questions", JSON.stringify(questions));

const storedQuestions = JSON.parse(localStorage.getItem("questions"));

const chatForm = document.querySelector("#chat-form");
const chatInput = document.querySelector("#chat-input");
const chatOutput = document.querySelector("#chat-output");
const suggestionList = document.querySelector("#suggestion-list");

// Esconde a lista de sugestões
suggestionList.style.display = "none";

chatForm.addEventListener("submit", function(e) {
  e.preventDefault();

  for (let i = 0; i < storedQuestions.length; i++) {
    if (chatInput.value === storedQuestions[i].question) {
      chatOutput.innerHTML += `<p><strong>Você:</strong> ${storedQuestions[i].question}</p>`;
      chatOutput.innerHTML += `<p><strong>Chatbot:</strong> ${storedQuestions[i].answer}</p>`;
      break;
    }
  }

  chatInput.value = "";
  suggestionList.innerHTML = "";
});

chatInput.addEventListener("input", function() {
  suggestionList.innerHTML = "";
  
  // Mostra a lista de sugestões se houver pelo menos um caractere digitado
  if (chatInput.value) {
    suggestionList.style.display = "block";
  } else {
    suggestionList.style.display = "none";
    return;
  }

  for (let i = 0; i < storedQuestions.length; i++) {
    if (storedQuestions[i].question.toLowerCase().includes(chatInput.value.toLowerCase())) {
      const suggestionItem = document.createElement("li");
      suggestionItem.innerHTML = storedQuestions[i].question;
      suggestionItem.addEventListener("click", function() {
        chatInput.value = storedQuestions[i].question;
        suggestionList.innerHTML = "";
        suggestionList.style.display = "none";
      });
      suggestionList.appendChild(suggestionItem);
    }
  }
});
