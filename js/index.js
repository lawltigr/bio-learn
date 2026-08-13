const student = JSON.parse(localStorage.getItem("student"));
if (student){
    window.location.href="bio-learn.html"
}
const studentBtn = document.getElementById("studentBtn");
const adminBtn = document.getElementById("adminBtn");
const studentModal = document.getElementById("studentModal");
const adminModal = document.getElementById("adminModal");

studentBtn.addEventListener("click", () => {
    studentModal.classList.remove("hidden");
});

adminBtn.addEventListener("click", () => {
    adminModal.classList.remove("hidden");
});

document.getElementById("startLearning").addEventListener("click", saveStudent);

function saveStudent(){
    const first = document.getElementById("firstName").value.trim();
    const last = document.getElementById("lastName").value.trim();
    const group = document.getElementById("group").value.trim();
    if(!first || !last){
        alert("Please enter your name.")
        return;
    }
    const student = {
        id: crypto.randomUUID(),
        firstName: first,
        lastName: last,
        group: group,
        createdAt: new Date().toISOString()
    };
    console.log(student);
    localStorage.setItem("student", JSON.stringify(student));
    console.log(localStorage.getItem("student"));
    window.location.href = "bio-learn.html";
}

document.getElementById("adminLogin").addEventListener("click", ()=> {
    const password = document.getElementById("adminPassword").value;
    if (password==="admin123"){
        window.location.href="admin.html";
    }else{
        alert("Wrong password.");
    }
})