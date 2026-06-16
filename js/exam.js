const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const examTimer = document.getElementById("examTimer");

let examQuestions = [];
let current = 0;
let score = 0;
let isAnswered = false;
let examTime = 300;
let examInterval = null;
loadData(startExam);

function startExam(){
    examQuestions = topicsData.flatMap(topic => topic.questions.map(q=> ({...q, topicTitle: topic.title
    })))
    .sort(() => Math.random() - 0.5)
    .slice(0,10);
    startExamTimer();
    showQuestion();
}

function showQuestion(){
    const q = examQuestions[current];
    questionEl.innerHTML = `
    <p><b>${q.topicTitle}</b></p>
    <p>${q.q}</p>
    ${q.image ? `<img src="${q.image}" class="question-image">` : ""}
    `;
    optionsEl.innerHTML = "";
    resultEl.innerHTML = "";

    if (q.imageOptions && q.imageOptions.length > 0){
        const container = document.createElement("div");
        container.className = "image-options";
        q.imageOptions.forEach((img, i) => {
            const imgEl = document.createElement("img");
            imgEl.src = img;
            imgEl.className = "answer-image";
            imgEl.onclick = () => selectAnswer(i);
            container.appendChild(imgEl);
        });
        optionsEl.appendChild(container);
    }
    else {
        q.options.forEach((opt, i) => {
            const btn = document.createElement("button");
            btn.textContent = opt;
            btn.onclick = () => selectAnswer(i);
            optionsEl.appendChild(btn);
        });
    }
    updateProgress();
}
function updateProgress(){
    const percent = ((current + 1) / examQuestions.length) * 100;
    progressBar.style.width = percent + "%";
    progressText.textContent = `Question ${current + 1} / ${examQuestions.length}`;
}

function startExamTimer(){
    examInterval = setInterval(() => {
        examTime --;
        examTimerEl.textContent = `${examTime}`;

        if (examTime <= 0){
            clearInterval(examInterval);
            finishExam();
        }
    }, 1000);
}