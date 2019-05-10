var firebaseConfig = {
    apiKey: "AIzaSyAw4x04RIVCMFIC2PeFvfwP9ZnaqlOg-xg",
    authDomain: "trainscheduler-4044e.firebaseapp.com",
    databaseURL: "https://trainscheduler-4044e.firebaseio.com",
    projectId: "trainscheduler-4044e",
    storageBucket: "trainscheduler-4044e.appspot.com",
    messagingSenderId: "830650044584",
    appId: "1:830650044584:web:5f72a6bcea64c8c5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database().ref();

$("#add-train-btn").on('click', function(event) {
    event.preventDefault();

    // user input
    var trainName = $('#train-name').val().trim();
    var destination = $('#destination').val().trim();
    var firstTime = moment($('#first-time').val().trim(), "HH:mm");
    var frequency = $('#frequency').val().trim();

    console.log(`train name ${trainName}`);
    console.log(`destination is ${destination}`);
    console.log(`first train time: ${firstTime}`);
    console.log(`frequency ${frequency}`);

    // temporary object
    var newTrain = {
        train: trainName,
        endpoint: destination,
        initialTime: firstTime,
        freq: frequency
    };



});