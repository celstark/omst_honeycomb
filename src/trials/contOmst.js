//*******************************************************************
//
//   File: contOmst.js               Folder: trials
//
//   Author: Craig Stark, Audrey Hempel
//   --------------------
//
//   Changes:
//        6/26/23 (AGH): began converting cont_omst.html into honeycomb template
//                       (adding imports, exports, removing JATOS code)
//        6/27/23 (AGH): moved config variables (stim_set, orderfile...)
//                       to /config/contOmstset.js
//                       made dynamic for lang and resp_mode
//        6/28/23 (AGH):  moved repeat test_trials to /trials/trialCont.js +
//                       /timelines/testTrial.js + /timelines/testBlock.js
//        6/28/23 (AGH):  moved timeline variables set up of test_trials
//                       as the condition of exptBlock1 in /config/experiment.js
//                       (gets called in main timeline as testBlock(exptBlock1))
//        7/6/23 (AGH):  deleted preload
//        7/13/23 (AGH): added task data property to trials
//        7/14/23 (AGH): split instructions into keyboard and button version
//        7/21/23 (AGH): made debrief data calculations a seperate function o
//                       exported to /components/JsPsychExperiment
//        7/26/23 (AGH): consolodated key and button constructions with
//                       refresh_cont_trials called at Login
//        7/27/23 (AGH): added paragraph markers to param functions (previously
//                       within text file)
//        8/1/23 (AGH):  moved invNormcdf function to utils, now imported
//        10/28/23 (CELS): Added preloading
//
//   --------------------
//   This file includes the continuous oMST instructions and debrief trials
//   as well as the data anlaysis function for the cont oMST (it no longer
//   contains the looped trials or preload).
//
//*******************************************************************

//----------------------- 1 ----------------------
//-------------------- IMPORTS -------------------

import jsPsychHtmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
import jsPsychHtmlButtonResponse from "@jspsych/plugin-html-button-response";
import jsPsychPreload from "@jspsych/plugin-preload";

import { twochoice, lang, resp_mode } from "../App/components/Login";

import { invNormcdf } from "../lib/utils";

// <script>
// function waitFor(conditionFunction) {
//   const poll = resolve => {
//   if(conditionFunction()) resolve();
//     else setTimeout(_ => poll(resolve), 400);
//   }
//   return new Promise(poll)
// }

// function leftFillNum(num, width){
//   return num
//   .toString()
//   .padStart(width,0)
// }

// jatos.onLoad(async function() {
//   //baseurl='https://starklab.bio.uci.edu/mst/'; // How we'll get images, videos, etc.  Set to empty string to use local folders
// var baseurl=''; // How we'll get images, videos, etc.  Set to empty string to use local folders
//   var sid=jatos.studySessionData['sid'];
//   if (typeof sid === 'undefined') {
//     sid=1234;
//   }
//   var resp_mode='button';
//   if (jatos.studySessionData['resp_mode'] == 'keyboard') {
//     resp_mode='keyboard';
//   }
//   var stim_set='1';
//   if (typeof jatos.studySessionData['set_omst'] !== 'undefined') {
//     stim_set = jatos.studySessionData['set_omst']
//   }
//   if (jatos.componentJsonInput && typeof jatos.componentJsonInput['force_set'] !== 'undefined') {
//     stim_set=jatos.componentJsonInput['force_set'];
//     console.log('Stim set forced via JSON component to ' + stim_set);
//   }
//   var trialorder='1';
//   if (typeof jatos.studySessionData['trialorder'] !== 'undefined') {
//     trialorder=jatos.studySessionData['trialorder'];
//   }
//   var run='1';
//   if (typeof jatos.studySessionData['run'] !== 'undefined') {
//     run=jatos.studySessionData['run'];
//   }
//   var twochoice=0;
//   if (typeof jatos.studySessionData['twochoice'] !== 'undefined') {
//     twochoice = jatos.studySessionData['twochoice']
//   }
//   if (jatos.componentJsonInput && typeof jatos.componentJsonInput['force_twochoice'] !== 'undefined') {
//     twochoice=jatos.componentJsonInput['force_twochoice'];
//     console.log('Two-choice mode forced via JSON component to ' + twochoice);
//   }
//   var selfpaced=1;
//   if (typeof jatos.studySessionData['selfpaced'] !== 'undefined') {
//     selfpaced = jatos.studySessionData['selfpaced']
//   }
//   var orderprefix = 'jsOrders/cMST_Imbal2_orders_';
//   if (jatos.componentJsonInput && typeof jatos.componentJsonInput['force_orderprefix'] !== 'undefined') {
//     orderprefix=jatos.componentJsonInput['force_orderprefix'];
//     console.log('Order prefix forced via JSON component to ' + orderprefix);
//   }

