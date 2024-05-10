/* eslint-disable */ 
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
//        7/18/23 (AGH): moved all of the variables to /components/Login
//                       to be defined on options selection at Login
//                       changed orderfile defining into a function
//                       that returns the value
//                       changed trial_stim defining into a function
//                       that returns the value
//        8/9/23  (AGH): added and incorporated new 2x3 orderfiles
//        5/1/24 (CELS): Updated for classic tasks 
//
//   --------------------
//   This file includes the return functions writeOrderfile and loadOrderfile 
//   that set up the orderfile and stimulus sets based on the options
//   selection at Login. They are exported as variables from Login to be 
//   used throughout the app.
//
//*******************************************************************

//----------------------- 1 ----------------------
//-------------------- IMPORTS -------------------

// import { orderfile } from '../components/Login';
import { format } from  "../App/components/Login.jsx";

// importing each unique trial stimulus sets
// There must be a cleaner way...  But, if we're doing imports and not load/waits, they have to be at the top level here
import { ts2x3_1_1_1 } from './jsOrders/cMST_Imbal2x3_orders_1_1_1';
import { ts2x3_1_1_2 } from './jsOrders/cMST_Imbal2x3_orders_1_1_2';
import { ts2x3_1_1_3 } from './jsOrders/cMST_Imbal2x3_orders_1_1_3';
import { ts2x3_2_1_1 } from './jsOrders/cMST_Imbal2x3_orders_2_1_1';
import { ts2x3_2_1_2 } from './jsOrders/cMST_Imbal2x3_orders_2_1_2';
import { ts2x3_2_1_3 } from './jsOrders/cMST_Imbal2x3_orders_2_1_3';
import { ts2x3_3_1_1 } from './jsOrders/cMST_Imbal2x3_orders_3_1_1';
import { ts2x3_3_1_2 } from './jsOrders/cMST_Imbal2x3_orders_3_1_2';
import { ts2x3_3_1_3 } from './jsOrders/cMST_Imbal2x3_orders_3_1_3';
import { ts2x3_4_1_1 } from './jsOrders/cMST_Imbal2x3_orders_4_1_1';
import { ts2x3_4_1_2 } from './jsOrders/cMST_Imbal2x3_orders_4_1_2';
import { ts2x3_4_1_3 } from './jsOrders/cMST_Imbal2x3_orders_4_1_3';
import { ts2x3_5_1_1 } from './jsOrders/cMST_Imbal2x3_orders_5_1_1';
import { ts2x3_5_1_2 } from './jsOrders/cMST_Imbal2x3_orders_5_1_2';
import { ts2x3_5_1_3 } from './jsOrders/cMST_Imbal2x3_orders_5_1_3';
import { ts2x3_6_1_1 } from './jsOrders/cMST_Imbal2x3_orders_6_1_1';
import { ts2x3_6_1_2 } from './jsOrders/cMST_Imbal2x3_orders_6_1_2';
import { ts2x3_6_1_3 } from './jsOrders/cMST_Imbal2x3_orders_6_1_3';

import { tsc32_1_1_1 } from './jsOrders/MST_32_s1_p1_o1a';
import { tsc32_1_1_2 } from './jsOrders/MST_32_s1_p1_o1b';
import { tsc32_2_1_1 } from './jsOrders/MST_32_s2_p1_o1a';
import { tsc32_2_1_2 } from './jsOrders/MST_32_s2_p1_o1b';
import { tsc32_3_1_1 } from './jsOrders/MST_32_s3_p1_o1a';
import { tsc32_3_1_2 } from './jsOrders/MST_32_s3_p1_o1b';
import { tsc32_4_1_1 } from './jsOrders/MST_32_s4_p1_o1a';
import { tsc32_4_1_2 } from './jsOrders/MST_32_s4_p1_o1b';
import { tsc32_5_1_1 } from './jsOrders/MST_32_s5_p1_o1a';
import { tsc32_5_1_2 } from './jsOrders/MST_32_s5_p1_o1b';
import { tsc32_6_1_1 } from './jsOrders/MST_32_s6_p1_o1a';
import { tsc32_6_1_2 } from './jsOrders/MST_32_s6_p1_o1b';
import { tsc32_1_2_1 } from './jsOrders/MST_32_s1_p2_o1a';
import { tsc32_1_2_2 } from './jsOrders/MST_32_s1_p2_o1b';
import { tsc32_2_2_1 } from './jsOrders/MST_32_s2_p2_o1a';
import { tsc32_2_2_2 } from './jsOrders/MST_32_s2_p2_o1b';
import { tsc32_3_2_1 } from './jsOrders/MST_32_s3_p2_o1a';
import { tsc32_3_2_2 } from './jsOrders/MST_32_s3_p2_o1b';
import { tsc32_4_2_1 } from './jsOrders/MST_32_s4_p2_o1a';
import { tsc32_4_2_2 } from './jsOrders/MST_32_s4_p2_o1b';
import { tsc32_5_2_1 } from './jsOrders/MST_32_s5_p2_o1a';
import { tsc32_5_2_2 } from './jsOrders/MST_32_s5_p2_o1b';
import { tsc32_6_2_1 } from './jsOrders/MST_32_s6_p2_o1a';
import { tsc32_6_2_2 } from './jsOrders/MST_32_s6_p2_o1b';

