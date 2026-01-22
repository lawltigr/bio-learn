const params = new URLSearchParams(window.location.search);
const topicId = params.get("topic");
const topic = topicsData.find(t=> t.id === topicId);
const titleEl = document.getElementById("topicTitle");
const questionEl = document. getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");

let current = 0;
let score = 0;
titleEl.textContent = topic.title;

function showQuestion(){
    const q = topic.questions[current];
    questionEl.textContent = q.q;
    optionsEl.innerHTML = "";

    q.options.forEach((opt,i) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.onclick = () => selectAnswer(i);
        optionsEl.appendChild(btn);
    });
}

function selectAnswer(index){
    const correct = topic.questions[current].answer;
    if (index === correct) score++;
    current++;
    if (current< topic.questions.length) {
        showQuestion();
    } else{
        finishTest();
    }
}

function finishTest(){
    questionEl.textContent = "";
    optionsEl.innerHTML = "";
    nextBtn.style.display = "none";
    const percent = Math.round((score / topic.questions.length) * 100);
    resultEl.innerHTML = `
    <h2>Result: ${percent}%</h2>
    <a href="analytics.html">Go to analytics</a>`
    saveResult(percent);
}

function saveResult(percent){
    const data = JSON.parse(localStorage.getItem("tests")) || [];
    data.push({
        topic: topic.title,
        score,
        total: topic.questions.length,
        percent,
        date: new Date().toISOString().split("T")[0]
    });
    localStorage.setItem("tests", JSON.stringify(data));
}
showQuestion();
