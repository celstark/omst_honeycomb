//*******************************************************************
//
//   File: selectRespType.js               Folder: trials
//
//   Author: Audrey Hempel
//   --------------------
//
//   Changes:
//        6/20/23 (AGH): wrote initial trial for response selection
//        7/13/23 (AGH): added task data property
//
//   --------------------
//   This trial allows the participant to choose between respondings
//   with a computer keyboard or on-screen buttons. Value is assigned
//   to the var resp_mode to be used in other files.
//
//*******************************************************************

//----------------------- 1 ----------------------
//-------------------- IMPORTS -------------------

import surveyMultiChoice from '@jspsych/plugin-survey-multi-choice';
import { lang } from '../trials/selectLanguage';

//----------------------- 2 ----------------------
//--------------------- TRIAL --------------------

var resp_mode = null;

var select_resp_type = {
  type: surveyMultiChoice,
  questions: [
    {
      prompt: function () {
        return lang.resp.prompt;
      },
      options: function () {
        return [lang.resp.choices.keyboard, lang.resp.choices.buttons];
      },
      name: 'resp',
      required: true,
    },
  ],
  data: { task: 'resp_mode' },
  on_finish: function (data) {
    if (data.response.resp == lang.resp.choices.keyboard) {
      resp_mode = 'keyboard';
    } else if (data.response.resp == lang.resp.choices.buttons) {
      resp_mode = 'button';
    }
  },
};

//----------------------- 3 ----------------------
//-------------------- EXPORTS -------------------

export { select_resp_type, resp_mode };
