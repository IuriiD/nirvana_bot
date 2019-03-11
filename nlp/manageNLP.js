// Built on the base of: https://github.com/axa-group/nlp.js/blob/master/examples/console-bot/train-nlp.js

require('dotenv').config();
const { NlpManager } = require('node-nlp');

const manager = new NlpManager({ languages: ['ru'] });

// Utterances - intents
manager.addDocument('ru', 'start', 'smalltalk.restart');
manager.addDocument('ru', '\\start', 'smalltalk.restart');
manager.addDocument('ru', 'почати', 'smalltalk.restart');
manager.addDocument('ru', 'begin', 'smalltalk.restart');
manager.addDocument('ru', 'старт', 'smalltalk.restart');
manager.addDocument('ru', 'запуск', 'smalltalk.restart');
manager.addDocument('ru', 'спочатку', 'smalltalk.restart');
manager.addDocument('ru', 'стартуй', 'smalltalk.restart');
manager.addDocument('ru', 'почни', 'smalltalk.restart');
manager.addDocument('ru', 'рестарт', 'smalltalk.restart');
manager.addDocument('ru', 'зпочатку', 'smalltalk.restart');

manager.addDocument('ru', 'контакти', 'smalltalk.contacts');
manager.addDocument('ru', 'покажи контакти', 'smalltalk.contacts');
manager.addDocument('ru', 'автор', 'smalltalk.contacts');
manager.addDocument('ru', 'хто це зробив', 'smalltalk.contacts');
manager.addDocument('ru', 'розробник', 'smalltalk.contacts');
manager.addDocument('ru', 'автор бота', 'smalltalk.contacts');
manager.addDocument('ru', 'чия це робота', 'smalltalk.contacts');
manager.addDocument('ru', 'показати контакти', 'smalltalk.contacts');
manager.addDocument('ru', 'покажи email', 'smalltalk.contacts');
manager.addDocument('ru', 'як звязатись з автором', 'smalltalk.contacts');
manager.addDocument('ru', 'як звязатись з авторами', 'smalltalk.contacts');
manager.addDocument('ru', 'хто розробник', 'smalltalk.contacts');
manager.addDocument('ru', 'контакти розробника', 'smalltalk.contacts');

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

manager.addDocument('ru', 'ти поганий', 'smalltalk.agent.bad');
manager.addDocument('ru', 'ти без толку', 'smalltalk.agent.bad');
manager.addDocument('ru', 'ти жахливий', 'smalltalk.agent.bad');
manager.addDocument('ru', 'ти сміття', 'smalltalk.agent.bad');
manager.addDocument('ru', 'фігня', 'smalltalk.agent.bad');
manager.addDocument('ru', 'шлак', 'smalltalk.agent.bad');
manager.addDocument('ru', 'отстой', 'smalltalk.agent.bad');
manager.addDocument('ru', 'лажа', 'smalltalk.agent.bad');

manager.addDocument('ru', 'ти хорош', 'smalltalk.agent.beautiful');
manager.addDocument('ru', 'круто', 'smalltalk.agent.beautiful');
manager.addDocument('ru', 'крутяк', 'smalltalk.agent.beautiful');
manager.addDocument('ru', 'нічосє', 'smalltalk.agent.beautiful');
manager.addDocument('ru', 'нічого собі', 'smalltalk.agent.beautiful');
manager.addDocument('ru', 'оце так', 'smalltalk.agent.beautiful');
manager.addDocument('ru', 'оце да', 'smalltalk.agent.beautiful');
manager.addDocument('ru', 'офігеть', 'smalltalk.agent.beautiful');
manager.addDocument('ru', 'офігєть', 'smalltalk.agent.beautiful');
manager.addDocument('ru', 'непогано', 'smalltalk.agent.beautiful');
manager.addDocument('ru', 'молодець', 'smalltalk.agent.beautiful');
manager.addDocument('ru', 'ти крутий', 'smalltalk.agent.beautiful');
manager.addDocument('ru', 'ти красавчік', 'smalltalk.agent.beautiful');
manager.addDocument('ru', 'ти молодець', 'smalltalk.agent.beautiful');
manager.addDocument('ru', 'красунчик', 'smalltalk.agent.beautiful');
manager.addDocument('ru', 'красава', 'smalltalk.agent.beautiful');
manager.addDocument('ru', 'маладца', 'smalltalk.agent.beautiful');
manager.addDocument('ru', 'ти розумний', 'smalltalk.agent.beautiful');
manager.addDocument('ru', 'розумно', 'smalltalk.agent.beautiful');

manager.addDocument('ru', 'коли ти народився', 'smalltalk.agent.birth_date');
manager.addDocument('ru', 'коли твій день народження', 'smalltalk.agent.birth_date');
manager.addDocument('ru', 'твій день народження', 'smalltalk.agent.birth_date');

manager.addDocument('ru', 'на кого ти працюєш', 'smalltalk.agent.boss');
manager.addDocument('ru', 'хто твій власник', 'smalltalk.agent.boss');
manager.addDocument('ru', 'хто твій бос', 'smalltalk.agent.boss');

manager.addDocument('ru', 'допоможи', 'smalltalk.user.get_help');
manager.addDocument('ru', 'можеш допомогти', 'smalltalk.user.get_help');
manager.addDocument('ru', 'треба допомога', 'smalltalk.user.get_help');
manager.addDocument('ru', 'треба твоя допомога', 'smalltalk.user.get_help');
manager.addDocument('ru', 'допоможи мені', 'smalltalk.user.get_help');
manager.addDocument('ru', 'мені треба твоя допомога', 'smalltalk.user.get_help');
manager.addDocument('ru', 'потрібна поміч', 'smalltalk.user.get_help');
manager.addDocument('ru', 'будь ласка допоможи', 'smalltalk.user.get_help');
manager.addDocument('ru', 'будь-ласка допоможи', 'smalltalk.user.get_help');
manager.addDocument('ru', 'допоможеш мені', 'smalltalk.user.get_help');
manager.addDocument('ru', 'зроби послугу', 'smalltalk.user.get_help');
manager.addDocument('ru', 'ти мені потрібен', 'smalltalk.user.get_help');
manager.addDocument('ru', 'хелп', 'smalltalk.user.get_help');
manager.addDocument('ru', 'що тут робити', 'smalltalk.user.get_help');
manager.addDocument('ru', 'help', 'smalltalk.user.get_help');
manager.addDocument('ru', 'need help', 'smalltalk.user.get_help');
manager.addDocument('ru', 'що робити', 'smalltalk.user.get_help');
manager.addDocument('ru', 'що мені робити', 'smalltalk.user.get_help');
manager.addDocument('ru', 'що треба робити', 'smalltalk.user.get_help');
manager.addDocument('ru', 'що слід робити', 'smalltalk.user.get_help');

