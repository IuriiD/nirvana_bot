// Sends text and stickers. DRY

const { parseAnswer } = require('./parseAnswer');
const phrases = require('./phrases');

function sendAnswer(session, answer) {
  const { text, sticker } = parseAnswer(phrases, answer);
  if (text) session.send(text);
  if (sticker) {
    session.send({
      text: sticker,
      attachments: [
        {
          contentType: 'image/png',
          contentUrl: 'https://iuriid.github.io/public/img/moc_logo.png',
          name: '1.png',
        },
      ],
    });
  }
}

module.exports = { sendAnswer };