// // START OF CODE THAT SHOULD BE CONSTANT REGARDLESS OF JATOS / CORDOVA
// const phasename='oMSTCont';

// var jsPsych = initJsPsych();

// jsPsych.data.addProperties({
//   task: phasename,
//   subject: sid,
//   set: stim_set,
//   selfpaced: selfpaced,
//   orderfile: orderfile
// });

//----------------------- 2 ----------------------
//---------------- HELPER METHODS ----------------
// helper methods that setup prompts and response options based on keyboard/button and 2/3 choices

var omst_preload = {
  type: jsPsychPreload,
  auto_preload: true,
};

var instr_choice = function () {
  if (resp_mode == "button") {
    return [lang.cont.button.instr_choice];
  } else {
    return lang.cont.key.instr_choice;
  }
};

var instr_prompt = function () {
  if (resp_mode == "button") {
    return "<p>" + lang.cont.button.instr_prompt + "</p>";
  } else {
    return "<p>" + lang.cont.key.instr_prompt + "</p>";
  }
};

var instr_stim = function () {
  if (resp_mode == "button") {
    if (twochoice == 0) {
      return "<p>" + lang.cont.button.threechoice.instr_stim + "</p>";
    } else {
      return "<p>" + lang.cont.button.twochoice.instr_stim + "</p>";
    }
  } else {
    if (twochoice == 0) {
      return "<p>" + lang.cont.key.threechoice.instr_stim + "</p>";
    } else {
      return "<p>" + lang.cont.key.twochoice.instr_stim + "</p>";
    }
  }
};

//----------------------- 3 ----------------------
//--------------------- TRIALS -------------------

//-------------instructions-------------

var instr_trial = {};

function refresh_cont_trials() {
  instr_trial = {
    type: resp_mode == "button" ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
    choices: instr_choice,
    prompt: instr_prompt,
    margin_horizontal: "40px",
    margin_vertical: "20px",
    //        button_html: '<button style="font-size: 150%" class="jspsych-btn">%choice%</button>',
    stimulus: instr_stim,
    // add task name to data collection
    data: { task: "oMSTCont" },
  };
}

//---------------thank you--------------
// (button type not necessary)
var debrief_block = {
  type: jsPsychHtmlKeyboardResponse,
  trial_duration: 500,
  stimulus: function () {
    return lang.cont.ty;
  },
  // add task name to data collection
  data: { task: "oMSTCont" },
};

var retstr;

