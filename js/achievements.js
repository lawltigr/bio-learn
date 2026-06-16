const achievements = JSON.parse(localStorage.getItem("achievements")) || [];
const container = document.getElementById("achievements");
if (achievements.length === 0){
    container.innerHTML = "<p>No achievements yet.</p>";
}
else{
    container.innerHTML = achievements.map(a=> `<div class="achievement">${a}</div>`).join("");
}
