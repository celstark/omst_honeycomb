// <!DOCTYPE html>
// <html>
//   <!--
//   Task: Perceptual-baseline control task in cMST
//   Author: Gavin Stark
//   Forked from main cMST-Online on 11/20/19 and modified for mobile / Cordova
//   Forked again on 8/20/20, pulled out Cordova, and setup for JATOS

// Revised: November 20, 2019 (CELS) for Cordova
//    11/22/19 (CELS) - cleanup parameter section
//    11/25 (CELS): Button size increase
//    12/4/19 (CELS): Using .replace not .href and will take you back to index.html if the end
//    12/5/19 (CELS): Styles to alter text/button sizes, ensuring deviceready, meta-tag
//    12/6/19 (CELS): Shifted data saving to savedata.js and setup to allow local backup save on iOS
//    4/13/20 (CELS): Goes to end.html if this is the last phase
//    4/16/20 (CELS): Will detect if on SONA and go back there for credit
//    8/20/20 (CELS): Forked off and reworked for JATOS
//    8/24/20 (CELS): Fixed jumping stimuli when using button response mode
//    5/31/22 (CELS): Added bit about blank screen in main task
//    10/21/22 (CELS): Updated default to buttons
//    2/28/23 (CELS): Updated to jsPsych7

//   Optional parameters:
//   [sid=##]: Subject ID -- used for data file name (default=1234)
//   [resp=X]: Response mode -- set to 'keyboard' to use keys, anything else to use buttons (default=button)
//   [rand=#]: Should which stimuli are shown as repeats vs. lures be randomized? (default=0)
//   [q_pcon=pagename]: Base of HTML filename to add into the queue after this task (default=null)

//  -->

// <head>
//   <meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap:  'unsafe-inline' 'unsafe-eval'
//     https://fonts.gstatic.com http://www.stark-labs.com/exp/jsPsych/mobile_cMST/append_log.php http://www.stark-labs.com/exp/jsPsych/mobile_cMST/write_data_file.php;
//     style-src 'self' 'unsafe-inline' https://fonts.googleapis.com/css; media-src *;
//     img-src 'self' data: content:;">

//   <script type="text/javascript" src="jatos.js"></script>
//   <script type="text/javascript" src="js/index.js"></script>
//   <script src="js/jspsych_731/dist/jspsych.js"></script>
//   <script src="js/jspsych_731/dist/plugin-html-keyboard-response.js"></script>
//   <script src="js/jspsych_731/dist/plugin-html-button-response.js"></script>
//   <script src="js/jspsych_731/dist/plugin-categorize-image.js"></script>
//   <script src="js/plugin-categorize-image-buttons.js"></script>
//   <link rel="stylesheet" href="css/jspsych.css"></link>
//   <style>
//     .jspsych-display-element {
//       font-size: 200%;
//     }
//     .jspsych-btn {
//       font-size: 150%;
//     }
//   </style>
// </head>
// <script>

//was below

// jatos.onLoad(function() {
//   const phasename='cmst_instr_contOSN';
//   var sid=jatos.studySessionData['sid'];
//   if (typeof sid === 'undefined') {
//     sid=1234;
//   }

//   var jsPsych = initJsPsych({on_finish: function() {
//       if (0) { jsPsych.data.displayData(); }
//       else {
//         var order=jatos.studySessionData["order"];
//         jatos.studySessionData["taskindex"] += 1;
//         var expdata = jsPsych.data.get().json();
//         // Submit results to JATOS and queue the end or next task
//         if (typeof order === 'undefined' || order.length == jatos.studySessionData["taskindex"]) {
//           // we're done
//           // Check if this came from SONA - should have URL.sid and .sona
//           if (typeof jatos.urlQueryParameters.sid === 'undefined' || typeof jatos.urlQueryParameters.sona === 'undefined' ||
//               typeof jatos.studyJsonInput['experiment_id'] === 'undefined' || typeof jatos.studyJsonInput['credit_token'] === 'undefined') {
//             jatos.submitResultData(expdata,jatos.endStudy);
//           }
//           else {
//             var redirect='https://uci.sona-systems.com/webstudy_credit.aspx?experiment_id='+jatos.studyJsonInput['experiment_id']+
//               '&credit_token='+jatos.studyJsonInput['credit_token']+'&survey_code='+jatos.urlQueryParameters.sid;
//             jatos.endStudyAndRedirect(redirect,expdata);
//           }
//         }
//         else {
//           // submit and start the next
//           jatos.submitResultData(expdata, () => { jatos.startComponentByPos(order[jatos.studySessionData["taskindex"]]) });
//         }
//       }
//     }
//   });

