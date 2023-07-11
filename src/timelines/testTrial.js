import jsPsychImageKeyboardResponse from '@jspsych/plugin-html-keyboard-response';
//import jsPsychImageButtonResponse from '@jspsych/plugin-image-button-response';

// for debugging -- testing array length
// import { showMessage } from '@brown-ccv/behavioral-task-trials';
// import { eventCodes } from '../config/main';
//import { tlv } from '../config/experiment'

import { config } from '../config/main';

// image objects that allow image path of each set (based on stim_set)
import { set1Images, set2Images, set3Images, set4Images, set5Images, set6Images } from '../lib/utils';
import { stim_set } from '../config/contOmstset';
//import { resp_mode } from '../trials/selectRespType';

// default settings for a contOmst trial
import { contTrial } from '../trials/trialCont';




// sets up a basic trial in the contOmst, gets repeated for each element of the trial_stim array in testBlock

const testTrial = (blockSettings, blockDetails, condition) => {
  // timeline
  const timeline = [
     contTrial (config, {
        image: function() {
            if (stim_set == 1){
                return set1Images[condition.stimulus]; 
            }
            else if (stim_set == 2){
                return set2Images[condition.stimulus];
            }
            else if (stim_set == 3){
                return set3Images[condition.stimulus];
            }
            else if (stim_set == 4){
                return set4Images[condition.stimulus];
            }
            else if (stim_set == 5){
                return set5Images[condition.stimulus];
            }
            else if (stim_set == 6){
                return set6Images[condition.stimulus];
            }
        },
        data: function() {return condition.data; },
     }),
    // showMessage(config, {
    //     message: tlv.length,
    //     onstart: true,
    //     taskCode: eventCodes.evidence,
    //   })
  ];

  return {
    type: jsPsychImageKeyboardResponse,
    timeline,
  };
};

export default testTrial;