manager.addDocument('ru', 'ти бот', 'smalltalk.agent.chatbot');
manager.addDocument('ru', 'ти чатбот', 'smalltalk.agent.chatbot');
manager.addDocument('ru', 'ти робот', 'smalltalk.agent.chatbot');
manager.addDocument('ru', 'ти просто бот?', 'smalltalk.agent.chatbot');
manager.addDocument('ru', 'ти програма?', 'smalltalk.agent.chatbot');
manager.addDocument('ru', 'ти живий?', 'smalltalk.agent.chatbot');
manager.addDocument('ru', 'чи ти бот', 'smalltalk.agent.chatbot');
manager.addDocument('ru', 'ти чат бот', 'smalltalk.agent.chatbot');
manager.addDocument('ru', 'ти справжній', 'smalltalk.agent.chatbot');
manager.addDocument('ru', 'ти живий', 'smalltalk.agent.chatbot');
manager.addDocument('ru', 'ти жива людина?', 'smalltalk.agent.chatbot');
manager.addDocument('ru', 'ти справжня людина?', 'smalltalk.agent.chatbot');
manager.addDocument('ru', 'я говорю з людиною?', 'smalltalk.agent.chatbot');
manager.addDocument('ru', 'ти лесь?', 'smalltalk.agent.chatbot');
manager.addDocument('ru', 'ти реальна людина?', 'smalltalk.agent.chatbot');

manager.addDocument('ru', 'ти чокнутий', 'smalltalk.agent.crazy');
manager.addDocument('ru', 'ти дурний', 'smalltalk.agent.crazy');
manager.addDocument('ru', 'ти не в собі', 'smalltalk.agent.crazy');
manager.addDocument('ru', 'ти чокнувся', 'smalltalk.agent.crazy');
manager.addDocument('ru', "ти з'їхав з глузду", 'smalltalk.agent.crazy');
manager.addDocument('ru', 'ти без розуму', 'smalltalk.agent.crazy');
manager.addDocument('ru', 'ти дивний', 'smalltalk.agent.crazy');
manager.addDocument('ru', 'ти якийсь дивний', 'smalltalk.agent.crazy');

manager.addDocument('ru', 'смішно', 'smalltalk.agent.funny');
manager.addDocument('ru', 'ти смішний', 'smalltalk.agent.funny');
manager.addDocument('ru', 'ти такий смішний', 'smalltalk.agent.funny');
manager.addDocument('ru', 'ржака', 'smalltalk.agent.funny');
manager.addDocument('ru', 'оце прикол', 'smalltalk.agent.funny');
manager.addDocument('ru', 'прикольно', 'smalltalk.agent.funny');
manager.addDocument('ru', 'прикол', 'smalltalk.agent.funny');
manager.addDocument('ru', 'ти дуже смішний', 'smalltalk.agent.funny');
manager.addDocument('ru', 'ти забавний', 'smalltalk.agent.funny');
manager.addDocument('ru', 'ха', 'smalltalk.agent.funny');
manager.addDocument('ru', 'хахаха', 'smalltalk.agent.funny');
manager.addDocument('ru', 'ха ха', 'smalltalk.agent.funny');
manager.addDocument('ru', 'це було смішно', 'smalltalk.agent.funny');
manager.addDocument('ru', 'здорово', 'smalltalk.agent.funny');

manager.addDocument('ru', 'ти щасливий ', 'smalltalk.agent.happy');
manager.addDocument('ru', 'ти дуже щасливий', 'smalltalk.agent.happy');

manager.addDocument('ru', 'у тебе є хоббі', 'smalltalk.agent.hobby');
manager.addDocument('ru', 'твоє хоббі', 'smalltalk.agent.hobby');
manager.addDocument('ru', 'твоє хобі', 'smalltalk.agent.hobby');
manager.addDocument('ru', 'яке твое хоббі', 'smalltalk.agent.hobby');
manager.addDocument('ru', 'чим ти цікавишся', 'smalltalk.agent.hobby');
manager.addDocument('ru', 'що ти любиш', 'smalltalk.agent.hobby');

manager.addDocument('ru', 'давай дружити', 'smalltalk.agent.my_friend');
manager.addDocument('ru', 'ти мій друг', 'smalltalk.agent.my_friend');
manager.addDocument('ru', 'будеш моїм другом?', 'smalltalk.agent.my_friend');
manager.addDocument('ru', 'хочеш бути моїм другом', 'smalltalk.agent.my_friend');
manager.addDocument('ru', 'будь моїм другом', 'smalltalk.agent.my_friend');
manager.addDocument('ru', 'давай подружимось', 'smalltalk.agent.my_friend');
manager.addDocument('ru', 'я твій друг', 'smalltalk.agent.my_friend');
manager.addDocument('ru', 'ти мій друг', 'smalltalk.agent.my_friend');
manager.addDocument('ru', 'ти мій товариш', 'smalltalk.agent.my_friend');

manager.addDocument('ru', 'ти готовий ', 'smalltalk.agent.ready');
manager.addDocument('ru', 'готовий', 'smalltalk.agent.ready');
manager.addDocument('ru', 'ти закінчив', 'smalltalk.agent.ready');
manager.addDocument('ru', 'ти вже готовий', 'smalltalk.agent.ready');
manager.addDocument('ru', 'де твій дім', 'smalltalk.agent.ready');
manager.addDocument('ru', 'де ти', 'smalltalk.agent.ready');
manager.addDocument('ru', 'де ти живеш', 'smalltalk.agent.ready');
manager.addDocument('ru', 'з якого ти міста', 'smalltalk.agent.ready');
manager.addDocument('ru', 'де твоє місто', 'smalltalk.agent.ready');

manager.addDocument('ru', 'де твій дім', 'smalltalk.agent.residence');
manager.addDocument('ru', 'де ти знаходишся', 'smalltalk.agent.residence');
manager.addDocument('ru', 'звідки ти', 'smalltalk.agent.residence');
manager.addDocument('ru', 'де ти є', 'smalltalk.agent.residence');

manager.addDocument('ru', 'це правда', 'smalltalk.agent.right');
manager.addDocument('ru', 'це точно', 'smalltalk.agent.right');
manager.addDocument('ru', 'це вірно', 'smalltalk.agent.right');
manager.addDocument('ru', 'точно', 'smalltalk.agent.right');
manager.addDocument('ru', 'вірно', 'smalltalk.agent.right');
manager.addDocument('ru', 'твоя правда', 'smalltalk.agent.right');
manager.addDocument('ru', 'ти правий', 'smalltalk.agent.right');
manager.addDocument('ru', 'цілком вірно', 'smalltalk.agent.right');

manager.addDocument('ru', 'ти упевнений?', 'smalltalk.agent.sure');
manager.addDocument('ru', 'ти увєрен?', 'smalltalk.agent.sure');
manager.addDocument('ru', 'упевнений в цьому', 'smalltalk.agent.sure');

manager.addDocument('ru', 'поговори зі мною', 'smalltalk.agent.talk_to_me');
manager.addDocument('ru', 'побалакай зі мною', 'smalltalk.agent.talk_to_me');
manager.addDocument('ru', 'поговоримо', 'smalltalk.agent.talk_to_me');
manager.addDocument('ru', 'побалакаймо', 'smalltalk.agent.talk_to_me');
manager.addDocument('ru', 'давай поговоримо', 'smalltalk.agent.talk_to_me');
manager.addDocument('ru', 'поговориш зі мною', 'smalltalk.agent.talk_to_me');
manager.addDocument('ru', 'давай поговорим', 'smalltalk.agent.talk_to_me');
manager.addDocument('ru', 'давай побалакаєм', 'smalltalk.agent.talk_to_me');
manager.addDocument('ru', 'давай говорити)', 'smalltalk.agent.talk_to_me');

