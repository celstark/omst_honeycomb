//*******************************************************************
//
//   File: main.js               Folder: timelines
//
//   Author: Honeycomb, Craig Stark, Audrey Hempel
//   --------------------
//
//   Changes:
//        7/?/23 (AGH):
//        7/9/23 (AGH): added conditional timelines based on user
//                      consent
//
//   --------------------
//   This file builds the primaryTimeline from all of the trials.
//   It also contains two conditional timelines based on user consent
//   that are pushed to the primaryTimeline.
//
//*******************************************************************

//----------------------- 1 ----------------------
//-------------------- IMPORTS -------------------

import { /*lang,*/ config } from '../config/main';
import { consent_trial, consentGiven, not_consented } from '../trials/consent_trial';
import preamble from './preamble';
import testBlock from './testBlock';
import taskBlock from './taskBlock';
import { tutorialBlock } from '../config/tutorial';
import { exptBlock1 } from '../config/experiment';
import { select_pref_lang } from '../trials/selectLanguage';
//import { select_resp_type } from '../trials/selectRespType';
import { demogform } from '../trials/demographics';
import { intro, new1, new2, new3, repeat1, lure1, side_by_side1, new4, new5, repeat2, lure2, side_by_side2, outtro } from '../trials/instructions';
import { /*preload,*/ instr1_trial, /*test_trials*/ debrief_block } from '../trials/contOmst';
import { end_message } from '../trials/end';

//----------------------- 2 ----------------------
//-------------------- OPTIONS -------------------

// Add your jsPsych options here.
// Honeycomb will combine these custom options with other options needed by Honyecomb.
const jsPsychOptions = {
  on_trial_finish: function (data) {
    console.log('A trial just ended, here are the latest data:');
    console.log(data);
  },
  default_iti: 250,
};

//----------------------- 3 ----------------------
//-------------------- TIMELINE ------------------

// Add your jsPsych timeline here.
// Honeycomb will call this function for us after the subject logs in, and run the resulting timeline.
// The instance of jsPsych passed in will include jsPsychOptions above, plus other options needed by Honeycomb.
const buildTimeline = () => (config.USE_MTURK ? mturkTimeline : buildPrimaryTimeline());

const buildPrimaryTimeline = () => {
  const primaryTimeline = [
    //preamble,
    select_pref_lang,
    consent_trial,
  ];

  // conditional timeline that runs the experiment if consent is given
  var consented = {
    timeline: [
      demogform, // demographics
      // select_resp_type, // select keyboard or button response type

      // instructions
      intro,
      new1,
      new2,
      new3,
      repeat1,
      lure1,
      side_by_side1,
      new4,
      new5,
      repeat2,
      lure2,
      side_by_side2,
      outtro,

      // continuous omst
      instr1_trial, // instructions
      testBlock(exptBlock1), // looping trials
      debrief_block, // thank you

      end_message, // final thank you message
    ],
    conditional_function: function () {
      // if consent was given in consent trial, run above timeline
      if (consentGiven) {
        return true;
      } else {
        return false;
      }
    },
  };

  // conditional timeline that runs ending message if participant does not consent
  var notConsented = {
    timeline: [not_consented],
    conditional_function: function () {
      if (!consentGiven) {
        return true;
      } else {
        return false;
      }
    },
  };

  // add conditional timelines to primary
  primaryTimeline.push(consented, notConsented);
  return primaryTimeline;
};

// for future mturk use??
const mturkTimeline = [
  preamble,
  //countdown({ message: lang.countdown.message1 }),
  taskBlock(tutorialBlock),
  //countdown({ message: lang.countdown.message2 }),
  taskBlock(exptBlock1),
  // showMessage(config, {
  //   duration: 5000,
  //   message: lang.task.end,
  // }),
];

//----------------------- 4 ----------------------
//-------------------- EXPORTS -------------------

// Honeycomb, please include these options, and please get the timeline from this function.
export { jsPsychOptions, buildTimeline };
