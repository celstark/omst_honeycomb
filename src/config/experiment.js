/* eslint-disable */ 
//*******************************************************************
//
//   File: experiment.js               Folder: config
//
//   Author: Honeycomb, Craig Stark, Audrey Hempel
//   --------------------
//
//   Changes:
//        6/28/23 (AGH): moved the timeline variables for contOMST
//                       test_trials from ./trials
//                       set up tlv as exptBlock1 conditions
//        7/18/23 (AGH): encapsulated everthing into the function 
//                       loadExptBlock1 (allows trial_stim and stim_set
//                       options chosen on Login)
//                       added var exptImage to include the set#Image
//                       objects (previously in /trials/testTrial) and
//                       edit image name for each set (now tlv.stimulus)
//        5/5/24 (CELS): Renamed exptBlock to omstBlock
//
//   --------------------
//   This file contains a function that defines the experiment's changing 
//   conditions in repeated trials (stimulus and data).
//
//*******************************************************************

//----------------------- 1 ----------------------
//-------------------- IMPORTS -------------------

import { defaultBlockSettings } from './main';
import { deepCopy } from '../lib/utils';
import { twochoice } from '../App/components/Login';
// image objects that allow image path of each set (based on stim_set)
import {
  set1Images,
  set2Images,
  set3Images,
  set4Images,
  set5Images,
  set6Images,
} from '../lib/utils';

//----------------------- 2 ----------------------
//---------- TIMELINE VARIABLE FUNCTION-----------

//  sets up the tlv array to include the appropriate info from the seleced jsOrders file

function loadOMSTBlock (trial_stim, stim_set) {
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

    // initialize exptImage var
    var exptImage;

    // Assign exptImage to the right path for the selected stim set
    if (stim_set == '1') {
      // Delete the Set X_rs from the image name
      trial_stim[i].image = trial_stim[i].image.replace('Set 1_rs/', '');
      exptImage = set1Images[trial_info.image];
    } 
    else if (stim_set == '2') {
      trial_stim[i].image = trial_stim[i].image.replace('Set 2_rs/', '');
      exptImage = set2Images[trial_info.image];
    } 
    else if (stim_set == '3') {
      trial_stim[i].image = trial_stim[i].image.replace('Set 3_rs/', '');
      exptImage = set3Images[trial_info.image];
    } 
    else if (stim_set == '4') {
      trial_stim[i].image = trial_stim[i].image.replace('Set 4_rs/', '');
      exptImage = set4Images[trial_info.image];
    } 
    else if (stim_set == '5') {
      trial_stim[i].image = trial_stim[i].image.replace('Set 5_rs/', '');
      exptImage = set5Images[trial_info.image];
    } 
    else if (stim_set == '6') {
      trial_stim[i].image = trial_stim[i].image.replace('Set 6_rs/', '');
      exptImage = set6Images[trial_info.image];
    }
    
    // create the timeline variable object
    let obj = {
      stimulus: exptImage,
      data: { condition: tr_type, correct_response: cresp, lbin: lure_bin },
    };
    //console.log(i + '  bin: ' + lure_bin)
    tlv.push(obj); // add it to the array of timeline variables
  }

  //----------------------- 3 ----------------------
  //------------ oMST EXPERIMENT BLOCK --------------

  // create copy of default settings
  var omstBlock = deepCopy(defaultBlockSettings);
  omstBlock.conditions = tlv; //set the conditions of the trials to the array
  return omstBlock;
}

//----------------------- 4 ----------------------
//--------------------- EXPORT -------------------

export { loadOMSTBlock as loadOMSTBlock };