var dataCalcFunction = (data) => {
  let validtrials = data.filterCustom(function (trial) {
    return trial.resp !== null;
  });
  let targets = validtrials.filter({ condition: "target" });
  let lures = validtrials.filter({ condition: "lure" });
  let foils = validtrials.filter({ condition: "foil" });

  console.log("validtrials: " + validtrials.count());
  console.log("targets: " + targets.count());
  console.log("lures: " + lures.count());
  console.log("foils: " + foils.count());

  if (twochoice == 1) {
    let corr_targs = targets.filter({ correct: true });
    let corr_lures = lures.filter({ correct: true });
    let corr_foils = foils.filter({ correct: true });
    let hits = Math.round((corr_targs.count() / targets.count()) * 100);
    let cr_lure = Math.round((corr_lures.count() / lures.count()) * 100);
    let cr_foil = Math.round((corr_foils.count() / foils.count()) * 100);
    let p_fa_foil = 0.0;
    let p_fa_lure = 0.0;
    let p_hit = 0.0;
    if (corr_targs.count() == 0) {
      p_hit = 0.5 / targets.count();
    } else if (corr_targs.count() == targets.count()) {
      p_hit = (targets.count() - 0.5) / targets.count();
    } else {
      p_hit = corr_targs.count() / targets.count();
    }

    if (corr_lures.count() == lures.count()) {
      p_fa_lure = 0.5 / lures.count();
    } else if (corr_lures.count() == 0) {
      p_fa_lure = (lures.count() - 0.5) / lures.count();
    } else {
      p_fa_lure = 1 - corr_lures.count() / lures.count();
    }

    if (corr_foils.count() == foils.count()) {
      p_fa_foil = 0.5 / foils.count();
    } else if (corr_foils.count() == 0) {
      p_fa_foil = (foils.count() - 0.5) / foils.count();
    } else {
      p_fa_foil = 1 - corr_foils.count() / foils.count();
    }

    console.log(corr_targs.count() + " " + targets.count() + " " + p_hit);
    console.log(corr_lures.count() + " " + lures.count() + " " + p_fa_lure);
    console.log(corr_foils.count() + " " + foils.count() + " " + p_fa_foil);
    console.log(invNormcdf(p_hit));
    console.log(invNormcdf(p_fa_lure));
    console.log(invNormcdf(p_fa_foil));

    let dpTF = invNormcdf(p_hit) - invNormcdf(p_fa_foil);
    let dpTL = invNormcdf(p_hit) - invNormcdf(p_fa_lure);

    retstr =
      "HR, " +
      hits +
      ", CR-L, " +
      cr_lure +
      ", CR-F rate, " +
      cr_foil +
      ", d'T:F, " +
      dpTF.toFixed(3) +
      ", d'T:L, " +
      dpTL.toFixed(3);

    console.log("retstr:" + retstr);

    return retstr;
  } else {
    // OSN
    let targ_old = targets.filter({ resp: "o" });
    let targ_sim = targets.filter({ resp: "s" });
    let targ_new = targets.filter({ resp: "n" });
    let lure_old = lures.filter({ resp: "o" });
    let lure_sim = lures.filter({ resp: "s" });
    let lure_new = lures.filter({ resp: "n" });
    let foil_old = foils.filter({ resp: "o" });
    let foil_sim = foils.filter({ resp: "s" });
    let foil_new = foils.filter({ resp: "n" });

    let rec = targ_old.count() / targets.count() - foil_old.count() / foils.count();
    let ldi = lure_sim.count() / lures.count() - foil_sim.count() / foils.count();
    // removed var
    retstr = "Valid, " + targets.count() + ", " + lures.count() + ", " + foils.count() + "\n";
    retstr += "Old, " + targ_old.count() + ", " + lure_old.count() + ", " + foil_old.count() + "\n";
    retstr +=
      "Similar, " + targ_sim.count() + ", " + lure_sim.count() + ", " + foil_sim.count() + "\n";
    retstr += "New, " + targ_new.count() + ", " + lure_new.count() + ", " + foil_new.count() + "\n";
    retstr += "REC, " + rec.toFixed(3) + ", LDI, " + ldi.toFixed(3);

    console.log("ldi: " + ldi);
    console.log("retstr: " + retstr);

    return retstr;
  }
};
//----------------------- 4 ----------------------
//--------------------- EXPORTS -------------------

export { refresh_cont_trials, omst_preload, instr_trial, debrief_block, dataCalcFunction, retstr };
