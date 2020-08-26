// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

// global object
var T = {};
T.timerDiv = document.getElementById('timer');
var running = 0;
var vuelta = 1;
var tiempo;
var inicio;
var fin;
var reinicio;
const formato = 2;
if (formato == 1){
    var data='\r************************** \r\n' + '\r    Log timer CoR 2020 \r\n' + '\r************************** \r\n';
}

if (formato == 2){
    var data='\r**********************************************\r\n' + '\r  Log Timer Competencia Robótica UTFSM 2020 \r\n' + '\r**********************************************\r\n\n' + '\rLap |   Time    |  Start Time  |   End Time\r\n';
}


function displayTimer() {
    // initilized all local variables:
    var hours='00', minutes='00',
    miliseconds=0, seconds='00',
    time = '',
    timeNow = new Date().getTime(); // timestamp (miliseconds)

    T.difference = timeNow - T.timerStarted;

    // milliseconds
    if(T.difference > 10) {
        miliseconds = Math.floor((T.difference % 1000) );
        if(miliseconds < 100) {
            if(miliseconds < 10) {
                miliseconds = '00'+String(miliseconds);
            }
            if(miliseconds > 10) {
                miliseconds = '0'+String(miliseconds);
            }
        }
    }
    // seconds
    if(T.difference > 1000) {
        seconds = Math.floor(T.difference / 1000);
        if (seconds > 59) {
            seconds = seconds % 60;
        }
        if(seconds < 10) {
            seconds = '0'+String(seconds);
        }
    }

    // minutes
    if(T.difference > 60000) {
        minutes = Math.floor(T.difference/60000);
        if (minutes > 59) {
            minutes = minutes % 60;
        }
        if(minutes < 10) {
            minutes = '0'+String(minutes);
        }
    }


    // hours
    if(T.difference > 3600000) {
        hours = Math.floor(T.difference/3600000);
        // if (hours > 24) {
        // 	hours = hours % 24;
        // }
        if(hours < 10) {
            hours = '0'+String(hours);
        }
    }

    //time  =  hours   + ':'
    time = minutes + ':'
    time += seconds + ','
    time += miliseconds;

    T.timerDiv.innerHTML = time;
}

function startTimer() {
    if (running == 0) {
        // save start time
        T.timerStarted = new Date().getTime()
        inicio = T.timerStarted
        running = 1;
        //console.log('Timer Start: '+hora(inicio))
        if (T.difference > 0) {
            T.timerStarted = T.timerStarted - T.difference
        }
        // update timer periodically
        T.timerInterval = setInterval(function() {
            displayTimer()
        }, 10);

    }
}

function stopTimer() {
    if (running == 1){
        // save stop time
        clearInterval(T.timerInterval); // stop updating the timer
        fin = inicio + T.difference;
        running = 2;
        //console.log('Timer Stop: '+hora(fin))
        tiempo = document.getElementById('timer').innerHTML;
        if (formato == 1){
            if (vuelta == 3){
                vuelta = 1;
                data += '\rTiempo vuelta 3: ' + tiempo + '\r\n ' + '\r-------------------------- \r\n';
            }

            else if (vuelta == 2){
                vuelta = 3;
                data += '\rTiempo vuelta 2: ' + tiempo + '\r\n ';
            }

            else if (vuelta == 1){
                vuelta = 2;
                data += '\rTiempo vuelta 1: ' + tiempo + '\r\n ';
            }
        }

        if (formato == 2){
            if (vuelta == 3){
                vuelta = 1;
                data += '\r 3  | ' + tiempo + ' | ' + hora(inicio) + ' | ' + hora(fin) + '\r\n ' + '\r----------------------------------------------\r\n';
            }

            else if (vuelta == 2){
                vuelta = 3;
                data += '\r 2  | ' + tiempo + ' | ' + hora(inicio) + ' | ' + hora(fin) + '\r\n ';
            }

            else if (vuelta == 1){
                vuelta = 2;
                data += '\r 1  | ' + tiempo + ' | ' + hora(inicio) + ' | ' + hora(fin) + '\r\n ';
            }
        }  
    }
}

function clearTimer() {
    if (running == 2){
        running = 0;
        // save sreset time
        //reinicio = new Date().getTime()
        clearInterval(T.timerInterval);
        //console.log('Timer Reset: '+hora(reinicio))
        T.timerDiv.innerHTML = "00:00,000"; // reset timer to all zeros
        T.difference = 0;
    }
}

document.onkeypress =  keyPressFunction;
function keyPressFunction(e){
    var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
    console.log(charCode);
    if(charCode == 97) {startTimer();}  // "a"
    if(charCode == 65) {startTimer();}  // "A"
    if(charCode == 115) {stopTimer();}  // "s"
    if(charCode == 83) {stopTimer();}   // "S"
    if(charCode == 100) {clearTimer();} // "d"
    if(charCode == 68) {clearTimer();}  // "D"
    if(charCode == 102) {saveFile();}   // "f"
    if(charCode == 70) {saveFile();}    // "F"
}




