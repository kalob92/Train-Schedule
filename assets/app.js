var firebaseConfig = {
    apiKey: "AIzaSyAw4x04RIVCMFIC2PeFvfwP9ZnaqlOg-xg",
    authDomain: "trainscheduler-4044e.firebaseapp.com",
    databaseURL: "https://trainscheduler-4044e.firebaseio.com",
    projectId: "trainscheduler-4044e",
    storageBucket: "trainscheduler-4044e.appspot.com",
    messagingSenderId: "830650044584",
    appId: "1:830650044584:web:5f72a6bcea64c8c5"
};

firebase.initializeApp(firebaseConfig);

var trainbase = firebase.database();

var trainName;
var destination;
var firstTime;
var frequency;
var fTConverted;
var nextArrival;
var minutesAway;

function currentTime() {
    var now = moment().format('h:mm a');
    $('#now').text(now);
};

setInterval(currentTime, 1000);

$("#add-train-btn").on('click', function(event) {
    event.preventDefault();

    // user input
    trainName = $('#train-name').val().trim();
    destination = $('#destination').val().trim();
    // wait to convert firstTime because Firebase doesn't like it
    firstTime = $('#first-time').val().trim();
    frequency = $('#frequency').val().trim();

    console.log(`train name ${trainName}`);
    console.log(`destination is ${destination}`);
    console.log(`first train time: ${firstTime}`);
    console.log(`frequency ${frequency}`);

    // temporary object
    var newTrain = {
        train: trainName,
        endpoint: destination,
        initialTime: firstTime,
        frequency: frequency
    };

    firebase.database().ref().push(newTrain);

    $('#train-name, #destination, #first-time, #frequency').val('');

    return;
});

trainbase.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());

    trainName = childSnapshot.val().train;
    destination = childSnapshot.val().endpoint;
    firstTime = childSnapshot.val().initialTime;
    frequency = childSnapshot.val().frequency;
    fTConverted = moment(firstTime, 'HH:mm').subtract(1, 'years');
    console.log(`train name: ${trainName}, destination: ${destination}, first train time: ${fTConverted}, frequency: ${frequency}`);

    var diff = moment().diff(moment(fTConverted), 'minutes');
    // the remainder left after dividing the difference in time between now and the first train by the frequency of the train
    var timeRemainder = diff%frequency;
    // then subtract that from how often it comes to see how much time is left
    minutesAway = frequency-timeRemainder;
    console.log(`${minutesAway} minutes until the next train arrives.`);

    nextArrival = moment().add(minutesAway, 'minutes').format('hh:mm a');
    console.log(`Next Arrival at: ${nextArrival}`);


    // fill out the table
    $('#train-table').append(`<tr><td>${trainName}</td><td>${destination}</td><td>${frequency}</td><td>${nextArrival}</td><td>${minutesAway}</td>`);
});