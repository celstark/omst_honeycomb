import { /*lang,*/ config } from '../config/main';
import preamble from './preamble';
import testBlock from './testBlock';
import taskBlock from './taskBlock';
// import { countdown, showMessage } from '@brown-ccv/behavioral-task-trials';
import { cameraStart, cameraEnd } from '../trials/camera';
// import { practiceBlock } from '../config/practice';
import { tutorialBlock } from '../config/tutorial';
import { exptBlock1,  exptBlock2 } from '../config/experiment';
import { select_pref_lang } from '../trials/selectLanguage';
import { select_resp_type } from '../trials/selectRespType';
//import { demogform } from '../trials/cmstDemographics';
//import { intro, new1, new2, new3, repeat1, lure1, side_by_side1, new4, new5, repeat2, lure2, side_by_side2, outtro } from '../trials/cmstInstructions';
import { preload, instr1_trial, /*test_trials*/ debrief_block } from '../trials/contOmst';

// Add your jsPsych options here.
// Honeycomb will combine these custom options with other options needed by Honyecomb.
const jsPsychOptions = {
  on_trial_finish: function (data) {
    console.log('A trial just ended, here are the latest data:');
    console.log(data);
  },
  default_iti: 250,
};

// Add your jsPsych timeline here.
// Honeycomb will call this function for us after the subject logs in, and run the resulting timeline.
// The instance of jsPsych passed in will include jsPsychOptions above, plus other options needed by Honeycomb.
const buildTimeline = (jsPsych) =>
  config.USE_MTURK ? mturkTimeline : buildPrimaryTimeline(jsPsych);

const buildPrimaryTimeline = (jsPsych) => {
  const primaryTimeline = [
    //preamble,
    // ageCheck,
    // sliderCheck,
    // countdown({ message: lang.countdown.message1 }),
    // taskBlock(practiceBlock),
    // countdown({ message: lang.countdown.message2 }),
    // taskBlock(exptBlock1),
    // demographics,
    // iusSurvey,
    // debrief,
    
    //testBlock(exptBlock1)

    //preamble, // includes language selection, response mode selection, demographic form
    select_pref_lang,
    select_resp_type,
    // demogform,

    // intro, 
    // new1, 
    // new2, 
    // new3, 
    // repeat1, 
    // lure1, 
    // side_by_side1, 
    // new4, 
    // new5, 
    // repeat2, 
    // lure2, 
    // side_by_side2, 
    // outtro,


    preload,
    instr1_trial, 
    //test_trials,
    testBlock(exptBlock1) ,
    debrief_block

  ];

  if (config.USE_CAMERA) {
    primaryTimeline.splice(1, 0, cameraStart(jsPsych));
    primaryTimeline.push(cameraEnd(5000));
  }

  primaryTimeline.push(
    // showMessage(config, {
    //   duration: 5000,
    //   message: lang.task.end,
    // })
  );

  return primaryTimeline;
};

const mturkTimeline = [
  preamble,
  //countdown({ message: lang.countdown.message1 }),
  taskBlock(tutorialBlock),
  //countdown({ message: lang.countdown.message2 }),
  taskBlock(exptBlock2),
  // showMessage(config, {
  //   duration: 5000,
  //   message: lang.task.end,
  // }),
];

// Honeycomb, please include these options, and please get the timeline from this function.
export { jsPsychOptions, buildTimeline };
