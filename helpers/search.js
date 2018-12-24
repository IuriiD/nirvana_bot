function relevantPlays(query, texts) {
  try {
    const plays = [];
    Object.keys(texts).forEach((playTitle) => {
      const { text } = texts[playTitle];
      if (text.toLowerCase().includes(query.toLowerCase())) plays.push(playTitle);
    });
    if (plays.length > 0) return plays;
    return false;
  } catch (error) {
    console.log(`\n⚠ relevantPlays():\n${error}`);
    return false;
  }
}

module.exports = relevantPlays;
