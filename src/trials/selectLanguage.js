import surveyMultiChoice from '@jspsych/plugin-survey-multi-choice';

// language file direct holder
var lang = null; 

// select language trial
var select_pref_lang = {
  type: surveyMultiChoice,
  questions: [{
    prompt: '<p> Please select a language. </p>',
    options: ['English', 'Español', '한국인'],
    name: 'lang',
    required: true,
  }],
  on_finish: function(data) {
    if (data.response.lang == 'Español') {
      lang = require('../language/omst_spa.json');
    }
    else if (data.response.lang == '한국인'){
      lang = require('../language/omst_kor.json')
    }
    else {
      lang = require('../language/omst_en.json');
    }
  }
};

export { lang, select_pref_lang };