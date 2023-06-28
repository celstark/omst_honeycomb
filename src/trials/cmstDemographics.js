// <!DOCTYPE html>
// <html>
//   <!--
//   Author: Craig Stark

//   Collects demographic information and then advances to the next task in the list

// -->
// <head>
//   <meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap:  'unsafe-inline' 'unsafe-eval' 
//     https://fonts.gstatic.com http://www.stark-labs.com/exp/jsPsych/mobile_cMST/append_log.php http://www.stark-labs.com/exp/jsPsych/mobile_cMST/write_data_file.php; 
//   style-src 'self' 'unsafe-inline' https://fonts.googleapis.com/css; media-src *; 
//   img-src 'self' data: content:;">

// imports here
import { lang } from '../trials/selectLanguage';
import jsPsychSurveyHtmlForm from '@jspsych/plugin-survey-html-form';

//   <script type="text/javascript" src="jatos.js"></script>
//   <script type="text/javascript" src="js/index.js"></script>
//   <script src="js/jspsych_731/dist/jspsych.js"></script>
//   <script src="js/jspsych_731/dist/plugin-survey-html-form.js"></script>
//   <link rel="stylesheet" href="css/jspsych.css"></link>
//   <style>
//     .jspsych-display-element {
//       font-size: 200%;
//     }
//     .jspsych-btn {
//       font-size: 125%;
//     }
//   </style>
// </head>
// <body>

// </body>
// <script>
// function getID() {
//   // Try to get a reasonable ID code for this person
//   // URL > studySession > workerID
//   var sid=jatos.urlQueryParameters.sid;
//   if (sid == undefined) {
//     sid=jatos.studySessionData['sid'];
//   }
//   if (typeof sid == 'undefined') {
//     if (typeof jatos.workerId !== 'undefined') { // At least try the workerID 
//       sid = jatos.workerId;
//     }
//     else { sid=1234; }
//   }
//   return sid
// }
// jatos.onLoad(function() {
//   var sid=getID()
//   //console.log('In demog, sid= ' + sid);

//   var jsPsych = initJsPsych({
//     on_finish: function() {
//       if (0) { jsPsych.data.displayData(); }
//       else {
//         var result = jsPsych.data.get().json();
//         jatos.submitResultData(result, jatos.startNextComponent);

//       }
//     }
//   });

//   let date = new Date(); 
//   jsPsych.data.addProperties({
//        subject: sid,
//        task: 'demographics',
//        date: date.toLocaleDateString(),
//        urlid: jatos.urlQueryParameters.sid,
//   });


  var demogform = {
    type: jsPsychSurveyHtmlForm,
    preamble: function() {return lang.demog.preamble},
    html: function() {return '<div style="text-align: left; font-size: 16px; line-height: 110%"> \
    <p><b>' + lang.demog.name + '</b> <input name="fullname" type="text" required /></p> \
    <p> <b>' + lang.demog.dob + '</b> <input name="dob" type="text" required /></p> \
    <p> <b>' + lang.demog.gender.prompt + '</b>\
       <br><input type="radio" id="male" name="gender" value="male" style="margin-left: 50px" required > <label for="male">' + lang.demog.gender.m + '</label> \
       <br><input type="radio" id="female" name="gender" value="female" style="margin-left: 50px"  > <label for="female">' + lang.demog.gender.f + '</label> \
    <p> <b>' + lang.demog.ethnicity.prompt + '</b>\
       <br><input type="radio" id="hispanic" name="ethnicity" value="hispanic" style="margin-left: 50px" required> <label for="hispanic">' + lang.demog.ethnicity.h + '</label>  \
       <br><input type="radio" id="nonhispanic" name="ethnicity" value="nonhispanic" style="margin-left: 50px"> <label for="nonhispanic">' + lang.demog.ethnicity.nh + '</label> \
    <p> <b>' + lang.demog.race.prompt + '</b>\
       <br><input type="radio" id="nativeamerican" name="race" value="nativeamerican" style="margin-left: 50px" required> <label for="nativeamerican">' + lang.demog.race.ai + '</label> \
       <br><input type="radio" id="asian" name="race" value="asian" style="margin-left: 50px"> <label for="asian">' + lang.demog.race.a + '</label> \
       <br><input type="radio" id="black" name="race" value="black" style="margin-left: 50px"> <label for="black">' + lang.demog.race.b + '</label> \
       <br><input type="radio" id="nativehawaiian" name="race" value="nativehawaiian" style="margin-left: 50px"> <label for="nativehawaiian">' + lang.demog.race.nh + '</label> \
       <br><input type="radio" id="white" name="race" value="white" style="margin-left: 50px"> <label for="white">' + lang.demog.race.w + '</label> \
       <br><input type="radio" id="more" name="race" value="more" style="margin-left: 50px"> <label for="more">' + lang.demog.race.m + '</label> \
    </div>'
   }
  }

export { demogform };
  
//   var timeline = [demogform];
//   jsPsych.run(timeline);

  
// });
// </script>

// </html>
