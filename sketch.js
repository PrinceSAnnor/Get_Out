/*
Get Out is an exploration of harmony. The idea was convieved from the game, Sound shape, which has a central focus on music. My team then began thinking along the lines of the interrelationship between sound and video games. Our brainstorming activity led us through different ideas that involved using harmony as a modality to navigate side-scrolling video games. Federico Álvarez's movie, "Don't' Breathe", also greatly inspired the ideation of Get Out. This draft of Get Out is a 2D maze involving a white dot that must navigate its way by deciphering consonant and disonant sounds. To reach the exit, the dot must attempt to move in a chosen direction, if the direction is right, a consonant sound is played. A dissonant sound is played if the chosen direction is wrong and the dot must move back to its previous position and try again. The dot cannot exit the invisible door without moving along the invisible path!

Instructions
Find your way out by listening to the harmony
Use the keys W, S, A, D for to move up, down, left, right respectively
The red dot records your last correct position

*/

// Click on the canvas to create a random melody
// Uncomment below to play each example

var synth1;
var synth2;
var message = "";
var dotX;
var dotY;
var paths = [];
var maxX = 0;
var maxY = 0;
var pos = 0;
var prevDotX = -5;
var prevDotY = -5;
var flag = true;
var synth5;
var value = 40;

function setup() {
  createCanvas(800, 800);

  synth1 = new Tone.Synth().toMaster();
  synth2 = new Tone.Synth().toMaster();
  synth3 = new Tone.Synth().toMaster();
  synth4 = new Tone.Synth().toMaster();
  synth5 = new Tone.Synth().toMaster();

  dotX = 10;
  dotY = 10;
  var i = 0;

  while (1) {
    if (maxX >= width || maxY >= height) {
      break;
    }
    i++;
    nextDirection = int(random(0, 4));
    if (i > 20) {
      nextDirection = int(random(0, 2));
    }
    if (nextDirection == 0) {
      maxY += value;
      paths.push('S');
    } else if (nextDirection == 1) {
      maxX += value;
      paths.push('D');
    } else if (nextDirection == 2) {
      if (maxY > value) {
        maxY -= value;
        paths.push('W');
      }
    } else if (nextDirection == 3) {
      if (maxX > value) {
        maxX -= value;
        paths.push('A');
      }
    }
  }

  for (k = 0; k < paths.length; k++) {
    console.log(paths[k]);
  }


}

function draw() {
  background(0);
  fill(255);
  ellipse(dotX, dotY, 20, 20);
  fill(255, 0, 0);
  textSize(60);
  text(message, width / 4, height / 2);

  if (pos >= paths.length) {
    message = "congratulations";
  } else
    ellipse(prevDotX, prevDotY, 10, 10);
}

function keyPressed() {
  var minor_scale = [0, 2, 3, 5, 7, 9, 10, 12];
  var major_scale = [0, 2, 4, 5, 7, 9, 11, 12];


  var root = 60;
  var root2 = 64;
  var root3 = 67;

  var octave = 1;
  var note = root + octave * 12;

  var noteObject = Tone.Frequency(note, "midi");

  if (pos < paths.length) {
    if (prevDotX == dotX && prevDotY == dotY) {
      flag = true;
    }

    if (flag) {

      if (key == paths[pos]) {
        var scalePos = Math.floor(Math.random() * 7) + 0;
        var pitch = root + minor_scale[scalePos] + 12 * octave;
        var pitch2 = root2 + minor_scale[scalePos] + 12 * octave;
        var pitch3 = root3 + minor_scale[scalePos] + 12 * octave;
        // convert from MIDI number to frequency
        var f = Tone.Frequency(pitch, "midi");
        var f2 = Tone.Frequency(pitch2, "midi");
        var f3 = Tone.Frequency(pitch3, "midi");
        console.log("yaay");

        synth2.triggerAttackRelease(f, 0.2);
        synth3.triggerAttackRelease(f2, 0.2);
        synth5.triggerAttackRelease(f3, 0.2);

        pos++;
        flag = true;
      } else {
        console.log("noo");

        var freq = Math.floor(Math.random() * 80) + 30;
        synth1.triggerAttackRelease(noteObject, 0.4);
        synth4.triggerAttackRelease(noteObject + freq, 0.4);
        flag = false;
        prevDotX = dotX;
        prevDotY = dotY;
      }
    } else {
        synth1.triggerAttackRelease(400, 0.4);
        synth2.triggerAttackRelease(430, 0.4);
    }

    if (key == 'W') {
      dotY = dotY - value;
    }

    if (key == 'A') {
      dotX = dotX - value;
    }

    if (key == 'S') {
      dotY = dotY + value;
    }

    if (key == 'D') {
      dotX = dotX + value;
    }
    if (dotX < 10)
      dotX = 10;
    if (dotY < 10)
      dotY = 10;

    if (pos < paths.length && dotX > width - value + 10) {
      dotX = width - value + 10;
    }
    if (pos < paths.length && dotY > height - value + 10) {
      dotY = height - value + 10;
    }

  }
}