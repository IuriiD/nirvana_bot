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

const indexName = 'plays';
const typeName = 'play';

// Query
function search(index, type, query) {
  return eClient.search({
    index,
    type,
    body: {
      query: {
        multi_match: {
          query,
          fuzziness: 1, // 1
          fields: ['title', 'text'],
        },
      },
    },
  });
}

async function es(searchQuery) {
  const response = await search(indexName, typeName, searchQuery);
  const relevantPlays = response.hits.hits.map(hit => hit._source.title);
  console.log('Response');
  console.log("L.Podervjansky's plays with the search query:");
  console.log(relevantPlays);
  if (relevantPlays.length === 0) return false;
  return relevantPlays;
}

module.exports = { es };

// Stuff for creating index
/*
const {
  doslidy,
  vasilisa,
  pizdets,
  patzavataStory,
  timeHero1,
  timeHero2,
  katzapy,
  mistzeVstrechi,
  ivasyk,
  danko,
  morozov,
  hamlet,
  mgnovenie,
  snobs,
  litr,
  nirvana,
  jogy,
  repka,
  maslo,
  joko,
  dynamo,
  janMare,
  utopia,
  diana,
  mnozhennyaVUmi,
  irzhyk,
} = require('./data/texts');
*/

/*
// Create index
eClient.indices.create({ index: 'plays' }, (err, resp) => {
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
  { index: { _index: 'plays', _type: 'play', _id: '7' } },
  {
    title: katzapy.title,
    url: katzapy.url,
    text: katzapy.text,
  },
  { index: { _index: 'plays', _type: 'play', _id: '8' } },
  {
    title: mistzeVstrechi.title,
    url: mistzeVstrechi.url,
    text: mistzeVstrechi.text,
  },
  { index: { _index: 'plays', _type: 'play', _id: '9' } },
  {
    title: ivasyk.title,
    url: ivasyk.url,
    text: ivasyk.text,
  },
  { index: { _index: 'plays', _type: 'play', _id: '10' } },
  {
    title: danko.title,
    url: danko.url,
    text: danko.text,
  },
  { index: { _index: 'plays', _type: 'play', _id: '11' } },
  {
    title: morozov.title,
    url: morozov.url,
    text: morozov.text,
  },
  { index: { _index: 'plays', _type: 'play', _id: '12' } },
  {
    title: hamlet.title,
    url: hamlet.url,
    text: hamlet.text,
  },
  { index: { _index: 'plays', _type: 'play', _id: '13' } },
  {
    title: mgnovenie.title,
    url: mgnovenie.url,
    text: mgnovenie.text,
  },
  { index: { _index: 'plays', _type: 'play', _id: '14' } },
  {
    title: snobs.title,
    url: snobs.url,
    text: snobs.text,
  },
  { index: { _index: 'plays', _type: 'play', _id: '15' } },
  {
    title: litr.title,
    url: litr.url,
    text: litr.text,
  },
  { index: { _index: 'plays', _type: 'play', _id: '16' } },
  {
    title: nirvana.title,
    url: nirvana.url,
    text: nirvana.text,
  },
  { index: { _index: 'plays', _type: 'play', _id: '17' } },
  {
    title: jogy.title,
    url: jogy.url,
    text: jogy.text,
  },
  { index: { _index: 'plays', _type: 'play', _id: '18' } },
  {
    title: repka.title,
    url: repka.url,
    text: repka.text,
  },
  { index: { _index: 'plays', _type: 'play', _id: '19' } },
  {
    title: maslo.title,
    url: maslo.url,
    text: maslo.text,
  },
  { index: { _index: 'plays', _type: 'play', _id: '20' } },
  {
    title: joko.title,
    url: joko.url,
    text: joko.text,
  },
  { index: { _index: 'plays', _type: 'play', _id: '21' } },
  {
    title: janMare.title,
    url: janMare.url,
    text: janMare.text,
  },
  { index: { _index: 'plays', _type: 'play', _id: '22' } },
  {
    title: utopia.title,
    url: utopia.url,
    text: utopia.text,
  },
  { index: { _index: 'plays', _type: 'play', _id: '23' } },
  {
    title: diana.title,
    url: diana.url,
    text: diana.text,
  },
  { index: { _index: 'plays', _type: 'play', _id: '24' } },
  {
    title: mnozhennyaVUmi.title,
    url: mnozhennyaVUmi.url,
    text: mnozhennyaVUmi.text,
  },
  { index: { _index: 'plays', _type: 'play', _id: '25' } },
  {
    title: irzhyk.title,
    url: irzhyk.url,
    text: irzhyk.text,
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
eClient.indices.delete({ index: '_all' }, (err, resp) => {
  console.log('delete', resp);
});
*/