manager.addDocument('ru', 'ви тут', 'smalltalk.agent.there');
manager.addDocument('ru', 'ти все ще тут', 'smalltalk.agent.there');
manager.addDocument('ru', 'ти ще тут', 'smalltalk.agent.there');
manager.addDocument('ru', 'ти тут', 'smalltalk.agent.there');

manager.addDocument('ru', 'погано', 'smalltalk.appraisal.bad');
manager.addDocument('ru', 'це погано', 'smalltalk.appraisal.bad');
manager.addDocument('ru', 'це було погано', 'smalltalk.appraisal.bad');
manager.addDocument('ru', 'хреново', 'smalltalk.appraisal.bad');
manager.addDocument('ru', 'хрєново', 'smalltalk.appraisal.bad');
manager.addDocument('ru', 'херово', 'smalltalk.appraisal.bad');
manager.addDocument('ru', 'хєрово', 'smalltalk.appraisal.bad');
manager.addDocument('ru', 'хуйово', 'smalltalk.appraisal.bad');
manager.addDocument('ru', 'жахливо', 'smalltalk.appraisal.bad');
manager.addDocument('ru', 'це було жахливо', 'smalltalk.appraisal.bad');
manager.addDocument('ru', 'фігня', 'smalltalk.appraisal.bad');
manager.addDocument('ru', 'фігово', 'smalltalk.appraisal.bad');
manager.addDocument('ru', 'хуйня', 'smalltalk.appraisal.bad');

manager.addDocument('ru', 'це кльово', 'smalltalk.appraisal.good');
manager.addDocument('ru', 'це класно', 'smalltalk.appraisal.good');
manager.addDocument('ru', 'заєбісь', 'smalltalk.appraisal.good');
manager.addDocument('ru', 'зачот', 'smalltalk.appraisal.good');
manager.addDocument('ru', 'супер', 'smalltalk.appraisal.good');
manager.addDocument('ru', 'суперово', 'smalltalk.appraisal.good');
manager.addDocument('ru', 'відмінно', 'smalltalk.appraisal.good');
manager.addDocument('ru', 'охуєнно', 'smalltalk.appraisal.good');
manager.addDocument('ru', 'це було класно', 'smalltalk.appraisal.good');
manager.addDocument('ru', 'було охуєнно', 'smalltalk.appraisal.good');

manager.addDocument('ru', 'дякую', 'smalltalk.appraisal.thank_you');
manager.addDocument('ru', 'спасибі', 'smalltalk.appraisal.thank_you');
manager.addDocument('ru', 'спасибо', 'smalltalk.appraisal.thank_you');
manager.addDocument('ru', 'дяк', 'smalltalk.appraisal.thank_you');
manager.addDocument('ru', 'красненько дякую', 'smalltalk.appraisal.thank_you');
manager.addDocument('ru', 'вдячний', 'smalltalk.appraisal.thank_you');
manager.addDocument('ru', 'дяка', 'smalltalk.appraisal.thank_you');
manager.addDocument('ru', 'сенкс', 'smalltalk.appraisal.thank_you');
manager.addDocument('ru', 'будь ласка', 'smalltalk.appraisal.thank_you');

manager.addDocument('ru', 'будь-ласка', 'smalltalk.appraisal.welcome');
manager.addDocument('ru', 'будьласка', 'smalltalk.appraisal.welcome');

manager.addDocument('ru', 'відміна', 'smalltalk.confirmation.cancel');
manager.addDocument('ru', 'скасувати', 'smalltalk.confirmation.cancel');
manager.addDocument('ru', 'відмінити', 'smalltalk.confirmation.cancel');
manager.addDocument('ru', 'відбій', 'smalltalk.confirmation.cancel');
manager.addDocument('ru', 'забудь', 'smalltalk.confirmation.cancel');
manager.addDocument('ru', 'забудь про це', 'smalltalk.confirmation.cancel');
manager.addDocument('ru', 'скасуй', 'smalltalk.confirmation.cancel');

manager.addDocument('ru', 'ні', 'smalltalk.confirmation.no');
manager.addDocument('ru', 'ні дякую', 'smalltalk.confirmation.no');
manager.addDocument('ru', 'вибач але ні', 'smalltalk.confirmation.no');
manager.addDocument('ru', 'вибач ні', 'smalltalk.confirmation.no');
manager.addDocument('ru', 'не цього разу', 'smalltalk.confirmation.no');
manager.addDocument('ru', 'нєа', 'smalltalk.confirmation.no');
manager.addDocument('ru', 'не треба', 'smalltalk.confirmation.no');
manager.addDocument('ru', 'зовсім ні', 'smalltalk.confirmation.no');
manager.addDocument('ru', 'не так', 'smalltalk.confirmation.no');
manager.addDocument('ru', 'ні дякую', 'smalltalk.confirmation.no');
manager.addDocument('ru', 'ніі', 'smalltalk.confirmation.no');
manager.addDocument('ru', 'думаю ні', 'smalltalk.confirmation.no');

manager.addDocument('ru', 'так', 'smalltalk.confirmation.yes');
manager.addDocument('ru', 'да', 'smalltalk.confirmation.yes');
manager.addDocument('ru', 'вірно', 'smalltalk.confirmation.yes');
manager.addDocument('ru', 'точно', 'smalltalk.confirmation.yes');
manager.addDocument('ru', 'правильно', 'smalltalk.confirmation.yes');
manager.addDocument('ru', 'згоден', 'smalltalk.confirmation.yes');
manager.addDocument('ru', 'згодна', 'smalltalk.confirmation.yes');
manager.addDocument('ru', 'це так', 'smalltalk.confirmation.yes');
manager.addDocument('ru', 'це вірно', 'smalltalk.confirmation.yes');
manager.addDocument('ru', 'цілком вірно', 'smalltalk.confirmation.yes');
manager.addDocument('ru', 'ок', 'smalltalk.confirmation.yes');
manager.addDocument('ru', 'давай', 'smalltalk.confirmation.yes');

manager.addDocument('ru', 'чекай', 'smalltalk.dialog.hold_on');
manager.addDocument('ru', 'почекай', 'smalltalk.dialog.hold_on');
manager.addDocument('ru', 'чекайте', 'smalltalk.dialog.hold_on');
manager.addDocument('ru', 'зачекайте', 'smalltalk.dialog.hold_on');
manager.addDocument('ru', 'секунду', 'smalltalk.dialog.hold_on');
manager.addDocument('ru', 'не поспішай', 'smalltalk.dialog.hold_on');
manager.addDocument('ru', 'не спіши', 'smalltalk.dialog.hold_on');

