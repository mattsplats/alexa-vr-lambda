'use strict';

// Allow this module to be reloaded by hotswap when changed
// ( For alexa-app server )
module.change_code = 1;

// Modules
const Alexa = require('alexa-app'),
      rp    = require('request-promise'),

      // Const vars
      app         = new Alexa.app('alexa-vr'),
      CANCEL      = 'Session ended.';


// On invocation
app.launch(function (req, res) {
  const options = {
    uri: 'https://alexa-vr.herokuapp.com/test',
    json: true
  };

  rp(options).then(data => {
    res.say('OK').send();
  }).catch(() => {
    res.say('Sorry, there was a problem connecting to the server.').send();
  });

  return false;  // Prevent session ending before async completion
});


// On 'Alexa help'
app.intent('AMAZON.HelpIntent', {}, function (req, res) {
  res.say(`Nothing to see here`).shouldEndSession(false);
});

// On 'Alexa stop' or 'Alexa cancel'
// Will say nothing if there is no quiz in progress
app.intent('AMAZON.StopIntent', {}, function (req, res) {
  res.say(CANCEL);
});
app.intent('AMAZON.CancelIntent', {}, function (req, res) {
  res.say(CANCEL);
});


module.exports = app;
