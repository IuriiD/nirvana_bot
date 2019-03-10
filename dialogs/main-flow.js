const i18n = require('i18n');
const replies = require('../helpers/replies');
const search = require('../helpers/search');
const stickersObj = require('../helpers/data/stickers');
const texts = require('../helpers/data/texts');
const log = require('../config/logger');
const { dataToLog, letter2Number } = require('../helpers/templates');

async function mainFlow(session, recognizer) {
  console.log(session.message);

  try {
    const { channelId, userId } = dataToLog(session);

    if (session.message.text) {
      // 1. Process callbacks/payloads from button clicks from different platforms
      const { text } = session.message;
      log.info(`${channelId} - user ${userId} >> ${text}`);

      // 1.1 User clicked 'Play' button
      if (text.includes('[### play ###]')) {
        const playId = text.split('[### play ###]')[1];
        session.sendTyping();
        replies.sendAudio(session, playId, stickersObj);

        // 1.2 User clicked "Show more" [plays] button
      } else if (text.includes('[### next ###]')) {
        const nextPlaysIdsLetters = text.split('[### next ###]')[1].split('|');
        const nextPlaysIds = nextPlaysIdsLetters.map(letter => letter2Number[letter]);
        session.sendTyping();
        replies.presentPlays(session, nextPlaysIds, stickersObj, true, letter2Number);

        // 2. Process callbacks/payloads from Commands Menu (Telegram) etc
        // 2.1 Telegram - /random (Telegram) or [### payload ###]random_phrase (Facebook)
      } else if (text === '/random' || text === '[### payload ###]random_phrase') {
        session.sendTyping();
        replies.randomPhrase(session, stickersObj);

        // 2.2 Telegram - /faq (Telegram) or [### payload ###]faq (Facebook)
      } else if (text === '/faq' || text === '[### payload ###]faq') {
        session.sendTyping();
        await replies.getFaq(session, stickersObj);

        // 2.3 Telegram - /contacts (Telegram) or [### payload ###]feedback (Facebook)
      } else if (text === '/contacts' || text === '[### payload ###]feedback') {
        session.sendTyping();
        replies.feedback(session);

        // 3. Process clicks on /start (Telegram), Getting started (FBM) buttons or keywords (Skype)
      } else if (text === '/start' || text === '[### payload ###]facebook_welcome') {
        session.sendTyping();
        await replies.getFaq(session, stickersObj);

        // 4. Process text inputs
      } else {
        recognizer.recognize(session, async (err, data) => {
          if (err) {
            log.error(`Recognizer error: ${err}`);
            session.sendTyping();
            replies.sendAnswer(session, i18n.__('error_happened'), stickersObj);
            return;
          }

          if (!data.answer) {
            // Try to search users's input in texts
            const relevantPlaysIds = search(data.utterance, texts);
            if (relevantPlaysIds) {
              session.sendTyping();
              replies.presentPlays(session, relevantPlaysIds, stickersObj, false, letter2Number);
            } else {
              // If nothing found - Default fallback answer 
              // (for some reason i18n.__() takes only the 1st stiker, till "|"))
              const dfi = '{stickers}20|24|30|59|76|82|87|89|96|99|108|109|116';
              session.sendTyping();
              replies.sendAnswer(session, dfi, stickersObj);
            }
          } else {
            // We have result from NLP - this may be a response or trigger ([### trigger ###]triggerName)
            if (data.answer.includes('[### trigger ###]')) {
              const trigger = data.answer.split('[### trigger ###]')[1];
              if (trigger === 'start' || trigger === 'help') {
                session.sendTyping();
                await replies.getFaq(session, stickersObj);
              }
              if (trigger === 'contacts') {
                session.sendTyping();
                replies.feedback(session);
              }
            }

            if (!data.answer.includes('[### trigger ###]')) {
              session.sendTyping();
              replies.sendAnswer(session, data.answer, stickersObj);
            }
          }
        });
      }
    } else if (session.message.attachments && session.message.attachments.length > 0) {
      session.sendTyping();
      replies.sendAnswer(session, i18n.__('dont_understand'), stickersObj);
      log.info(`${channelId} - user ${userId} >> Non-text input`);
    }
    return;
  } catch (error) {
    log.error(`\n⚠ mainFlow():\n${error}`);
  }
}

module.exports = mainFlow;
