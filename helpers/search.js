const log = require('../config/logger');

function relevantPlays(query, texts) {
  try {
    const plays = [];

    const queryPrompts = ['шукати', 'шукай', 'знайти', 'покажи', 'знайди', 'виведи', 'пошук'];
    if (queryPrompts.indexOf(query.split(' ')[0]) !== -1) {
      query = query
        .split(' ')
        .slice(1, query.length - 1)
        .join(' ');
    }

    Object.keys(texts).forEach((playId) => {
      const { text, name } = texts[playId];
      const textWoTags = text
        .replace(/<p>/g, '')
        .replace(/<\/p>/g, '')
        .replace(/<h3>/g, '')
        .replace(/<\/h3>/g, '')
        .replace(/<strong>/g, '')
        .replace(/<\/strong>/g, '')
        .replace(/<em>/g, '')
        .replace(/<br \/>/g, '')
        .replace(/<\/em>/g, '');

      if (
        textWoTags.toLowerCase().includes(query.toLowerCase())
        || name.toLowerCase().includes(query.toLowerCase())
      ) plays.push(playId);
    });
    if (plays.length > 0) {
      // TEMP - Telegram postback must be <64bit
      // if (plays.length > 10) return plays.slice(0, 10);
      return plays;
    }
    return false;
  } catch (error) {
    log.error(`\n⚠ relevantPlays():\n${error}`);
    return false;
  }
}

module.exports = relevantPlays;