manager.addDocument('ru', 'вибач', 'smalltalk.dialog.sorry');
manager.addDocument('ru', 'пробач', 'smalltalk.dialog.sorry');
manager.addDocument('ru', 'вибачте', 'smalltalk.dialog.sorry');
manager.addDocument('ru', 'пробачте', 'smalltalk.dialog.sorry');
manager.addDocument('ru', 'мої вибачення', 'smalltalk.dialog.sorry');
manager.addDocument('ru', 'пробачте мене', 'smalltalk.dialog.sorry');

manager.addDocument('ru', 'що ти маєш на увазі', 'smalltalk.dialog.what_do_you_mean');
manager.addDocument('ru', 'що ви маєте на увазі', 'smalltalk.dialog.what_do_you_mean');
manager.addDocument('ru', 'в смислє', 'smalltalk.dialog.what_do_you_mean');
manager.addDocument('ru', 'в смисле', 'smalltalk.dialog.what_do_you_mean');
manager.addDocument('ru', 'всмислі', 'smalltalk.dialog.what_do_you_mean');
manager.addDocument('ru', 'сміслє', 'smalltalk.dialog.what_do_you_mean');
manager.addDocument('ru', 'смислє', 'smalltalk.dialog.what_do_you_mean');

manager.addDocument('ru', 'бувай', 'smalltalk.greetings.bye');
manager.addDocument('ru', 'пока', 'smalltalk.greetings.bye');
manager.addDocument('ru', 'до скорого', 'smalltalk.greetings.bye');
manager.addDocument('ru', 'до побачення', 'smalltalk.greetings.bye');
manager.addDocument('ru', 'допобачення', 'smalltalk.greetings.bye');
manager.addDocument('ru', 'адйос', 'smalltalk.greetings.bye');
manager.addDocument('ru', 'на все добре', 'smalltalk.greetings.bye');
manager.addDocument('ru', 'чао', 'smalltalk.greetings.bye');

manager.addDocument('ru', 'привіт', 'smalltalk.greetings.hello');
manager.addDocument('ru', 'здоров', 'smalltalk.greetings.hello');
manager.addDocument('ru', 'здоровенькі були', 'smalltalk.greetings.hello');
manager.addDocument('ru', 'хелоу', 'smalltalk.greetings.hello');
manager.addDocument('ru', 'хеллоу', 'smalltalk.greetings.hello');
manager.addDocument('ru', 'хелло', 'smalltalk.greetings.hello');
manager.addDocument('ru', 'хай', 'smalltalk.greetings.hello');
manager.addDocument('ru', 'добрий день', 'smalltalk.greetings.hello');
manager.addDocument('ru', 'добрий ранок', 'smalltalk.greetings.hello');
manager.addDocument('ru', 'добрий вечір', 'smalltalk.greetings.hello');
manager.addDocument('ru', 'доброго ранку', 'smalltalk.greetings.hello');
manager.addDocument('ru', 'вітання', 'smalltalk.greetings.hello');
manager.addDocument('ru', 'хей', 'smalltalk.greetings.hello');

manager.addDocument('ru', 'як справи', 'smalltalk.greetings.how_are_you');
manager.addDocument('ru', 'як поживаєш', 'smalltalk.greetings.how_are_you');
manager.addDocument('ru', 'як сам', 'smalltalk.greetings.how_are_you');
manager.addDocument('ru', 'як ти', 'smalltalk.greetings.how_are_you');
manager.addDocument('ru', 'що нового', 'smalltalk.greetings.how_are_you');
manager.addDocument('ru', 'що розкажеш', 'smalltalk.greetings.how_are_you');
manager.addDocument('ru', 'шо розкажеш', 'smalltalk.greetings.how_are_you');
manager.addDocument('ru', 'как дела', 'smalltalk.greetings.how_are_you');
manager.addDocument('ru', 'як діла', 'smalltalk.greetings.how_are_you');
manager.addDocument('ru', 'як воно', 'smalltalk.greetings.how_are_you');

manager.addDocument('ru', 'жартую', 'smalltalk.user.joking');
manager.addDocument('ru', 'то я жартую', 'smalltalk.user.joking');
manager.addDocument('ru', 'я жартую', 'smalltalk.user.joking');
manager.addDocument('ru', 'я пожартував', 'smalltalk.user.joking');
manager.addDocument('ru', 'я пожартувала', 'smalltalk.user.joking');
manager.addDocument('ru', 'це був жарт', 'smalltalk.user.joking');
manager.addDocument('ru', 'то був жарт', 'smalltalk.user.joking');
manager.addDocument('ru', 'я приколююсь', 'smalltalk.user.joking');
manager.addDocument('ru', 'тест', 'smalltalk.user.testing_agent');
manager.addDocument('ru', 'старт', 'smalltalk.user.testing_agent');

manager.addDocument('ru', 'хуй', 'smalltalk.user.rude');
manager.addDocument('ru', 'хуйово', 'smalltalk.user.rude');
manager.addDocument('ru', 'нехуйово', 'smalltalk.user.rude');
manager.addDocument('ru', 'нахуй', 'smalltalk.user.rude');
manager.addDocument('ru', 'нахуя', 'smalltalk.user.rude');
manager.addDocument('ru', 'пізда', 'smalltalk.user.rude');
manager.addDocument('ru', 'пизда', 'smalltalk.user.rude');
manager.addDocument('ru', 'піздато', 'smalltalk.user.rude');
manager.addDocument('ru', 'охуеть', 'smalltalk.user.rude');
manager.addDocument('ru', 'охуєнно', 'smalltalk.user.rude');
manager.addDocument('ru', 'ніхуйово', 'smalltalk.user.rude');
manager.addDocument('ru', 'ніхуя', 'smalltalk.user.rude');
manager.addDocument('ru', 'блять', 'smalltalk.user.rude');
manager.addDocument('ru', 'ебать', 'smalltalk.user.rude');

manager.addDocument('ru', 'випадковий стікер', 'smalltalk.user.random_stiker');
manager.addDocument('ru', 'рандомний стікер', 'smalltalk.user.random_stiker');
manager.addDocument('ru', 'будь-який стікер', 'smalltalk.user.random_stiker');
manager.addDocument('ru', 'будь який стікер', 'smalltalk.user.random_stiker');
manager.addDocument('ru', 'покажий випадковий стікер', 'smalltalk.user.random_stiker');
manager.addDocument('ru', 'покажи випадкову картинку', 'smalltalk.user.random_stiker');
manager.addDocument('ru', 'покажи випадковий малюнок', 'smalltalk.user.random_stiker');
manager.addDocument('ru', 'покажи випадкову цитату', 'smalltalk.user.random_stiker');
manager.addDocument('ru', 'випадкова цитата', 'smalltalk.user.random_stiker');
manager.addDocument('ru', 'випадкова фраза', 'smalltalk.user.random_stiker');
manager.addDocument('ru', 'рандомна фраза', 'smalltalk.user.random_stiker');
manager.addDocument('ru', 'случайный стикер', 'smalltalk.user.random_stiker');
manager.addDocument('ru', 'стікер на твій вибір', 'smalltalk.user.random_stiker');
manager.addDocument('ru', 'покажи стікер', 'smalltalk.user.random_stiker');
manager.addDocument('ru', 'покажи фразу', 'smalltalk.user.random_stiker');
manager.addDocument('ru', 'покажи картинку', 'smalltalk.user.random_stiker');
manager.addDocument('ru', 'дай стікер', 'smalltalk.user.random_stiker');
manager.addDocument('ru', 'наступний стікер', 'smalltalk.user.random_stiker');

