var today = new Date();
//Get today's date

var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
//define the months of the year

var n = month[today.getMonth()];
//grab the month for today

let ev = [];
// console.log(n+"_"+today.getDate());

$('#date').html(n+" "+today.getDate());
//put today's month and day on the page

function item() { return ev[Math.floor(Math.random()*ev.length)]};
//this will grab one random event for today's date

$.getJSON('http://allorigins.me/get?url=' + encodeURIComponent("https://en.wikipedia.org/wiki/" + n + "_" + today.getDate() + "") + '&callback=?', function(data){
// console.log(data.contents);
//go get the events for today's date using a GET request

    var el = $( '<div></div>' );
    el.html(data.contents);
    //stick the response in an div to be able to access and read it easier

    let events = $('#Events', el).parent().next()[0];
    //find the Events portion of the response and grab the correct parent that holds all the data

    // console.log(events.children);
    // console.log(events.children.length);
    //these are the individual events

    for (var i = 0; i < events.children.length; i++) {
    	ev.push(events.children[i].innerText);
    }
    //convert them all into an array to use easier


    $('#list').html(item());
    //stick in an item for the first time

    // console.log(item);
    
    $(function() {
    history();

    function history() {
       setTimeout(history,12000);
       $('#list').html(item());
       //a recursive callback loop that will display a different event every 10 seconds
    }
});
    
});