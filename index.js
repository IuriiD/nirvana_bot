// Build on basis of: https://github.com/jseijas/bot-nlp/blob/master/basic.js

require('dotenv').config();
const builder = require('botbuilder');
const express = require('express');
const { Recognizer } = require('node-nlp');

const modelName = './model.nlp';
const { locale } = require('./config/config');
const { sendAnswer, presentPlays } = require('./helpers/sendAnswer');
const { es } = require('./helpers/es');
const firstRunDialog = require('./dialogs/firstRun');

const l10n = require(`./locales/${locale}`);

// Creates the express application
const app = express();
const port = process.env.PORT || 4000;
app.listen(port);
console.log(`Chatbot listening on port ${port}`);

// Creates a connector for the chatbot
const connector = new builder.ChatConnector({
  appId: process.env.botAppId,
  appPassword: process.env.botAppPassword,
  openIdMetadata: process.env.BotOpenIdMetadata,
});

// Listen for messages from users
app.post('/api/messages', connector.listen());

// Creates a node-nlp recognizer for the bot
const recognizer = new Recognizer();
recognizer.load(`./nlp/${modelName}`);

// Creates the bot using a memory storage, with a main dialog that
// use the node-nlp recognizer to calculate the answer.
const bot = new builder.UniversalBot(connector, (session) => {
  // session.userData.firstRun = false; // temp, needed at dev stage
  console.log('\n\nsession.message$');
  console.dir(session.message);
  if (session.message.text) {
    recognizer.recognize(session, async (err, data) => {
      console.log('\n\nrecognizer.recognize - data:');
      console.dir(data); // temp

      if (err) {
        console.log(`Error: ${err}`);
        sendAnswer(session, l10n.error_happened);
      }

      if (!data.answer) {
        // Try to search users's input in texts using ElasticSearch
        console.log(`\ndata.utterance: ${data.utterance}`);
        sendAnswer(session, 'Here goes result of searching in ES');

        const esResult = await es(data.utterance);
        console.log(`\nesResult: ${esResult}`);
        if (esResult) {
          console.log('ES found something, sending...');
          presentPlays(session, esResult);
        } else {
          // If nothing found - Default fallback answer
          console.log('ES failed to find anything, default fallback response');
          sendAnswer(session, l10n.dont_understand);
        }
      } else {
        console.log('\ndata.answer:'); // temp
        console.dir(data); // temp
        sendAnswer(session, data.answer);
      }
    });
  } else if (session.message.attachments && session.message.attachments.length > 0) {
    sendAnswer(session, l10n.dont_understand);
  }
}).set('storage', new builder.MemoryBotStorage());

// First run dialog
bot.dialog('firstRunDialog', firstRunDialog(bot));
