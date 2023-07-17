//*******************************************************************
//
//   File: end.js               Folder: trials
//
//   Author: Audrey Hempel
//   --------------------
//
//   Changes:
//        7/10/23 (AGH): initial code converted from end.html
//        7/13/23 (AGH): added task data property
//
//   --------------------
//   This trial displayed the end thank you message at the conclusion
//   of the experiment.
//
//*******************************************************************

//----------------------- 1 ----------------------
//-------------------- IMPORTS -------------------

import jsPsychHtmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';
import { lang } from '../trials/selectLanguage';

//----------------------- 2 ----------------------
//--------------------- TRIAL --------------------

// ending trial
var end_message = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: function () {
    return lang.end.ty;
  },
  data: { task: 'end' }, // add task name to data collection
};

//----------------------- 3 ----------------------
//-------------------- EXPORT --------------------

export { end_message };