//   jsPsychData.addProperties({
//     task: phasename,
//     subject: sid,
//   });

//****************************************************************************
//
//   File: instructions.js               Folder: trials
//
//   Author: Gavin Stark, Craig Stark, Audrey Hempel
//   --------------------
//
//   Changes:
//        6/12/23 (AGH): forked honeycomb, began to transfer trials from
//                       cmst_instr_contOSN.html into template (adding imports,
//                       exports, removing JATOS code)
//        6/14/23 (AGH): loaded images into ../assets and imported { images }
//                       from ../lib/utils     
//        6/16/23 (AGH): created and imported custom plugins in ./uniqueplugins 
//                       adpated from Craig's create-image-buttons plugin
//        6/20/23 (AGH): created ./selectLanguage and imported { lang }
//                       created ./selectRespType and imported { resp_mode }
//        6/22/23 (AGH): converted all the trial parameters dependent on lang
//                       and resp-mode into dynamic parameters
//        7/13/23 (AGH): added task as data property to each trial
//        7/14/23 (AGH): created button and key trials for each trial to allow
//                       response selection (trial types cannot be dynamic)
//        7/26/23 (AGH): consoladated button and key versions of trials with the 
//                       refresh_instr_trials function that gets called at Login
//        7/27/23 (AGH): added paragraph markers to param functions (previously 
//                       within text file)
//
//   --------------------
//   These trials are the instruction trials that explain to the
//   participant how to partake in the experiment and provide user
//   feedback.
//
//*******************************************************************************

//----------------------- 1 ----------------------
//-------------------- IMPORTS -------------------

// importing jspysch plugins
import jsPsychHtmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';
import jsPsychHtmlButtonResponse from '@jspsych/plugin-html-button-response';
import jsPsychCategorizeImage from '@jspsych/plugin-categorize-image';

// importing unique plugins
import { jsPsychCategorizeImageButtons } from './uniquePlugins/plugin-categorize-image-buttons.js';
import { jsPsychCategorizeMultipleImageKeyboard } from './uniquePlugins/plugin-categorize-multiple-image-keyboard.js';
import { jsPsychCategorizeMultipleImageButtons } from './uniquePlugins/plugin-categorize-multiple-image-buttons.js';

// importing languages, images object, and response-mode
import { images } from '../lib/utils.js';
import { lang, resp_mode } from '../components/Login';

//----------------------- 2 ----------------------
//----------------- HELPER METHODS ---------------
// These methods house the dynamic parameters of the trials below. Each is a function that
// when called will determine the values of lang and resp_type to incorporate different
// languages and response types. EVERYTIME lang OR resp_type ARE USED, THEY MUST BE INSIDE
// A FUNCTION.

// var to store the task name (data property)
const phasename = 'cmst_instr_contOSN'; 

var instr_choice = function () {
  if (resp_mode == 'button') {
    return [lang.instructions.button.instr_choice];
  } else {
    return lang.instructions.key.instr_choice;
  }
};

var prompt0 = function () {
  if (resp_mode == 'button') {
    return "<p>" + lang.instructions.button.prompt0 + "</p>";
  } else {
    return "<p>" + lang.instructions.key.prompt0 + "</p>";
  }
};

var prompt_new = function () {
  if (resp_mode == 'button') {
    return "<p>" + lang.instructions.button.prompt_new + "</p>";
  } else {
    return "<p>" + lang.instructions.key.prompt_new + "</p>";
  }
};

var inc_new = function () {
  if (resp_mode == 'button') {
    return "<p>" + lang.instructions.button.inc_new + "</p>";
  } else {
    return "<p>" + lang.instructions.key.inc_new + "</p>";
  }
};

var cor_new = function () {
  return "<p>" + lang.instructions.cor_new + "</p>";
};

var prompt_rep = function () {
  if (resp_mode == 'button') {
    return "<p>" + lang.instructions.button.prompt_rep + "</p>";
  } else {
    return "<p>" + lang.instructions.key.prompt_rep + "</p>";
  }
};

var inc_rep = function () {
  if (resp_mode == 'button') {
    return "<p>" + lang.instructions.button.inc_rep + "</p>";
  } else {
    return "<p>" + lang.instructions.key.inc_rep + "</p>";
  }
};

