const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const group = document.getElementById("group");
document.getElementById("startBtn").addEventListener("click", saveStudent);

function saveStudent(){
    if(
        firstName.value.trim()==="" || lastName.value.trim()===""
    ){
        alert("Enter your name.");
        return;
    }

    const student={
        id: crypto.randomUUID(),
        firstName:firstName.value.trim(),
        lastName:lastName.value.trim(),
        group:group.value.trim(),
        createdAt:new Date().toISOString()
    };
    localStorage.setItem("student", JSON.stringify(student));
    window.location.href="bio-learn.html"
}