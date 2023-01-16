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
      pA1: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'pA1',
        default: null,
        description: 'Probability of Gamble A high value.'
      },
      pA2: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'pA2',
        default: null,
        description: 'Probability of Gamble A low value.'
      },
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
      pB1: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'pB1',
        default: null,
        description: 'Probability of Gamble B high value.'
      },
      pB2: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'pB2',
        default: null,
        description: 'Probability of Gamble B low value.'
      },
      B1: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'B1',
        default: null,
        description: 'Magnitude of Gamble B high value.'
      },
      B2: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'B2',
        default: null,
        description: 'Magnitude of Gamble B low value.'
      },
      left: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'left',
        default: true,
        description: 'Gamble A on left side'
      },
      
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: true,
        description: 'If true, then trial will end when user responds.'
      },
    }
  }

  plugin.trial = function(display_element, trial) {

    // ---------------------------------- //
    // Section 1: Define variables        //
    // ---------------------------------- //

    // If Gamble A on left side.
    if (trial.left) {

        // Define left side gamble.
        var L1 = ` <p>Win ${trial.A1} –––– Lose ${trial.A2}  </p>`;
        var R1 = ` <p>Win ${trial.B1}   </p>`;

        //show feedback when left=true 
        var winRoll = jsPsych.randomization.sampleWithoutReplacement([true,false], 1)[0];
        
        //feedback when choosing to gamble
        if (winRoll) {
          var FeG = `<p> ${trial.A1} </P>`;
        } else {
          var FeG =`<p> ${trial.A2} </P>`;
        }
        //feedback when choosing not to gamble
        var FeN = `<p> ${trial.B1} </P>`;

    } else {
      var L1 = ` <p>Win ${trial.B1}   </p>`;
      var R1 = ` <p>Win ${trial.A1} –––– Lose ${trial.A2}  </p>`;

    }

    var winRoll = jsPsych.randomization.sampleWithoutReplacement([true,false], 1)[0];
    //feedback when choosing to gamble
    if (winRoll) {
      var FeG = `<p> ${trial.A1} </P>`;
    } else {
      var FeG =`<p> ${trial.A2} </P>`;
    }
    //feedback when choosing not to gamble
    var FeN = `<p> ${trial.B1} </P>`;


    // random picture position //
    if (trial.left) {

    var html = '';
    
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
					 <div class="gamble-panel-item" id="jspsych-html-button-response-button-0" data-choice="0"><button class="gamble-button-blue">Gamble A</button></div>
					 </div>
           
      <div class='juyou'> <img src="./img/win.png" alt="sometext" />
					<div class="leftrighttext">${R1}</div>
					<br>
					<br>
					<br>
					<div class="gamble-panel-item" id="jspsych-html-button-response-button-1" data-choice="1"><button class="gamble-button-orange">Gamble B</button></div>
					</div>
    </div>
    `
  }else {  
    
  var html = '';
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
         <div class="gamble-panel-item" id="jspsych-html-button-response-button-0" data-choice="0"><button class="gamble-button-blue">Gamble A</button></div>
         </div>
         
    <div class='juyou'> <img src="./img/half.png" alt="sometext" />
					<div class="leftrighttext">${R1}</div>
					<br>
					<br>
					<br>
         <div class="gamble-panel-item" id="jspsych-html-button-response-button-1" data-choice="1"><button class="gamble-button-orange">Gamble B</button></div>
         </div>
  </div>`
  }

    // html +=`
    //   <div class="juzuo">
    //     <img src="./img/half.png" alt="sometext" />
    //     <p>Some text</p>
    //   </div>`

    // html +=`
    //   <div class="juyou">
    //     <img src="./img/win.png" alt="sometext" />
    //     <p>Some text</p>
    //   </div>`




    {/* html +=`
    <div class="img-with-text">
    <img src= "./img/win.png" alt="sometext" />
    <p>Some text</p>
    </div>` */}





    html += '</div>';

    // Display HTML
    display_element.innerHTML = html;

    // ---------------------------------- //
    // Section 3: jsPsych Functions       //
    // ---------------------------------- //

    // start time
    var start_time = performance.now();

    // add event listeners to buttons
    for (var i = 0; i < 2; i++) {
      display_element.querySelector('#jspsych-html-button-response-button-' + i).addEventListener('click', function(e){
        var choice = e.currentTarget.getAttribute('data-choice'); // don't use dataset for jsdom compatibility
        after_response(choice);
      });
    }

    // store response
    var response = {
      rt: null,
      button: null
    };

    // function to handle responses by the subject
    function after_response(choice) {

      // measure rt
      var end_time = performance.now();
      var rt = end_time - start_time;
      response.button = choice;
      response.rt = rt;

      // after a valid response, the stimulus will have the CSS class 'responded'
      // which can be used to provide visual feedback that a response was recorded
      display_element.querySelector('#jspsych-html-button-response-stimulus').className += ' responded';

      // disable all the buttons after a response
      var btns = document.querySelectorAll('.jspsych-html-button-response-button button');
      for(var i=0; i<btns.length; i++){
        btns[i].setAttribute('disabled', 'disabled');
      }

      // Infer choice
      if (trial.left && response.button==0) {
        response.choice = 1;
      } else if (trial.left && response.button==1) {
        response.choice = 0;
      } else if (response.button==0) {
        response.choice = 0;
      } else {
        response.choice = 1;
      }

      //choice 1 is gamble, 0 is not gamble
      if (response.choice == 1){
        var trialPayoff = FeG;
      } else {
        var trialPayoff = FeN
      }

      
      
			// check what the choice was, flip a coin to get outcome if gamble chosen, display outcome
			// html += '<div class="gamble-header"><h3>OUTCOME!!!</h3></div>';
    // html += '<img src="./img/win.png" ></img>';
	    var html = '';

			html += `

          <div class="info"> ${trialPayoff}
          </div>`
      display_element.innerHTML = html;


			// wait some time and then end trial
			jsPsych.pluginAPI.setTimeout(function() {
				end_trial();
			}, 2000); // show failure stimulus for e.g. 2000 then "..." (2000 ms piloting)


//       if (trial.response_ends_trial) {
//         end_trial();
//       }

    };

    // function to end trial when it is time
    function end_trial() {

      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();

      // Infer choice
      if (trial.left && response.button==0) {
        response.choice = 1;
      } else if (trial.left && response.button==1) {
        response.choice = 0;
      } else if (response.button==0) {
        response.choice = 0;
      } else {
        response.choice = 1;
      }

      // Sample outcome
      if (response.choice == 1) {
        trial.outcome = jsPsych.randomization.sampleWithReplacement([trial.A1, trial.A2], 1, [trial.pA1, trial.pA2])[0];
      } else {
        trial.outcome = jsPsych.randomization.sampleWithReplacement([trial.B1, trial.B2], 1, [trial.pB1, trial.pB2])[0];
      }

      // gather the data to store for the trial
      var trial_data = {
        "pA1": trial.pA1,
        "A1": trial.A1,
        "pA2": trial.pA2,
        "A2": trial.A2,
        "pB1": trial.pB1,
        "B1": trial.B1,
        "pB2": trial.pB2,
        "B2": trial.B2,
        "left": trial.left,
        "button": response.button,
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
