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

//var v = document.getElementById('another_title');
//var dbRef = firebase.database().ref().child('text');

//var dataRef = firebase.database();

// On Click
$("#clear").on("click", function () {

  // Add 1 to clickCounter
  frequency = "hello";

  // **** Store Click Data to Firebase in a JSON property called clickCount *****
  // **** Note how we are using the Firebase .set() method ****
  // **** .ref() refers to the path you want to save your data to
  // **** Since we left .ref() blank, it will save to the root directory
  database.ref().set({
    frequency: frequency
  });

  // Now! go to https://fir-click-counter-7cdb9.firebaseio.com/ to see the impact to the DB
});

/*
    // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
    dataRef.ref().on("child_added", function(childSnapshot) {

        // Log everything that's coming out of snapshot
        console.log(childSnapshot.val().TrainName);
        console.log(childSnapshot.val().Destination);
        console.log(childSnapshot.val().Frequency);
        console.log(childSnapshot.val().NextArrival);
        console.log(childSnapshot.val().MinutesAway);

        // Handle the errors
      }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      }); */
