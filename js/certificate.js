const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const certificates = JSON.parse(localStorage.getItem("certificates")) || [];
const container = document.getElementById("certificateData");
const certificate = certificates.find(c=> c.id === id);
if (!certificate) {
    document.body.innerHTML = `<h2>Certificate not found.</h2>`;
    throw new error("Certificate not found");
}
document.getElementById("examName").textContent = certificate.exam;
document.getElementById("certificateNumber").textContent = certificate.number;
document.getElementById("certificateDate").textContent = certificate.date;
document.getElementById("studentName").textContent = certificate.student;
document.getElementById("score").textContent = `${certificate.score} / ${certificate.total}`;
document.getElementById("percent").textContent = `${certificate.percent}%`;
document.getElementById("grade").textContent = certificate.grade;
const downloadBtn = document.getElementById("downloadBtn");
if (downloadBtn) {
    downloadBtn.addEventListener("click", downloadCertificate);
}


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