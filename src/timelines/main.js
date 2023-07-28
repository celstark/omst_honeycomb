//*******************************************************************
//
//   File: main.js               Folder: timelines
//
//   Author: Honeycomb, Craig Stark, Audrey Hempel
//   --------------------
//
//   Changes:
//        6/26/23 (AGH): added contOmst preload, instructions, debrief blocks
//        6/28/23 (AGH): added contOmst repeating trials in testBlock(exptBlock1)
//        7/6/23 (AGH):  deleted preload
//        7/7/23 (AGH):  created consented and notConsented conditional timelines
//                       to progress based on participant consent
//        7/9/23 (AGH):  added conditional timelines based on user
//                       consent
//        7/10/23 (AGH): added end_message
//        7/18/23 (AGH): removed select_resp_type trial, changed import path of 
//                       resp_mode and exptBlock1 to /components/Login
//        7/26/23 (AGH): removed keyboard and button conditional timelines 
//                       (refresh trial functions now called at Login)
//        7/27/23 (AGH): removed language selection trial
//                       added conditional incl_consent, incl_demog, incl_pcon
//                       timelines 
//
//   --------------------
//   This file builds the primaryTimeline from all of the trials.
//   It also contains two conditional timelines based on user consent
//   that are pushed to the primaryTimeline.
//
//*******************************************************************

//----------------------- 1 ----------------------
//-------------------- IMPORTS -------------------

import { config } from '../config/main';

import { consent_trial, consentGiven, not_consented } from '../trials/consent_trial';
import { demogform } from '../trials/demographics';
import { intro, new1, new2, new3, repeat1, lure1, side_by_side1, new4, new5, repeat2, lure2, side_by_side2, outtro, } from '../trials/instructions';
import { instr1_trial, debrief_block } from '../trials/contOmst';
import { include_consent, include_demog, include_instr, include_pcon, exptBlock1 } from '../components/Login';
import testBlock from './testBlock';
import { end_message } from '../trials/end';

import preamble from './preamble';
import taskBlock from './taskBlock';
import { tutorialBlock } from '../config/tutorial';

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
  ];

  var incl_consent = {
    timeline: [
      consent_trial,
    ],
    conditional_function: function () {
      if (include_consent) { 
        return true;
      } else {
        return false;
      }
    },
  };

  var incl_demog = {
    timeline: [
      demogform,
    ],
    conditional_function: function () {
      if (include_demog) { 
        return true;
      } else {
        return false;
      }
    },
  };

  var incl_pcon = {
    timeline: [
      intro,
    ],
    conditional_function: function () {
      if (include_pcon) { 
        return true;
      } else {
        return false;
      }
    },
  };

  var incl_instr = {
    timeline: [
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
    ],
    conditional_function: function () {
      if (include_instr) { 
        return true;
      } else {
        return false;
      }
    },
  };



  // conditional timeline that runs the experiment if consent is given
  var consented = {
    timeline: [
      incl_demog, // demographics form
      incl_pcon, // perceptual control task
      incl_instr, // instructions
      
      // continuous omst
      instr1_trial, // instructions
      testBlock(exptBlock1), // looping trials
      debrief_block, // thank you

      end_message, // final thank you message
    ],
    conditional_function: function () {
      // if consent was given in consent trial, run above timeline
      if (consentGiven || !include_consent) { 
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
  primaryTimeline.push(incl_consent, consented, notConsented);
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

// include these options, get the timeline from this function.
export { jsPsychOptions, buildTimeline };
