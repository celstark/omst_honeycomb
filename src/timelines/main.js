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
//        5/5/24 (CELS): Changed testBlock/trial to omstBlock/Trial
//        5/6/24 (CELS): Cleanup some logic
//        6/10/24 (CELS): Adding feedback option and cleanup
//        6/11/24 (CELS): Reorganization by grouping trials into timelines
//
//   --------------------
//   This file builds the primaryTimeline from all of the trials.
//   It also contains two conditional timelines based on user consent
//   that are pushed to the primaryTimeline.
//
//*******************************************************************

//----------------------- 1 ----------------------
//-------------------- IMPORTS -------------------

//import { config } from "../config/main";

// Login options
import {
  include_consent,
  include_demog,
  include_pcon,
  include_instr,
  omstBlock,
  include_feedback,
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
import { pcon_preload, pcon_end, pconinst_TL } from "../trials/pcon_demos";
import { pconBlock1 } from "../config/pcon_config";
import pconBlock from "./pconBlock";

// contomst
import { omstinst_TL } from "../trials/omst_instructions.js";
import { omst_preload, instr_trial, debrief_block, omst_feedback } from "../trials/contOmst";
import setupomstBlock from "./omstBlock";
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

//const buildTimeline = () => (config.USE_MTURK ? mturkTimeline : buildPrimaryTimeline());

//const buildPrimaryTimeline = () => {
function buildTimeline(jsPsych, studyID, participantID) {
  // This makes heavy use of the conditional timelines to get the optional bits done.
  // TL;DR is that each phase gets its own timeline.  The conditional_function, if evaluating
  // to true, makes that phase active in the timeline.  If false, it gets skipped.  We use
  // the existing flags, include_XXX, as that conditional.
  console.log(`Building timeline for participant ${participantID} on study ${studyID}`);

  const primaryTimeline = [];

  // conditional timeline if consent form is included
  var optTL_consent = {
    timeline: [consent_trial],
    conditional_function: function () {
      return include_consent;
    },
    // if this is the first included trial, add login options to data here
    data: { login_data: consent_login_data },
  };

  // conditional timeline if demog form is included
  var optTL_demog = {
    timeline: [demogform],
    conditional_function: function () {
      return include_demog;
    },
    // if this is the first included trial, add login options to data here
    data: { login_data: demog_login_data },
  };

  // conditional timeline if pcon is included
  let pcon_TL = pconinst_TL;
  pcon_TL.unshift(pcon_preload);
  pcon_TL.push(pconBlock(pconBlock1));
  pcon_TL.push(pcon_end);
  var optTL_pcon = {
    timeline: pcon_TL,
    conditional_function: function () {
      return include_pcon;
    },
    // if this is the first included trial, add login options to data here
    data: { login_data: pcon_login_data },
  };

  // conditional timeline if instructions are included
  var optTL_instr = {
    timeline: omstinst_TL,
    conditional_function: function () {
      return include_instr;
    },
    // if this is the first included trial, add login options to data here
    data: { login_data: instr_login_data },
  };

  // conditional timeline if feedback is included at the end
  const incl_feedback = (jsPsych) => ({
    timeline: [omst_feedback(jsPsych)],
    conditional_function: function () {
      if (include_feedback) {
        return true;
      } else {
        return false;
      }
    },
  });

  // conditional timeline that runs the experiment if consent is given
  var consented = {
    timeline: [
      optTL_demog, // demographics form
      optTL_pcon, // perceptual control task
      optTL_instr, // instructions

      // continuous omst
      omst_preload,
      instr_trial, // instructions
      setupomstBlock(omstBlock, jsPsych), // looping trials
      //omstBlock,
      //testBlock(exptBlock1, jsPsych), // looping trials
      incl_feedback(jsPsych),
      debrief_block, // thank you

      end_message, // final thank you message
    ],
    conditional_function: function () {
      // if consent was given in consent trial or consent form not included,
      // run above timeline
      return consentGiven || !include_consent;
    },
    data: { login_data: cont_login_data },
  };

  // conditional timeline that runs ending message if participant does not consent
  var notConsented = {
    timeline: [not_consented],
    conditional_function: function () {
      return !consentGiven && include_consent;
    },
  };

  // push conditional consent and notconsented timelines to primary timeline
  primaryTimeline.push(optTL_consent, consented, notConsented);
  return primaryTimeline;
}

//----------------------- 4 ----------------------
//-------------------- EXPORTS -------------------

// include these options, get the timeline from this function.
export { jsPsychOptions, buildTimeline };
