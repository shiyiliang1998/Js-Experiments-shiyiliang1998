/**
* jspsych-task-gamble
*
* plugin for displaying one trial of the gambling task
*
**/

jsPsych.plugins["task-gamble"] = (function() {

  var plugin = {};

  plugin.info = {
    name: 'task-gamble',
    description: '',
    
    parameters: {
      A1: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'A1',
        default: null,
        description: 'Magnitude of Gamble A high value.'
      },
      A2: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'A2',
        default: null,
        description: 'Magnitude of Gamble A low value.'
      },
      B1: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'B1',
        default: null,
        description: 'Magnitude of Gamble B high value.'
      },
      left: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'left',
        default: true,
        description: 'Gamble A on left side'
      },
    }
  }


  plugin.trial = function(display_element, trial) {

    // ---------------------------------- //
    // Section 1: Define variables        //
    // ---------------------------------- //

    // define structures for variables we might record so that if the trial ends, but we haven't defined these yet, the task doesn't break
    var response = {
        rt: null,
        key: null,
        key_press_num: null,
        accept: null,
    };

    // If Gamble A on left side.
    if (trial.left) {

			// Define left side gamble.
			var L1 = ` <p>Win ${trial.A1} &nbsp;&nbsp;&nbsp Lose ${trial.A2}  </p>`;
			var R1 = ` <p>Win ${trial.B1}   </p>`;

    } else {
      var L1 = ` <p>Win ${trial.B1}   </p>`;
      var R1 = ` <p>Win ${trial.A1} &nbsp;&nbsp;&nbsp  Lose ${trial.A2}  </p>`;

    }

    var winRoll = jsPsych.randomization.sampleWithoutReplacement([true,false], 1)[0];
    //feedback when choosing to gamble
    if (winRoll) {
      var FeG = `<p> ${trial.A1} </P>`;
			var FeGnumeric = trial.A1;
    } else {
      var FeG =`<p> ${trial.A2} </P>`;
			var FeGnumeric = trial.A2;
    }
    //feedback when choosing not to gamble
    var FeN = `<p> ${trial.B1} </P>`;
    var FeNnumeric = trial.B1;


console.log('plugin 1')
console.log(trial.A1)


    // random picture position //
    
		jsPsych.pluginAPI.setTimeout(function() {

			var html = '';

			if (trial.left) {

	
			// Add header
			html += '<div class="gamble-header"><h3>Which gamble would you prefer?</h3></div>';

			// Add jsPsych end-trial trigger
			html += '<div id="jspsych-html-button-response-stimulus"></div>';
			html +=`
			<div class='parent'>
				<div class='juzuo'>
						<img src="./img/half.png" alt="sometext" />
						 <div class="leftrighttext">${L1}</div>
						 <br>
						 <br>
						 <br>
						 <div class="leftrighttextBottom">Press "F" to select this gamble</div>
						 </div>
				 
				<div class='juyou'> <img src="./img/win.png" alt="sometext" />
						<div class="leftrighttext">${R1}</div>
						<br>
						<br>
						<br>
						<div class="leftrighttextBottom">Press "K" to select this gamble</div>
						</div>
			</div>
			`
			}else {

				html += '<div class="gamble-header"><h3>Which gamble would you prefer?</h3></div>';
				html += '<div id="jspsych-html-button-response-stimulus"></div>';
				html +=`
				<div class='parent'>
					<div class='juzuo'>
							<img src="./img/win.png" alt="sometext" />
								 <div class="leftrighttext">${L1}</div>
							 <br>
							 <br>
							 <br>
							 <div class="leftrighttextBottom">Press "F" to select this gamble</div>
							 </div>
				 
					<div class='juyou'> <img src="./img/half.png" alt="sometext" />
								<div class="leftrighttext">${R1}</div>
								<br>
								<br>
								<br>
								<div class="leftrighttextBottom">Press "K" to select this gamble</div>
							 </div>
				</div>
				`
			}

			// End HTML
			html += '</div>';

console.log('settimeout')
console.log(trial.A1)

			display_state(html);

		}, 0); // set to zero


    // Display HTML
    function display_state(html){

console.log('display_state')
console.log(trial.A1)
    
			display_element.innerHTML = html;

			// ---------------------------------- //
			// Section 3: jsPsych Functions       //
			// ---------------------------------- //

			var valid_responses = ['f', 'k'];
			
			// jspsych function to listen for responses
			keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
					callback_function: handle_response, // call handle_response if valid response is entered
					valid_responses: valid_responses, // defines which keys to accept
					rt_method: 'performance', //
					persist: false,
					allow_held_key: false
				});

		}


    // function to handle responses by the subject
    function handle_response(info) {

      // measure rt
            // clear timeout counting response time // relevant for if
      // a timer was set to limit the response time.
      jsPsych.pluginAPI.clearAllTimeouts();
      // kill keyboard listeners
      if (typeof keyboardListener !== 'undefined') {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      }
      // info is automatically passed into this and has response information
      if (response.key == null) {
          response = info;
      }

      // Infer choice
      if (trial.left && response.key=="f") {
        response.choice = 1;
      } else if (trial.left && response.key=="k") {
        response.choice = 0;
      } else if (response.key=="f") {
        response.choice = 0;
      } else {
        response.choice = 1;
      }

      //choice 1 is gamble, 0 is not gamble
      if (response.choice == 1){
        var trialPayoff = FeG;
				trial.outcome = FeGnumeric;
      } else {
        var trialPayoff = FeN;
				trial.outcome = FeNnumeric;
      }

			// check what the choice was, flip a coin to get outcome if gamble chosen, display outcome
	    var html = '';
      display_element.innerHTML = html;

			jsPsych.pluginAPI.setTimeout(function() {
				html += `
						<div class="info"> ${trialPayoff}
						</div>`
				display_element.innerHTML = html;

				//add here whatever changes needed before the delay
				jsPsych.pluginAPI.setTimeout(function() {
					end_trial();//fill this place with function to call for object needed to appearafter thee  delay
				}, 2000); 

			}, 2000); // show failure stimulus for e.g. 2000 then "..." (2000 ms piloting)

console.log('after_response')
console.log(trial.A1)

    };

    // function to end trial when it is time
    function end_trial() {

// console.log('end_trial')
// console.log(trial.A1)
// console.log('end_trial outcome:')
// console.log(trial.outcome)

      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();

      // gather the data to store for the trial
      var trial_data = {
        "A1": trial.A1,
        "A2": trial.A2,
        "B1": trial.B1,
        "left": trial.left,
        "button": response.key,
        "choice": response.choice,
        "rt": response.rt,
        "outcome": trial.outcome
      };

      // clear the display
      display_element.innerHTML = '';

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

  };

  return plugin;
})();