var cor_rep = function () {
  return "<p>" + lang.instructions.cor_rep + "</p>";
};

var prompt_lure = function () {
  if (resp_mode == 'button') {
    return "<p>" + lang.instructions.button.prompt_lure + "</p>";
  } else {
    return "<p>" + lang.instructions.key.prompt_lure + "</p>";
  }
};

var inc_lure = function () {
  if (resp_mode == 'button') {
    return "<p>" + lang.instructions.button.inc_lure + "</p>";
  } else {
    return "<p>" + lang.instructions.key.inc_lure + "</p>";
  }
};

var cor_lure = function () {
  return "<p>" + lang.instructions.cor_lure + "</p>";
};

var side_by_side = function () {
  if (resp_mode == 'button') {
    return "<p>" + lang.instructions.side_by_side + "</p><p>" + lang.instructions.button.continue + "</p>";
  } else {
    return "<p>" + lang.instructions.side_by_side + "</p><p>" + lang.instructions.key.continue + "</p>";
  }
};

var prompt_test = function () {
  if (resp_mode == 'button') {
    return "<p>" + lang.instructions.prompt_test + "</p><p>" + lang.instructions.button.trial_text + "</p>";
  } else {
    return "<p>" + lang.instructions.prompt_test + "</p><p>" + lang.instructions.key.trial_text + "</p>";
  }
};

var trial_choices = function () {
  if (resp_mode == 'button') {
    return [
      `${lang.instructions.button.trial_choices.old}`,
      `${lang.instructions.button.trial_choices.sim}`,
      `${lang.instructions.button.trial_choices.new}`,
    ];
  } else {
    return [
      `${lang.instructions.key.trial_choices.old}`,
      `${lang.instructions.key.trial_choices.sim}`,
      `${lang.instructions.key.trial_choices.new}`,
    ];
  }
};

//----------------------- 3 ----------------------
//-------------------- TRIALS --------------------
// All the instructions trials.
// These trials call the functions housing the parameter information.

// trials declaration
var intro = {};
var new1 = {};
var new2 = {};
var new3 = {};
var repeat1 = {};
var lure1 = {};
var side_by_side1 = {};
var new4 = {};
var new5 = {};
var repeat2 = {};
var lure2 = {};
var side_by_side2 = {};
var outtro = {};

// function to refresh trials, called when Login options are set

