// Build on basis of: https://github.com/jseijas/bot-nlp/blob/master/basic.js

require('dotenv').config();
const builder = require('botbuilder');
const express = require('express');
const bodyParser = require('body-parser');
const i18n = require('i18n');
const { Recognizer } = require('node-nlp');
const log = require('./config/logger');

const modelName = './model.nlp';
const mainFlow = require('./dialogs/main-flow');
const routes = require('./routes');
const replies = require('./helpers/replies');
const stickersObj = require('./helpers/data/stickers');
const { setup } = require('./config/fb/');

const app = express();
const port = process.env.PORT || 4000;
app.listen(port);
log.info(`Chatbot listening on port ${port}`);
app.set('view engine', 'ejs');

// setup();

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
app.get('/', (req, res) => routes.indexPage(req, res));
app.get('/play/:playid', (req, res) => routes.getPlay(req, res));
app.get('/sticker/:stickerid', (req, res) => routes.redirectToS3(req, res));
app.get('/webchat', (req, res) => routes.webChatPage(req, res));

const recognizer = new Recognizer();
recognizer.load(`./nlp/${modelName}`);

const bot = new builder.UniversalBot(connector, (session) => {
  // console.log(JSON.stringify(session.message, null, 2));
  mainFlow(session, recognizer);
});

const inMemoryStorage = new builder.MemoryBotStorage();
bot.set('storage', inMemoryStorage);

// Especially for Skype - imitating FB's Getting started feature
bot.on('contactRelationUpdate', (message) => {
  console.log('contactRelationUpdate!');
  replies.gettingStartedSkype(bot, message, stickersObj);
});

// Especially for Skype - imitating FB's Getting started feature
bot.on('conversationUpdate', (message) => {
  console.log('conversationUpdate!');
  replies.gettingStartedWebchat(bot, message, stickersObj);
});
