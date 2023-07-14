//*******************************************************************
//
//   File: testTrial.js               Folder: timelines
//
//   Author: Honeycomb, Audrey Hempel
//   --------------------
//
//   Changes:
//        6/28/23 (AGH): copied from honeycomb taskTrial
//        6/28/23 (AGH): moved repeat test_trials from ./trials/contOmst 
//                       set up stimulus from tlv argument
//                       imported (new) set image objects form ../lib/utils
//        7/11/23 (AGH): added data to include condition.data (set, selfpaced,
//                       orderfile) in each repeated trial data
//        7/13/23 (AGH): moved set, selfpaced, orderfile declaration to here instead of JsPsychExperiment
//                       added task data property
//                       changed arg condition --> tlv
//
//   --------------------
//   This file sets up an iteration of the test trial (/trials/trialCont.js)
//   with the appropriate stimulus and data parameters from the passed in
//   tlv argument.
//
//*******************************************************************

//----------------------- 1 ----------------------
//-------------------- IMPORTS -------------------

import jsPsychImageKeyboardResponse from '@jspsych/plugin-html-keyboard-response';
import { config } from '../config/main';

// image objects that allow image path of each set (based on stim_set)
import {
  set1Images,
  set2Images,
  set3Images,
  set4Images,
  set5Images,
  set6Images,
} from '../lib/utils';
import { stim_set, orderfile, selfpaced } from '../config/contOmstset';
//import { resp_mode } from '../trials/selectRespType';

// default settings for a contOmst trial
import { contTrial } from '../trials/trialCont';

//----------------------- 2 ----------------------
//-------------------- TIMELINE ------------------

// sets up a basic trial in the contOmst, gets repeated for each element of the trial_stim array in testBlock

const testTrial = (blockSettings, blockDetails, tlv) => {
  // timeline
  const timeline = [
    contTrial(config, {
      image: function () {
        if (stim_set == 1) {
          return set1Images[tlv.stimulus];
        } else if (stim_set == 2) {
          return set2Images[tlv.stimulus];
        } else if (stim_set == 3) {
          return set3Images[tlv.stimulus];
        } else if (stim_set == 4) {
          return set4Images[tlv.stimulus];
        } else if (stim_set == 5) {
          return set5Images[tlv.stimulus];
        } else if (stim_set == 6) {
          return set6Images[tlv.stimulus];
        }
      },
      data: function () {
        // tlv data conditions
        let condition = tlv.data.condition;
        let correct_response = tlv.data.correct_response;
        let lbin = tlv.data.lbin;
        // return with other data properties
        return {
          condition,
          correct_response,
          lbin,
          task: 'oMSTCont',
          set: stim_set,
          selfpaced: selfpaced,
          orderfile: orderfile,
        };
      },
    }),
  ];

  return {
    type: jsPsychImageKeyboardResponse,
    timeline,
  };
};

//----------------------- 3 ----------------------
//--------------------- EXPORT -------------------

export default testTrial;
