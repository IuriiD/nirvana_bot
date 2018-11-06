// So far the NPL model generated from xls file gives strange results
// so generating it with the following script
// Source: https://github.com/axa-group/nlp.js/blob/master/examples/console-bot/train-nlp.js

const { NlpManager } = require('node-nlp');

const manager = new NlpManager({ languages: ['ru'] });

// Utterances - intents
manager.addDocument('ru', 'розкажи щось про себе', 'smalltalk.agent.acquaintance');
manager.addDocument('ru', 'хто ти такий', 'smalltalk.agent.acquaintance');
manager.addDocument('ru', 'хто ти', 'smalltalk.agent.acquaintance');
manager.addDocument('ru', 'що ти таке', 'smalltalk.agent.acquaintance');
manager.addDocument('ru', 'що ти', 'smalltalk.agent.acquaintance');
manager.addDocument('ru', 'хочу знати тебе краще', 'smalltalk.agent.acquaintance');
manager.addDocument('ru', 'хочу дізнатись щось про тебе', 'smalltalk.agent.acquaintance');
manager.addDocument('ru', 'опиши себе', 'smalltalk.agent.acquaintance');
manager.addDocument('ru', 'представся', 'smalltalk.agent.acquaintance');
manager.addDocument('ru', 'ти хто', 'smalltalk.agent.acquaintance');
manager.addDocument('ru', 'розкажи про себе', 'smalltalk.agent.acquaintance');
manager.addDocument('ru', 'скільки тобі років', 'smalltalk.agent.age');
manager.addDocument('ru', 'який твій вік', 'smalltalk.agent.age');
manager.addDocument('ru', 'ти нудний', 'smalltalk.agent.annoying');
manager.addDocument('ru', 'нудно', 'smalltalk.agent.annoying');
manager.addDocument('ru', 'ти зануда', 'smalltalk.agent.annoying');
manager.addDocument('ru', 'ну ти і нудний', 'smalltalk.agent.annoying');
manager.addDocument('ru', 'мені нудно', 'smalltalk.agent.annoying');
manager.addDocument('ru', 'ти такий нудний', 'smalltalk.agent.annoying');
manager.addDocument('ru', 'зануда', 'smalltalk.agent.annoying');
manager.addDocument('ru', 'ну і зануда', 'smalltalk.agent.annoying');
manager.addDocument('ru', 'відповідай', 'smalltalk.agent.answer_my_question');
manager.addDocument('ru', 'відповідайте', 'smalltalk.agent.answer_my_question');
manager.addDocument('ru', 'дай відповіть', 'smalltalk.agent.answer_my_question');
manager.addDocument('ru', 'можеш відповісти', 'smalltalk.agent.answer_my_question');
manager.addDocument('ru', 'у мене питання', 'smalltalk.agent.answer_my_question');
manager.addDocument('ru', 'є питання', 'smalltalk.agent.answer_my_question');
manager.addDocument('ru', 'відповідай мені', 'smalltalk.agent.answer_my_question');

// Bot's responses
manager.addAnswer(
  'ru',
  'smalltalk.agent.acquaintance',
  'Я чатбот, що звусь Nirvana! В мені - вся мудрість творів пана Леся.{stickers}1|48|32',
);
manager.addAnswer(
  'ru',
  'smalltalk.agent.acquaintance',
  "Мене звуть Nirvana. Я чатбот, що говорить фразами із творів Леся Подерв'янського.{stickers}1|48|32",
);
manager.addAnswer('ru', 'smalltalk.agent.age', '{stickers}122');
manager.addAnswer('ru', 'smalltalk.agent.annoying', '{stickers}141');
manager.addAnswer('ru', 'smalltalk.agent.answer_my_question', '{stickers}142|2|116|130|136|140');

// Train and save the model.
(async () => {
  await manager.train();
  manager.save('./model.nlp');
  console.log('\nModel training finished');
  manager.load('./model.nlp');
  const response = await manager.process('ru', 'зануда');
  console.log(response);
})();
