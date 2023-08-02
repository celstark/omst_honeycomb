// <!DOCTYPE html>
// <html>
//  <!--
//   Task: cMST (clinical-optimized MST) Continuous version
//   Author: Craig Stark
//   Forked from main cMST_cs_v1 on 5/7/20 and modified for the more traditional continuous MST
//   Forked again on 8/20/20, pulled out Cordova, and setup for JATOS

//   Currently, this is set to do a 256-trial continuous design with 32 lures & repeat pairs at
//     "short" lags of 4-12 and 32 lure and repeat pairs at "medium" lags of 20-100

//   Revised: November 20, 2019 (CELS) for Cordova
//    12/2/19 (CELS): using image height/width (new addition to plugin) and if end, returns to param screen
//    12/4/19 (CELS): Using .replace not .href and will take you back to index.html if the end
//    12/5/19 (CELS): Styles to alter text/button sizes, ensuring deviceready, meta-tag
//    12/6/19 (CELS): Fixed bug where stim-set wasn't being honored
//    12/6/19 (CELS): Shifted data saving to savedata.js and setup to allow local backup save on iOS
//    12/18/19 (CELS): Added d' outputs
//    4/13/20 (CELS): Added cmstset parameter
//    4/13/20 (CELS): Goes to end.html if this is the last phase
//    4/16/20 (CELS): Will detect if on SONA and go back there for credit
//    5/7/2020 (CELS): Fixed issue in d' calculations
//    5/13/2020 (CELS): Better fix for d' calculations
//    6/2/2020 (CELS): Fix bug in false-alarm to foil rate
//    8/20/20 (CELS): Forked off and reworked for JATOS
//    9/24/20 (CELS): Updated the commenting
//    9/25/20 (CELS): Added ability to have componentJson "force" some of the parameters
//    10/1/20 (CELS): No longer show data summary at end.  Log this to the main data field for easy extraction
//                    Will post results summary to JATOS batch data
//    12/1/20 (CELS): Added twochoice flag (default=1) and, if 0, will do traditional old/similar/new
//    1/3/22 (CELS): Added ability to force the order file prefix (force_orderprefix)

//    3/14/22 (CELS): Reworked a bit for being our continuous version of the cMST_v2.
//                   Set defaults to 3-choice and will used the imbalanced orders.
//                   Removed the video instructions
//                   Renamed to cont_cmst
//                   Phasename set to cMSTCont
//                   Set to use version-based jspsych folder
//    3/18/22 (CELS): Fixed old jspsych button/keyboard response code
//    5/3/22 (CELS): Added self-paced mode
//    5/31/22 (CELS): Added initial "instr1_trial" to fix iPad issue
//    7/12/22 (CELS): Fixed space-bar start bug
//                   Added logging of lbin if it exists in the order file
//    10/21/22 (CELS): Updated default to buttons and updated default order file based on Stark et al. "Optmizing ..."
//    11/2/22 (CELS): Setup to allow "baseurl" to specify a web-based location for the images
//    2/28/23 (CELS): Shifted to jsPsych 7 and added preloading images
//    3/7/23: (CELS): Changed the stim-set variable to set_omst

//   Optional parameters:
//   In the JATOS versions, these come in via jatos.studySessionData while in Cordova, we pass
//   them in as URL parameters.  Check the code as the actual variable names differ a touch b/n versions.
//   (these are the JATOS ones)

//   Optional parameters:
//   [sid=##]: Subject ID -- used for data file name (default=1234)
//   [resp_mode=X]: Response mode -- set to 'keyboard' to use keyboard, anything else to use buttons (default=buttons)
//   [set=#]: Stimulus set -- 1-6 (1=default) -- used in loading the order file
//   [set_omst=#]: Same as above, but even over-rides the above.  Useful if using the cMST and MST in the same experiment
//   [trialorder=XX]: Which base order file? (1-4, 1=default)  -- controls ordering of conditions in a run
//   [run=XX]: Which particular run? (1-1, 1=default) -- controls which actual stimuli in that set are plugged into the order
//   [twochoice=X]: 0=OSN, 1=ON response choices (0=default)
//   [selfpaced=X]: Should we allow infinite time with blank screen to make the response? (default =1)

//   Note, if there is a studySessionData variable called "order" (and one called "taskindex") it will use this to
//   queue up the next task.

//   More parameters:
//   You can set the component's JSON input to:
//   [force_set=X]: Force a stimulus set (1-6)
//   [force_twochoice=X]
//   [force_orderprefix=X]: Force a particular stimulus order.