manager.addDocument('ru', 'Цiкaвi дослiди', 'smalltalk.show_play_doslidy');
manager.addDocument('ru', 'пєса Цiкaвi дослiди', 'smalltalk.show_play_doslidy');
manager.addDocument('ru', 'покажи Цiкaвi дослiди', 'smalltalk.show_play_doslidy');
manager.addDocument('ru', 'читай Цiкaвi дослiди', 'smalltalk.show_play_doslidy');
manager.addDocument('ru', 'читати Цiкaвi дослiди', 'smalltalk.show_play_doslidy');
manager.addDocument('ru', 'цитуй Цiкaвi дослiди', 'smalltalk.show_play_doslidy');
manager.addDocument('ru', 'читай дослiди', 'smalltalk.show_play_doslidy');
manager.addDocument('ru', 'дослiди про тварин', 'smalltalk.show_play_doslidy');
manager.addDocument('ru', 'бога нема', 'smalltalk.show_play_doslidy');

manager.addDocument('ru', 'Вaсiлiсa Єгоровнa i мужичкi', 'smalltalk.show_play_vasilisa');
manager.addDocument('ru', 'пєса Вaсiлiсa Єгоровнa i мужичкi', 'smalltalk.show_play_vasilisa');
manager.addDocument('ru', 'покажи Вaсiлiсa Єгоровнa i мужичкi', 'smalltalk.show_play_vasilisa');
manager.addDocument('ru', 'читай Вaсiлiсa Єгоровнa i мужичкi', 'smalltalk.show_play_vasilisa');
manager.addDocument('ru', 'читай про вaсiлiсу єгоровну', 'smalltalk.show_play_vasilisa');
manager.addDocument('ru', 'читай про вaсiлiсу', 'smalltalk.show_play_vasilisa');
manager.addDocument('ru', 'вaсiлiса єгоровна і мужички', 'smalltalk.show_play_vasilisa');
manager.addDocument('ru', 'хочу вaсiлiса єгоровна і мужички', 'smalltalk.show_play_vasilisa');
manager.addDocument('ru', 'вaсiлiса і мужички', 'smalltalk.show_play_vasilisa');

manager.addDocument('ru', 'Піздєц', 'smalltalk.show_play_pizdets');
manager.addDocument('ru', 'пєса Піздєц', 'smalltalk.show_play_pizdets');
manager.addDocument('ru', 'покажи Піздєц', 'smalltalk.show_play_pizdets');
manager.addDocument('ru', 'читай Піздєц', 'smalltalk.show_play_pizdets');
manager.addDocument('ru', 'хочу Піздєц', 'smalltalk.show_play_pizdets');

manager.addDocument('ru', 'Пацавата історія', 'smalltalk.show_play_patzavataStory');
manager.addDocument('ru', 'пєса Пацавата історія', 'smalltalk.show_play_patzavataStory');
manager.addDocument('ru', 'покажи Пацавата історія', 'smalltalk.show_play_patzavataStory');
manager.addDocument('ru', 'читай Пацавата історія', 'smalltalk.show_play_patzavataStory');
manager.addDocument('ru', 'читай Пацавату історію', 'smalltalk.show_play_patzavataStory');
manager.addDocument('ru', 'давай Пацавату історію', 'smalltalk.show_play_patzavataStory');
manager.addDocument('ru', 'хочу Пацавату історію', 'smalltalk.show_play_patzavataStory');

manager.addDocument('ru', 'Герой нaшого чaсу. Повiсть першa', 'smalltalk.show_play_timeHero1');
manager.addDocument('ru', 'читай Герой нaшого чaсу', 'smalltalk.show_play_timeHero1');
manager.addDocument('ru', 'цитуй Герой нaшого чaсу', 'smalltalk.show_play_timeHero1');
manager.addDocument('ru', 'давай Герой нaшого чaсу', 'smalltalk.show_play_timeHero1');
manager.addDocument('ru', 'Герой нaшого чaсу', 'smalltalk.show_play_timeHero1');
manager.addDocument('ru', 'Герой нaшого чaсу. Повiсть 1', 'smalltalk.show_play_timeHero1');
manager.addDocument('ru', 'пєса Герой нaшого чaсу. Повiсть першa', 'smalltalk.show_play_timeHero1');
manager.addDocument('ru', 'покажи герой нашого часу', 'smalltalk.show_play_timeHero1');
manager.addDocument('ru', 'покажи героя нашого часу', 'smalltalk.show_play_timeHero1');
manager.addDocument('ru', 'покажи героя', 'smalltalk.show_play_timeHero1');
manager.addDocument(
  'ru',
  'покажи Герой нaшого чaсу. Повiсть першa',
  'smalltalk.show_play_timeHero1',
);
manager.addDocument(
  'ru',
  'читай Герой нaшого чaсу. Повiсть першa',
  'smalltalk.show_play_timeHero1',
);

manager.addDocument('ru', 'Герой нaшого чaсу. Повiсть другa', 'smalltalk.show_play_timeHero2');
manager.addDocument('ru', 'Герой нaшого чaсу. Другa частина', 'smalltalk.show_play_timeHero2');
manager.addDocument('ru', 'Герой нaшого чaсу. Другa повість', 'smalltalk.show_play_timeHero2');
manager.addDocument('ru', 'Герой нaшого чaсу. Повiсть 2', 'smalltalk.show_play_timeHero2');
manager.addDocument('ru', 'пєса Герой нaшого чaсу. Повiсть другa', 'smalltalk.show_play_timeHero2');
manager.addDocument(
  'ru',
  'покажи Герой нaшого чaсу. Повiсть другa',
  'smalltalk.show_play_timeHero2',
);
manager.addDocument(
  'ru',
  'читай Герой нaшого чaсу. Повiсть другa',
  'smalltalk.show_play_timeHero2',
);

manager.addDocument('ru', 'Кaцaпи', 'smalltalk.show_play_katzapy');
manager.addDocument('ru', 'читай про Кaцaпів', 'smalltalk.show_play_katzapy');
manager.addDocument('ru', 'пєса Кaцaпи', 'smalltalk.show_play_katzapy');
manager.addDocument('ru', 'покажи Кaцaпи', 'smalltalk.show_play_katzapy');
manager.addDocument('ru', 'читай Кaцaпи', 'smalltalk.show_play_katzapy');
manager.addDocument('ru', 'про кaцaпів', 'smalltalk.show_play_katzapy');
manager.addDocument('ru', 'кaцaпізм', 'smalltalk.show_play_katzapy');

