const questions = [
    {
        question: "Which is the largest Animal in the world ??",
        
        answers : [
            {text : "Shark" , correct : false },
            {text : "Blue Whale" , correct : true },
            {text : "Elephant" , correct : false },
            {text : "Tiger" , correct : false }
        ] 
    },
    {
        question: "Which is the smallest country in the world ??",
        
        answers : [
            {text : "Vatican city" , correct : true },
            {text : "New zealand" , correct : false },
            {text : "India" , correct : false },
            {text : "Australia" , correct : false }
        ] 
    },
    {
        question: "Which is the smallest continent in the world ??",
        
        answers : [
            {text : "Asia" , correct : false },
            {text : "Australia" , correct : true },
            {text : "Artica" , correct : false },
            {text : "Africa" , correct : false }
        ] 
    },
    {
        question: "Which is the largest desert in the world ??",
        
        answers : [
            {text : "Kalhari" , correct : false },
            {text : "Gobi" , correct : false },
            {text : "Sahara" , correct : false },
            {text : "Antartica" , correct : true }
        ] 
    }
]

const questionElement = document.getElementById('question')
const answerButtons = document.getElementById('answer-buttons')
const nextButton = document.getElementById('next-btn')

let currentQuestionIndex = 0;

let score = 0

function startQuiz(){

    currentQuestionIndex = 0
    score = 0
    nextButton.innerHTML = "Next"
    showQuestion()

}

function showQuestion(){

    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question 

    currentQuestion.answers.forEach(answers =>{
        const button = document.createElement("button")
        button.innerHTML = answers.text
        button.classList.add("btn")
        button.className = "  border border-black transition-all duration-300 hover:bg-black hover:text-white  items-start text-left bg-[#fff] w-[100%] p-[10px] rounded-lg mt-4 mb-3"
        answerButtons.appendChild(button)

        if(answers.correct){
            button.dataset.correct = answers.correct
        }
        button.addEventListener("click",selectAnswer)
    })

}


function resetState(){
    nextButton.style.display = "none"

    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target
    const isCorrect = selectedBtn.dataset.correct === "true"

    if(isCorrect){
        selectedBtn.classList.add("Correct")
        score++
    }
    else{
        selectedBtn.classList.add("Incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
        button.classList.add ("correct");
        }
        button.disabled = true;
        }) ;
        nextButton.style.display = "block";


    }

    function handleNextButton(){
        currentQuestionIndex++;

        if(currentQuestionIndex < questions.length){
        showQuestion();
        }
        else
        showScore();
        }

    function showScore(){
        resetState()
        questionElement.innerHTML = `You Scored ${score} out of ${questions.length} !!`
        nextButton.innerHTML = "Play again"
        nextButton.style.display = "block"
    }

nextButton.addEventListener("click",() =>{

    if(currentQuestionIndex < questions.length){
        handleNextButton()
    }
    else{
        startQuiz()
    }
})

startQuiz()