function relevantPlays(query, texts) {
  try {
    const plays = [];
    Object.keys(texts).forEach((playId) => {
      const { text } = texts[playId];
      if (text.toLowerCase().includes(query.toLowerCase())) plays.push(playId);
    });
    if (plays.length > 0) {
      // TEMP - Telegram postback must be <64bit
      if (plays.length > 10) return plays.slice(0, 10);
      return plays;
    }
    return false;
  } catch (error) {
    console.log(`\n⚠ relevantPlays():\n${error}`);
    return false;
  }
}

module.exports = relevantPlays;
