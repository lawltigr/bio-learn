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
    topicsData[topicIndex].questions.push({
        q, 
        options,
        answer,
        image,
        imageOptions,
        explanation
    });
    saveData();
    alert("Question added!");
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
}