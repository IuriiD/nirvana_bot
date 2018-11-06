// Answers from npp model and l10n file come in format
// "[Optional text][{stickers}one|or|several|sticker|Ids]"
// We need to parse it and present as {text: phrase||false, sticker: only1RandomStiker}

function parseAnswer(phrases, botReply) {
  console.log(`botReply:${botReply}`);
  const output = { text: false, sticker: false };

  if (botReply.includes('{stickers}')) {
    const [phrase, oneOrSeveralStickers] = botReply.split('{stickers}');
    console.log(`phrase: ${phrase}, oneOrSeveralStickers: ${oneOrSeveralStickers}`);
    output.text = phrase;
    let stickers = [];
    if (oneOrSeveralStickers.includes('|')) {
      stickers = oneOrSeveralStickers.split('|');
      const randStickerIndex = Math.floor(Math.random() * stickers.length);
      if (stickers[randStickerIndex] !== 0) {
        output.sticker = phrases[stickers[randStickerIndex]].telegramStickerId;
      }
    } else {
      output.sticker = phrases[oneOrSeveralStickers].telegramStickerId;
    }
  } else {
    output.text = botReply;
  }

  console.dir(output);
  return output;
}

module.exports = {
  parseAnswer,
};
