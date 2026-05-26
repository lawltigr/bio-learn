let editingQuestion = null;
let topicsData= [];

function renderTopics(){
    const container = document.getElementById("topics");
    if (!container){
        return;
    }
    container.innerHTML = "";;
    topicsData.forEach(topic => {
        const div = document.createElement("div");
        div.className = "topic-card";
        div.innerHTML = `
            <h3>${topic.title}</h3>
            <p>${topic.description || ""}</p>
            <a href="test.html?topic=${topic.id}">Start Test</a>
        `;
        container.appendChild(div);
    });
}

async function loadData(callback){
    const saved = localStorage.getItem("topicsData");
    if (saved){
        topicsData = JSON.parse(saved);
    } else {
        const res = await fetch("data/questions.json");
        topicsData = await res.json();
    }
    if(callback){
        callback();
    }
}

function saveData(){
    localStorage.setItem("topicsData", JSON.stringify(topicsData));
}

function loadTopicsToSelect(){
    const select = document.getElementById("topicSelect");
    topicsData.forEach((t, i) => {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = t.title;
        select.appendChild(option);
    });
}
async function addQuestion(){
    const q = document.getElementById("qText").value;
    const fileInput = document.getElementById("imageFile");
    let image = null;
    let imageOptions = [];
    const img1= document.getElementById("imgOpt1").files[0];
    const img2= document.getElementById("imgOpt2").files[0];
    const img3= document.getElementById("imgOpt3").files[0];
    const explanation = document.getElementById("explanation").value;
    if (img1){
        console.log(imageOptions)
        imageOptions.push(await readImage(img1));
    }
    if (img2){
        imageOptions.push(await readImage(img2));
    }
    if (img3){
        imageOptions.push(await readImage(img3));
    }

    if (fileInput.files.length > 0){
        image = await readImage(fileInput.files[0]);
    }
    const options = [
        document.getElementById("opt1").value,
        document.getElementById("opt2").value,
        document.getElementById("opt3").value,
    ];
    const answer = parseInt(document.getElementById("correct").value);
    const topicIndex = parseInt(document.getElementById("topicSelect").value);
    
    const questionData = {
        q, 
        options,
        answer,
        image,
        imageOptions,
        explanation
    };
    if (editingQuestion){
        topicsData[
            editingQuestion.topicIndex
        ].questions[
            editingQuestion.questionIndex
        ] = questionData;
        editingQuestion = null;
        document.getElementById("saveBtn")
        .textContent = "Add question";
    }
    else{
        topicsData[topicIndex]
        .questions
        .push(questionData);
    }
    saveData();
    renderQuestionList();
    alert("Question added!");
    document.getElementById("qText").value = "";
    document.getElementById("opt1").value = "";
    document.getElementById("opt2").value = "";
    document.getElementById("opt3").value = "";
    document.getElementById("correct").value = "";
    document.getElementById("explanation").value = "";
    document.getElementById("imageFile").value = "";
    document.getElementById("imgOpt1").value = "";
    document.getElementById("imgOpt2").value = "";
    document.getElementById("imgOpt3").value = "";
    const preview = document.getElementById("imagePreview");
    preview.src = "";
    preview.style.display = "none";
}

function readImage(file){
    return new Promise((resolve) =>{
        const reader = new FileReader();
        reader.onload =() => resolve(reader.result);
        reader.readAsDataURL(file);
    });
}

const imagePreview = document.getElementById("imagePreview");
const imageInput = document.getElementById("imageFile");
if (imageInput){
    imageInput.addEventListener("change", function(){
        const file = this.files[0];
        if (!file){
            imagePreview.style.display = "none";
            return;
        }
        const reader = new FileReader();
        reader.onload = function(e){
            imagePreview.src = e.target.result;
            imagePreview.style.display = "block";
        };
        reader.readAsDataURL(file);
    })
}

async function editQuestion(topicIndex, questionIndex){
    const q= topicsData[topicIndex] .questions[questionIndex];
    document.getElementById("qText").value = q.q || "";
    document.getElementById("opt1").value = q.options?.[0] || "";
    document.getElementById("opt2").value = q.options?.[1] || "";
    document.getElementById("opt3").value = q.options?.[2] || "";
    document.getElementById("correct").value = q.answer?? "";
    document.getElementById("explanation").value = q.explanation || "";
    document.getElementById("topicSelect").value = topicIndex;
    const preview = document.getElementById("imagePreview");
    if (q.image){
        preview.src = q.image;
        preview.style.display = "block";
    } else{
        preview.style.display = "none";
        // start heree
    }
    editingQuestion = {
        topicIndex,
        questionIndex
    };
    document.getElementById("saveBtn")
    .textContent = "Save changes";
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
function deleteQuestion(topicIndex, questionIndex){
    const confirmDelete= confirm("Delete this question?");
    if (!confirmDelete) return;
    topicsData[topicIndex]
    .questions
    .splice(questionIndex,1);
    saveData();
    renderQuestionList();
}
function renderQuestionList(){
    const container = document.getElementById("questionList");
    if (!container) return; 
    container.innerHTML = "";
    topicsData.forEach((topic, topicIndex) =>{
        topic.questions.forEach((q, questionIndex) => {
            const div = document.createElement("div");
            div.className = "question-card";
            div.innerHTML = `
            <h4>${q.q}</h4>
            <p>
                Topic:
                ${topic.title}
            </p>
            <p>
                Type:
                ${
                    q.imageOptions && q.imageOptions.length > 0
                    ? "image answers"
                    : "Text answers"
                }
            </p>
            <div class="question-actions">
                <button class="edit-btn" onclick="editQuestion(${topicIndex}, ${questionIndex})">Edit</button>
                <button class="edit-btn" onclick="deleteQuestion(${topicIndex}, ${questionIndex})">Delete</button>
            </div>
            `
            container.appendChild(div);
        })
    })

}