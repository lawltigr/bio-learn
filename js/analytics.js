const tests = JSON.parse(localStorage.getItem("tests")) || [];
const totalTestsEl = document.getElementById("totalTests");
const avgScoreEl = document.getElementById("avgScore");
totalTestsEl.textContent = `Tests taken: ${tests.length}`;
const avg = tests.reduce((sum, t) => sum + t.percent, 0) / (tests.length || 1);
avgScoreEl.textContent = `Average score: ${Math.round(avg)}%`;
const tbody = document.querySelector("#resultsTable tbody");
const recommendationsEl = document.getElementById("recommendations");
const WEAK_THRESHOLD = 70;
let hasWeakTopics = false;

tests.forEach(t => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
    <td>${t.date}</td>
    <td>${t.topic}</td>
    <td>${t.percent}%</td>`;
    tbody.appendChild(tr);
})
const topicMap = {};
tests.forEach(t=> {
    if (!topicMap[t.topic]){
        topicMap[t.topic]=[];
    }
    if (!t.topic) return;
    topicMap[t.topic].push(t.percent);
});
const topicLabels = Object.keys(topicMap);
const topicValues = topicLabels.map(
    k => topicMap[k].reduce((a,b)=>a+b, 0) / topicMap[k].length
);
new Chart(document.getElementById("topicChart"), {
    type: "bar",
    data: {
        labels: topicLabels,
        datasets: [{
            label: "Score (%)",
            data: topicValues
        }]
    }
})

const dates = tests.map(t => t.date);
const scores = tests.map(t=> t.percent);
new Chart(document.getElementById("progressChart"), {
    type: "line",
    data: {
        labels: dates,
        datasets: [{
            label: "Progress (%)",
            data: scores,
            tension: 0.3
        }]
    }
})

let correct = 0;
let incorrect = 0;
tests.forEach(t => {
    correct += t.score;
    incorrect += t.total - t.score;
});
new Chart(document.getElementById("pieChart"), {
    type: "pie",
    data: {
        labels: ["Correct", "Incorrect"],
        datasets: [{
            data: [correct, incorrect]
        }]
    }
});