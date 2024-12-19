document.getElementById("reset-btn").addEventListener("click", function () {
  location.reload();
});

// Fetching data from the JSON file
fetch("expressions.json")
  .then((response) => response.json())
  .then((data) => {
    // Filter English and Hungarian words
    const englishWords = data.filter((item) => item.English);
    const hungarianWords = data.filter((item) => item.Hungarian);

    // Shuffle arrays
    shuffleArray(englishWords);
    shuffleArray(hungarianWords);

    // Select 10 random words in English and 10 in Hungarian for the quiz
    const englishQuizWords = englishWords.slice(0, 10);
    const hungarianQuizWords = hungarianWords.slice(0, 10);

    // Shuffle quiz words
    // shuffleArray(quizWords);

    // Generate quiz HTML
    const quizContainer = document.getElementById("quiz-container");
    englishQuizWords.forEach((word) => {
      const div = document.createElement("div");
      div.innerHTML = `
                <p>ANGOL ---  ${word.English}</p>
                <input type="text" data-answer="${word.Hungarian}">
            `;
      quizContainer.appendChild(div);
    });
    const quizContainer2 = document.getElementById("quiz-container");
    hungarianQuizWords.forEach((word) => {
      const div = document.createElement("div");
      div.innerHTML = `
                <p>MAGYAR --- ${word.Hungarian}</p>
                <input type="text" data-answer="${word.English}">
            `;
      quizContainer2.appendChild(div);
    });
  })
  .catch((error) => console.error("Error fetching data:", error));

// Function to shuffle array elements
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Submit button functionality
document.getElementById("submit-btn").addEventListener("click", function () {
  submit_click++;
  const inputs = document.querySelectorAll('input[type="text"]');
  let points = 0;
  inputs.forEach((input) => {
    const answer = input.getAttribute("data-answer").toLowerCase().trim();
    const userAnswer = input.value.toLowerCase().trim();
    if (answer === userAnswer) {
      input.style.backgroundColor = "lightgreen"; // Highlight correct answers
      points += 1;
    } else {
      input.style.backgroundColor = "salmon"; // Highlight incorrect answers

      // Create a new span element to hold the correct answer
      const correctAnswerSpan = document.createElement("span");
      correctAnswerSpan.className = "correct-answer";
      correctAnswerSpan.textContent = `${answer}`;
      // Append the correct answer after the input element
      input.parentNode.insertBefore(correctAnswerSpan, input.nextSibling);
    }
  });
  if (points >= 10) {
    alert(
      `Gratulálok! Sikeresen teljesítetted a szódolgozatot. Pontszámod: ${points}/20`
    );
  } else {
    alert(`Sajnálom, nem sikerült a szódolgozat. Pontszámod: ${points}/20`);
  }
});
