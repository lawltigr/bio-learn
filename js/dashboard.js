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