function saveFile(){
    // Convert the text to BLOB.
    const textToBLOB = new Blob([data], { type: 'text/plain' });
    const sFileName = 'log.txt'; // File to save the data.

    let newLink = document.createElement("a");
    newLink.download = sFileName;

    if (window.webkitURL != null) {
        newLink.href = window.webkitURL.createObjectURL(textToBLOB);
    }
    else {
        newLink.href = window.URL.createObjectURL(textToBLOB);
        newLink.style.display = "none";
        document.body.appendChild(newLink);
    }
    newLink.click();
}

function fecha(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var msec = UNIX_timestamp%1000;
    var time = year+'/'+month+'/'+date + ' ' + hour + ':' + min + ':' + sec+','+msec;
    return time;
}


function hora(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var msec = UNIX_timestamp%1000;
    if (hour < 10) {hour = '0'+hour;}
    if (min < 10) {min = '0'+min;}
    if (sec < 10) {sec = '0'+sec;}
    if (msec < 100) {
        if (msec < 10){msec = '00'+msec;}
        if (msec > 10){msec = '0'+msec;}
    }
    var time = hour+':'+min+':'+sec+','+msec;
    return time;
}

const football = "https://spreadsheets.google.com/feeds/list/1kFyi2N_Akc1qW10yGpQQiRglSibKKtVjR7Dvw4kYXaU/1/public/values?alt=json";
const junior = "https://spreadsheets.google.com/feeds/list/1kFyi2N_Akc1qW10yGpQQiRglSibKKtVjR7Dvw4kYXaU/2/public/values?alt=json";
const robotracer = "https://spreadsheets.google.com/feeds/list/1kFyi2N_Akc1qW10yGpQQiRglSibKKtVjR7Dvw4kYXaU/3/public/values?alt=json";
const sumo_auto = "https://spreadsheets.google.com/feeds/list/1kFyi2N_Akc1qW10yGpQQiRglSibKKtVjR7Dvw4kYXaU/4/public/values?alt=json";
const sumo_rc = "https://spreadsheets.google.com/feeds/list/1kFyi2N_Akc1qW10yGpQQiRglSibKKtVjR7Dvw4kYXaU/5/public/values?alt=json";
const sumo_mini = "https://spreadsheets.google.com/feeds/list/1kFyi2N_Akc1qW10yGpQQiRglSibKKtVjR7Dvw4kYXaU/6/public/values?alt=json";
const micromouse = "https://spreadsheets.google.com/feeds/list/1kFyi2N_Akc1qW10yGpQQiRglSibKKtVjR7Dvw4kYXaU/7/public/values?alt=json";
const open = "https://spreadsheets.google.com/feeds/list/1kFyi2N_Akc1qW10yGpQQiRglSibKKtVjR7Dvw4kYXaU/8/public/values?alt=json";

categoria = robotracer;

$.getJSON(categoria, 
     
    function(data) {
        var sheetData = data.feed.entry;
        var i;
        
        for (i = 0; i < sheetData.length; i++) {
            var name = data.feed.entry[i]['gsx$_cn6ca']['$t'];
            var age = data.feed.entry[i]['gsx$_cokwr']['$t'];
            var email = data.feed.entry[i]['gsx$_cpzh4']['$t'];
            document.getElementById('demo').innerHTML += ('<tr>' + '<td>' + name + '</td>' + '<td>' + age + '</td>' + '<td>' + email + '</td>' + '</tr>');
        }
        
        var table, rows, switching, i, x, y, shouldSwitch;
        table = document.getElementById("testTable");
        switching = true;
        /*Make a loop that will continue until
        no switching has been done:*/
        
        while (switching) {
            //start by saying: no switching is done:
            switching = false;
            rows = table.rows;
            /*Loop through all table rows (except the
            first, which contains table headers):*/
            
            for (i = 1; i < (rows.length - 1); i++) {
                //start by saying there should be no switching:
                shouldSwitch = false;
                /*Get the two elements you want to compare,
                one from current row and one from the next:*/
                x = rows[i].getElementsByTagName("TD")[0];
                y = rows[i + 1].getElementsByTagName("TD")[0];
                //check if the two rows should switch place:
                if (Number(x.innerHTML) > Number(y.innerHTML)) {
                    //if so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
            
            if (shouldSwitch) {
                /*If a switch has been marked, make the switch
                and mark that a switch has been done:*/
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
    });

var click = document.getElementById('clickme');
click.addEventListener('click', myfunction);

function myfunction() {
  var tablewrap = document.getElementById('testTable');
  tablewrap.classList.toggle('hidden')
};