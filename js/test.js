const params = new URLSearchParams(window.location.search);
const topicId = params.get("topic");
const topic = topicsData.find(t=> t.id === topicId);
const titleEl = document.getElementById("topicTitle");
const questionEl = document. getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");
const modal = document.getElementById("imageModal");
const modalimg = document.getElementById("modalImg");
const closeModal = document.getElementById("closeModal");
const prevBtn = document.getElementById("prevImg");
const nextBtnImg = document.getElementById("nextImg");
const imageList = topic.questions
.map(q => q.image)
.filter(Boolean);
let currentImgIndex = 0;

let current = 0;
let score = 0;
titleEl.textContent = topic.title;

function showQuestion(){
    const q = topic.questions[current];
    optionsEl.innerHTML = `
        <p>${q.q}</p>
        ${q.image ? `<img src="${q.image}" class="question-image">` : ""}
    `;
    optionsEl.innerHTML = "";

    q.options.forEach((opt,i) => {
        const btn = document.createElement("button");
        btn.textContent = opt;
        btn.onclick = () => selectAnswer(i);
        optionsEl.appendChild(btn);
    });
}

function selectAnswer(index){
    const correct = topic.questions[current].answer;
    if (index === correct) score++;
    current++;
    if (current< topic.questions.length) {
        showQuestion();
    } else{
        finishTest();
    }
}

function finishTest(){
    questionEl.textContent = "";
    optionsEl.innerHTML = "";
    nextBtn.style.display = "none";
    const percent = Math.round((score / topic.questions.length) * 100);
    resultEl.innerHTML = `
    <h2>Result: ${percent}%</h2>
    <a href="analytics.html">Go to analytics</a>`
    saveResult(percent);
}

function saveResult(percent){
    const data = JSON.parse(localStorage.getItem("tests")) || [];
    data.push({
        topic: topic.title,
        score,
        total: topic.questions.length,
        percent,
        date: new Date().toISOString().split("T")[0]
    });
    localStorage.setItem("tests", JSON.stringify(data));
}
showQuestion();

document.addEventListener("click", function(e){
    if (e.target.classList.contains("question-image")){
        openModalBySrc(e.target.getAttribute("src"));
    }
    if (e.target === modal){
        modal.classList.remove("active");
    }
});
closeModal.onclick = function(){
    modal.classList.remove("active");
};

function openModalBySrc(src) {
    currentImgIndex = Math.max(0, imageList.indexOf(src));
    modalimg.src = imageList[currentImgIndex];
    modal.classList.add("active");
    updateNavButtons();
}
function updateNavButtons(){
    const many = imageList.length > 1;
    prevBtn.style.display = many ? "block" : "none";
    nextBtnImg.style.display = many ? "block" : "none";
}
function showPrev(){
    if (!imageList.length) return;
    currentImgIndex = (currentImgIndex - 1 + imageList.length) % imageList.length;
    modalimg.src = imageList[currentImgIndex];
}
function showNext(){
    if (!imageList.length) return;
    currentImgIndex = (currentImgIndex + 1) % imageList.length;
    modalimg.src = imageList[currentImgIndex];
}
prevBtn.onclick = (e) => { e.stopPropagation(); showPrev(); };
nextBtnImg.onclick = (e) => { e.stopPropagation(); showNext(); };

document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;
    if (e.key === "Escape") modal.classList.remove("active");
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
})