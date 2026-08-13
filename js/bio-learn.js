const searchInput = document.getElementById("search");
const student = JSON.parse(localStorage.getItem("student"));
if (!student){
    window.location.href = "index.html";
}
const studentInfo = document.getElementById("studentInfo");
if (studentInfo){
    studentInfo.textContent = `${student.firstName} ${student.lastName}`;
}

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn){
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("student");
        window.location.href = "index.html";
    });
}

function renderTopics(data=topicsData){
    const container = document.getElementById("topics");
    if (!container){
        return;
    }
    container.innerHTML = "";
    data.forEach(t => {
        const card = document.createElement("div");
        card.className = "topic-card";
        card.innerHTML = `
            <h3>${t.title}</h3>
            <p>${t.description}</p>
            <a href="test.html?topic=${t.id}">take the test</a>
        `;
        container.appendChild(card);
    })
}

searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    const filtered = topicsData.filter(t => t.title.toLowerCase().includes(value));
    renderTopics(filtered);
});