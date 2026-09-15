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
    certificateList.style.display = "none";
    emptyState.classList.remove("hidden");
} else{
    emptyState.classList.add("hidden");
    renderCertificates();
}

function renderCertificates(){
    
}