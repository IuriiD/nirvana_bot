const texts = require('../helpers/data/texts');
const stickers = require('../helpers/data/stickers');
const { getStickerIdByPlay } = require('../helpers/templates');

function getPlay(req) {
  try {
    const playTitle = req.params.playName;
    const playKey = texts.key[playTitle];
    const { url, text } = texts[playKey];
    const stickerId = getStickerIdByPlay(playTitle, stickers);
    const imgSrc = `${process.env.imgBaseUrl}/stickers/${stickerId}.png`;
    return {
      playTitle,
      playUrl: url,
      playText: text,
      imgSrc,
    };
  } catch (error) {
    console.log(`\n⚠ getPlay():\n${error}`);
    return false;
  }
}

module.exports = getPlay;
