const optionBtns = document.getElementsByClassName("option-text");
const questions = document.getElementById("question");
const answerOptionOne = document.getElementById("option-1");
const answerOptionTwo = document.getElementById("option-2");
const answerOptionThree = document.getElementById("option-3");
const answerOptionFour = document.getElementById("option-4");
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const loader = document.getElementById("loader");
const game = document.getElementById("game");

let score = 0;


const selectedChoiceOption = (userChoice, currentAnswer) => {

  if (userChoice === currentAnswer) {
    console.log(currentAnswer, "CURRENTANSWER")
  } else {
    console.log(userChoice, "CHOICExx")
  }
};

// the responsePayload(formatedData) contain the the correct and incorrect answer.
const setValue = (responsePayload, index) => {
  const notRandomisedAnswerOptions = [];

  notRandomisedAnswerOptions.push(responsePayload[index].incorrectAnswers[0]);
  notRandomisedAnswerOptions.push(responsePayload[index].incorrectAnswers[1]);
  notRandomisedAnswerOptions.push(responsePayload[index].incorrectAnswers[2]);
  notRandomisedAnswerOptions.push(responsePayload[index].correctAnswer);


  // shuffleing the correct and incorrect answer inside the array of notRandomisedAnswerOptions 
  const shuffledAnswers = notRandomisedAnswerOptions.sort(() => Math.random() - 0.5);

  questions.innerHTML = responsePayload[index].question;
  answerOptionOne.innerHTML = shuffledAnswers[0];
  answerOptionTwo.innerHTML = shuffledAnswers[1];
  answerOptionThree.innerHTML = shuffledAnswers[2];
  answerOptionFour.innerHTML = shuffledAnswers[3];


  //  increasing the question counter by one
  questionCounterText.innerHTML = index + 1;
}
const CORRECT_BONUS = 10;
// const MAX_QUESTIONS = 10;


fetch('https://the-trivia-api.com/api/questions')
  .then((response) => response.json())
  .then((data) => {
    const formatedData = data;

    let index = 0;

    setValue(formatedData, index)
    
    
    for (let i = 0; i < optionBtns.length; i++) {
      optionBtns[i].addEventListener("click", event => {
        //Add function here
        const selectedChoice = event.target.innerHTML;
        const correctAnswer = formatedData[index].correctAnswer


        selectedChoiceOption(selectedChoice, correctAnswer);

        index += 1;

        if (selectedChoice === correctAnswer) {
          incrementScore(CORRECT_BONUS);
        }


        setValue(formatedData, index)

      });
    }
    startGame()

  }).catch((err) => console.log(err, 'questions are not found'));

 startGame = () =>{
  game.classList.remove('hidden');
  loader.classList.add('hidden');
 } 
incrementScore = (index) => {
  score += index;
  console.log(score, "SCORE")
  scoreText.innerText = score;
  console.log(scoreText, "TEXT")
};


