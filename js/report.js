const tests = JSON.parse(localStorage.getItem("tests")) ||[];
const datainfo = document.getElementById("datainfo");
datainfo.textContent = `The dataset contains ${tests.length} test attempts collected automatically during the learning process. Each record includes a topic name, score percentage, and date of completion.`;
const topicMap = {};
tests.forEach(t => {
    if (!topic) return;
    if (!topicMap[t.topic]) topicMap[t.topic] = [];
    topicMap[t.topic].push(t.percent);
});
const topicLabels = Object.keys(topicMap);
const topicValues = topicLabels.map(
    t => topicMap[t].reduce((a, b) => a + b, 0) / topicMap[t].length
);
//draw a graph