const i18n = require('i18n');
const { sendAnswer, presentPlays, sendAudio } = require('../helpers/replies');
const { es } = require('../helpers/es');

async function mainFlow(session, recognizer) {
  // session.userData.firstRun = false; // temp, needed at dev stage
  console.log('\n\n%%%%%%% Session.message$');
  console.dir(session.message);
  if (session.message.text) {
    // Process callbacks/payloads from button clicks from different platforms
    const { text } = session.message;
    if (text.includes('[### play ###]')) {
      console.log('\nSending AAUDIO');
      const play = text.split('[### play ###]')[1];
      await sendAudio(session, play);
    } else {
      recognizer.recognize(session, async (err, data) => {
        console.log('\n\n########### Recognizer.recognize - data:');
        // console.dir(data); // temp

        if (err) {
          console.log(`Error: ${err}`);
          sendAnswer(session, i18n.__('error_happened'));
        }

        if (!data.answer) {
          // Try to search users's input in texts using ElasticSearch
          console.log(`\ndata.utterance: ${data.utterance}`);
          // sendAnswer(session, 'Here goes result of searching in ES');

          const esResult = await es(data.utterance);
          console.log(`\nesResult: ${esResult}`);
          if (esResult) {
            console.log('ES found something, sending...');
            await presentPlays(session, esResult);
          } else {
            // If nothing found - Default fallback answer
            console.log('ES failed to find anything, default fallback response');
            sendAnswer(session, i18n.__('dont_understand'));
          }
        } else {
          console.log('\ndata.answer:'); // temp
          console.dir(data.answer); // temp
          sendAnswer(session, data.answer);
        }
      });
    }
  } else if (session.message.attachments && session.message.attachments.length > 0) {
    sendAnswer(session, i18n.__('dont_understand'));
  }
}

module.exports = mainFlow;
