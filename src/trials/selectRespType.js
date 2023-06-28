import surveyMultiChoice from '@jspsych/plugin-survey-multi-choice';
import { lang } from '../trials/selectLanguage';

var resp_mode = null;

var select_resp_type = {
  type: surveyMultiChoice,
  questions: [{
    prompt: function() {return lang.resp.prompt},
    options: function() {return [lang.resp.choices.keyboard, lang.resp.choices.buttons]},
    name: 'resp',
    required: true,
  }],    
  on_finish: function(data) {
    if (data.response.resp == lang.resp.choices.keyboard) {
      resp_mode = ('keyboard');
    }
    else if (data.response.resp == lang.resp.choices.buttons) {
      resp_mode = ('button');
    };
  }
};

export { select_resp_type, resp_mode };
