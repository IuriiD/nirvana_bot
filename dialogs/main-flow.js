const i18n = require('i18n');
const replies = require('../helpers/replies');
// const { es } = require('../helpers/es');
const search = require('../helpers/search');
const stickersObj = require('../helpers/data/stickers');
const texts = require('../helpers/data/texts');

async function mainFlow(session, recognizer) {
  try {
    // session.userData.firstRun = false; // temp, needed at dev stage
    if (session.message.text) {
      // Process callbacks/payloads from button clicks from different platforms
      const { text } = session.message;
      if (text.includes('[### play ###]')) {
        const playId = text.split('[### play ###]')[1];
        replies.sendAudio(session, playId, stickersObj);
      } else {
        recognizer.recognize(session, async (err, data) => {
          if (err) {
            console.log(`Error: ${err}`);
            replies.sendAnswer(session, i18n.__('error_happened'), stickersObj);
          }

          if (!data.answer) {
            // Try to search users's input in texts
            const relevantPlays = search(data.utterance, texts);
            if (relevantPlays) {
              replies.presentPlays(session, relevantPlays, stickersObj);
            } else {
              // If nothing found - Default fallback answer
              replies.sendAnswer(session, i18n.__('dont_understand'), stickersObj);
            }
          } else {
            console.log('\n#HERE');
            replies.sendAnswer(session, data.answer, stickersObj);
          }
        });
      }
    } else if (session.message.attachments && session.message.attachments.length > 0) {
      replies.sendAnswer(session, i18n.__('dont_understand'), stickersObj);
    }
    return;
  } catch (error) {
    console.log(`\n⚠ tStickerWButtons():\n${error}`);
    return false;
  }
}

module.exports = mainFlow;
