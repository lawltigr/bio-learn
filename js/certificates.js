const student = JSON.parse(localStorage.getItem("student"));
if (!student) {
    window.location.href = "index.html";
}
const headerStudentName = document.getElementById("headerStudentName");
const headerStudentGroup = document.getElementById("headerStudentGroup");
const headerAvatar = document.getElementById("headerAvatar");

headerStudentName.textContent = `${student.firstName} ${student.lastName}`;
headerStudentGroup.textContent = student.group || "Student";
headerAvatar.textContent = student.firstName.charAt(0).toUpperCase();

const allCertificates = JSON.parse(localStorage.getItem("certificates")) || [];
const certificates = allCertificates.filter(certificate => certificate.studentId === student.id);

const certificateList = document.getElementById("certificateList");
const emptyState = document.getElementById("emptyState");
const certificateCount = document.getElementById("certificateCount");
certificateCount.textContent = certificates.length;
if (certificates.length === 0) {
    certificateList.innerHTML = "";
    certificateList.style.display = "none";
    emptyState.style.display = "block";
} else{
    certificateList.style.display = "grid";
    emptyState.style.display = "none";
    renderCertificates();
}

function renderCertificates(){
    certificateList.innerHTML = "";
    const sortedCertificates = [...certificates].reverse();
    sortedCertificates.forEach(certificate => {
        const card = document.createElement("article");
        card.className = "certificate-card";
        card.innerHTML = `
            <div class="certified-badge">
                CERTIFIED
            </div>
            <span class="certificate-date">
                ${certificate.date}
            </span>
            <h2>
                ${certificate.exam}
            </h2>
            <p class="student-name">
                ${certificate.student}
            </p>
            <div class="certificate-stats">
                <div class="certificate-stat">
                    <small>Grade</small>
                    <strong>${certificate.grade}</strong>
                </div>
                <div class="certificate-stat">
                    <small>Result</small>
                    <strong>${certificate.percent}%</strong>
                </div>
                <div class="certificate-stat">
                    <small>Score</small>
                    <strong>${certificate.score}/${certificate.total}</strong>
                </div>
            </div>

            <div class="certificate-card-footer">
                <div class="certificate-number">
                    <small>Certificate number</small>
                    <span>${certificate.number}</span>
                </div>
                <a href="certificate.html?id=${certificate.id}" class="view-btn">
                View Certificate
                </a>
        `;
        certificateList.appendChild(card);
    })
}