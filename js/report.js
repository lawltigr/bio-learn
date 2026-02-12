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

