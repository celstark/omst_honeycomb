import htmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';
import testTrial from './testTrial';
import { generateStartingOpts } from '../lib/taskUtils';

// testBlock

const testBlock = (blockSettings) => {
  // initialize block
  const startingOpts = generateStartingOpts(blockSettings);

  const blockDetails = {
    block_earnings: 0.0,
    optimal_earnings: 0.0, 
    continue_block: true,
  };

  // timeline = loop through trials
  const timeline = startingOpts.map((condition) =>
    testTrial(blockSettings, blockDetails, condition)
  );

  const blockStart = {
    type: htmlKeyboardResponse,
    stimulus: '',
    trial_duration: 1,
    on_finish: (data) => {
      data.block_settings = blockSettings;
    },
  };

  timeline.unshift(blockStart);

  return {
    type: htmlKeyboardResponse,
    timeline,
  };
};

export default testBlock;
