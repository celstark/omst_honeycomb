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
//------------------- FUNCTIONS ------------------

// write the orderfile path depending on selected set, trialorder and run options
function writeOrderfile(stim_set, trialorder, run) {
  var orderprefix = './jsOrders/cMST_Imbal2_orders_';
  var orderfile = orderprefix + stim_set + '_' + trialorder + '_' + run 
  console.log('orderfile = ' + orderfile);
  return orderfile;
}

// load trial_stim depending on selected orderfile
function loadOrderfile(orderfile) {

  var trial_stim;

  if (orderfile == './jsOrders/cMST_Imbal2_orders_1_1_1') {
    return trial_stim = ts1_1_1;
  } 
  else if (orderfile == './jsOrders/cMST_Imbal2_orders_1_2_1') {
    return trial_stim = ts1_2_1;
  } 
  else if (orderfile == './jsOrders/cMST_Imbal2_orders_2_1_1') {
    return trial_stim = ts2_1_1;
  } 
  else if (orderfile == './jsOrders/cMST_Imbal2_orders_2_2_1') {
    return trial_stim = ts2_2_1;
  } 
  else if (orderfile == './jsOrders/cMST_Imbal2_orders_3_1_1') {
    return trial_stim = ts3_1_1;
  } 
  else if (orderfile == './jsOrders/cMST_Imbal2_orders_3_2_1') {
    return trial_stim = ts3_2_1;
  } 
  else if (orderfile == './jsOrders/cMST_Imbal2_orders_4_1_1') {
    return trial_stim = ts4_1_1;
  } 
  else if (orderfile == './jsOrders/cMST_Imbal2_orders_4_2_1') {
    return trial_stim = ts4_2_1;
  } 
  else if (orderfile == './jsOrders/cMST_Imbal2_orders_5_1_1') {
    return trial_stim = ts5_1_1;
  } 
  else if (orderfile == './jsOrders/cMST_Imbal2_orders_5_2_1') {
    return trial_stim = ts5_2_1;
  } 
  else if (orderfile == './jsOrders/cMST_Imbal2_orders_6_1_1') {
    return trial_stim = ts6_1_1;
  } 
  else if (orderfile == './jsOrders/cMST_Imbal2_orders_6_2_1') {
    return trial_stim = ts6_2_1;
  }
}

// //----------------------- 3 ----------------------
// //-------------------- EXPORTS -------------------

export { writeOrderfile, loadOrderfile };
