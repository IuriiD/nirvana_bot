const i18n = require('i18n');
const replies = require('../helpers/replies');
const search = require('../helpers/search');
const stickersObj = require('../helpers/data/stickers');
const texts = require('../helpers/data/texts');

async function mainFlow(session, recognizer) {
  try {
    // session.userData.firstRun = false; // temp, needed at dev stage
    if (session.message.text) {
      console.log('\nMAIN FLOW');
      console.log(session.message.text);
      // 1. Process callbacks/payloads from button clicks from different platforms
      const { text } = session.message;

      // 1.1 User clicked 'Play' button
      if (text.includes('[### play ###]')) {
        const playId = text.split('[### play ###]')[1];
        replies.sendAudio(session, playId, stickersObj);

        // 1.2 User clicked "Show more" [plays] button
      } else if (text.includes('[### next ###]')) {
        const nextPlaysIds = text.split('[### next ###]')[1].split('|');
        replies.presentPlays(session, nextPlaysIds, stickersObj, true);

        // 2. Process callbacks/payloads from Commands Menu (Telegram) etc
        // 2.1 Telegram - /random (Telegram) or [### payload ###]random_phrase (Facebook)
      } else if (text === '/random' || text === '[### payload ###]random_phrase') {
        replies.randomPhrase(session, stickersObj);

        // 2.2 Telegram - /faq (Telegram) or [### payload ###]faq (Facebook)
      } else if (text === '/faq' || text === '[### payload ###]faq') {
        replies.sendAnswer(session, 'Тут іде наш ФАК, шарінг і т.д.');
        replies.getFaq(session);

        // 2.3 Telegram - /contacts (Telegram) or [### payload ###]feedback (Facebook)
      } else if (text === '/contacts' || text === '[### payload ###]feedback') {
        replies.feedback(session);

        // 3. Process text inputs
      } else {
        recognizer.recognize(session, async (err, data) => {
          if (err) {
            console.log(`Error: ${err}`);
            replies.sendAnswer(session, i18n.__('error_happened'), stickersObj);
          }

          if (!data.answer) {
            // Try to search users's input in texts
            const relevantPlaysIds = search(data.utterance, texts);
            if (relevantPlaysIds) {
              replies.presentPlays(session, relevantPlaysIds, stickersObj);
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
