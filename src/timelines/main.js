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
//        7/31/23 (AGH): fixed notConsented timeline conditional to include
//                       && include_consent
//                       added login_data properties specific to each conditional
//                       timeline so the login options are added to the recorded
//                       data of the first included trial
//                       added pcon trials
//        10/28/23 (CELS): Set to pre-load the oMST as well
//
//   --------------------
//   This file builds the primaryTimeline from all of the trials.
//   It also contains two conditional timelines based on user consent
//   that are pushed to the primaryTimeline.
//
//*******************************************************************

//----------------------- 1 ----------------------
//-------------------- IMPORTS -------------------

import { config } from "../config/main";

// Login options
import {
  include_consent,
  include_demog,
  include_pcon,
  include_instr,
  exptBlock1,
  consent_login_data,
  demog_login_data,
  pcon_login_data,
  instr_login_data,
  cont_login_data,
} from "../App/components/Login.jsx";

// consent, demog
import { consent_trial, consentGiven, not_consented } from "../trials/consent_trial";
import { demogform } from "../trials/demographics";

// pcon
import {
  pcon_preload,
  instr1_trial,
  demo1_trial,
  instr2_trial,
  demo2_trial,
  instr3_trial,
  pcon_end,
} from "../trials/pcon_demos";
import { pconBlock1 } from "../config/pcon_config";
import pconBlock from "./pconBlock";

// contomst
import {
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
} from "../trials/instructions";
import { omst_preload, instr_trial, debrief_block } from "../trials/contOmst";
import testBlock from "./testBlock";
import { end_message } from "../trials/end";

//----------------------- 2 ----------------------
//-------------------- OPTIONS -------------------
// Honeycomb will combine these custom options with other options needed by Honyecomb.

const jsPsychOptions = {
  on_trial_finish: (data) => console.log(`Trial ${data.internal_node_id} just finished:`, data),
  default_iti: 250,
};

//----------------------- 3 ----------------------
//-------------------- TIMELINE ------------------
// Honeycomb will call this function for us after the subject logs in, and run the resulting timeline.
// The instance of jsPsych passed in will include jsPsychOptions above, plus other options needed by Honeycomb.

const buildTimeline = () => (config.USE_MTURK ? mturkTimeline : buildPrimaryTimeline());

const buildPrimaryTimeline = () => {
  const primaryTimeline = [];

  // conditional timeline if consent form is included
  var incl_consent = {
    timeline: [consent_trial],
    conditional_function: function () {
      if (include_consent) {
        return true;
      } else {
        return false;
      }
    },
    // if this is the first included trial, add login options to data here
    data: { login_data: consent_login_data },
  };

  // conditional timeline if demog form is included
  var incl_demog = {
    timeline: [demogform],
    conditional_function: function () {
      if (include_demog) {
        return true;
      } else {
        return false;
      }
    },
    // if this is the first included trial, add login options to data here
    data: { login_data: demog_login_data },
  };

  // conditional timeline if pcon is included
  var incl_pcon = {
    timeline: [
      pcon_preload,
      instr1_trial, // instructions and demos
      demo1_trial,
      instr2_trial,
      demo2_trial,
      instr3_trial,
      pconBlock(pconBlock1), // loop through test trials
      pcon_end, // ty message
    ],
    conditional_function: function () {
      if (include_pcon) {
        return true;
      } else {
        return false;
      }
    },
    // if this is the first included trial, add login options to data here
    data: { login_data: pcon_login_data },
  };

  // conditional timeline if instructions are included
  var incl_instr = {
    timeline: [
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
    // if this is the first included trial, add login options to data here
    data: { login_data: instr_login_data },
  };

  // conditional timeline that runs the experiment if consent is given
  var consented = {
    timeline: [
      incl_demog, // demographics form
      incl_pcon, // perceptual control task
      incl_instr, // instructions

      // continuous omst
      omst_preload,
      instr_trial, // instructions
      testBlock(exptBlock1), // looping trials
      debrief_block, // thank you

      end_message, // final thank you message
    ],
    conditional_function: function () {
      // if consent was given in consent trial or consent form not included,
      // run above timeline
      if (consentGiven || !include_consent) {
        return true;
      } else {
        return false;
      }
    },
    data: { login_data: cont_login_data },
  };

  // conditional timeline that runs ending message if participant does not consent
  var notConsented = {
    timeline: [not_consented],
    conditional_function: function () {
      if (!consentGiven && include_consent) {
        return true;
      } else {
        return false;
      }
    },
  };

  // push conditional consent and notconsented timelines to primary timeline
  primaryTimeline.push(incl_consent, consented, notConsented);
  return primaryTimeline;
};

// for future mturk use??
const mturkTimeline = [
  //preamble,
  //countdown({ message: lang.countdown.message1 }),
  //taskBlock(tutorialBlock),
  //countdown({ message: lang.countdown.message2 }),
  //taskBlock(exptBlock1),
  // showMessage(config, {
  //   duration: 5000,
  //   message: lang.task.end,
  // }),
];

//----------------------- 4 ----------------------
//-------------------- EXPORTS -------------------

// include these options, get the timeline from this function.
export { jsPsychOptions, buildTimeline };
