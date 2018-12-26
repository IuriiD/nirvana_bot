const texts = require('../helpers/data/texts');
const stickers = require('../helpers/data/stickers');

function getPlay(req) {
  try {
    const playid = decodeURIComponent(req.params.playid);
    const playTitle = stickers[playid].play.name;
    const { url, text } = texts[playid];
    const imgSrc = `${process.env.imgBaseUrl}/stickers/${playid}.png`;
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
