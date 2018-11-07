// Sends text and stickers. DRY

const { parseAnswer } = require('./parseAnswer');
const phrases = require('./phrases');

function sendAnswer(session, answer) {
  const { text, sticker } = parseAnswer(phrases, answer);
  if (text) session.send(text);
  if (sticker) {
    session.send({
      text: '',
      attachments: [
        {
          contentType: 'image/png',
          contentUrl: `https://raw.githubusercontent.com/IuriiD/nirvana_bot/master/stickers/${sticker}.png`,
          name: `${sticker}.png`,
        },
      ],
    });
  }
}

module.exports = { sendAnswer };
