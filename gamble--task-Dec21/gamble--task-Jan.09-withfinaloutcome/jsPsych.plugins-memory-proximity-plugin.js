jsPsych.plugins["memory-proximity-plugin"] = (function() {
    // the name above is how we'll reference this
  
    var plugin = {};
  
    plugin.info = {
      // the name here should be the same
      name: "memory-proximity-plugin",
      parameters: {
          // these are parameters that the plug_in takes in...
          stimuli: { //
            type: jsPsych.plugins.parameterType.IMAGE,
            default: undefined
          },
          
          block_number: { //
            type: jsPsych.plugins.parameterType.INT,
            default: undefined
          },
          trial_number: { //
            type: jsPsych.plugins.parameterType.INT,
            default: undefined
          },
          
          choice_trial: { //
            type: jsPsych.plugins.parameterType.INT,
            default: undefined
          },
          
          stim1_pos: { //
            type: jsPsych.plugins.parameterType.INT,
            default: undefined
          },
          stim2_pos: { //
            type: jsPsych.plugins.parameterType.INT,
            default: undefined
          },
          
          }
   }
  
    plugin.trial = function(display_element, trial) {
  
      ///////////////////////////////////////////////////////////////////////////
      ///////////////// DEFINE SOME CONSTANTS ///////////////////////////////////
      //////////////////////////////////////////////////////////////////////////
  
      // keys for accept and reject
      // note that placing "var" defines the scope to be within this function
      // if we don't use var, the variable is global
      // then we can access it from functions "above" this one.
  
      var left_key = 'arrowleft'; // leftarrow
      var right_key = 'arrowright'; // rightarrow
      var up_key = 'arrowup'; // uparrow
      var down_key = 'arrowdown'; // downarrow
  
          // timing information
          var time_isi = 250; // TPILOT 250 ms;       500 REAL; free exploration ISI
          var time_postfail = 2000; // TPILOT 2000 ms; 5000 REAL; after removing failure stim (above) blank, >2000 ms:  5000 ms!!!
          var time_postcert = 2000;	// TPILOT 2000 ms; 8000 REAL; after removing certain reward, >2000 ms, wait a fixed LONG period:  8000 ms!!!
          var time_iti = 2000; // TPILOT 2000 ms;      2000 REAL
  
      // get the screen width and height size -
      // based on their window size
      var parentDiv = document.body;
      var w = parentDiv.clientWidth;
      var h = parentDiv.clientHeight;
  
      // image sizes
      var stim1_img_width = w/6;
      var stim1_img_height = w/6;
      var stim2_img_width = w/6;
      var stim2_img_height = w/6;
  
      // define structures for variables we might record so that if the trial ends, but we haven't defined these yet, the task doesn't break
      var response = {
          rt: null,
          key: null,
          key_press_num: null,
          accept: null,
      };
  
  
      ///////////////////////////////////////////////////////////////////////////
      ///////////////// PLACE THE SVG CANVAS AND BACKGROUND ON WHICH WE'll DRAW THINGS ////
      ///////////////////////////////////////////////////////////////////////////////
  
      // place the svg -- this is like a canvas on which we'll draw things
      //  a bit on using d3 for this:
      // html webpages are split into "divs" that have class names
      // jspsych creates a webpage that has a "div" called the "content wrapper", which is where the content goes
      // in the html, it looks like this: <div class="jspsych-content-wrapper">
      // we reference class names by placing a "." in front of them
      // select that class and place the svg canvas within it
      d3.select(".jspsych-content-wrapper")   //  select the part of html in which to place it (.jspsych-content-wrapper is defined by jspsych )
                          .append("svg") // append an svg element
                          .attr("width", w) // specify width and height
                          .attr("height", h)
  
      // place a gray background rectangle over the whole svg
      // here's a link for all the things you can place with d3 (and a whole tutorial on using it)
      // https://www.dashingd3js.com/svg-basic-shapes-and-d3js
      d3.select("svg").append("rect")
                          .attr("x", 0).attr("y", 0).attr("width", w) // 0, 0 is top left of the "svg" canvas
                          .attr("height", h).style("fill", "gray").style("opacity",.435);
  
  
  
      ///////////////////////////////////////////////////////////////////////////
      ///////////////// START THE TRIAL ////////////////////////////////////////
      //////////////////////////////////////////////////////////////////////////
  
  
          // CURRENT main event
      // wait ITI dur msec (set at end of this), and then call first part of trial (this is the first thing called after initial display)
      jsPsych.pluginAPI.setTimeout(function() {
        // show the position (for debugging)
        // 2*h/8
        show_pos = true;
        show_action_prompt = true;
  
              // place text with choice instructions: this is how you place text...
  
              // upper
              d3.select("svg").append("text")
                              .attr("class", "upper_prompt")
                              .attr("x", w/2)
                              .attr("y", 2*(h/8))
                              .attr("font-family","Helvetica")
                              .attr("font-weight","light")
                              .attr("font-size",h/40)
                              .attr("text-anchor","middle")
                              .attr("fill", "white")
                              .style("opacity",1)
                              .text('')
  
              // lower
              d3.select("svg").append("text")
                              .attr("class", "lower_prompt")
                              .attr("x", w/2)
                              .attr("y", 6*(h/8))
                              .attr("font-family","Helvetica")
                              .attr("font-weight","light")
                              .attr("font-size",h/40)
                              .attr("text-anchor","middle")
                              .attr("fill", "white")
                              .style("opacity",1)
                              .text('')
  
              display_state();
  
      }, time_iti); // CURRENTLY this is where the ITI goes
  
  
  
      ///////////////////////////////////////////////////////////////////////////
      ///////////////// FUNCTIONS WHICH RUN the TRIAL ///////////////////////////
      //////////////////////////////////////////////////////////////////////////
      // The functions are:
      //
      // display_state: displays the image
      //       - if there's a reward it shows the reward and ends the trial
      //       - otherwise it sets up response handler                                 -
      // handle response: records response calls transition
      // transition: records data, updates the position, calls displaay state
      // end trial: this ends the trial
  
  
      ///////////////////////////////////////////////////////////////////
      //  DISPLAY THE STATE IMAGE AND EITHER COLLECT RESPONSE OR END TRIAL
      var display_state = function(){
  
        // update text
              d3.select(".goal_upper_prompt")
                              .text('')
        d3.select(".goal_lower_prompt")
                              .text('')
  
        // Set stim1 and stim2 image
        permlr = Math.random();
        if (permlr>=0.5){
            permlr = 1;
            stim1_image = trial.stimuli[0];
            stim2_image = trial.stimuli[1];
          }else{
              permlr = 2;
            stim1_image = trial.stimuli[1];
            stim2_image = trial.stimuli[0];
          }
  
        // Place stim1
        d3.select("svg")
                              .append("svg:image")
                              .attr("class", "stim1 image")
                              .attr("x", w/2 - 3*(stim1_img_width/2))
                              .attr("y", h/2 - stim1_img_height/2)
                              .attr("width",stim1_img_width)
                              .attr("height",stim1_img_height)
                              .attr("xlink:href", stim1_image)
                              .style("opacity",1);
  
        // Place stim2
              d3.select("svg")
                              .append("svg:image")
                              .attr("class", "stim2 image")
                              .attr("x", w/2 + (stim2_img_width/2))
                              .attr("y", h/2 - stim2_img_height/2)
                              .attr("width",stim2_img_width)
                              .attr("height",stim2_img_height)
                              .attr("xlink:href", stim2_image)
                              .style("opacity",1);
  
        // Set up response handler
        // define valid responses - these keys were defined above
              var valid_responses = [left_key, right_key, up_key, down_key];
  
              // jspsych function to listen for responses
              keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
                      callback_function: handle_response, // call handle_response if valid response is entered
                      valid_responses: valid_responses, // defines which keys to accept
                      rt_method: 'performance', //
                      persist: false,
                      allow_held_key: false
                  });
  
              // define max response time - set timer to wait for that time (this will be turned off when they make a response)
              var max_response_time = 10000; // set to 10 sec
              // wait some time and then end trial
              jsPsych.pluginAPI.setTimeout(function() {
                      handle_slow_response();
                  }, max_response_time);
  
      }
  
  
  
      ////////////////////////////////
      // Function TO HANDLE RESPONSES
      ////////////////////////////
      var handle_response = function(info){
  
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
        // pass key character
              var choice_char = response.key;
              console.log(choice_char);
  
        // wait for some amount of time (from response being made) and then transition state
        jsPsych.pluginAPI.setTimeout(function() {
            transition_state(choice_char);
          }, 0); ///
      } // end handle response function
  
  
  
      ////////////////////////////////////
      // FUNCTION TO HANDLE SLOW RESPONSES
      ////////////////////////////////////
      var handle_slow_response = function(){
        // a timeout which calls this function is set up in display-stimuli-wait-for-response
        // the handle response function kills that time-out. but if that doesn't happen before
        // the set time, this function is called
          if (typeof keyboardListener !== 'undefined') {
                jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
            }
  
          jsPsych.pluginAPI.clearAllTimeouts();
  
          // place text 'please respond faster' in red
          d3.select("svg").append("text")
                                  .attr("class", "outcome")
                                  .attr("x", w/2)
                                  .attr("y", h/2 + w/12)
                                  .attr("font-family","monospace")
                                  .attr("font-weight","bold")
                                  .attr("font-size",w/24)
                                  .attr("text-anchor","middle")
                                  .attr("fill", "red")
                                  .style("opacity",1)
                                  .text('Please response faster! -0.20 GBP')
  
          // record choice as 'slow'
          response.accept = "SLOW";
  
          this_reward = 0;
          this_fail = 1;
          rtchoice = NaN;
  
          // wait some time and then end trial
          jsPsych.pluginAPI.setTimeout(function() {
              end_trial();
            }, 1000); // show slow response for X milliseconds then end trial
        } // end handle slow response
  
  
  
  
        //////////////////////////
        //// Transition the State
        ///////////////////////////
        var transition_state = function(choice_char){
  
          // store choice
                  choice = choice_char;
  
          // remove the picture
          d3.selectAll(".stim1").remove();
          d3.selectAll(".stim2").remove();
          // call transition after some amount of time
          jsPsych.pluginAPI.setTimeout(function() {
  
                      // wait some time and then end trial
                      jsPsych.pluginAPI.setTimeout(function() {
                          end_trial();
                      }, 1000); // show slow response for X milliseconds then end trial
  
        }, time_isi); // TPILOT 250ms pilot; INTER-STIMULUS-INTERVAL.  1500? show blank screen for X milliseconds then move on
      } // end transition function
  
  
  
      /////////////////////////////////////////
      /// FUNCTION to END TRIAL //////////////
      ///////////////////////////////////////
      var end_trial = function(){
  
              // record data before terminating
        var transition_data = {
            block_curr: trial.block_number,
            trial_curr: trial.trial_number,
                  rt: response.rt,
          choice: choice,
          choiceperm: permlr,
          stim1: trial.stimuli[0],
          stim2: trial.stimuli[1],
          stim1: stim1_image,
          stim2: stim2_image,
          stim1_pos: trial.stim1_pos,
          stim2_pos: trial.stim2_pos,
          // ideally save to store whether fullscreen or not when game played
  //         fullscreen: full_screen
              };
  
        jsPsych.data.write(transition_data);
  
        // kill the keyboard listener, if you haven't yet
        if (typeof keyboardListener !== 'undefined') {
          jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
        }
  
        // remove the canvas and everthing within it
        d3.select('svg').remove()
        jsPsych.finishTrial({});
      } // end end_trial()
  
    }; // end plugin.trial
  
    return plugin;
  })();
  