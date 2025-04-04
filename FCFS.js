function FCFS(processes){
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    var chart="";
    for(let i=0;i<processes.length;i++){
        chart += `<div class='chart'>${processes[i].processId}</div>`;
    }
    document.getElementById('gainchart').innerHTML=chart;

    let currentTime=0;
    let finishTime=0,turnArroundTime=0,waitingTime=0,totalTAT=0,totalWT=0;
    var resultTable="<table class='output'><tr><th>Processes</th><th>FinishTime</th><th>TurnArroundTime</th><th>WaitingTime</th></tr><br>";
    for(let j=0;j<processes.length;j++){
        if(currentTime>=processes[j].arrivalTime){
            currentTime += processes[j].burstTime;
            finishTime = currentTime;
            turnArroundTime = finishTime - processes[j].arrivalTime;
            waitingTime = turnArroundTime - processes[j].burstTime;
            totalTAT += turnArroundTime;
            totalWT += waitingTime;
        }
        else{
            currentTime=processes[j].arrivalTime;
            currentTime += processes[j].burstTime;
            finishTime = currentTime;
            turnArroundTime = finishTime - processes[j].arrivalTime;
            waitingTime = turnArroundTime - processes[j].burstTime;
            totalTAT += turnArroundTime;
            totalWT += waitingTime;
        }
        resultTable += `<tr><td>${processes[j].processId}</td><td>${finishTime}</td><td>${turnArroundTime}</td><td>${waitingTime}</td></tr>`;
    }
    let avgWT = totalWT/processes.length;
    let avgTAT = totalTAT/processes.length;
    var analysis = `<span class='analysis'>average TurnArroundTime :</span><span class='analysis'>${avgTAT}</span><div></div>`;
    analysis += `<span class='analysis'>average WaitingTime :</span><span class='analysis'>${avgWT}</span>`;

    var clearButton = `<button onclick='clearData()'>Clear Data</button>`;
    document.getElementById('clear').innerHTML=clearButton;
    document.getElementById('outputTable').innerHTML=resultTable;
    document.getElementById('analysis').innerHTML=analysis;
}