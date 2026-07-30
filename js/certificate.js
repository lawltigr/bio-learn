// const tests = JSON.parse(localStorage.getItem("tests")) || [];
// const exam = [...tests].reverse().find(t => t.topic === "Exam Mode");
// const container = document.getElementById("certificateData");
// if (!exam) {
//     container.innerHTML = "<p>No exam result found.</p>";
// } else {
//     container.innerHTML = `
//     <p>Score: ${exam.score}/${exam.total}</p>
//     <p>Result: ${exam.percent}%</p>
//     <p>Grade: ${exam.grade || "-"}</p>
//     <p>Date: ${exam.date}</p>
//     `;
// }

const certificate = certificates.find(c=> c.id === id);
document.getElementById("studentName").textContent = certificate.student;
document.getElementById("score").textContent = `${certificate.score} / ${certificate.total}`;
document.getElementById("percent").textContent = `${certificate.percent}%`;
document.getElementById("grade").textContent = certificate.grade;

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const certificates = JSON.parse(localStorage.getItem("certificates")) || [];
// const certificate = certificates.find(c=> c.id === id);
const container = document.getElementById("certificateData");
if (!certificate){
    container.innerHTML=`
    <h2>Certificate not found.</h2>`
} else{
    container.innerHTML = `
    <h2>${certificate.student}</h2>
    <p> has successfully completed</p>
    <h3>${certificate.exam}</h3>
    <hr>
    <p><strong>Certificate #</strong></p>
    <p>${certificate.score} / ${certificate.total}</p>
    <p><strong>Percentage</strong></p>
    <p>${certificate.percent}%</p>
    <p><strong>Grade</strong></p>
    <p>${certificate.grade}</p>
    <p><strong>Date</strong></p>
    <p>${certificate.date}</p>`
}
document.getElementById("downloadBtn").addEventListener("click", downloadCertificate);
async function downloadCertificate(){
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4"
    });
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(28);
    pdf.text("Certificate of Completion", 148, 35, {align:"center"});
    pdf.setFontSize(18);
    pdf.setFont("helvetica", "normal");
    pdf.text("This certificate is proudly presented to", 148, 60, {align:"center"});

    pdf.setFontSize(24);
    pdf.setFont("helvetica", "bold");
    pdf.text(certificate.student, 148, 78, {align:"center"});
    pdf.setFontSize(16);
    pdf.setFont("helvetica", "normal");
    pdf.text("for successfully completing", 148, 95, {align:"center"});
    pdf.setFontSize(20);
    pdf.setFont("helvetica", "bold");
    pdf.text(certificate.exam, 148, 110, {align:"center"});
    pdf.setFontSize(15);
    pdf.setFont("helvetica", "normal");

    pdf.text(
        `Score: ${certificate.score}/${certificate.total}`,
        40,
        145
    );
    pdf.text(
        `Result: ${certificate.percent}`,
        40,
        155
    );
    pdf.text(
        `Grade: ${certificate.grade}`,
        40,
        165
    );
    pdf.text(
        `Certificate # ${certificate.number}`,
        170,
        145
    );
    pdf.text(
        `Issued: ${certificate.date}`,
        170,
        155
    );
    pdf.save(`${certificate.number}.pdf`);
}