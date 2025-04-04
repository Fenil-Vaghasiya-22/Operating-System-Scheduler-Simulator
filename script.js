function displayInputTable(){
    let size = document.getElementById('nprocesses').value;
    if(size<1 || size>10){
        alert("porcesses should be between 1 to 10");
        document.getElementById('nprocesses').value=null;
        return -1;
    }
    var table = "<table class='input'><tr><th>Processes</th><th>Arrival Time</th><th>Burst Time</th><th>Priority</th></tr>";
    for(let i=0;i<size;i++){
        table += "<tr>";
        table += "<td>"+"P"+(i+1)+"</td>";
        table += "<td><input type='number' id='arrival_"+(i+1)+"'></td>";
        table += "<td><input type='number' id='burst_"+(i+1)+"'></td>";
        table += "<td><input type='number' id='priority_"+(i+1)+"'></td>";
        table += "</tr><br>";
    }
    table += "</table><br><br>";
    var saveData = "<button>Save Data</button>";
    document.getElementById('inputTable').innerHTML=table;
    document.getElementById('save').innerHTML=saveData;
}

// function saveData(){
//     let size = document.getElementById('nprocesses').value;
//     let processes = []; 

//     for (let i = 0; i < size; i++) {
//         let process = {};
//         process.processId = "P" + (i + 1);
//         process.arrivalTime = parseInt(document.getElementById('arrival_'+ (i+1)).value);
//         process.burstTime = parseInt(document.getElementById('burst_' + (i+1)).value);
//         process.priority = parseInt(document.getElementById('priority_' + (i+1)).value);
//         processes.push(process);
//     }
//     var options = "<p>Select One of the following Algorithm</p><br>"
//     options += "<button onclick='FCFS("+JSON.stringify(processes)+")'>FCFS</button>" + " " +
//     "<button onclick='RR("+JSON.stringify(processes)+")'>Round Robin</button>" + " " +
//     "<button onclick='SJF("+JSON.stringify(processes)+")'>SJF</button>" + " " +
//     "<button onclick='SRTN("+JSON.stringify(processes)+")'>SRTN</button>" + " " +
//     "<button onclick='Priority("+JSON.stringify(processes)+")'>Priority</button>";
//     document.getElementById('options').innerHTML=options;
// }

function saveData() {
    let size = document.getElementById('nprocesses').value;
    let processes = [];

    for (let i = 0; i < size; i++) {
        let process = {
            processId: "P" + (i + 1),
            arrivalTime: parseInt(document.getElementById('arrival_' + (i + 1)).value),
            burstTime: parseInt(document.getElementById('burst_' + (i + 1)).value),
            priority: parseInt(document.getElementById('priority_' + (i + 1)).value)
        };
        processes.push(process);
    }

    // Save to MongoDB via backend
    fetch("https://backend-hzzu.onrender.com/api/save", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(processes)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        alert("Data saved to MongoDB!");
    })
    .catch(err => {
        console.error(err);
        alert("Error saving data.");
    });

    // Same options code as before
    let options = "<p>Select One of the following Algorithm</p><br>" +
    "<button onclick='FCFS(" + JSON.stringify(processes) + ")'>FCFS</button> " +
    "<button onclick='RR(" + JSON.stringify(processes) + ")'>Round Robin</button> " +
    "<button onclick='SJF(" + JSON.stringify(processes) + ")'>SJF</button> " +
    "<button onclick='SRTN(" + JSON.stringify(processes) + ")'>SRTN</button> " +
    "<button onclick='Priority(" + JSON.stringify(processes) + ")'>Priority</button>";

    document.getElementById('options').innerHTML = options;
}
