
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const student = JSON.parse(localStorage.getItem("student"));

const certificates =
    JSON.parse(localStorage.getItem("certificates")) || [];

const certificate = certificates.find(c => c.id === id);


// ==========================================
// INITIALIZATION
// ==========================================

if (!id) {

    window.location.replace("certificates.html");

} else if (!student) {

    window.location.replace("index.html");

} else if (!certificate) {

    showError("Certificate not found.");

} else if (certificate.studentId !== student.id) {

    showError("You do not have access to this certificate.");

} else {

    renderCertificate(certificate);

}


// ==========================================
// RENDER CERTIFICATE
// ==========================================

function renderCertificate(certificate) {

    document.getElementById("examName").textContent =
        certificate.exam;

    document.getElementById("certificateNumber").textContent =
        certificate.number;

    document.getElementById("certificateDate").textContent =
        certificate.date;

    document.getElementById("studentName").textContent =
        certificate.student;

    document.getElementById("score").textContent =
        `${certificate.score} / ${certificate.total}`;

    document.getElementById("percent").textContent =
        `${certificate.percent}%`;

    document.getElementById("grade").textContent =
        certificate.grade;


    const qrContainer = document.getElementById("certificateQR");

    const downloadBtn = document.getElementById("downloadBtn");

    if (downloadBtn) {

        downloadBtn.addEventListener("click", () => {
            downloadCertificate(certificate);
        });

    }

    if (qrContainer && window.QRCode){
        qrContainer.innerHTML = "";
        const certificateUrl = new URL(
            `certificate.html?id=${encodeURIComponent(certificate.id)}`,
            window.location.href
        ).href;

        new QRCode(qrContainer, {
            text: certificateUrl,
            width: 100,
            height: 100,
            colorDark: "#1d3557",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });
    }
}


// ==========================================
// ERROR
// ==========================================

function showError(message) {

    document.body.replaceChildren();

    const container = document.createElement("div");

    container.style.cssText = `
        max-width: 500px;
        margin: 100px auto;
        text-align: center;
        font-family: Arial, sans-serif;
    `;

    const title = document.createElement("h2");
    title.textContent = message;

    const link = document.createElement("a");
    link.href = "certificates.html";
    link.textContent = "My Certificates";

    container.append(title, link);

    document.body.appendChild(container);
}


// ==========================================
// DOWNLOAD PDF
// ==========================================

async function downloadCertificate(certificate) {

    const certificateElement =
        document.querySelector(".certificate");

    if (!certificateElement) {
        alert("Certificate element not found.");
        return;
    }

    if (!window.html2canvas || !window.jspdf) {
        alert("PDF libraries are not loaded.");
        return;
    }

    const downloadBtn = document.getElementById("downloadBtn");

    if (downloadBtn) {
        downloadBtn.disabled = true;
        downloadBtn.textContent = "Generating PDF...";
    }

    try {

        await document.fonts.ready;

        const canvas = await html2canvas(certificateElement, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff"
        });

        const imageData = canvas.toDataURL("image/png");

        const { jsPDF } = window.jspdf;

        const pdf = new jsPDF({
            orientation: "landscape",
            unit: "mm",
            format: "a4"
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const margin = 8;

        const maxWidth = pageWidth - margin * 2;
        const maxHeight = pageHeight - margin * 2;

        const ratio = Math.min(
            maxWidth / canvas.width,
            maxHeight / canvas.height
        );

        const imageWidth = canvas.width * ratio;
        const imageHeight = canvas.height * ratio;

        const x = (pageWidth - imageWidth) / 2;
        const y = (pageHeight - imageHeight) / 2;

        pdf.addImage(
            imageData,
            "PNG",
            x,
            y,
            imageWidth,
            imageHeight
        );

        pdf.save(`${certificate.number}.pdf`);

    } catch (error) {

        console.error("PDF generation failed:", error);
        alert("Failed to generate PDF.");

    } finally {

        if (downloadBtn) {
            downloadBtn.disabled = false;
            downloadBtn.textContent = "Download PDF";
        }

    }
}
