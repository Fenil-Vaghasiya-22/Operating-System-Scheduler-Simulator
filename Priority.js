function Priority(processes){
    alert("Note: here lower number has higher priority")

    let NonPreamtive = true;

    for(let i=0;i<processes.length;i++){
        if(processes[i].arrivalTime!=0){
            NonPreamtive = false;
            break;
        }
    }

    let chart = "";
    let currentTime = 0;
    let finishTime = 0, turnAroundTime = 0, waitingTime = 0, totalTAT = 0, totalWT = 0;
    let resultTable = "<table class='output'><tr><th>Processes</th><th>FinishTime</th><th>TurnAroundTime</th><th>WaitingTime</th></tr><br>";

    if(NonPreamtive){
    processes.sort((a, b) => a.priority - b.priority);

    for(let i=0;i<processes.length;i++){
        finishTime = currentTime + processes[i].burstTime;
        turnAroundTime = finishTime - processes[i].arrivalTime;
        waitingTime = turnAroundTime - processes[i].burstTime;
        totalTAT += turnAroundTime;
        totalWT += waitingTime;
        currentTime = finishTime;
        chart += `<div class='chart'>${processes[i].processId}</div>`;
        resultTable += `<tr><td>${processes[i].processId}</td><td>${finishTime}</td><td>${turnAroundTime}</td><td>${waitingTime}</td></tr>`;
    }
    let avgWT = totalWT / processes.length;
    let avgTAT = totalTAT / processes.length;
    let analysis = `<span class='analysis'>Average TurnAroundTime :</span><span class='analysis'>${avgTAT}</span><div></div>`;
    analysis += `<span class='analysis'>Average WaitingTime :</span><span class='analysis'>${avgWT}</span>`;

    let clearButton = `<button onclick='clearData()'>Clear Data</button>`;
    document.getElementById('gainchart').innerHTML = chart;
    document.getElementById('clear').innerHTML = clearButton;
    document.getElementById('outputTable').innerHTML = resultTable;
    document.getElementById('analysis').innerHTML = analysis;

}else{
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    let completedd = 0;
    let index = -1;
    let highestPriority = 1;
    let tempPriority = 100;
    let executionTime = 1000;

    for (let i = 0; i < processes.length; i++) {
        processes[i].completed = false;
        processes[i].availableTime = processes[i].burstTime;
    }

    while (completedd != processes.length){
        tempPriority = 100;
        
        for (let j = 0; j < processes.length; j++){
            if (!processes[j].completed && processes[j].arrivalTime <= currentTime){
                if(processes[j].priority < tempPriority){
                    tempPriority = processes[j].priority;
                    index = j;
                }
            }
        }

        if(tempPriority != highestPriority){
            for (let i = 0; i < processes.length; i++){
                if(processes[i].arrivalTime > currentTime){
                    executionTime = processes[i].arrivalTime - currentTime;
                    break;
                }
            }

            executionTime = executionTime > processes[index].availableTime ? processes[index].availableTime : executionTime;

            chart += `<div class='chart'>${processes[index].processId}</div>`;
            currentTime += executionTime;
            processes[index].availableTime -= executionTime;
        }

        else{
            currentTime += processes[index].availableTime;
            processes[index].availableTime = 0;
            chart += `<div class='chart'>${processes[index].processId}</div>`;
        }

        if (processes[index].availableTime === 0) {
            processes[index].completed = true;
            finishTime = currentTime;
            turnAroundTime = finishTime - processes[index].arrivalTime;
            waitingTime = turnAroundTime - processes[index].burstTime;
            totalWT += waitingTime;
            totalTAT += turnAroundTime;
            resultTable += `<tr><td>${processes[index].processId}</td><td>${finishTime}</td><td>${turnAroundTime}</td><td>${waitingTime}</td></tr>`;
            completedd++;
        }

        let tp = 1000;
        for(let k = 0;k<processes.length;k++){
            if(!processes[k].completed){
                if(processes[k].priority < tp){
                    tp = processes[k].priority;
                }
            }
        }
        highestPriority = tp;
    }

    let avgWT = totalWT / processes.length;
    let avgTAT = totalTAT / processes.length;
    let analysis = `<span class='analysis'>Average TurnAroundTime :</span><span class='analysis'>${avgTAT}</span><div></div>`;
    analysis += `<span class='analysis'>Average WaitingTime :</span><span class='analysis'>${avgWT}</span>`;
    
    let clearButton = `<button onclick='clearData()'>Clear Data</button>`;
    document.getElementById('gainchart').innerHTML = chart;
    document.getElementById('clear').innerHTML = clearButton;
    document.getElementById('outputTable').innerHTML = resultTable;
    document.getElementById('analysis').innerHTML = analysis;
}

}
