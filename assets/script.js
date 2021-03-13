var currTime = document.getElementById("currentDay");
var blockTextAreaArr = document.getElementsByTagName("textarea");
var buttonArr = document.getElementsByTagName("button");

// this is not entirely necessary to the functionality of this app and is moreso pre-planning in case this was implemented to
// display, for example, a 24-hour format instead of 9 to 5. This could be hard-coded on lines 17 and 19 but if I instead
// wanted to display all 24-hours of a day I could simply changed the value of startingHour to 0 in one place and keep functionality
var startingHour = 9;

// using setInterval to update the current date and time on the screen every 1000ms or 1 second
setInterval(function(){currTime.textContent = moment().format('MMMM Do YYYY, h:mm:ss a');}, 1000);

var currHour = moment().hour();

for (var i = 0; i < blockTextAreaArr.length; i++) {

    // grabbing the strings from local storage by index (since they were named in local storage by their index) and populating the textarea's
    // with the relevant information.
    blockTextAreaArr[i].textContent = localStorage.getItem(i);

    // setting the hour block color based on if each block's hour designation is less than or greater than, else equal to the current hour
    // note: will only update colors on page refresh
    if ((i + startingHour) < currHour) {
        blockTextAreaArr[i].classList.add("past");
    } else if ((i + startingHour) > currHour) {
        blockTextAreaArr[i].classList.add("future");
    } else {
        blockTextAreaArr[i].classList.add("present");
    }
}

// -----------------------------------------------------------------------------------
// The next step is to add event listeners to each button that is used to save the text
// the user has entered into the adjacent textarea. Since these are the only buttons on
// the page I could simply loop through all buttons and add an event listener to each one.
// I could have added an id to each button like "btn1", "btn2", "btn3", etc., then grabbed
// the id using event.target.id and used that as the key for each local storage entry but
// instead wanted to just use the index (the value of i) that I'm currently on in my for
// loop to identify each string I wanted to save into local storage.

// Below is my original approach but on line 51 instead of 'let index = i;' it read
// 'var index = i;'. The issue with this is that due to the scoping of 'var' the variable
// 'index' will update on each loop meaning when a user ends up clicking any button, the
// index that would be read in would always be the last value 'i' was set to, which would be
// 8 in this case. So here we have to use 'let' which has what's called block scope so that
// the value of 'i' is captured in 'index' on each iteration of the for loop
// -----------------------------------------------------------------------------------

// for(var i = 0; i < buttonArr.length; i++){
    
//     let index = i;
//     buttonArr[i].addEventListener('click', function(event){

//         var textAreaSib = event.target.previousElementSibling;
//         localStorage.setItem(index, textAreaSib.value);

//     });
// }

// -----------------------------------------------------------------------------------
// Now to get fancy, I updated this to use forEach() and nested arrow functions!
// First, since the right hand expression on line 2 returns what's called an 'array-like object'
// called an HTMLCollection, we must use 'Array.from()' to turn this into an array so
// we can use 'forEach()' on it. On each loop in 'button' we capture a reference to the
// HTML DOM button element we are currently on and in 'index' we capture a reference to the
// current index we are on. The rest of this is just like any other time we would add an
// event listener other than using another arrow function.
// -----------------------------------------------------------------------------------

Array.from(buttonArr).forEach((button, index) => {
    button.addEventListener("click", event => {

        // create a reference to event(the user's click).target(the DOM element the click event was triggered on).previousElementSibling(the element sitting directly before the target element)
        var textAreaSib = event.target.previousElementSibling;
        // add an item to local storage with the key as the current index in the loop and the value as the current value of textAreaSib (the text entered by the user in the adjacent textarea)
        localStorage.setItem(index, textAreaSib.value);

        // un-comment these two lines if you would like to see what the taget DOM element looks like and what index is given for each button
        // console.log(event.target);
        // console.log(index);
    })
})