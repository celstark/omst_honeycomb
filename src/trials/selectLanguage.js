//*******************************************************************
//
//   File: selectLanguage.js               Folder: trials
//
//   Author: Audrey Hempel
//   --------------------
//
//   Changes:
//        6/20/23 (AGH): initial trial for language selection
//        6/22/23 (AGH): added korean
//        7/13/23 (AGH): added task data property
//        7/17/23 (AGH): added chinese
//        7/24/23 (AGH): added startDate to record the time the
//                       experiment begins
//
//   --------------------
//   This trial allows the participant to choose between language
//   options.
//
//*******************************************************************

//----------------------- 1 ----------------------
//-------------------- IMPORTS -------------------

import surveyMultiChoice from '@jspsych/plugin-survey-multi-choice';
import { getFormattedDate } from '../lib/utils';

//----------------------- 2 ----------------------
//--------------------- TRIAL --------------------

// var to store the language file path
var lang = null;
var startDate = new Date();

// select language trial
var select_pref_lang = {
  type: surveyMultiChoice,
  questions: [
    {
      prompt: '<p> Please select a language. </p>',
      options: ['English', 'Español', '한국인', '中文'],
      name: 'lang',
      required: true,
    },
  ],
  data: { task: 'language', date: getFormattedDate(startDate) }, // add task name to data collection
  // update lang with appropriate language file path based on response
  on_finish: function (data) {
    if (data.response.lang == 'Español') {
      lang = require('../language/omst_spa.json');
    } else if (data.response.lang == '한국인') {
      lang = require('../language/omst_kor.json');
    } else if (data.response.lang == '中文') {
      lang = require('../language/omst_zho.json');
    } else {
      lang = require('../language/omst_en.json');
    }
  },
};

//----------------------- 3 ----------------------
//-------------------- EXPORTS -------------------

export { lang, select_pref_lang };
