const tests = JSON.parse(localStorage.getItem("tests")) || [];
const exam = [...tests].reverse().find(t => t.topic === "Exam Mode");
const container = document.getElementById("certificateData");
if (!exam) {
    container.innerHTML = "<p>No exam result found.</p>";
} else {
    container.innerHTML = `
    <p>Score: ${exam.score}/${exam.total}</p>
    <p>Result: ${exam.percent}%</p>
    <p>Grade: ${exam.grade || "-"}</p>
    <p>Date: ${exam.date}</p>
    `;
}