var currTime = document.getElementById("currentDay");
var blockTextAreaArr = document.getElementsByTagName("textarea");
var buttonArr = document.getElementsByTagName("button");

var startingHour = 9;

setInterval(function(){currTime.textContent = moment().format('MMMM Do YYYY, h:mm:ss a');}, 1000);

var currHour = moment().hour();

for (var i = 0; i < blockTextAreaArr.length; i++) {

    blockTextAreaArr[i].textContent = localStorage.getItem(i);

    if ((i + startingHour) < currHour) {
        blockTextAreaArr[i].classList.add("past");
    } else if ((i + startingHour) > currHour) {
        blockTextAreaArr[i].classList.add("future");
    } else {
        blockTextAreaArr[i].classList.add("present");
    }
}

for( var i = 0; i < buttonArr.length; i++ ){
    (function(i){
        buttonArr[i].addEventListener('click', function(event) {
            // console.log(event.target);
            // console.log(i);
            var textAreaSib = event.target.previousElementSibling;
            // console.log(textAreaSib.value);
            localStorage.setItem(i, textAreaSib.value);
        }, false);
    })(i);
}