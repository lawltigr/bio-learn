const tests = JSON.parse(localStorage.getItem("tests")) || [];
const achievements = JSON.parse(localStorage.getItem("achievements")) || [];
const totalTests = tests.length;
const avgScore = totalTests
    ? Math.round(tests.reduce((sum,t) => sum + t.percent, 0) / totalTests) : 0;
const bestScore = totalTests
    ? Math.max(...tests.map(t=> t.percent)) : 0;
let rank = "Beginner";
if (avgScore >= 60) rank = "Student";
if (avgScore >= 75) rank = "Advanced";
if (avgScore >= 90) rank = "Expert";

document.getElementById("totalTests").textContent = `Tests: ${totalTests}`;
document.getElementById("avgScore").textContent = `Average: ${avgScore}%`;
document.getElementById("bestScore").textContent = `Best: ${bestScore}%`;
document.getElementById("achievementsCount").textContent = `Achievements: ${achievements.length}`;
document.getElementById("rank").textContent = `Rank: ${rank}`;

function renderExamProgressChart(){
    const canvas = document.getElementById("examProgressChart");
    if (!canvas) return;
    const student = JSON.parse(localStorage.getItem("student"));
    if (!student) return;
    const allTests = JSON.parse(localStorage.getItem("tests")) || [];
    const exams = allTests.filter( test => 
        test.studentId===student.id && 
        test.topic === "Exam Mode").sort((a,b) => new Date(a.date) - new Date(b.date));
    if (exams.length === 0){
        canvas.parentElement.textContent = "No exam results yet";
        return;
    }
    if (typeof Chart === "undefined"){
        console.error("Chart.js is not loaded");
        return;
    }
    new Chart(canvas, {
        type: "line",
        data: {
            labels: exams.map((exam, index) => `Attempt ${index + 1}`),
            datasets: [{
                label: "Exam Pesult (%)",
                data: exams.map(exam => Number(exam.percent)),
                borderColor: "#1769e0",
                backgroundColor: "rgba(23, 105, 224, 0.1)",
                borderWidth: 3,
                tension: 0.3,
                fill: true,
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    min:0,
                    max:100,
                    ticks:{
                        callback: value => `${value}%`
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: context => `Result: ${context.passed.y}%`
                    }
                }
            }
        }
    })
}

function renderDashboardStatistics(){
    const student = JSON.parse(localStorage.getItem("student"));
    if (!student){
        window.location.replace("index.html");
        return;
    }
    const allTests=JSON.parse(localStorage.getItem("tests")) || [];
    const allCertificates = JSON.parse(localStorage.getItem("certificates")) || [];
    const exams = allTests.filter(test => test.studentId === student.id && test.topic === "Exam Mode");
    const certificates = allCertificates.filter(c => c.studentId === student.id);
    const total = exams.length;
    const passed = exams.filter(exam=> exam.passed === true || (exam.passed == null && Number(exam.percent) >= 60)).length;
    const passRate = total > 0 ? Math.round((passed / total) * 100) : 0;
    const average = total > 0 ? Math.round(exams.reduce((sum, exam) => sum + Number(exam.percent || 0), 0) / total) : 0;

    document.getElementById("totalExams").textContent = total;
    document.getElementById("passRate").textContent = `${passRate}%`;
    document.getElementById("dashboardAverage").textContent = `${average}%`;
    document.getElementById("dashboardCertificates").textContent = certificates.length;
}
renderDashboardStatistics();
renderExamProgressChart();