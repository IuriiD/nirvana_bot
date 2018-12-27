const { promisify } = require('util');
const { request } = require('./request');

const persistentMenu = require('./fb-persistent-menu.json');
const getStartedButton = require('./fb-get-started.json');

const delay = promisify(setTimeout);

function facebookThreadAPI(jsonFile) {
  return request('POST', '/me/thread_settings', { data: jsonFile });
}

function facebookMessengerAPI(jsonFile) {
  return request('POST', '/me/messenger_profile', { data: jsonFile });
}

function getUserData(senderId) {
  return request('get', senderId, {});
}

async function setup() {
  try {
    console.log('Facebook - Get Started Button');
    await facebookThreadAPI(getStartedButton);
    console.log('Facebook - Get Started Button: SUCCESS');
    await delay(2000);
    console.log('Facebook - Persistent Menu');
    await facebookMessengerAPI(persistentMenu);
    console.log('Facebook - Persistent Menu: SUCCESS');
  } catch (error) {
    console.log(`\n⚠ setup():\n${error.message}`);
  }
}

module.exports = { setup, getUserData };
