// Animations
AOS.init({
  anchorPlacement: 'top-left',
  duration: 1000
});

// Add your javascript here

function onLoad(){
  randomSentence();
  calculateAge();
}

function randomSentence() {
  var sentences = ["La strada del successo è sempre ripida", "Le cose vanno fatte bene", "Non arrenderti mai"];
  var item = sentences[Math.floor(Math.random()*sentences.length)];
  document.getElementById("random_sentence").textContent = item;
}

function calculateAge() {
  var year = new Date().getFullYear();
  document.getElementById("my_age").textContent = year - 1993;
}



//TODO: calcolo età



//TODO: calcolo età