import { tsc64_1_1_1 } from './jsOrders/MST_64_s1_p1_o1';
import { tsc64_2_1_1 } from './jsOrders/MST_64_s2_p1_o1';
import { tsc64_3_1_1 } from './jsOrders/MST_64_s3_p1_o1';
import { tsc64_4_1_1 } from './jsOrders/MST_64_s4_p1_o1';
import { tsc64_5_1_1 } from './jsOrders/MST_64_s5_p1_o1';
import { tsc64_6_1_1 } from './jsOrders/MST_64_s6_p1_o1';
import { tsc64_1_2_1 } from './jsOrders/MST_64_s1_p2_o1';
import { tsc64_2_2_1 } from './jsOrders/MST_64_s2_p2_o1';
import { tsc64_3_2_1 } from './jsOrders/MST_64_s3_p2_o1';
import { tsc64_4_2_1 } from './jsOrders/MST_64_s4_p2_o1';
import { tsc64_5_2_1 } from './jsOrders/MST_64_s5_p2_o1';
import { tsc64_6_2_1 } from './jsOrders/MST_64_s6_p2_o1';

//----------------------- 2 ----------------------
//------------------- FUNCTIONS ------------------

function loadOrder(format, stim_set, sublist, phase=1) {
  // codes are taskformat_stimset_phase_sublist like the filenames
  const codes = new Map([
    ["omst_1_1_1", ["./jsOrders/cMST_Imbal2x3_orders_1_1_1", ts2x3_1_1_1]],
    ["omst_2_1_1", ["./jsOrders/cMST_Imbal2x3_orders_2_1_1", ts2x3_2_1_1]],
    ["omst_3_1_1", ["./jsOrders/cMST_Imbal2x3_orders_3_1_1", ts2x3_3_1_1]],
    ["omst_4_1_1", ["./jsOrders/cMST_Imbal2x3_orders_4_1_1", ts2x3_4_1_1]],
    ["omst_5_1_1", ["./jsOrders/cMST_Imbal2x3_orders_5_1_1", ts2x3_5_1_1]],
    ["omst_6_1_1", ["./jsOrders/cMST_Imbal2x3_orders_6_1_1", ts2x3_6_1_1]],
    ["omst_1_1_2", ["./jsOrders/cMST_Imbal2x3_orders_1_1_2", ts2x3_1_1_2]],
    ["omst_2_1_2", ["./jsOrders/cMST_Imbal2x3_orders_2_1_2", ts2x3_2_1_2]],
    ["omst_3_1_2", ["./jsOrders/cMST_Imbal2x3_orders_3_1_2", ts2x3_3_1_2]],
    ["omst_4_1_2", ["./jsOrders/cMST_Imbal2x3_orders_4_1_2", ts2x3_4_1_2]],
    ["omst_5_1_2", ["./jsOrders/cMST_Imbal2x3_orders_5_1_2", ts2x3_5_1_2]],
    ["omst_6_1_2", ["./jsOrders/cMST_Imbal2x3_orders_6_1_2", ts2x3_6_1_2]],
    ["omst_1_1_3", ["./jsOrders/cMST_Imbal2x3_orders_1_1_3", ts2x3_1_1_3]],
    ["omst_2_1_3", ["./jsOrders/cMST_Imbal2x3_orders_2_1_3", ts2x3_2_1_3]],
    ["omst_3_1_3", ["./jsOrders/cMST_Imbal2x3_orders_3_1_3", ts2x3_3_1_3]],
    ["omst_4_1_3", ["./jsOrders/cMST_Imbal2x3_orders_4_1_3", ts2x3_4_1_3]],
    ["omst_5_1_3", ["./jsOrders/cMST_Imbal2x3_orders_5_1_3", ts2x3_5_1_3]],
    ["omst_6_1_3", ["./jsOrders/cMST_Imbal2x3_orders_6_1_3", ts2x3_6_1_3]],
    ["st32_1_1_1", ["./jsOrders/MST_32_s1_p1_o1a", tsc32_1_1_1 ]],
    ["st32_2_1_1", ["./jsOrders/MST_32_s2_p1_o1a", tsc32_2_1_1 ]],
    ["st32_3_1_1", ["./jsOrders/MST_32_s3_p1_o1a", tsc32_3_1_1 ]],
    ["st32_4_1_1", ["./jsOrders/MST_32_s4_p1_o1a", tsc32_4_1_1 ]],
    ["st32_5_1_1", ["./jsOrders/MST_32_s5_p1_o1a", tsc32_5_1_1 ]],
    ["st32_6_1_1", ["./jsOrders/MST_32_s6_p1_o1a", tsc32_6_1_1 ]],
    ["st32_1_1_2", ["./jsOrders/MST_32_s1_p1_o1b", tsc32_1_1_2 ]],
    ["st32_2_1_2", ["./jsOrders/MST_32_s2_p1_o1b", tsc32_2_1_2 ]],
    ["st32_3_1_2", ["./jsOrders/MST_32_s3_p1_o1b", tsc32_3_1_2 ]],
    ["st32_4_1_2", ["./jsOrders/MST_32_s4_p1_o1b", tsc32_4_1_2 ]],
    ["st32_5_1_2", ["./jsOrders/MST_32_s5_p1_o1b", tsc32_5_1_2 ]],
    ["st32_6_1_2", ["./jsOrders/MST_32_s6_p1_o1b", tsc32_6_1_2 ]],
    ["st32_1_2_1", ["./jsOrders/MST_32_s1_p2_o1a", tsc32_1_2_1 ]],
    ["st32_2_2_1", ["./jsOrders/MST_32_s2_p2_o1a", tsc32_2_2_1 ]],
    ["st32_3_2_1", ["./jsOrders/MST_32_s3_p2_o1a", tsc32_3_2_1 ]],
    ["st32_4_2_1", ["./jsOrders/MST_32_s4_p2_o1a", tsc32_4_2_1 ]],
    ["st32_5_2_1", ["./jsOrders/MST_32_s5_p2_o1a", tsc32_5_2_1 ]],
    ["st32_6_2_1", ["./jsOrders/MST_32_s6_p2_o1a", tsc32_6_2_1 ]],
    ["st32_1_2_2", ["./jsOrders/MST_32_s1_p2_o1b", tsc32_1_2_2 ]],
    ["st32_2_2_2", ["./jsOrders/MST_32_s2_p2_o1b", tsc32_2_2_2 ]],
    ["st32_3_2_2", ["./jsOrders/MST_32_s3_p2_o1b", tsc32_3_2_2 ]],
    ["st32_4_2_2", ["./jsOrders/MST_32_s4_p2_o1b", tsc32_4_2_2 ]],
    ["st32_5_2_2", ["./jsOrders/MST_32_s5_p2_o1b", tsc32_5_2_2 ]],
    ["st32_6_2_2", ["./jsOrders/MST_32_s6_p2_o1b", tsc32_6_2_2 ]],
    ["st64_1_1_1", ["./jsOrders/MST_64_s1_p1_o1a", tsc64_1_1_1 ]],
    ["st64_2_1_1", ["./jsOrders/MST_64_s2_p1_o1a", tsc64_2_1_1 ]],
    ["st64_3_1_1", ["./jsOrders/MST_64_s3_p1_o1a", tsc64_3_1_1 ]],
    ["st64_4_1_1", ["./jsOrders/MST_64_s4_p1_o1a", tsc64_4_1_1 ]],
    ["st64_5_1_1", ["./jsOrders/MST_64_s5_p1_o1a", tsc64_5_1_1 ]],
    ["st64_6_1_1", ["./jsOrders/MST_64_s6_p1_o1a", tsc64_6_1_1 ]],
    ["st64_1_2_1", ["./jsOrders/MST_64_s1_p2_o1a", tsc64_1_2_1 ]],
    ["st64_2_2_1", ["./jsOrders/MST_64_s2_p2_o1a", tsc64_2_2_1 ]],
    ["st64_3_2_1", ["./jsOrders/MST_64_s3_p2_o1a", tsc64_3_2_1 ]],
    ["st64_4_2_1", ["./jsOrders/MST_64_s4_p2_o1a", tsc64_4_2_1 ]],
    ["st64_5_2_1", ["./jsOrders/MST_64_s5_p2_o1a", tsc64_5_2_1 ]],
    ["st64_6_2_1", ["./jsOrders/MST_64_s6_p2_o1a", tsc64_6_2_1 ]],
  ]);
  let key=format+"_"+stim_set+"_"+phase+"_"+sublist;
  console.log('loadOrder called with key=',key)
  let vals=codes.get(key);
  console.log('val0',vals[0]);
  console.log('val1',vals[1][0]);
  return vals
}