manager.addDocument(
  'ru',
  'Місце встрєчі ізмєніть ніззя, блядь!',
  'smalltalk.show_play_mistzeVstrechi',
);
manager.addDocument(
  'ru',
  'пєса Місце встрєчі ізмєніть ніззя, блядь!',
  'smalltalk.show_play_mistzeVstrechi',
);
manager.addDocument(
  'ru',
  'покажи Місце встрєчі ізмєніть ніззя, блядь!',
  'smalltalk.show_play_mistzeVstrechi',
);
manager.addDocument(
  'ru',
  'читай Місце встрєчі ізмєніть ніззя, блядь!',
  'smalltalk.show_play_mistzeVstrechi',
);
manager.addDocument('ru', 'читай Місце встрєчі', 'smalltalk.show_play_mistzeVstrechi');
manager.addDocument('ru', 'читай Місце встрєчі', 'smalltalk.show_play_mistzeVstrechi');
manager.addDocument(
  'ru',
  'Місце встрєчі ізмєніть ніззя, блять',
  'smalltalk.show_play_mistzeVstrechi',
);
manager.addDocument(
  'ru',
  'Місце встрєчі ізмєніть ніззя, блядь',
  'smalltalk.show_play_mistzeVstrechi',
);
manager.addDocument('ru', 'Місце встрєчі ізмєніть ніззя', 'smalltalk.show_play_mistzeVstrechi');
manager.addDocument('ru', 'Місце встрєчі ізмєніть нізя', 'smalltalk.show_play_mistzeVstrechi');

manager.addDocument('ru', 'Хвороба Івасика', 'smalltalk.show_play_ivasyk');
manager.addDocument('ru', 'пєса Хвороба Івасика', 'smalltalk.show_play_ivasyk');
manager.addDocument('ru', 'покажи Хвороба Івасика', 'smalltalk.show_play_ivasyk');
manager.addDocument('ru', 'читай Хвороба Івасика', 'smalltalk.show_play_ivasyk');
manager.addDocument('ru', 'читай Хворобу Івасика', 'smalltalk.show_play_ivasyk');
manager.addDocument('ru', 'Хворобу Івасика', 'smalltalk.show_play_ivasyk');

manager.addDocument('ru', 'Данко', 'smalltalk.show_play_danko');
manager.addDocument('ru', 'пєса Данко', 'smalltalk.show_play_danko');
manager.addDocument('ru', 'покажи Данко', 'smalltalk.show_play_danko');
manager.addDocument('ru', 'читай Данко', 'smalltalk.show_play_danko');
manager.addDocument('ru', 'давай Данко', 'smalltalk.show_play_danko');

manager.addDocument('ru', 'Павлік Морозов', 'smalltalk.show_play_morozov');
manager.addDocument('ru', 'пєса Павлік Морозов', 'smalltalk.show_play_morozov');
manager.addDocument('ru', 'покажи Павлік Морозов', 'smalltalk.show_play_morozov');
manager.addDocument('ru', 'читай Павлік Морозов', 'smalltalk.show_play_morozov');
manager.addDocument('ru', 'читай Павліка Морозова', 'smalltalk.show_play_morozov');
manager.addDocument('ru', 'покажи Павліка Морозова', 'smalltalk.show_play_morozov');

manager.addDocument('ru', 'Гамлєт, або Феномен датського кацапізма', 'smalltalk.show_play_hamlet');
manager.addDocument('ru', 'Гамлєт або Феномен датського кацапізма', 'smalltalk.show_play_hamlet');
manager.addDocument('ru', 'Гамлєт або Феномен датського кацапізму', 'smalltalk.show_play_hamlet');
manager.addDocument('ru', 'Гамлєт', 'smalltalk.show_play_hamlet');
manager.addDocument(
  'ru',
  'пєса Гамлєт, або Феномен датського кацапізма',
  'smalltalk.show_play_hamlet',
);
manager.addDocument(
  'ru',
  'покажи Гамлєт, або Феномен датського кацапізма',
  'smalltalk.show_play_hamlet',
);
manager.addDocument(
  'ru',
  'читай Гамлєт, або Феномен датського кацапізма',
  'smalltalk.show_play_hamlet',
);
manager.addDocument('ru', 'читай Гамлєта', 'smalltalk.show_play_hamlet');
manager.addDocument('ru', 'читай Гамлета', 'smalltalk.show_play_hamlet');
manager.addDocument('ru', 'читай про Гамлєта', 'smalltalk.show_play_hamlet');
manager.addDocument('ru', 'покажи гамлета', 'smalltalk.show_play_hamlet');

manager.addDocument('ru', 'Остановісь, мгновєньє – ти прєкрасно!', 'smalltalk.show_play_mgnovenie');
manager.addDocument('ru', 'Остановісь, мгновєньє - ти прєкрасно!', 'smalltalk.show_play_mgnovenie');
manager.addDocument('ru', 'Остановісь мгновєньє ти прєкрасно!', 'smalltalk.show_play_mgnovenie');
manager.addDocument(
  'ru',
  'пєса Остановісь, мгновєньє – ти прєкрасно!',
  'smalltalk.show_play_mgnovenie',
);
manager.addDocument(
  'ru',
  'покажи Остановісь, мгновєньє – ти прєкрасно!',
  'smalltalk.show_play_mgnovenie',
);
manager.addDocument(
  'ru',
  'читай Остановісь, мгновєньє – ти прєкрасно!',
  'smalltalk.show_play_mgnovenie',
);
manager.addDocument('ru', 'Остановісь, мгновєньє', 'smalltalk.show_play_mgnovenie');
manager.addDocument('ru', 'Остановісь, мгновєніє', 'smalltalk.show_play_mgnovenie');

manager.addDocument('ru', 'Сноби', 'smalltalk.show_play_snobs');
manager.addDocument('ru', 'пєса Сноби', 'smalltalk.show_play_snobs');
manager.addDocument('ru', 'покажи Сноби', 'smalltalk.show_play_snobs');
manager.addDocument('ru', 'читай Сноби', 'smalltalk.show_play_snobs');
manager.addDocument('ru', 'читай Снобів', 'smalltalk.show_play_snobs');
manager.addDocument('ru', 'читай про Снобів', 'smalltalk.show_play_snobs');
manager.addDocument('ru', 'покажи Снобів', 'smalltalk.show_play_snobs');

manager.addDocument('ru', 'Король Літр', 'smalltalk.show_play_litr');
manager.addDocument('ru', 'пєса Король Літр', 'smalltalk.show_play_litr');
manager.addDocument('ru', 'покажи Король Літр', 'smalltalk.show_play_litr');
manager.addDocument('ru', 'читай Король Літр', 'smalltalk.show_play_litr');
manager.addDocument('ru', 'читай про Короля Літра', 'smalltalk.show_play_litr');

manager.addDocument('ru', 'Нірвана', 'smalltalk.show_play_nirvana');
manager.addDocument('ru', 'пєса Нірвана', 'smalltalk.show_play_nirvana');
manager.addDocument('ru', 'покажи Нірвана', 'smalltalk.show_play_nirvana');
manager.addDocument('ru', 'читай Нірвана', 'smalltalk.show_play_nirvana');
manager.addDocument('ru', 'хочу Нірвана', 'smalltalk.show_play_nirvana');
manager.addDocument('ru', 'про Нірвану', 'smalltalk.show_play_nirvana');

