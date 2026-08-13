const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");
const examTimerEl = document.getElementById("examTimer");

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

function startExam(){
    examQuestions = topicsData.flatMap(topic => topic.questions.map(q => ({
        ...q,
        topicTitle: topic.title
    }))).sort(() => Math.random() - 0.5).slice(0, 10);
    startExamTimer();
    showQuestion();
}

function selectAnswer(index){
    const q = examQuestions[current];
    if (!q.selected) q.selected = [];
    if (q.selected.includes(index)){
        q.selected = q.selected.filter(i => i !== index);
    } else{
        q.selected.push(index);
    }
    updateSelectionUI(q);
}
 function updateSelectionUI(q){
    const buttons = optionsEl.querySelectorAll("button");
    buttons.forEach((btn, i) => {
        btn.classList.toggle("selected", q.selected?.includes(i));
    });
    const images = optionsEl.querySelectorAll(".answer-image");
    images.forEach((img, i) => {
        img.classList.toggle("selected-img", q.seleected?.includes(i));
    });
 }
 nextBtn.onclick = () => {
    const q = examQuestions[current];
    if (!isAnswered){
        let correct = false;
        if (q.answers){
            const selected = q.selected || [];
            correct = selected.length === q.answers.length && selected.every(i => q.answers.includes(i));
        } else{
            correct = q.selected && q.selected[0] === q.answer;
        }
        if (correct) score++;
        isAnswered = true;
        nextBtn.textContent = "Next";
        resultEl.innerHTML = `
        <p class="explanation">
            ${q.explanation || "Review this concept"}
        </p>`;
    }
    else{
        current++;
        if(current < examQuestions.length){
            isAnswered = false;
            nextBtn.textContent = "Submit";
            showQuestion();
        } else{
            finishExam();
        }
    }
 }
 
 function finishExam(){
    clearInterval(examInterval);
    questionEl.innerHTML = "";
    optionsEl.innerHTML = "";
    nextBtn.style.display = "none";
    const percent = Math.round((score / examQuestions.length) * 100);
    let grade = "F";
    if (percent >= 90) grade = "A";
    else if (percent >= 80) grade = "B";
    else if (percent >= 70) grade = "C";
    else if (percent >= 60) grade = "D";
    resultEl.innerHTML = `
    <h2>Exam Result</h2>
    <p>Score: ${score}/${examQuestions.length}</p>
    <p>Percent: ${percent}</p>
    <p>Grade: ${grade}</p>
    <a href="leader-board.html". Go to leaderboard</a>`;
    saveExamResult(percent, grade);
    saveCertificate(percent, grade);
 }

 function saveExamResult(percent, grade){
    const data = JSON.parse(localStorage.getItem("tests")) || [];
    data.push({
        topic: "Exam Mode",
        score,
        total: examQuestions.length,
        percent,
        grade,
        date: new Date().toISOString().split("T")[0]
    });
    localStorage.setItem("tests", JSON.stringify(data));
 }

 function saveCertificate(percent, grade){
    const certificates = JSON.parse(localStorage.getItem("certificates")) || [];
    const student = JSON.parse(localStorage.getItem("student"));
    const id = crypto.randomUUID();
    const certificate = {
        id,
        number,
        student: student.fullName,
        group: student.group,
        exam: "Biology Final Exam",
        score,
        total: examQuestions.length,
        percent,
        grade,
        date: new Date().toLocaleDateString()
    };
    certificates.push(certificate);
    localStorage.setItem("certificates", JSON.stringify(certificates));
    window.location.href= `certificate.html?id=${id}`;
 }