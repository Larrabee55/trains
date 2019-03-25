// Initialize Firebase
var config = {
  apiKey: "AIzaSyAh4RWUM2wB01jBTfFOwaWvyWKOZh3n5UE",
  authDomain: "trains-9fe73.firebaseapp.com",
  databaseURL: "https://trains-9fe73.firebaseio.com",
  projectId: "trains-9fe73",
  storageBucket: "trains-9fe73.appspot.com",
  messagingSenderId: "822554848633"
};

firebase.initializeApp(config);

var database = firebase.database();
// when submit button is clicked
$("#submit-button").on("click", function (event) {
  event.preventDefault();
  // grabs user input
  var trainText = $("#train-name").val().trim();
  var destinationText = $("#destination").val().trim();
  var startTime = moment($("#start-time").val().trim(), "HH:mm").format("HH:mm");
  var frequencyText = $("#frequency").val().trim();
  // puts info into an object
  var newTrain = {
    train: trainText,
    destination: destinationText,
    start: startTime,
    frequency: frequencyText
  };
  // uploads info to database
  database.ref().push(newTrain);

  // Clears all of the text-boxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#start-time").val("");
  $("#frequency").val("");
});



database.ref().on("child_added", function (childSnapshot) {

  var train = childSnapshot.val().train;
  var destination = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start;
  var tFrequency = childSnapshot.val().frequency;
  // conversions
  var firstTimeConverted = moment(trainStart, "HH:mm").subtract(1, "years");
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  var tRemainder = diffTime % tFrequency;
  var minutesAway = tFrequency - tRemainder;
  var nextArrival = moment().add(minutesAway, "minutes");
  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(train),
    $("<td>").text(destination),
    $("<td>").text(tFrequency),
    $("<td>").text(nextArrival),
    $("<td>").text(minutesAway)
  );
  // Append the new row to the table
  $("#train-table > tbody").append(newRow);

});