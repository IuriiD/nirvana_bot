// Sends text and stickers. DRY

const { parseAnswer } = require('./parseAnswer');
const phrases = require('./phrases');

function sendAnswer(session, answer) {
  const { text, sticker } = parseAnswer(phrases, answer);
  if (text) session.send(text);
  if (sticker) session.send(sticker);
}

module.exports = { sendAnswer };
