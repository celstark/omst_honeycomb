import { lang } from './selectLanguage';
import jsPsychHtmlButtonResponse from '@jspsych/plugin-html-button-response';
import jsPsychHtmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';


// functions for formatted stimulus and button choices
var irb_stim = function () {
    return '<div id="consenttext"> <h1 style="text-align: center">' + lang.consent.title + '</h1><br><br>'+ lang.consent.study.uni + lang.consent.study.sis + lang.consent.study.num + '<br>' + lang.consent.researcher.title + lang.consent.researcher.name + lang.consent.researcher.dept + lang.consent.researcher.tele + '<a href="mailto:cestark@uci.edu">' + lang.consent.researcher.email + '</a><br><ul>' + lang.consent.text + '<br><br>' + lang.consent.prompt + '</div>';
};

var buttons = function() {
    return ['<div id="agreeButton">' + lang.consent.buttons.agree + '</div>', '<div id="cancelButton">' + lang.consent.buttons.cancel + '</div>']
};

// consent trial settup
var consentGiven = null;

var consent_trial = {
    type: jsPsychHtmlButtonResponse,
    stimulus: irb_stim,
    choices: buttons,
    on_finish: function(data) {
        if (data.response == 0) {
            consentGiven = true; //var used to run conditional timeline
        }
        else {
            consentGiven = false;
        }
    }
}

// trial called in conditional timeline if participant does not consent
var not_consented = {
    type: jsPsychHtmlKeyboardResponse,
    trial_duration: 1000,
    stimulus: function() {
      return lang.end.nc;
    }
}

export { consent_trial, consentGiven, not_consented };