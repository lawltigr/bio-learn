const student = JSON.parse(localStorage.getItem("student"));

if (!student){
    window.location.replace("index.html");
} else{
    initializeHistory(student);
}

function initializeHistory(student){
    document.getElementById("headerStudentName").textContent = 
    `${student.firstName} ${student.lastName}`;
    document.getElementById("headerStudentGroup").textContent = 
    student.group || "Student";
    document.getElementById("headerAvatar").textContent = 
    student.firstName.charAt(0).toUpperCase();

    const allTests = JSON.parse(localStorage.getItem("tests")) ||[];
    const exams = allTests.filter(test => test.studentId === student.id && test.topic === "Exam Mode");
    const passed = exams.filter(exam => exam.passed === true || (exam.passed == null && Number(exam.percent) >= 60));
    const failed = exams.filter(exam => !passed.includes(exam));
    const average = exams.length ? Math.round(exams.reduce((sum, exam) => sum + Number(exam.percent || 0), 0) / exams.length) : 0;

    document.getElementById("totalAttempts").textContent = exams.length;
    document.getElementById("passedCount").textContent = passed.length;
    document.getElementById("failedCount").textContent = failed.length;
    document.getElementById("averageScore").textContent = `${average}%`;

    const statusFilter = document.getElementById("statusFilter");
    statusFilter.addEventListener("change", () => {
        renderHistory(exams, statusFilter.value);
    });
    renderHistory(exams, "all")
}

function renderHistory(exams, filter) {
    const historyBody = document.getElementById("historyBody");
    const emptyHistory = document.getElementById("emptyHistory");
    historyBody.innerHTML = "";

    const filtered = exams.filter(exam => {
        const passed = exam.passed === true || (exam.passed == null && Number(exam.percent) >= 60);
        if(filter === "passed") return passed;
        if (filter === "failed") return !passed;
        return true;
    });

    const sorted = [...filtered].reverse();
    emptyHistory.hidden = sorted.length > 0;
    sorted.forEach(exam => {
        const passed = exam.passed === true || (exam.passed == null && Number(exam.percent) >= 60);
        const row = document.createElement("tr");
        const values = [
            exam.topic, 
            exam.date ? new Date(exam.date).toLocaleDateString("en-GB") : "-",
            `${exam.score}/${exam.total}`,
            `${exam.percent}%`,
            exam.grade || "-"
        ];
        values.forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });
        const statusCell = document.createElement("td");
        const badge = document.createElement("span");
        badge.className = passed
            ?"status-badge passed" :"status-badge failed";
        badge.textContent = passed 
            ?"Passed" :"Failed";
        statusCell.appendChild(badge);
        row.appendChild(statusCell);
        historyBody.appendChild(row);
    })
}