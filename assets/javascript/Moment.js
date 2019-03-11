/*  This is the java script for train scheduler web page.

    Written by Alex Chalyy on 3/9/2019. */

var train_name;         //  This variable holds the name of the train
var destination;        //  This variable holds the destination
var first_train_time;   //  This variable holds first train arrival time
var current_time;       //  This variable holds current time
var next_arrival;       //  This variable holds next arrival time
var minutes_away;       //  This variable holds how many minutes away is the next train
var frequency;          //  This variable holds the frequency of train arrivals

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDOKA1AIrPzsxVxK_37zapmlTRP86YXwhc",
  authDomain: "trainschedulerproject-f19b7.firebaseapp.com",
  databaseURL: "https://trainschedulerproject-f19b7.firebaseio.com",
  projectId: "trainschedulerproject-f19b7",
  storageBucket: "trainschedulerproject-f19b7.appspot.com",
  messagingSenderId: "820821550338"
};

firebase.initializeApp(config);

var database = firebase.database();

//----------------------------------------------------------------------------------------------------

function addRow() {

  //  This function adds a row to html file dynamically every time new row is added.

    // Create the new row
    console.log("addRow!");
    console.log("choo choo " + train_name);
    var newRow = $("<tr>").append(
      $("<td>").text(train_name),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(next_arrival),
      $("<td>").text(minutes_away),
    );
  
    // Append the new row to the table
    $("#t > tbody").append(newRow);

}

//-----------------------------------------------------------------------------------------------------

database.ref().on("child_added", function (document) {

  //  This function loads all train infromation from firebase, logs it, and displays it on html page.

  //console.log(document.val());

  // Store everything from firebase into a variables.

  train_name = document.val().TrainName;
  destination = document.val().Destination;
  frequency = document.val().Frequency;
  next_arrival = document.val().NextArrival;
  minutes_away = document.val().MinutesAway;

  // Logs everything extracted from firebase;

  console.log("Train name: +" + train_name);
  console.log("Destination: +" + destination);
  console.log("Frequency: " + frequency);
  console.log("Next arrival: " + next_arrival);
  console.log("Minutes away: " + minutes_away);

  addRow();
});

//------------------------------------------------------------------------------------------------------

function isNormalInteger(str) {

  //  This function returns true if str is a positive integer.

  var n = Math.floor(Number(str));

  return n !== Infinity && String(n) === str && n >= 0;
}

//------------------------------------------------------------------------------------------------------

function DisplayCurrentTime() {

  //  This function returns current military time.

  var date = new Date();
  var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  time = hours + ":" + minutes;
  return time;
};

//------------------------------------------------------------------------------------------------------

function validTIme(time) {

  //  This function returns true if the received string is valid military time.

  return (parseInt(time[0]) != NaN && parseInt(time[1]) != NaN && parseInt(time[3]) != NaN && parseInt(time[4]) != NaN);

}

//------------------------------------------------------------------------------------------------------

function CalculateArrival() {

  //  This function caclulates next arrival time and minutes away from arrival. This function was created with Doug's help.

  var trainTime = moment(first_train_time, "hh:mm").subtract(1, "years");
  var minuteDifference = moment().diff(moment(trainTime), "minutes");
  var remainder = minuteDifference % frequency;

  minutes_away = frequency - remainder;
  var nextTrain = moment().add(minutes_away, "minutes");
  next_arrival = moment(nextTrain).format("hh:mm");

  console.log("Arrival time: " + next_arrival);
  console.log("Arrival minutes: " + minutes_away);

}

//------------------------------------------------------------------------------------------------------

function StoreTrainSchedule() {

  //  This function stores added train schedule into firebase.

  var newTrain = {
    TrainName: train_name,
    Destination: destination,
    Frequency: frequency,
    NextArrival: next_arrival,
    MinutesAway: minutes_away
  }

  database.ref().push(newTrain);

  console.log("Next train schedule row is successfully added.");
}

//------------------------------------------------------------------------------------------------------

$("#sub").on("click",

  function (event) {

    //  This function loads information from submit form, stores it firebase, and displays it on screen.

    event.preventDefault();

    //  This gets values from the text boxes.

    train_name = $("#TrainName").val().trim();
    destination = $("#Destination").val().trim();
    frequency = $("#Frequency").val().trim();
    first_train_time = $("#FirstTrainTime").val().trim();

    //  This makes sure that the user enters all values into text boxes before processing the information.

    if (train_name == "" || destination == "" || frequency == "" || first_train_time == "") {
      alert("Please enter all values to submit train time!");
    } else if (first_train_time.length < 5 || !validTIme(first_train_time) || first_train_time[2] != ":") {
      alert("Please enter military time only (HH:MM)!");
    } else if (!isNormalInteger(frequency)) {
      alert("Please enter valid frequency.");
    } else if (!isNaN(train_name) || !isNaN(destination)) {
      alert("Please enter valid non-numerical names for train name and destination.");
    }
    else {
      console.log("Current time: " + DisplayCurrentTime());
      CalculateArrival();
      StoreTrainSchedule();
    }

    //  This logs the values from the text boxes.

    console.log("Train Name: " + train_name);
    console.log("Destination: " + destination);
    console.log("Frequency: " + frequency);
    console.log("First train time: " + first_train_time);

    //  This clears the text boxes after the user clicks submit.

    $("#TrainName").val("");
    $("#Destination").val("");
    $("#Frequency").val("");
    $("#FirstTrainTime").val("");
  }
);

