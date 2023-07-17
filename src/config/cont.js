//*******************************************************************
//
//   File: contOmstset.js               Folder: config
//
//   Author: Craig Stark, Audrey Hempel
//   --------------------
//
//   Changes:
//        6/27/23 (AGH): created config for contOmst
//                       imported jsorders files
//                       removed .js from end of orderfile 
//
//   --------------------
//   This file defines all of the continuous trial config variables that set
//   up the stimuli and experiment settings.
//
//*******************************************************************

//----------------------- 1 ----------------------
//-------------------- IMPORTS -------------------

// importing each unique trial stimulus sets
import { ts1_1_1 } from './jsOrders/cMST_Imbal2_orders_1_1_1';
import { ts1_2_1 } from './jsOrders/cMST_Imbal2_orders_1_2_1';
import { ts2_1_1 } from './jsOrders/cMST_Imbal2_orders_2_1_1';
import { ts2_2_1 } from './jsOrders/cMST_Imbal2_orders_2_2_1';
import { ts3_1_1 } from './jsOrders/cMST_Imbal2_orders_3_1_1';
import { ts3_2_1 } from './jsOrders/cMST_Imbal2_orders_3_2_1';
import { ts4_1_1 } from './jsOrders/cMST_Imbal2_orders_4_1_1';
import { ts4_2_1 } from './jsOrders/cMST_Imbal2_orders_4_2_1';
import { ts5_1_1 } from './jsOrders/cMST_Imbal2_orders_5_1_1';
import { ts5_2_1 } from './jsOrders/cMST_Imbal2_orders_5_2_1';
import { ts6_1_1 } from './jsOrders/cMST_Imbal2_orders_6_1_1';
import { ts6_2_1 } from './jsOrders/cMST_Imbal2_orders_6_2_1';

//----------------------- 2 ----------------------
//------------------- VARIABLES ------------------

// [set=#]: Stimulus set -- 1-6 (1=default) -- used in loading the order file
var stim_set = '1';

//  [trialorder=#]: Which base order file? (1-4, 1=default)  -- controls ordering of conditions in a run
var trialorder = '1';

// [run=#]: Which particular run? (1-1, 1=default) -- controls which actual stimuli in that set are plugged into the order
var run = '1';

// [twochoice=#]: 0=OSN, 1=ON response choices (0=default)
var twochoice = '0'; // 0 

// [selfpaced=#]: Should we allow infinite time with blank screen to make the response? (default =1)
var selfpaced = '1';

// set orderfile: jsOrders/cMST_Imbal2_orders_[set]_[order]_[run].js
var orderprefix = './jsOrders/cMST_Imbal2_orders_';
var orderfile = orderprefix + stim_set + '_' + trialorder + '_' + run;

// initialize var to store jsOrderfile array
var trial_stim;

// load trial_stim depending on selected orderfile
if (orderfile == './jsOrders/cMST_Imbal2_orders_1_1_1') {
  trial_stim = ts1_1_1;
} else if (orderfile == './jsOrders/cMST_Imbal2_orders_1_2_1') {
  trial_stim = ts1_2_1;
} else if (orderfile == './jsOrders/cMST_Imbal2_orders_2_1_1') {
  trial_stim = ts2_1_1;
} else if (orderfile == './jsOrders/cMST_Imbal2_orders_2_2_1') {
  trial_stim = ts2_2_1;
} else if (orderfile == './jsOrders/cMST_Imbal2_orders_3_1_1') {
  trial_stim = ts3_1_1;
} else if (orderfile == './jsOrders/cMST_Imbal2_orders_3_2_1') {
  trial_stim = ts3_2_1;
} else if (orderfile == './jsOrders/cMST_Imbal2_orders_4_1_1') {
  trial_stim = ts4_1_1;
} else if (orderfile == './jsOrders/cMST_Imbal2_orders_4_2_1') {
  trial_stim = ts4_2_1;
} else if (orderfile == './jsOrders/cMST_Imbal2_orders_5_1_1') {
  trial_stim = ts5_1_1;
} else if (orderfile == './jsOrders/cMST_Imbal2_orders_5_2_1') {
  trial_stim = ts5_2_1;
} else if (orderfile == './jsOrders/cMST_Imbal2_orders_6_1_1') {
  trial_stim = ts6_1_1;
} else if (orderfile == './jsOrders/cMST_Imbal2_orders_6_2_1') {
  trial_stim = ts6_2_1;
}

//----------------------- 3 ----------------------
//-------------------- EXPORTS -------------------

export { stim_set, twochoice, selfpaced, orderfile, trial_stim };
