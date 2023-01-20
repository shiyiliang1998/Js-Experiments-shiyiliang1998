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
      Domain: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Domain',
        default: true,
        description: 'type of gamble: gain&loss vs 0, or gain&0 vs'
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
        realChoice: null
    };

    // define left and top condition, 1 is left green top, 2 for left green bottom, 3 for non-left green top, 4 for non-left, green bottom
    var a = trial.left;
    var b = trial.top;
    let c;
    if (a & b) {c = 1} else if (!a & b ) {c = 2} else if (a & !b) {c =3} else{c=4}

    switch(c) {
      case 1:
        var L1 = ` <p>Win ${trial.A1} </p>
        <br/><br/>
        <p> Lose ${trial.A2}  </p>`;
        var R1 = ` <p>Win ${trial.B1}   </p>`;
        break;
      case 2:
        var R1 = ` <p>Win ${trial.A1} </p>
        <br/><br/>
        <p> Lose ${trial.A2}  </p>`;
        var L1 = ` <p>Win ${trial.B1}   </p>`;
        break;
      case 3:
        var L1 = ` <p> Lose ${trial.A2}  </p> 
        <br/><br/>
        <p>Win ${trial.A1} </p>        `;
        var R1 = ` <p>Win ${trial.B1}   </p>`;
        break;
      case 4:
        var R1 = `   <p> Lose ${trial.A2}  </p> 
        <br/><br/>
        <p>Win ${trial.A1} </p>        `;
        var L1 = ` <p>Win ${trial.B1}   </p>`;
        break;  
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
      switch(c) {
        case 1: 
        //mixed at left, use topgreen pic
			// Add header
			html += '<div class="gamble-header"><h3>Which gamble would you prefer?</h3></div>';

			// Add jsPsych end-trial trigger
			html += '<div id="jspsych-html-button-response-stimulus"></div>';
			html +=`
			<div class='parent'>
				<div class='juzuo'>
						<img src="./img/top.png" alt="sometext" />
						 <div class="leftrighttext">${L1}</div>
						 <br>
						 <br>
						 <br>
						 <div class="leftrighttextBottom">Press "F" to select this gamble</div>
						 </div>
				 
				<div class='juyou'> <img src="./img/full.png" alt="sometext" />
						<div class="leftrighttext">${R1}</div>
						<br>
						<br>
						<br>
						<div class="leftrighttextBottom">Press "K" to select this gamble</div>
						</div>
			</div>`
          break;            
        
        
        case 2:
          // mixed at left, bottom green pic
			html += '<div class="gamble-header"><h3>Which gamble would you prefer?</h3></div>';
			html += '<div id="jspsych-html-button-response-stimulus"></div>';
			html +=`
			<div class='parent'>
				<div class='juzuo'>
						<img src="./img/full.png" alt="sometext" />
						 <div class="leftrighttext">${L1}</div>
						 <br>
						 <br>
						 <br>
						 <div class="leftrighttextBottom">Press "F" to select this gamble</div>
						 </div>
				 
				<div class='juyou'> <img src="./img/top.png" alt="sometext" />
						<div class="leftrighttext">${R1}</div>
						<br>
						<br>
						<br>
						<div class="leftrighttextBottom">Press "K" to select this gamble</div>
						</div>
			</div>`
         break;

         case 3:
        //mixed at right, top green pic
				html += '<div class="gamble-header"><h3>Which gamble would you prefer?</h3></div>';
				html += '<div id="jspsych-html-button-response-stimulus"></div>';
				html +=`
				<div class='parent'>
					<div class='juzuo'>
							<img src="./img/bottom.png" alt="sometext" />
								 <div class="leftrighttext">${L1}</div>
							 <br>
							 <br>
							 <br>
							 <div class="leftrighttextBottom">Press "F" to select this gamble</div>
							 </div>
				 
					<div class='juyou'> <img src="./img/full.png" alt="sometext" />
								<div class="leftrighttext">${R1}</div>
								<br>
								<br>
								<br>
								<div class="leftrighttextBottom">Press "K" to select this gamble</div>
							 </div>
				</div>`
          break;

          case 4:       
         //mixed at right, bottom green pic
				html += '<div class="gamble-header"><h3>Which gamble would you prefer?</h3></div>';
				html += '<div id="jspsych-html-button-response-stimulus"></div>';
				html +=`
				<div class='parent'>
					<div class='juzuo'>
							<img src="./img/full.png" alt="sometext" />
								 <div class="leftrighttext">${L1}</div>
							 <br>
							 <br>
							 <br>
							 <div class="leftrighttextBottom">Press "F" to select this gamble</div>
							 </div>
				 
					<div class='juyou'> <img src="./img/bottom.png" alt="sometext" />
								<div class="leftrighttext">${R1}</div>
								<br>
								<br>
								<br>
								<div class="leftrighttextBottom">Press "K" to select this gamble</div>
							 </div>
				</div>`

          break;  
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

      var realChoice = null

      //choice 1 is gamble, 0 is not gamble
      if (response.choice == 1){
        var trialPayoff = FeG;
        response.realChoice = "Choose to gamble";
				trial.outcome = FeGnumeric;
      } else {
        var trialPayoff = FeN;
        response.realChoice = "Choose not to gamble";
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
				}, 20); 

			}, 20); // show failure stimulus for e.g. 2000 then "..." (2000 ms piloting)

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
        "Gamble1MixedWin": trial.A1,
        "Gamble2MixedLossOr0": trial.A2,
        "CertainAmount": trial.B1,
        "mixedGambleOnLeft": trial.left,
        "winGambleOnTop": trial.top,
        "button": response.key,
        "choice": response.realChoice,
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