//   Note - needs order files in 'jsOrder' and needs image files in 'Set #_rs'
//   order files are jsOrders/cMST_Imbal2_orders_[set]_[order]_[run].js

//   Note, if you use the "baseurl" bit to specify a webserver with the images, you'll need to update the Content-Security-Policy below
//   For example, I use:   img-src 'self' https://starklab.bio.uci.edu data: content:;
// -->

// <head>
//  <meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap:  'unsafe-inline' 'unsafe-eval'
//         https://fonts.gstatic.com ;
//       style-src 'self' 'unsafe-inline' https://fonts.googleapis.com/css; media-src *;
//       img-src 'self' data: content:;">

//   <script type="text/javascript" src="jatos.js"></script>
//   <script type="text/javascript" src="js/index.js"></script>
//   <script src="js/jquery-3.1.1.min.js"></script>
//   <script src="js/jspsych_731/dist/jspsych.js"></script>
//   <script src="js/jquery-3.1.1.min.js"></script>
//   <script src="js/jspsych_731/dist/plugin-html-keyboard-response.js"></script>
//   <script src="js/jspsych_731/dist/plugin-image-keyboard-response.js"></script>
//   <script src="js/jspsych_731/dist/plugin-html-button-response.js"></script>
//   <script src="js/jspsych_731/dist/plugin-image-button-response.js"></script>
//   <script src="js/jspsych_731/dist/plugin-video-button-response.js"></script>
//   <script src="js/jspsych_731/dist/plugin-video-keyboard-response.js"></script>
//   <script src="js/jspsych_731/dist/plugin-preload.js"></script>
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
// <body></body>

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
//
//   --------------------
//   This file includes the continuous oMST instructions and debrief trials
//   as well as the data anlaysis function for the cont oMST (it no longer
//   contains the looped trials or preload).
//
//*******************************************************************

//----------------------- 1 ----------------------
//-------------------- IMPORTS -------------------

import jsPsychHtmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';
import jsPsychHtmlButtonResponse from '@jspsych/plugin-html-button-response';

import { twochoice, lang, resp_mode } from '../components/Login';

import {invNormcdf } from '../lib/utils';

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

var instr_choice = function () {
  if (resp_mode == 'button') {
    return [lang.cont.button.instr_choice];
  } else {
    return lang.cont.key.instr_choice;
  }
};

var instr_prompt = function () {
  if (resp_mode == 'button') {
    return "<p>" + lang.cont.button.instr_prompt + "</p>";
  } else {
    return "<p>" + lang.cont.key.instr_prompt + "</p>";
  }
};

var instr_stim = function () {
  if (resp_mode == 'button') {
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
    type: (resp_mode == 'button' ? jsPsychHtmlButtonResponse: jsPsychHtmlKeyboardResponse),
    choices: instr_choice,
    prompt: instr_prompt,
    margin_horizontal: '40px',
    margin_vertical: '20px',
    //        button_html: '<button style="font-size: 150%" class="jspsych-btn">%choice%</button>',
    stimulus: instr_stim,
    // add task name to data collection
    data: { task: 'oMSTCont' },
  }
};

//---------------thank you--------------
// (button type not necessary)
var debrief_block = {
  type: jsPsychHtmlKeyboardResponse,
  trial_duration: 500,
  stimulus: function () {
    return lang.cont.ty;
  },
  // add task name to data collection
  data: { task: 'oMSTCont'},
};

var retstr;

