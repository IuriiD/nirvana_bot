// Build on basis of: https://github.com/jseijas/bot-nlp/blob/master/basic.js

require('dotenv').config();
const builder = require('botbuilder');
const express = require('express');
const bodyParser = require('body-parser');
const i18n = require('i18n');
const { Recognizer } = require('node-nlp');

const modelName = './model.nlp';
const mainFlow = require('./dialogs/main-flow');

const app = express();
const port = process.env.PORT || 4000;
app.listen(port);
console.log(`Chatbot listening on port ${port}`);

const connector = new builder.ChatConnector({
  appId: process.env.botAppId,
  appPassword: process.env.botAppPassword,
  openIdMetadata: process.env.BotOpenIdMetadata,
});

i18n.configure({
  locales: ['uk'],
  directory: `${__dirname}/locales`,
  defaultLocale: 'uk',
});

app.use(i18n.init);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/messages', connector.listen());

const recognizer = new Recognizer();
recognizer.load(`./nlp/${modelName}`);

const bot = new builder.UniversalBot(connector, (session) => {
  mainFlow(session, recognizer);
});

bot.set('storage', new builder.MemoryBotStorage());

// First run dialog
// bot.dialog('firstRunDialog', firstRunDialog(bot));
