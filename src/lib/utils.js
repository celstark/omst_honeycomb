//*******************************************************************
//
//   File: utils.js               Folder: lib
//
//   Author: Honeycomb, Audrey Hempel
//   --------------------
//
//   Changes:
//        6/28/23 (AGH): created new image objects to direct the
//                       path for different sets
//        7/24/23 (AGH): added getFormattedDate method (for adding
//                       date to beginning and end of data file)
//        8/1/23 (AGH):  moved invNormcdf from contOmst and pcon here
//
//   --------------------
//   This file holds various utility functions.
//
//*******************************************************************

//----------------------- 1 ----------------------
//-------------------- IMPORTS -------------------

import requireContext from 'require-context.macro';


//----------------------- 2 ----------------------
//----------------- IMAGE OBJECTS ----------------

// Discover and import images in src/assets/images.
// This produces an object that maps friendly image file names to obscure webpack path names.
// For example:
//   {
//     image1.png: '/static/media/image1.5dca7a2a50fb8b633fd5.png',
//     image2.png: '/static/media/image2.5dca7a2a50fb8b633fd5.png'
//   }
const importAll = (r) => {
  const importImageByName = (allImages, imageName) => {
    const friendlyName = imageName.replace('./', '');
    return { ...allImages, [friendlyName]: r(imageName) };
  };
  return r.keys().reduce(importImageByName, {});
};

const images = importAll(requireContext('../assets/images', false, /\.(png|jpe?g|svg)$/));

// 6/28/23 (AGH): adapted images object to direct for the different order sets
const set1Images = importAll(
  requireContext('../assets/images/Set1_rs', false, /\.(png|jpe?g|svg)$/)
);

const set2Images = importAll(
  requireContext('../assets/images/Set2_rs', false, /\.(png|jpe?g|svg)$/)
);

const set3Images = importAll(
  requireContext('../assets/images/Set3_rs', false, /\.(png|jpe?g|svg)$/)
);

const set4Images = importAll(
  requireContext('../assets/images/Set4_rs', false, /\.(png|jpe?g|svg)$/)
);

const set5Images = importAll(
  requireContext('../assets/images/Set5_rs', false, /\.(png|jpe?g|svg)$/)
);

const set6Images = importAll(
  requireContext('../assets/images/Set6_rs', false, /\.(png|jpe?g|svg)$/)
);

//----------------------- 3 ----------------------
//------------------- FUNCTIONS ------------------

function invNormcdf(p) {
  // https://stackoverflow.com/questions/8816729/javascript-equivalent-for-inverse-normal-function-eg-excels-normsinv-or-nor
  var a1 = -39.6968302866538,
    a2 = 220.946098424521,
    a3 = -275.928510446969;
  var a4 = 138.357751867269,
    a5 = -30.6647980661472,
    a6 = 2.50662827745924;
  var b1 = -54.4760987982241,
    b2 = 161.585836858041,
    b3 = -155.698979859887;
  var b4 = 66.8013118877197,
    b5 = -13.2806815528857,
    c1 = -7.78489400243029e-3;
  var c2 = -0.322396458041136,
    c3 = -2.40075827716184,
    c4 = -2.54973253934373;
  var c5 = 4.37466414146497,
    c6 = 2.93816398269878,
    d1 = 7.78469570904146e-3;
  var d2 = 0.32246712907004,
    d3 = 2.445134137143,
    d4 = 3.75440866190742;
  var p_low = 0.02425,
    p_high = 1 - p_low;
  var q, r;
  var retVal;

  if (p < 0 || p > 1) {
    alert('NormSInv: Argument out of range. Probability must be between 0 and 1.');
    retVal = 0;
  } else if (p < p_low) {
    q = Math.sqrt(-2 * Math.log(p));
    retVal =
      (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
      ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
  } else if (p <= p_high) {
    q = p - 0.5;
    r = q * q;
    retVal =
      ((((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q) /
      (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
  } else {
    q = Math.sqrt(-2 * Math.log(1 - p));
    retVal =
      -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
      ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
  }

  return retVal;
}

function getFormattedDate(date) {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const dayOfWeek = daysOfWeek[date.getUTCDay()];
  const month = months[date.getUTCMonth()];
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  const timezoneOffset = date.getTimezoneOffset();
  const timezoneOffsetHours = Math.abs(Math.floor(timezoneOffset / 60));
  const timezoneOffsetMinutes = Math.abs(timezoneOffset % 60);
  const timezoneSign = timezoneOffset > 0 ? '-' : '+';
  const timezoneName = 'Eastern Daylight Time'; // Replace this with the actual timezone name if needed.

  const formattedDate = `${dayOfWeek} ${month} ${day} ${year} ${hours}:${minutes}:${seconds} GMT${timezoneSign}${timezoneOffsetHours.toString().padStart(2, '0')}${timezoneOffsetMinutes.toString().padStart(2, '0')} (${timezoneName})`;
  return formattedDate;
}

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// add a random number between 0 and offset to the base number
const jitter = (base, offset) => base + Math.floor(Math.random() * Math.floor(offset));

// add a random number between 0 and 50 to the base number
const jitter50 = (base) => jitter(base, 50);

// flip a coin
const randomTrue = () => Math.random() > 0.5;

// deeply copy an object
const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

// format a number as a dollar amount
const formatDollars = (amount) => '$' + parseFloat(amount).toFixed(2);

// create a pre-trial wait period
const generateWaitSet = (trial, waitTime) => {
  const waitTrial = Object.assign({}, trial);
  waitTrial.trial_duration = waitTime;
  waitTrial.response_ends_trial = false;
  waitTrial.prompt = '-';

  return [waitTrial, trial];
};

// As of jspsych 7, we instantiate jsPsych where needed insead of importing it globally.
// The jsPsych instance passed in here should be the same one used for the running task.
const startKeypressListener = (jsPsych) => {
  const keypressResponse = (info) => {
    const data = {
      key_press: info.key,
    };

    jsPsych.finishTrial(data);
  };

  const keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
    callback_function: keypressResponse,
    valid_responses: ['ALL_KEYS'],
    persist: false,
  });

  return keyboardListener;
};

const getQueryVariable = (variable) => {
  const query = window.location.search.substring(1);
  const vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
};

const getProlificId = () => {
  const prolificId = getQueryVariable('PROLIFIC_PID');
  return prolificId;
};

const beep = (audioCodes) => {
  const context = new AudioContext(); // eslint-disable-line no-undef
  const o = context.createOscillator();
  const g = context.createGain();
  o.type = audioCodes.type;
  o.connect(g);
  o.frequency.setValueAtTime(audioCodes.frequency, 0);
  console.log(context.currentTime);
  g.connect(context.destination);
  o.start();
  o.stop(context.currentTime + 0.4);
};


//----------------------- 4 ----------------------
//-------------------- EXPORTS -------------------

export {
  sleep,
  jitter,
  jitter50,
  randomTrue,
  deepCopy,
  formatDollars,
  generateWaitSet,
  images,
  set1Images,
  set2Images,
  set3Images,
  set4Images,
  set5Images,
  set6Images,
  startKeypressListener,
  getProlificId,
  beep,
  getFormattedDate,
  invNormcdf,
};
