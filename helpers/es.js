const elasticsearch = require('elasticsearch');

const eClient = new elasticsearch.Client({
  host: '127.0.0.1:9200',
  log: 'error',
});
/*
var client = new elasticsearch.Client({
   hosts: [ 'https://username:password@host:port']
});
*/

// Query
function search(index, type, query) {
  return eClient.search({
    index,
    type,
    body: {
      query: {
        multi_match: {
          query,
          fuzziness: 1,
          fields: ['title', 'text'],
        },
      },
    },
  });
}

const indexName = 'plays';
const typeName = 'play';

async function es(searchQuery) {
  const response = await search(indexName, typeName, searchQuery);
  const relevantPlays = response.hits.hits.map(hit => hit._source.title);
  console.log('Response');
  console.log("L.Podervjansky's plays with the search query:");
  console.log(relevantPlays);
  if (relevantPlays.length === 0) return false;
  console.log('HERE');
  return relevantPlays;
}

module.exports = { es };

/*
const {
  doslidy, vasilisa, pizdets, patzavataStory, timeHero1, timeHero2,
} = require('./texts');
*/

/*
// Create index
eClient.indices.create({ index: 'plays' }, (err, resp, status) => {
  if (err) {
    console.log(err);
  } else {
    console.log('create', resp);
  }
});
*/

/*
const allPlays = [
  { index: { _index: 'plays', _type: 'play', _id: '1' } },
  {
    title: doslidy.title,
    url: doslidy.url,
    text: doslidy.text,
  },
  { index: { _index: 'plays', _type: 'play', _id: '2' } },
  {
    title: vasilisa.title,
    url: vasilisa.url,
    text: vasilisa.text,
  },
  { index: { _index: 'plays', _type: 'play', _id: '3' } },
  {
    title: pizdets.title,
    url: pizdets.url,
    text: pizdets.text,
  },
  { index: { _index: 'plays', _type: 'play', _id: '4' } },
  {
    title: patzavataStory.title,
    url: patzavataStory.url,
    text: patzavataStory.text,
  },
  { index: { _index: 'plays', _type: 'play', _id: '5' } },
  {
    title: timeHero1.title,
    url: timeHero1.url,
    text: timeHero1.text,
  },
  { index: { _index: 'plays', _type: 'play', _id: '6' } },
  {
    title: timeHero2.title,
    url: timeHero2.url,
    text: timeHero2.text,
  },
];
*/

/*
// Bulk indexing
eClient.bulk({
  index: 'plays',
  type: 'play',
  body: allPlays,
});
*/

/*
// Indexing 1 document
eClient.index({
  index: 'plays',
  type: 'play',
  body: {
    title: doslidy.title,
    url: doslidy.url,
    text: doslidy.text,
  },
});
*/

/*
// Count entries
eClient.count({ index: 'plays', type: 'play' }, (err, resp, status) => {
  console.log('Plays: ', resp);
});
*/

/*
// Delete index
eClient.indices.delete({ index: 'plays' }, (err, resp, status) => {
  console.log('delete', resp);
});
*/
