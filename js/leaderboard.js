const data = JSON.parse(localStorage.getItem("tests")) || [];
data.sort((a,b)=> b.precent - a.percent);
const container = document.getElementById("leaderboard");
container.innerHTML = `
    <table class="leaderboard-table"> 
        <tr>
            <th>#</th>
            <th>Topic</th>
            <th>Result</th>
            <th>Date</th>
        </tr>
        ${
            data.map((item,index)=>`
            <tr>
                <td>${index+1}</td>
                <td>${item.topic}</td>
                <td>${item.percent}</td>
                <td>${item.date}</td>
            </tr>
            `).join("")
        }
    </table>
`;