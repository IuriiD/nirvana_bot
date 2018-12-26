const texts = require('../helpers/data/texts');
const stickers = require('../helpers/data/stickers');

function getPlay(req, res) {
  try {
    const playid = decodeURIComponent(req.params.playid);
    const playTitle = stickers[playid].play.name;
    const { url: playUrl, text: playText } = texts[playid];
    const imgSrc = `${process.env.imgBaseUrl}/stickers/${playid}.png`;
    res.render('play', {
      playTitle,
      playUrl,
      playText,
      imgSrc,
    });
    return true;
  } catch (error) {
    console.log(`\n⚠ getPlay():\n${error}`);
    return false;
  }
}

function indexPage(req, res) {
  try {
    res.render('index');
    return true;
  } catch (error) {
    console.log(`\n⚠ indexPage():\n${error}`);
    return false;
  }
}

module.exports = { getPlay, indexPage };
