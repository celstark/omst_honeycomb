import jsPsychHtmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';
import { lang } from '../trials/selectLanguage';


var end_message = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
      return lang.end.ty;
    },
}

export { end_message };