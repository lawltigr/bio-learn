const student = JSON.parse(localStorage.getItem("student"));
const tests = JSON.parse(localStorage.getItem("tests")) || [];
const certificates = JSON.parse(localStorage.getItem("certificates")) || [];
const avatar = document.getElementById("avatar");
const studentName = document.getElementById("studentName");
const studentGroup = document.getElementById("studentGroup");
const examCount = document.getElementById("examCount");
const certificateCount = document.getElementById("certificateCount");
const averageScore = document.getElementById("averageScore");
const bestScore = document.getElementById("bestScore");
const editBtn = document.getElementById("editBtn");
const logoutBtn = document.getElementById("logoutBtn")

studentName.textContent = `${student.firstName} ${student.lastName}`;
studentGroup.textContent = student.group || "No group";
avatar.textContent = student.firstName[0].toUpperCase();
examCount.textContent = tests.length;
certificateCount.textContent = certificates.length;
const avg = tests.reduce((a,b) =>a+b.percent,0)/tests.length;
const best = Math.max(...tests.map(t=>t.percent));
if (tests.length > 0){
    const total = tests.reduce((sum, test) => sum + test.percent, 0);
    averageScore.textContent = Math.round(total / tests.length) + "%";
    bestScore.textContent = Math.max(...tests.map(t=> t.percent)) + "%";
}
else{
    averageScore.textContent = "0%";
    bestScore.textContent = "0%";
}

editBtn.addEventListener("click", () => {
    const first = prompt("First name", student.firstName);
    if (first === null) return;
    const last = prompt("Last name", student.lastName);
    if (last === null) return;
    const group = prompt("Group", student.group);
    student.firstName = first.trim();
    student.lastName = last.trim();
    student.group = group.trim();
    localStorage.setItem("student", JSON.stringify(student));
    location.reload();
})

logoutBtn.addEventListener("click", () => {
    if (!confirm("Logout?")) return;
    localStorage.removeItem("student");
    window.location.href = "index.html";
});