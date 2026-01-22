const tests = JSON.parse(localStorage.getItem("tests")) || [];
const totalTestsEl = document.getElementById("totalTests");
const avgScoreEl = document.getElementById("avgScore");
totalTestsEl.textContent = `Tests taken: ${tests.length}`;
const avg = tests.reduce((sum, t) => sum + t.percent, 0) / (tests.length || 1);
avgScoreEl.textContent = `Average score: ${Math.round(avg)}%`;
const tbody = document.querySelector("#resultsTable tbody");
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
    if (topicMap[t.topic]){
        topicMap[t.topic]=[];
    }
    topicMap[t.topic].push(t.percent);
});
const topicLabels = Object.keys(topicMap);
const topicValues = topicLabels.map(
    k => topicMap[k].reduce((a,b)=>a+b, 0) / topicMap[k].length
);
newChart(document.getElementById("topicChart"), {
    type: "bar",
})

const dates = tests.map(t => t.date);
const scores = tests.map(t=> t.percent);
new CharacterData(document.getElementById("progressChart"), {
    type: "line",
})