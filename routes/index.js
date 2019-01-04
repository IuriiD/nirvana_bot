const texts = require('../helpers/data/texts');
const stickers = require('../helpers/data/stickers');
const log = require('../config/logger');

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
    log.error(`\n⚠ getPlay():\n${error}`);
    return false;
  }
}

function indexPage(req, res) {
  try {
    res.render('index');
    return true;
  } catch (error) {
    log.error(`\n⚠ indexPage():\n${error}`);
    return false;
  }
}

function redirectToS3(req, res) {
  try {
    const { stickerid } = req.params;
    res.redirect(`${process.env.imgBaseUrl}/stickers/${stickerid}.png`);
    return;
  } catch (error) {
    log.error(`\n⚠ redirectToS3():\n${error}`);
  }
}

function webChatPage(req, res) {
  try {
    res.send(
      `<iframe src='https://webchat.botframework.com/embed/shipyard?s=${
        process.env.webChatKey
      }'  style='min-width: 400px; width: 100%; min-height: 500px;'></iframe>`,
    );
  } catch (error) {
    log.error(`\n⚠ webChatPage():\n${error}`);
  }
}

module.exports = {
  getPlay,
  indexPage,
  redirectToS3,
  webChatPage,
};
