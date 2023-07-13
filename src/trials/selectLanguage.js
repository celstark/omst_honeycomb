//*******************************************************************
//
//   File: selectLanguage.js               Folder: trials
//
//   Author: Audrey Hempel
//   --------------------
//
//   Changes:
//        6/?/23 (AGH):
//        7/13/23 (AGH): added task data property
//
//   --------------------
//   This trial allows the participant to choose between language
//   options.
//
//*******************************************************************

//----------------------- 1 ----------------------
//-------------------- IMPORTS -------------------

import surveyMultiChoice from '@jspsych/plugin-survey-multi-choice';

//----------------------- 2 ----------------------
//--------------------- TRIAL --------------------

// language file direct holder
var lang = null;

// select language trial
var select_pref_lang = {
  type: surveyMultiChoice,
  questions: [
    {
      prompt: '<p> Please select a language. </p>',
      options: ['English', 'Español', '한국인'],
      name: 'lang',
      required: true,
    },
  ],
  data: { task: 'language' },
  on_finish: function (data) {
    if (data.response.lang == 'Español') {
      lang = require('../language/omst_spa.json');
    } else if (data.response.lang == '한국인') {
      lang = require('../language/omst_kor.json');
    } else {
      lang = require('../language/omst_en.json');
    }
  },
};

//----------------------- 3 ----------------------
//-------------------- EXPORTS -------------------

export { lang, select_pref_lang };
