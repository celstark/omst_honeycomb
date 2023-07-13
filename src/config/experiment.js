//*******************************************************************
//
//   File: experiment.js               Folder: config
//
//   Author: Honeycomb, Craig Stark, Audrey Hempel
//   --------------------
//
//   Changes:
//        6/?/23 (AGH): moved the timeline variables for contOMST
//                     test_trials
//
//   --------------------
//   This file defines the experiment changing conditions in repeated
//   trials (stimulus and data).
//
//*******************************************************************

//----------------------- 1 ----------------------
//-------------------- IMPORTS -------------------

import { defaultBlockSettings } from './main';
import { deepCopy } from '../lib/utils';
import { twochoice, trial_stim } from '../config/contOmstset';

//----------------------- 2 ----------------------
//-------------- TIMELINE VARIABLES --------------

//  sets up the tlv array to include the appropriate info from the seleced jsOrders file
var tlv = [];
var ntrials = trial_stim.length;
let DEBUGMODE = 0;
if (DEBUGMODE == 1) {
  ntrials = 20;
}
console.log('Building up the ' + ntrials + ' trials');
for (var i = 0; i < ntrials; i++) {
  // in corr_resp: 0=old, 1=sim, 2=new
  let trial_info = trial_stim[i]; // added "let"
  let tr_type = 'foil';
  let cresp = 'n';
  if (trial_info.correct_resp == 0) {
    tr_type = 'target';
    cresp = 'o';
  } else if (trial_info.correct_resp == 1) {
    tr_type = 'lure';
    if (twochoice == 1) {
      cresp = 'n';
    } else {
      cresp = 's';
    }
  }
  let lure_bin = 0; // We may or may not have this in the order file
  if (trial_info.lbin && trial_info.lbin !== 'undefined') {
    lure_bin = trial_info.lbin;
  }
  // keycode 'n' (for 1 and 2) = 78, 'y' (for 0)=89
  // keycode 'n' (for 1 and 2) = 78, 'y' (for 0)=89, i=73, o=79
  //let obj={stimulus: trial_info.image, data: {condition: tr_type, correct_response: cresp, lbin:lure_bin}}

  for (var j = 0; j < trial_stim.length; j++) {
    // Delete our Set X_rs (just image name)
    trial_stim[j].image = trial_stim[j].image.replace('Set 1_rs/', '');
  }

  let obj = {
    stimulus: trial_info.image,
    data: { condition: tr_type, correct_response: cresp, lbin: lure_bin },
  };
  //console.log(i + '  bin: ' + lure_bin)
  tlv.push(obj);
}

//----------------------- 3 ----------------------
//-------------- EXPERIMENT BLOCK ----------------

// create copy of default settings
const exptBlock1 = deepCopy(defaultBlockSettings);

exptBlock1.conditions = tlv; //set the conditions of the trials to the array

//----------------------- 4 ----------------------
//-------------------- EXPORTS -------------------

export { tlv, exptBlock1 };
