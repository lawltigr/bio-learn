const certificates = JSON.parse(localStorage.getItem("certificates")) || [];
const container = document.getElementById("certificates");
if(certificates.length === 0){
    container.innerHTML = "<p>No certificates yet</p>";
}
else{
    container.innerHTML = certificates.map(c=>`
    <div class="certificate-card">
        <h3>${c.number}</h3>
        <p><b>Exam:</b> ${c.exam}</p>
        <p><b>Result:</b> ${c.percent}</p>
        <p><b>Grade:</b> ${c.grade}</p>
        <p><b>Date:</b> ${c.date}</p>
        <a href="certificate.html?id=${c.id}">Open</a>
    </div>
    `).join("");
}