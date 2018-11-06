// https://github.com/jseijas/bot-nlp/blob/master/basic.js

require('dotenv').config();
const builder = require('botbuilder');
const express = require('express');
const { Recognizer } = require('node-nlp');

const modelName = './model.nlp';
const { locale } = require('./config/config');
const { sendAnswer } = require('./helpers/sendAnswer');

const l10n = require(`./locales/${locale}.json`);

// Creates the express application
const app = express();
const port = process.env.PORT || 3000;
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
recognizer.load(modelName);

// Creates the bot using a memory storage, with a main dialog that
// use the node-nlp recognizer to calculate the answer.
const bot = new builder.UniversalBot(connector, (session) => {
  recognizer.recognize(session, (err, data) => {
    if (err) {
      console.log(`Error: ${err}`);
      sendAnswer(session, l10n.error_happened);
    }
    if (!data.answer) {
      // Try to search users's input in texts using ElasticSearch
      // ES();

      // If nothing found - Default fallback answer
      sendAnswer(session, l10n.dont_understand);
    }
    console.log('\ndata:'); // temp
    console.dir(data); // temp
    sendAnswer(session, data.answer);
  });
}).set('storage', new builder.MemoryBotStorage());
