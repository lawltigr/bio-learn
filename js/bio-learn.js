const topicsContainer = document.getElementById("topics");
const searchInput = document.getElementById("search");
function renderTopics(list){
    topicsContainer.innerHTML = "";
    list.forEach(t => {
        const card = document.createElement("div");
        card.className = "topic-card";
        card.innerHTML = `
            <h3>${t.title}</h3>
            <p>${t.description}</p>
            <a href="test.html?topic=${t.id}">take the test</a>
        `;
        topicsContainer.appendChild(card);
    })
}

searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    const filtered = topics.Data.filter(t => t.title.toLowerCase().includes(value));
    renderTopics(filtered);
});
renderTopics(topicsData);