/*
// write the orderfile path depending on selected set, trialorder and run options
function getOrderfilename(stim_set, sublist) {
  var orderprefix = './jsOrders/cMST_Imbal2x3_orders_'; // omst as default
  var orderfile = orderprefix + stim_set + '_1_' + sublist; 
  if (format == 'st32') {
    orderprefix = './jsOrders/MST_32_';
    orderfile = orderprefix + 's' + stim_set + '_p1_o1'; // we'll chage the p1 to p2 in mstt
    if (sublist == 1) {
      orderfile += 'a';
    }
    else {
      orderfile += 'b';
    }
  }
  else if (format == 'st64') {
    orderprefix = './jsOrders/MST_64_';
    orderfile = orderprefix + 's' + stim_set + '_p1_o1'; // we'll chage the p1 to p2 in mstt
  }
  console.log('orderfile = ' + orderfile);
  return orderfile;
}

// load trial_stim depending on selected orderfile
// TODO: I think this can be streamlined
function loadOrderfile(orderfile) {

  var trial_stim;
  console.log('searching for ',orderfile);
  if (orderfile == './jsOrders/cMST_Imbal2x3_orders_1_1_1') {
    return ts2x3_1_1_1;
  } 
  else if (orderfile == './jsOrders/cMST_Imbal2x3_orders_1_1_2') {
    return ts2x3_1_1_2;
  } 
  else if (orderfile == './jsOrders/cMST_Imbal2x3_orders_1_1_3') {
    return ts2x3_1_1_3;
  } 
  else if (orderfile == './jsOrders/cMST_Imbal2x3_orders_2_1_1') {
    return ts2x3_2_1_1;
  } 
  else if (orderfile == './jsOrders/cMST_Imbal2x3_orders_2_1_2') {
    return ts2x3_2_1_2;
  } 
  else if (orderfile == './jsOrders/cMST_Imbal2x3_orders_2_1_3') {
    return ts2x3_2_1_3;
  } 
  else if (orderfile == './jsOrders/cMST_Imbal2x3_orders_3_1_1') {
    return ts2x3_3_1_1;
  } 
  else if (orderfile == './jsOrders/cMST_Imbal2x3_orders_3_1_2') {
    return ts2x3_3_1_2;
  } 
  else if (orderfile == './jsOrders/cMST_Imbal2x3_orders_3_1_3') {
    return ts2x3_3_1_3;
  } 
  else if (orderfile == './jsOrders/cMST_Imbal2x3_orders_4_1_1') {
    return ts2x3_4_1_1;
  } 
  else if (orderfile == './jsOrders/cMST_Imbal2x3_orders_4_1_2') {
    return ts2x3_4_1_2;
  } 
  else if (orderfile == './jsOrders/cMST_Imbal2x3_orders_4_1_3') {
    return ts2x3_4_1_3;
  } 
  else if (orderfile == './jsOrders/cMST_Imbal2x3_orders_5_1_1') {
    return ts2x3_5_1_1;
  } 
  else if (orderfile == './jsOrders/cMST_Imbal2x3_orders_5_1_2') {
    return ts2x3_5_1_2;
  } 
  else if (orderfile == './jsOrders/cMST_Imbal2x3_orders_5_1_3') {
    return ts2x3_5_1_3;
  } 
  else if (orderfile == './jsOrders/cMST_Imbal2x3_orders_6_1_1') {
    return ts2x3_6_1_1;
  } 
  else if (orderfile == './jsOrders/cMST_Imbal2x3_orders_6_1_2') {
    return ts2x3_6_1_2;
  } 
  else if (orderfile == './jsOrders/cMST_Imbal2x3_orders_6_1_3') {
    return ts2x3_6_1_3;
  }
  console.log('not found');
} 
*/
// //----------------------- 3 ----------------------
// //-------------------- EXPORTS -------------------

export { loadOrder };
