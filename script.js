
// MENÚ RESPONSIVE
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
  });
});

// ANIMACIONES AL DESPLAZARSE
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

document.querySelectorAll(".reveal").forEach(element => {
  observer.observe(element);
});

// CUESTIONARIO
const answers = document.querySelectorAll(".answer");
const quizCard = document.getElementById("quizCard");
const wrongFeedback = document.getElementById("wrongFeedback");
const successFeedback = document.getElementById("successFeedback");
const retryButton = document.getElementById("retryButton");
const quizMessage = document.getElementById("quizMessage");

answers.forEach(answer => {
  answer.addEventListener("click", () => {
    const isCorrect = answer.dataset.answer === "correct";

    answers.forEach(button => {
      button.disabled = true;
    });

    if (isCorrect) {
      quizCard.hidden = true;
      wrongFeedback.hidden = true;
      successFeedback.hidden = false;
    } else {
      quizMessage.textContent = "Esa no es la respuesta correcta.";
      wrongFeedback.hidden = false;
    }
  });
});

// VOLVER A INTENTAR
retryButton.addEventListener("click", () => {
  answers.forEach(button => {
    button.disabled = false;
  });

  quizMessage.textContent = "";
  wrongFeedback.hidden = true;
  successFeedback.hidden = true;
  quizCard.hidden = false;
});

// ACCESIBILIDAD: al mostrar el resultado, llevarlo a la vista
[wrongFeedback, successFeedback].forEach(panel => {
  const observerFeedback = new MutationObserver(() => {
    if (!panel.hidden) {
      panel.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  });

  observerFeedback.observe(panel, {
    attributes: true,
    attributeFilter: ["hidden"]
  });
});
