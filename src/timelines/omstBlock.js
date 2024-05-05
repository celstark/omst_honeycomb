//*******************************************************************
//
//   File: omstBlock.js               Folder: timelines
//
//   Author: Honeycomb, Audrey Hempel
//   --------------------
//
//   Changes:
//        6/28/23 (AGH): copied from honeycomb taskBlock
//                       imported copied testTrial
//        7/13/23 (AGH): changed arg condition --> tlv
//        5/5/24 (CELS): renamed omstBlock.js and all internal bits as such
//
//   --------------------
//   This file loops through testTrial (/timelines/testTrial.js) using
//   the conditions (trial variables) passed into it (exptBlock1) in
//   /timelines/main.js.
//
//*******************************************************************

//----------------------- 1 ----------------------
//-------------------- IMPORTS -------------------

import htmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
import omstTrial from "./omstTrial";
import { generateStartingOpts } from "../lib/taskUtils";

//----------------------- 2 ----------------------
//-------------------- TIMELINE ------------------

// testBlock

const omstBlock = (blockSettings) => {
  // initialize block with starting options that set up looped trials
  const startingOpts = generateStartingOpts(blockSettings);

  const blockDetails = {
    block_earnings: 0.0,
    optimal_earnings: 0.0,
    continue_block: true,
  };

  // timeline = loop through trials
  const timeline = startingOpts.map((tlv) => omstTrial(blockSettings, blockDetails, tlv));

  const blockStart = {
    type: htmlKeyboardResponse,
    stimulus: "",
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

//----------------------- 3 ----------------------
//--------------------- EXPORT -------------------

export default omstBlock;
