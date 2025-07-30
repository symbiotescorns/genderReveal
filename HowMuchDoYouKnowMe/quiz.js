let questions = [];
let currentQuestion = 0;
let score = 0;

async function loadQuestions() {
    const res = await fetch('questions.json');
    questions = await res.json();
}

function showQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('question-text').textContent = q.question;
    const choicesDiv = document.getElementById('choices');
    choicesDiv.innerHTML = '';
    q.choices.forEach((choice, idx) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = choice;
        btn.onclick = () => selectAnswer(idx, btn);
        choicesDiv.appendChild(btn);
    });
    document.getElementById('score').textContent = `Score: ${score} / ${questions.length}`;
    document.getElementById('next-question-btn').style.display = 'none';
}

function selectAnswer(selectedIdx, btn) {
    const q = questions[currentQuestion];
    const choiceBtns = document.querySelectorAll('.choice-btn');
    choiceBtns.forEach(b => b.classList.add('disabled'));
    if (selectedIdx === q.answer) {
        btn.classList.add('correct');
        score++;
    } else {
        btn.classList.add('wrong');
        choiceBtns[q.answer].classList.add('correct');
    }
    document.getElementById('score').textContent = `Score: ${score} / ${questions.length}`;
    document.getElementById('next-question-btn').style.display = 'inline-block';
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quiz-screen').style.display = 'none';
    document.getElementById('result-screen').style.display = 'block';
    document.getElementById('final-score').textContent = `${score} / ${questions.length}`;
}

document.getElementById('start-btn').onclick = async () => {
    await loadQuestions();
    currentQuestion = 0;
    score = 0;
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';
    showQuestion();
};

document.getElementById('next-question-btn').onclick = nextQuestion;

document.getElementById('boy-btn').onclick = () => {
    document.getElementById('video-container').style.display = 'block';
    document.getElementById('youtube-link-boy').style.display = 'inline-block';
    document.getElementById('youtube-link-girl').style.display = 'none';
    document.getElementById('reveal-message').textContent = '';
};

document.getElementById('girl-btn').onclick = () => {
    document.getElementById('video-container').style.display = 'block';
    document.getElementById('youtube-link-girl').style.display = 'inline-block';
    document.getElementById('youtube-link-boy').style.display = 'none';
    document.getElementById('reveal-message').textContent = '';
};

document.getElementById('youtube-link-girl').onclick = function() {
    document.getElementById('reveal-message').textContent = 'WRONGGG!!';
    // Let the link open in a new tab as normal
};
document.getElementById('youtube-link-boy').onclick = function() {
    document.getElementById('reveal-message').textContent = 'Yes we are';
    // Let the link open in a new tab as normal
};