function refresh_instr_trials() {

  console.log('...refreshing instr trials')

  intro = {
    type: (resp_mode == 'button' ? jsPsychHtmlButtonResponse: jsPsychHtmlKeyboardResponse),
    choices: instr_choice,
    prompt: prompt0,
    stimulus: function () {
    return lang.instructions.text0;
    },
    data: { task: phasename },
  };

  new1 = {
    type: (resp_mode == 'button' ? jsPsychCategorizeImageButtons: jsPsychCategorizeImage ),
    stimulus: images['foil_1032.jpg'],
    key_answer: function () {
      return lang.instructions.key.trial_choices.new;
    },
    button_answer: 2,
    choices: trial_choices,
    prompt: prompt_new,
    force_correct_button_press: true,
    incorrect_text: inc_new,
    correct_text: cor_new,
    data: { task: phasename },   
  };

  new2 = {
    type: (resp_mode == 'button' ? jsPsychCategorizeImageButtons: jsPsychCategorizeImage ),
    stimulus: images['foil_1033.jpg'],
    key_answer: function () {
      return lang.instructions.key.trial_choices.new;
    },
    button_answer: 2,
    choices: trial_choices,
    prompt: prompt_new,
    force_correct_button_press: true,
    incorrect_text: inc_new,
    correct_text: cor_new,
    data: { task: phasename },
  };

  new3 = {
    type: (resp_mode == 'button' ? jsPsychCategorizeImageButtons: jsPsychCategorizeImage ),
    stimulus: images['pcon026a.jpg'],
    key_answer: function () {
      return lang.instructions.key.trial_choices.new;
    },
    button_answer: 2,
    choices: trial_choices,
    prompt: prompt_new,
    force_correct_button_press: true,
    incorrect_text: inc_new,
    correct_text: cor_new,
    data: { task: phasename },    
  };

  repeat1 = {
    type: (resp_mode == 'button' ? jsPsychCategorizeImageButtons: jsPsychCategorizeImage ),
    stimulus: images['foil_1033.jpg'],
    key_answer: function () {
      return lang.instructions.key.trial_choices.old;
    },
    button_answer: 0,
    choices: trial_choices,
    prompt: prompt_rep,
    force_correct_button_press: true,
    incorrect_text: inc_rep,
    correct_text: cor_rep,
    data: { task: phasename },  
  };

  lure1 = {
    type: (resp_mode == 'button' ? jsPsychCategorizeImageButtons: jsPsychCategorizeImage ),
    stimulus: images['pcon026b.jpg'],
    key_answer: function () {
      return lang.instructions.key.trial_choices.sim;
    },
    button_answer: 1,
    choices: trial_choices,
    prompt: prompt_lure,
    force_correct_button_press: true,
    incorrect_text: inc_lure,
    correct_text: cor_lure,
    data: { task: phasename },
  };

  side_by_side1 = {
    type: (resp_mode == 'button' ? jsPsychCategorizeMultipleImageButtons: jsPsychCategorizeMultipleImageKeyboard),
    key_answer: function () {
      return lang.instructions.key.instr_choice;
    },
    button_answer: 0,
    feedback_duration: 0,
    stimulus: images['pcon026a.jpg'],
    stimulus2: images['pcon026b.jpg'],
    choices: instr_choice,
    prompt: side_by_side,
    data: { task: phasename },
  };

  new4 = {
    type: (resp_mode == 'button' ? jsPsychCategorizeImageButtons: jsPsychCategorizeImage),
    stimulus: images['foil_1035.jpg'],
    key_answer: function () {
      return lang.instructions.key.trial_choices.new;
    },
    button_answer: 2,
    choices: trial_choices,
    prompt: prompt_test,
    force_correct_button_press: true,
    incorrect_text: inc_new,
    correct_text: cor_new,
    data: { task: phasename },
  };

  new5 = {
    type: (resp_mode == 'button' ? jsPsychCategorizeImageButtons: jsPsychCategorizeImage),
    stimulus: images['pcon028a.jpg'],
    key_answer: function () {
      return lang.instructions.key.trial_choices.new;
    },
    button_answer: 2,
    choices: trial_choices,
    prompt: prompt_test,
    force_correct_button_press: true,
    incorrect_text: inc_new,
    correct_text: cor_new,
    data: { task: phasename },
  };

  repeat2 = {
    type: (resp_mode == 'button' ? jsPsychCategorizeImageButtons: jsPsychCategorizeImage),
    stimulus: images['foil_1035.jpg'],
    key_answer: function () {
      return lang.instructions.key.trial_choices.old;
    },
    button_answer: 0,
    choices: trial_choices,
    prompt: prompt_test,
    force_correct_button_press: true,
    incorrect_text: inc_rep,
    correct_text: cor_rep,
    data: { task: phasename },
  };

  lure2 = {
    type: (resp_mode == 'button' ? jsPsychCategorizeImageButtons: jsPsychCategorizeImage),
    stimulus: images['pcon028b.jpg'],
    key_answer: function () {
      return lang.instructions.key.trial_choices.sim;
    },
    button_answer: 1,
    choices: trial_choices,
    prompt: prompt_test,
    force_correct_button_press: true,
    incorrect_text: inc_lure,
    correct_text: cor_lure,
    data: { task: phasename },
  };

  side_by_side2 = {
    type: (resp_mode == 'button' ? jsPsychCategorizeMultipleImageButtons: jsPsychCategorizeMultipleImageKeyboard),
    key_answer: function () {
      return lang.instructions.key.instr_choice;
    },
    button_answer: 0,
    feedback_duration: 0,
    stimulus: images['pcon028a.jpg'],
    stimulus2: images['pcon028b.jpg'],
    choices: instr_choice,
    prompt: side_by_side,
    data: { task: phasename },
  };

  outtro = {
    type: (resp_mode == 'button' ? jsPsychHtmlButtonResponse: jsPsychHtmlKeyboardResponse),
    choices: instr_choice,
    prompt: prompt0,
    stimulus: function () {
      return lang.instructions.end;
    },
    data: { task: phasename },
  }

  console.log('refreshed instr trials')
};

//----------------------- 4 ----------------------
//-------------------- EXPORTS -------------------
// export the trials to be imported to the main timeline

export {
  refresh_instr_trials, intro, new1, new2, new3, repeat1, lure1, side_by_side1, new4, new5, repeat2, lure2, side_by_side2, outtro,
};
