

// 上面需要一个instruction page

// //Letter Instructions
// var gamble_instruct = {
// 	type: "html-button-response",
// 	data: {
// 		exp_name: "ospan",
// 		exp_stage: "instruct"
// 	},
// 	stimulus: "<p style='font-size: 3rem'><b>Arithmetic and Memory Task</b><br><br>In this task, you will try to memorize letters you see on the screen while you also read arithmetic statements (simple math equations).<br><br>" +
// 			  "In the next few minutes, you will have some practice to get you familiar with how the task works.<br><br>" +
// 			  "We will begin by practicing the letter part of the task</p><br><br>",
// 	choices: ['Continue'],
// 	post_trial_gap: 250,
// 	button_html: '<button class="buttonStyle">%choice%</button>',
// 	on_finish: function(){saveTaskData_ospanintro()} // saving db subject data
// };


// Display alert message on back/refresh.
// https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onbeforeunload
function verify_unload(e){
	e.preventDefault();
	(e || window.event).returnValue = null;
	return null;
  };
  window.addEventListener("beforeunload", verify_unload);
  
  
  // Define experiment fullscreen.
  //------------------------------------//
  // Section 1: Prepare instructions
  //------------------------------------//
  
// var instr = {
// 	type: 'instructions',
// 	pages: [
// 	  "<img src='./img/instr01.png' style='max-width: 75%'></img>",
  
// 	],
// 	show_clickable_nav: true,
// 	button_label_previous: "Prev",
// 	button_label_next: "Next"
//   }
  
var gamble_final = [];

var gamble_final = {
  timeline: []
  };
  
  //------------------------------------//
  // Section 2: Prepare Gambles
  //------------------------------------//
  
  // Load gambles.
  var GAMBLES = JSON.parse(GAMBLES);
  
  // Iteratively construct trials.
  var trials =[];
  GAMBLES.forEach(function (gamble) {
  
	// Define side presentation.
	var left = jsPsych.randomization.sampleWithoutReplacement([true,false], 1)[0];
	var top = jsPsych.randomization.sampleWithoutReplacement([true,false], 1)[0];
  
	// Define gambling trial.
	var trial = {
	  type: 'task-gamble-shiyi',
	  post_trial_gap: 2000,
	  // Gamble trial data.
	  A1:  gamble['gamble1'],         // Mixed gamble, A1 is the win half
	  A2:  gamble['gamble2'],         // A2 is the 0/loss half
	  B1:  gamble['certain'],         // certain result: 0/win
	  left: left,                // Gamble A on left side
	  top: top, //top means the green is at top(Green will always be gain half of the mixed gamble)
	  Domain: gamble['domain'],
  
	  // Gamble trial metadata
	  data: { ID: gamble['ID'], Domain: gamble['Domain'], Problem: gamble['Problem'] },
  
	};
  
	// Store trial.
	gamble_final.timeline.push(trial);
  
  });
  
  // Randomize trial order.
  var trials = jsPsych.randomization.sampleWithoutReplacement(trials, trials.length);
  
  //------------------------------------//
  // Section 3: Present experiment
  //------------------------------------//
  
  // prompt full screen via jspsych defined plug-in 
  var full_screen = {
		  type: 'fullscreen',
		  fullscreen_mode: true
  };
  
  
  
  // Initialize timeline.
  // var rand = null
  // timeline = timeline.concat(instr);
  
  var trialResult = {
	type: 'lmdlab-html-keyboard-response',
	stimulus: '<p style="font-size: 48px;">no change</p>',
	choices: jsPsych.NO_KEYS,
	  trial_duration: 2000,
	};
  
gamble_final.timeline.push(trialResult)  






