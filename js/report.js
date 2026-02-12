const tests = JSON.parse(localStorage.getItem("tests")) ||[];
const datainfo = document.getElementById("datainfo");
datainfo.textContent = `The dataset contains ${tests.length} test attempts collected automatically during the learning process. Each record includes a topic name, score percentage, and date of completion.`;
const topicMap = {};
tests.forEach(t => {
    if (!t.topic) return;
    if (!topicMap[t.topic]) topicMap[t.topic] = [];
    topicMap[t.topic].push(t.percent);
});
const topicLabels = Object.keys(topicMap);
const topicValues = topicLabels.map(
    t => topicMap[t].reduce((a, b) => a + b, 0) / topicMap[t].length
);
//draw a graph

new Chart(document.getElementById("topicChart"), {
    type: "bar",
    data: {
        labels: topicLabels,
        datasets: [{
            label: "Average score (%)",
            data: topicValues
        }]
    }
});

const dates = tests.map(t=> t.date);
const scores = tests.map(t=> t.percent);

new Chart(document.getElementById("progressChart"), {
    type: "line",
    data: {
        labels: dates,
        datasets: [{
            label: "Score (%)",
            data: scores,
            tension: 0.3
        }]
    }
});

const WEAK_THRESHOLD = 70;
const weakTopicsEl = document.getElementById("weakTopics");

const lastAttempts = {};
tests.forEach(t=> {
    lastAttempts[t.topic] = t.percent;
});

let weakCount = 0;
Object.entries(lastAttempts).forEach(([topic, percent]) => {
    if (percent < WEAK_THRESHOLD){
        weakCount++;
        const li = document.createElement("li");
        li.textContent = `${topic} (last attempt: ${percent}%)`;
        weakTopicsEl.appendChild(li);
    }
});

if (weakCount === 0) {
    weakTopicsEl.innerHTML = "<li>No weak topics were identified.</li>";
}
const conclusionEl = document.getElementById("conclusions");

conclusionEl.textContent = 
    weakCount === 0
        ? "The analysis shows a stable level of knowledge across all topics. No critical learning gaps were detected."
        : `The analysis identified ${weakCount} topic(s) requiring additional attention. Personalized recommendations were generated based on the learner's most recent performance.`;

const downloadBtn = document.getElementById("downloadPDF");
downloadBtn.addEventListener("click", () =>{
    window.print();
});

const comparisonBody = document.querySelector("#comparisonTable tbody");
const topicAttempts = {};
tests.forEach(t=> {
    if (!topicattempts[t.topic]) {
        topicAttempts[t.topic] = [];
    }
    topicAttempts[t.topis].push(t.percent);
});

Object.entries(topicAttempts).forEach(([topic, scores]) =>{
    if(scores.length < 2) return;
    const before = scores[0];
    const after = scores[scores.length - 1];
    const improvement = after-before;
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${topic}</td>
        <td>${before}</td>
        <td>${after}</td>
        <td styl="color:${improvement>= 0 ? 'green' : 'red'}>
            ${improvement>= 0 ? '+' : ''}${improvement}%
        </td>
    `;
    comparisonBody.appendChild(tr);
});

