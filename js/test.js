const params = new URLSearchParams(window.location.search);
const topicId = params.get("topic");
const topic = topicsData.find(t=> t.id === topicId);
const titleEl = document.getElementById("topicTitle");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultEl = document.getElementById("result");
const nextBtn = document.getElementById("nextBtn");
const modal = document.getElementById("imageModal");
const modalimg = document.getElementById("modalImg");
const closeModal = document.getElementById("closeModal");
const prevBtn = document.getElementById("prevImg");
const nextBtnImg = document.getElementById("nextImg");
const imageList = topic.questions.flatMap(q=>{
    if (q.images) return q.images;
    if (q.imageOptions) return q.imageOptions;
    if (q.image) return [q.image];
    return[];
});
let currentImgIndex = 0;

let current = 0;
let score = 0;
titleEl.textContent = topic.title;
if (!topic) {
    questionEl.innerHTML = "Topic not found";
    throw new Error("Topic not found");
}

function showQuestion(){
    const q = topic.questions[current];
    let html = `<p>${q.q}</p>`;
    if (q.image) {
        html += `<img src="${q.image}" class="question.image">`;
    }
    if (q.images) {
        html += `<div class="image-row">`;
        q.images.forEach((img,i)=>{
            html += `<img src=${img} class="question-image">`; 
        });
        html += `</div>`;
    }
    questionEl.innerHTML = html;
    optionsEl.innerHTML="";
    if (q.imageOptions) {
        const container = document.createElement("div");
        container.className = "image-options";
        q.imageOptions.forEach((img,i) => {
            const imgEl = document.createElement("img");
            imgEl.src = img;
            imgEl.className = "answer-image";
            imgEl.onclick = () => selectAnswer(i);
            container.appendChild(imgEl);
        });
        optionsEl.appendChild(container)
    }
    else{
        q.options.forEach((opt,i) => {
            const btn = document.createElement("button");
            btn.textContent = opt;
            btn.onclick = () => selectAnswer(i);
            optionsEl.appendChild(btn);
        });
    }
}

function selectAnswer(index){
    const q = topic.questions[current];
    if (!q.selected) q.selected = [];
    if (q.selected.includes(index)) {
        q.selected = q.selected.filter(i => i !== index);
    } else {
        q.selected.push(index);
    }
    const correct = q.answer;
    
    // resultEl.innerHTML = `
    //     <p class="explanation">
    //         ${q.explanation ||"Think again and review the topic"}
    //     </p>
    // `;
    // nextBtn.style.display = "block";
    const buttons = optionsEl.querySelectorAll("button");
    buttons.forEach((btn,i) => {
        btn.classList.toggle("selected", q.selected.includes(i));
    });
}

let isAnswered = false;

nextBtn.onclick = () => {
    const q=topic.questions[current];

    if (!isAnswered) {
        let correct = false;
        if (q.answers) {
            const selected = q.selected || [];
            correct = 
                selected.length === q.answers.length &&
                selected.every(i=> q.answers.includes(i));
        }
        else {
            correct = (q.selected && q.selected[0] === q.answer);
        }
        if (correct) score++;

        const buttons = optionsEl.querySelectorAll("button");
        // buttons.forEach(btn => btn.disabled = true);
        buttons.forEach((btn,i) =>{
            if(q.answers && q.answers.includes(i) || i === q.answer){
                btn.classList.add("correct");
            } else if(q.selected && q.selected.includes(i)){
                btn.classList.add("wrong");
            }
            btn.disabled = true;
        });
        resultEl.innerHTML = `
            <p class="explanation">
                ${q.explanation || "Review this concept"}
            </p>
        `;
        isAnswered = true;
        
        nextBtn.textContent = "Next";
    }   
    else{
        current++;
        if (current < topic.questions.length) {
            resultEl.innerHTML = "";
            nextBtn.textContent = "Submit";
            isAnswered = false;
            showQuestion();
        } else{
            finishTest();
        }
    }
};

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
});
closeModal.addEventListener("click", function(e){
    e.stopPropagation();
    modal.classList.remove("active");
});
modal.addEventListener("click", function(e){
    if (e.target === modal){
        modal.classList.remove("active");
    }
});
prevBtn.addEventListener("click", function(e){
    e.stopPropagation(); 
    showPrev(); 
});
nextBtnImg.addEventListener("click", function(e){
    e.stopPropagation(); 
    showNext(); 
});


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


document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;
    if (e.key === "Escape") modal.classList.remove("active");
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
})