var dataCalcFunction = (data) => {
   let validtrials = data.filterCustom(function (trial) {
      return trial.resp !== null;
    });
    let targets = validtrials.filter({ condition: 'target' });
    let lures = validtrials.filter({ condition: 'lure' });
    let foils = validtrials.filter({ condition: 'foil' });

    console.log('validtrials: ' + validtrials.count());
    console.log('targets: ' + targets.count());
    console.log('lures: ' + lures.count());
    console.log('foils: ' + foils.count());

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

      console.log(corr_targs.count() + ' ' + targets.count() + ' ' + p_hit);
      console.log(corr_lures.count() + ' ' + lures.count() + ' ' + p_fa_lure);
      console.log(corr_foils.count() + ' ' + foils.count() + ' ' + p_fa_foil);
      console.log(invNormcdf(p_hit));
      console.log(invNormcdf(p_fa_lure));
      console.log(invNormcdf(p_fa_foil));

      let dpTF = invNormcdf(p_hit) - invNormcdf(p_fa_foil);
      let dpTL = invNormcdf(p_hit) - invNormcdf(p_fa_lure);

      retstr =
        'HR, ' +
        hits +
        ', CR-L, ' +
        cr_lure +
        ', CR-F rate, ' +
        cr_foil +
        ", d'T:F, " +
        dpTF.toFixed(3) +
        ", d'T:L, " +
        dpTL.toFixed(3);

      console.log('retstr:' + retstr);

      return (retstr);

    } else {
      // OSN
      let targ_old = targets.filter({ resp: 'o' });
      let targ_sim = targets.filter({ resp: 's' });
      let targ_new = targets.filter({ resp: 'n' });
      let lure_old = lures.filter({ resp: 'o' });
      let lure_sim = lures.filter({ resp: 's' });
      let lure_new = lures.filter({ resp: 'n' });
      let foil_old = foils.filter({ resp: 'o' });
      let foil_sim = foils.filter({ resp: 's' });
      let foil_new = foils.filter({ resp: 'n' });

      let rec = targ_old.count() / targets.count() - foil_old.count() / foils.count();
      let ldi = lure_sim.count() / lures.count() - foil_sim.count() / foils.count();
      // removed var
      retstr = 'Valid, ' + targets.count() + ', ' + lures.count() + ', ' + foils.count() + '\n';
      retstr +=
        'Old, ' + targ_old.count() + ', ' + lure_old.count() + ', ' + foil_old.count() + '\n';
      retstr +=
        'Similar, ' + targ_sim.count() + ', ' + lure_sim.count() + ', ' + foil_sim.count() + '\n';
      retstr +=
        'New, ' + targ_new.count() + ', ' + lure_new.count() + ', ' + foil_new.count() + '\n';
      retstr += 'REC, ' + rec.toFixed(3) + ', LDI, ' + ldi.toFixed(3);

      console.log('ldi: ' + ldi);
      console.log('retstr: ' + retstr);

      return (retstr);
    }

    // let date = new Date();
    // let dcode = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + (date.getDate()+1) +
    //   "-" + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();

    // if (!jatos.batchSession.defined("/" + sid)) {  // Should have this by now, but to be safe -- make sure to create this as an array
    //   jatos.batchSession.add("/" + sid,[phasename+"_"+dcode+"_"+retstr]);
    // }
    // else { // Append to array
    //   jatos.batchSession.add("/" + sid + "/-",phasename+"_"+dcode+"_"+retstr);
    // }
    // data.summary = retstr;
    //jatos.batchSession.add("/"+idcode,{ [phasename + "_results"]: data.summary });
    //return '<p>Hit rate: ' + hits + '</p><p>CR-L rate: ' + cr_lure + '</p><p>CR-F rate: ' + cr_foil + '</p>'
    //return 'HR, ' + hits + ', CR-L, ' + cr_lure + ', CR-F rate, ' + cr_foil + ", d'T:F, " + dpTF.toFixed(3) + ", d'T:L, " + dpTL.toFixed(3)
    
};

  //   let validtrials = jsPsych.data.get().filterCustom(function (trial) {
  //     return trial.resp !== null;
  //   });
  //   let targets = validtrials.filter({ condition: 'target' });
  //   let lures = validtrials.filter({ condition: 'lure' });
  //   let foils = validtrials.filter({ condition: 'foil' });

  //   if (twochoice == 1) {
  //     let corr_targs = targets.filter({ correct: true });
  //     let corr_lures = lures.filter({ correct: true });
  //     let corr_foils = foils.filter({ correct: true });
  //     let hits = Math.round((corr_targs.count() / targets.count()) * 100);
  //     let cr_lure = Math.round((corr_lures.count() / lures.count()) * 100);
  //     let cr_foil = Math.round((corr_foils.count() / foils.count()) * 100);
  //     let p_fa_foil = 0.0;
  //     let p_fa_lure = 0.0;
  //     let p_hit = 0.0;
  //     if (corr_targs.count() == 0) {
  //       p_hit = 0.5 / targets.count();
  //     } else if (corr_targs.count() == targets.count()) {
  //       p_hit = (targets.count() - 0.5) / targets.count();
  //     } else {
  //       p_hit = corr_targs.count() / targets.count();
  //     }

  //     if (corr_lures.count() == lures.count()) {
  //       p_fa_lure = 0.5 / lures.count();
  //     } else if (corr_lures.count() == 0) {
  //       p_fa_lure = (lures.count() - 0.5) / lures.count();
  //     } else {
  //       p_fa_lure = 1 - corr_lures.count() / lures.count();
  //     }

  //     if (corr_foils.count() == foils.count()) {
  //       p_fa_foil = 0.5 / foils.count();
  //     } else if (corr_foils.count() == 0) {
  //       p_fa_foil = (foils.count() - 0.5) / foils.count();
  //     } else {
  //       p_fa_foil = 1 - corr_foils.count() / foils.count();
  //     }

  //     console.log(corr_targs.count() + ' ' + targets.count() + ' ' + p_hit);
  //     console.log(corr_lures.count() + ' ' + lures.count() + ' ' + p_fa_lure);
  //     console.log(corr_foils.count() + ' ' + foils.count() + ' ' + p_fa_foil);
  //     console.log(invNormcdf(p_hit));
  //     console.log(invNormcdf(p_fa_lure));
  //     console.log(invNormcdf(p_fa_foil));

  //     let dpTF = invNormcdf(p_hit) - invNormcdf(p_fa_foil);
  //     let dpTL = invNormcdf(p_hit) - invNormcdf(p_fa_lure);

  //     var retstr =
  //       'HR, ' +
  //       hits +
  //       ', CR-L, ' +
  //       cr_lure +
  //       ', CR-F rate, ' +
  //       cr_foil +
  //       ", d'T:F, " +
  //       dpTF.toFixed(3) +
  //       ", d'T:L, " +
  //       dpTL.toFixed(3);
  //   } else {
  //     // OSN
  //     let targ_old = targets.filter({ resp: 'o' });
  //     let targ_sim = targets.filter({ resp: 's' });
  //     let targ_new = targets.filter({ resp: 'n' });
  //     let lure_old = lures.filter({ resp: 'o' });
  //     let lure_sim = lures.filter({ resp: 's' });
  //     let lure_new = lures.filter({ resp: 'n' });
  //     let foil_old = foils.filter({ resp: 'o' });
  //     let foil_sim = foils.filter({ resp: 's' });
  //     let foil_new = foils.filter({ resp: 'n' });

  //     let rec = targ_old.count() / targets.count() - foil_old.count() / foils.count();
  //     let ldi = lure_sim.count() / lures.count() - foil_sim.count() / foils.count();
  //     // removed var
  //     retstr = 'Valid, ' + targets.count() + ', ' + lures.count() + ', ' + foils.count() + '\n';
  //     retstr +=
  //       'Old, ' + targ_old.count() + ', ' + lure_old.count() + ', ' + foil_old.count() + '\n';
  //     retstr +=
  //       'Similar, ' + targ_sim.count() + ', ' + lure_sim.count() + ', ' + foil_sim.count() + '\n';
  //     retstr +=
  //       'New, ' + targ_new.count() + ', ' + lure_new.count() + ', ' + foil_new.count() + '\n';
  //     retstr += 'REC, ' + rec.toFixed(3) + ', LDI, ' + ldi.toFixed(3);
  //   }

  //   // let date = new Date();
  //   // let dcode = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + (date.getDate()+1) +
  //   //   "-" + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();

  //   // if (!jatos.batchSession.defined("/" + sid)) {  // Should have this by now, but to be safe -- make sure to create this as an array
  //   //   jatos.batchSession.add("/" + sid,[phasename+"_"+dcode+"_"+retstr]);
  //   // }
  //   // else { // Append to array
  //   //   jatos.batchSession.add("/" + sid + "/-",phasename+"_"+dcode+"_"+retstr);
  //   // }
  //   data.summary = retstr;
  //   //jatos.batchSession.add("/"+idcode,{ [phasename + "_results"]: data.summary });
  //   //return '<p>Hit rate: ' + hits + '</p><p>CR-L rate: ' + cr_lure + '</p><p>CR-F rate: ' + cr_foil + '</p>'
  //   //return 'HR, ' + hits + ', CR-L, ' + cr_lure + ', CR-F rate, ' + cr_foil + ", d'T:F, " + dpTF.toFixed(3) + ", d'T:L, " + dpTL.toFixed(3)
  // },
//};

//----------------------- 4 ----------------------
//--------------------- EXPORTS -------------------

export { refresh_cont_trials, instr_trial, debrief_block, dataCalcFunction, retstr };

