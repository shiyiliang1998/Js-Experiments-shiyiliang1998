
timeline = []
timeline.push(gamble_final)


// OSPAN (day 1?)
// 	timeline.push(ospan_final) // index_ospan.js


// RISK-TAKING TASK (day 1?)
// 	timeline.push(risk_final) // index_risk.js


// // QUESTIONNAIRES
// timeline.push(survey_start) // index_survey.js
// timeline.push(survey_final) // index_survey.js
// timeline.push(survey_end) // index_survey.js

// DISCOUNTING TASK (day 2?)
// 	timeline.push(discounting_final) // index_disc.js



//  run the experiment, do a local save of the results
jsPsych.init({

	timeline: timeline,
	fullscreen: true,

	on_interaction_data_update: function (data) {

		interaction = data.event;

		console.log(JSON.stringify(data))

		// pause experiment if no full-screen
		if (data.event == 'blur') {
			// 						jsPsych.pauseExperiment();
			console.log('blur_reported')
		}
		if (data.event == 'focus') {
			// 						jsPsych.resumeExperiment();
			console.log('focus_reported')
		}
		if (data.event == 'fullscreenexit') {
			// 						jsPsych.pauseExperiment();
			console.log('exit_reported')
		}
		if (data.event == 'fullscreenenter') {
			// 						jsPsych.resumeExperiment();
			console.log('enter_reported')
		}

	},
	on_finish: function () {
		jsPsych.data.get().localSave('csv', 'results_all.csv');
	}

});