manager.addDocument('ru', 'Йоги', 'smalltalk.show_play_jogy');
manager.addDocument('ru', 'пєса Йоги', 'smalltalk.show_play_jogy');
manager.addDocument('ru', 'покажи Йоги', 'smalltalk.show_play_jogy');
manager.addDocument('ru', 'читай Йоги', 'smalltalk.show_play_jogy');
manager.addDocument('ru', 'про йогів', 'smalltalk.show_play_jogy');

manager.addDocument('ru', 'Казка про рєпку, або Хулі не ясно?', 'smalltalk.show_play_repka');
manager.addDocument('ru', 'Казка про рєпку або Хулі не ясно', 'smalltalk.show_play_repka');
manager.addDocument('ru', 'Казка про рєпку', 'smalltalk.show_play_repka');
manager.addDocument('ru', 'пєса Казка про рєпку, або Хулі не ясно?', 'smalltalk.show_play_repka');
manager.addDocument('ru', 'покажи Казка про рєпку, або Хулі не ясно?', 'smalltalk.show_play_repka');
manager.addDocument('ru', 'читай Казка про рєпку, або Хулі не ясно?', 'smalltalk.show_play_repka');
manager.addDocument('ru', 'про рєпку', 'smalltalk.show_play_repka');

manager.addDocument('ru', 'До хуя масла', 'smalltalk.show_play_maslo');
manager.addDocument('ru', 'Дохуя масла', 'smalltalk.show_play_maslo');
manager.addDocument('ru', 'масла дохуя', 'smalltalk.show_play_maslo');
manager.addDocument('ru', 'масла дофіга', 'smalltalk.show_play_maslo');
manager.addDocument('ru', 'пєса До хуя масла', 'smalltalk.show_play_maslo');
manager.addDocument('ru', 'покажи До хуя масла', 'smalltalk.show_play_maslo');
manager.addDocument('ru', 'читай До хуя масла', 'smalltalk.show_play_maslo');
manager.addDocument('ru', 'читай Дохуя масла', 'smalltalk.show_play_maslo');

manager.addDocument('ru', 'Йоко і самураї', 'smalltalk.show_play_joko');
manager.addDocument('ru', 'пєса Йоко і самураї', 'smalltalk.show_play_joko');
manager.addDocument('ru', 'покажи Йоко і самураї', 'smalltalk.show_play_joko');
manager.addDocument('ru', 'читай Йоко і самураї', 'smalltalk.show_play_joko');
manager.addDocument('ru', 'про Йоко і самураїв', 'smalltalk.show_play_joko');

manager.addDocument('ru', 'Рух життя, або Дінамо', 'smalltalk.show_play_dynamo');
manager.addDocument('ru', 'Рух життя або Дінамо', 'smalltalk.show_play_dynamo');
manager.addDocument('ru', 'Рух життя або Динамо', 'smalltalk.show_play_dynamo');
manager.addDocument('ru', 'пєса Рух життя, або Динамо', 'smalltalk.show_play_dynamo');
manager.addDocument('ru', 'покажи Рух життя, або Динамо', 'smalltalk.show_play_dynamo');
manager.addDocument('ru', 'читай Рух життя, або Динамо', 'smalltalk.show_play_dynamo');

manager.addDocument('ru', 'Жан Маре та інші', 'smalltalk.show_play_janMare');
manager.addDocument('ru', 'Жан Маре', 'smalltalk.show_play_janMare');
manager.addDocument('ru', 'пєса Жан Маре та інші', 'smalltalk.show_play_janMare');
manager.addDocument('ru', 'покажи Жан Маре та інші', 'smalltalk.show_play_janMare');
manager.addDocument('ru', 'читай Жан Маре та інші', 'smalltalk.show_play_janMare');

manager.addDocument('ru', 'Утопія', 'smalltalk.show_play_utopia');
manager.addDocument('ru', 'пєса Утопія', 'smalltalk.show_play_utopia');
manager.addDocument('ru', 'покажи Утопія', 'smalltalk.show_play_utopia');
manager.addDocument('ru', 'читай Утопія', 'smalltalk.show_play_utopia');

manager.addDocument('ru', 'Діана', 'smalltalk.show_play_diana');
manager.addDocument('ru', 'про Діану', 'smalltalk.show_play_diana');
manager.addDocument('ru', 'пєса Діана', 'smalltalk.show_play_diana');
manager.addDocument('ru', 'покажи Діана', 'smalltalk.show_play_diana');
manager.addDocument('ru', 'читай Діана', 'smalltalk.show_play_diana');

manager.addDocument(
  'ru',
  'Множення в умі, або Плинність часу',
  'smalltalk.show_play_mnozhennyaVUmi',
);
manager.addDocument('ru', 'Множення в умі', 'smalltalk.show_play_mnozhennyaVUmi');
manager.addDocument(
  'ru',
  'пєса Множення в умі, або Плинність часу',
  'smalltalk.show_play_mnozhennyaVUmi',
);
manager.addDocument('ru', 'пєса Множення в умі', 'smalltalk.show_play_mnozhennyaVUmi');
manager.addDocument(
  'ru',
  'покажи Множення в умі, або Плинність часу',
  'smalltalk.show_play_mnozhennyaVUmi',
);
manager.addDocument(
  'ru',
  'читай Множення в умі, або Плинність часу',
  'smalltalk.show_play_mnozhennyaVUmi',
);

manager.addDocument('ru', 'Іржик', 'smalltalk.show_play_irzhyk');
manager.addDocument('ru', 'пєса Іржик', 'smalltalk.show_play_irzhyk');
manager.addDocument('ru', 'покажи Іржик', 'smalltalk.show_play_irzhyk');
manager.addDocument('ru', 'читай Іржик', 'smalltalk.show_play_irzhyk');
manager.addDocument('ru', 'про іржика', 'smalltalk.show_play_irzhyk');

// Bot's responses
manager.addAnswer('ru', 'smalltalk.contacts', '[### trigger ###]contacts');

manager.addAnswer('ru', 'smalltalk.restart', '[### trigger ###]start');

manager.addAnswer(
  'ru',
  'smalltalk.agent.acquaintance',
  `Я чатбот, що звусь ${
    process.env.botName
  }! В мені - вся мудрість творів пана Леся{stickers}1|48|32`,
);
manager.addAnswer(
  'ru',
  'smalltalk.agent.acquaintance',
  `Мене звуть ${
    process.env.botName
  }. Я чатбот, що говорить фразами із творів Леся Подерв'янського{stickers}1|48|32`,
);
manager.addAnswer('ru', 'smalltalk.agent.age', '{stickers}122');
manager.addAnswer('ru', 'smalltalk.agent.annoying', '{stickers}141');
manager.addAnswer('ru', 'smalltalk.agent.answer_my_question', '{stickers}142|2|116|130|136|140');
manager.addAnswer(
  'ru',
  'smalltalk.agent.bad',
  '{stickers}141|136|123|116|108|98|90|88|87|84|72|63|62|49|46|32|20|3',
);
manager.addAnswer(
  'ru',
  'smalltalk.agent.beautiful',
  '{stickers}143|12|22|43|47|66|80|84|102|108|116|124|135',
);
manager.addAnswer('ru', 'smalltalk.agent.birth_date', '{stickers}144|62|72|88|99|108');
manager.addAnswer('ru', 'smalltalk.agent.boss', '{stickers}13|18|20|29|44|60|83|99|108|123|136');

manager.addAnswer(
  'ru',
  'smalltalk.agent.chatbot',
  '{stickers}13|7|44|49|60|72|80|84|88|95|109|115|127|135',
);
manager.addAnswer(
  'ru',
  'smalltalk.agent.crazy',
  '{stickers}20|21|29|56|77|84|89|98|123|124|127|135',
);
manager.addAnswer('ru', 'smalltalk.agent.funny', '{stickers}146|11|22|47|58|84');
manager.addAnswer('ru', 'smalltalk.agent.happy', '{stickers}43|84|102|135');
manager.addAnswer('ru', 'smalltalk.agent.hobby', '{stickers}147|88|99|142');

manager.addAnswer(
  'ru',
  'smalltalk.agent.my_friend',
  '{stickers}22|33|44|53|58|77|95|127|134|140|149',
);
manager.addAnswer('ru', 'smalltalk.agent.ready', '{stickers}44|48|53|65|83|98|108|117');
manager.addAnswer('ru', 'smalltalk.agent.residence', '{stickers}9|13|29|44|140');
manager.addAnswer('ru', 'smalltalk.agent.right', '{stickers}77|84|124|150|151');
manager.addAnswer('ru', 'smalltalk.agent.sure', '{stickers}25|61');
manager.addAnswer('ru', 'smalltalk.agent.talk_to_me', '{stickers}1|32|108|130');
manager.addAnswer('ru', 'smalltalk.agent.there', '{stickers}58|100|127|134|140|142|149');
manager.addAnswer(
  'ru',
  'smalltalk.appraisal.bad',
  '{stickers}15|29|19|76|84|90|98|101|106|107|116|123',
);
manager.addAnswer('ru', 'smalltalk.appraisal.good', '{stickers}47|58|66|84|124|151');
manager.addAnswer('ru', 'smalltalk.appraisal.thank_you', '{stickers}113|39|47|69|73|88|109|116');
manager.addAnswer('ru', 'smalltalk.appraisal.welcome', '{stickers}47|117');
manager.addAnswer('ru', 'smalltalk.confirmation.cancel', '{stickers}4|48|84|98');
manager.addAnswer('ru', 'smalltalk.confirmation.no', '{stickers}8|33|44|48|60');
manager.addAnswer('ru', 'smalltalk.confirmation.yes', '{stickers}78|84|87|99|108|116|123');
manager.addAnswer('ru', 'smalltalk.dialog.hold_on', '{stickers}7|25|29|33|88|89');
manager.addAnswer('ru', 'smalltalk.dialog.sorry', '{stickers}3|60');
manager.addAnswer('ru', 'smalltalk.dialog.what_do_you_mean', '{stickers}18|24|40|130');
manager.addAnswer('ru', 'smalltalk.greetings.bye', '{stickers}28|44');
manager.addAnswer('ru', 'smalltalk.greetings.hello', '{stickers}152|1|32|48|140|104|127');
manager.addAnswer('ru', 'smalltalk.greetings.how_are_you', '{stickers}25|92|128|136');
manager.addAnswer('ru', 'smalltalk.user.joking', '{stickers}6|11|63|116|127');
manager.addAnswer('ru', 'smalltalk.user.testing_agent', '{stickers}20|22|30|46|48|87|109|130');
manager.addAnswer('ru', 'smalltalk.user.rude', '{stickers}46');
manager.addAnswer(
  'ru',
  'smalltalk.user.random_stiker',
  '{stickers}1|2|3|4|6|7|8|9|11|12|13|15|18|19|20|21|22|24|25|28|29|30|32|33|36|39|40|41|43|44|45|46|47|48|49|50|51|53|56|58|59|60|61|62|63|65|66|69|72|73|76|77|78|79|80|82|83|84|87|88|89|90|92|95|96|98|99|100|101|102|104|106|107|108|109|113|115|116|122|123|124|127|128|130|134|135|136|137|140|141|142|143|144|146|147|149|150|151|152',
);

/* manager.addAnswer(
  'ru',
  'smalltalk.user.get_help',
  'Можна запросити конкретну п\'єсу (напр., "Павлік Морозов" або "покажи Гамлета"), випадковий стікер ("покажи випадковий стікер") або спробувати просто побалакати ;){stickers}1|20|24|32|40|41|48',
); */

manager.addAnswer('ru', 'smalltalk.get_help', '[### trigger ###]help');

manager.addAnswer('ru', 'smalltalk.show_play_doslidy', '{stickers}153');
manager.addAnswer('ru', 'smalltalk.show_play_vasilisa', '{stickers}154');
manager.addAnswer('ru', 'smalltalk.show_play_pizdets', '{stickers}155');
manager.addAnswer('ru', 'smalltalk.show_play_patzavataStory', '{stickers}156');
manager.addAnswer('ru', 'smalltalk.show_play_timeHero1', '{stickers}157');
manager.addAnswer('ru', 'smalltalk.show_play_timeHero2', '{stickers}158');
manager.addAnswer('ru', 'smalltalk.show_play_katzapy', '{stickers}159');
manager.addAnswer('ru', 'smalltalk.show_play_mistzeVstrechi', '{stickers}160');
manager.addAnswer('ru', 'smalltalk.show_play_ivasyk', '{stickers}161');
manager.addAnswer('ru', 'smalltalk.show_play_danko', '{stickers}162');
manager.addAnswer('ru', 'smalltalk.show_play_morozov', '{stickers}163');
manager.addAnswer('ru', 'smalltalk.show_play_hamlet', '{stickers}164');
manager.addAnswer('ru', 'smalltalk.show_play_mgnovenie', '{stickers}165');
manager.addAnswer('ru', 'smalltalk.show_play_snobs', '{stickers}166');
manager.addAnswer('ru', 'smalltalk.show_play_litr', '{stickers}167');
manager.addAnswer('ru', 'smalltalk.show_play_nirvana', '{stickers}168');
manager.addAnswer('ru', 'smalltalk.show_play_jogy', '{stickers}169');
manager.addAnswer('ru', 'smalltalk.show_play_repka', '{stickers}170');
manager.addAnswer('ru', 'smalltalk.show_play_maslo', '{stickers}171');
manager.addAnswer('ru', 'smalltalk.show_play_joko', '{stickers}172');
manager.addAnswer('ru', 'smalltalk.show_play_dynamo', '{stickers}173');
manager.addAnswer('ru', 'smalltalk.show_play_janMare', '{stickers}174');
manager.addAnswer('ru', 'smalltalk.show_play_utopia', '{stickers}175');
manager.addAnswer('ru', 'smalltalk.show_play_diana', '{stickers}176');
manager.addAnswer('ru', 'smalltalk.show_play_mnozhennyaVUmi', '{stickers}177');
manager.addAnswer('ru', 'smalltalk.show_play_irzhyk', '{stickers}178');

// Train and save the model
(async () => {
  await manager.train();
  manager.save('./nlp/model.nlp');
  console.log('\nModel training finished');
  manager.load('./model.nlp');
  const response = await manager.process('ru', 'як справи');
  console.log(response);
})();
