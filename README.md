
# Podervianskogobot
<p>
  (August 2018 - February 2019)
</p>

<p>
  Try it on 
  <br><a href="https://www.messenger.com/t/344980636080979" target="_blank">Facebook</a>
  <br><a href="http://t.me/PodervianskogoBot" target="_blank">Telegram</a>
  <br><a href="https://join.skype.com/bot/f8059dc4-587c-426f-a211-ab93b87cf905" target="_blank">Skype</a>
  <br><a href="https://podervianskogobot.com/webchat" target="_blank">Web</a>
</p>

<p>
  <i>This is a copy of text from my site <a href="https://iuriid.github.io/" target="_blank">https://iuriid.github.io/</a></i>.
</p>

<p>
  This is the 2nd generation of code for this project, see the 1st <a href="https://github.com/IuriiD/podervjansky_bot" target="_blank">here</a>
</p>

<p>
  Stack of the bot:
  <br><a href="https://iuriid.github.io/public/img/podervianskogobot_stack.jpg" target="_blank"><img src="https://iuriid.github.io/public/img/podervianskogobot_stack.jpg" class="img-fluid"></a>
</p>

<p>
  This is a bot which replies
  with popular quotes (drawn on stickers) from plays by Les' Poderviansky (the bot is in
  Ukrainian) and allows to read and listen to respective plays performed by the Author. Les Podervianskyi is a
  Ukrainian painter, poet, playwright and performer. He is most famous for his absurd,
  highly satirical, and at times obscene short plays, many quotes from which bacame popular memes (more on <a href="https://en.wikipedia.org/wiki/Les_Podervianskyi" target="_blank">Wikipedia</a>).
</p>

<p>
  The bot was made using Node.js, <a href="https://dev.botframework.com/" target="_blank">Microsoft Bot
  Framework</a> and <a href="https://www.npmjs.com/package/node-nlp" target="_blank">npl.js</a>.
  Actually this is the <a href="https://github.com/IuriiD/nirvana_bot" target="_blank">2nd "generation"</a> of
  the bot, and the <a href="https://github.com/IuriiD/podervjansky_bot" target="_blank">1st</a> (which wasn't
  launched and was supposed only for Telegram) was made using Node.js, <a href="https://telegraf.js.org/#/"
  target="_blank">telegraf</a> wrapper of Telegram API and <a href="https://www.rivescript.com/"
  target="_blank">RiveScript</a>.
</p>

<p>
  I started to work on it last summer (>6 months ago), before I started to cooperate with <a
  href="https://masterofcode.com/" target="_blank">Master of Code</a>. Thought that it would be funny to make
  such a bot, and also had a chance to try several new things, mainly RiveScript and <a
  href="https://www.npmjs.com/package/node-nlp" target="_blank">npl.js</a> (inspired by <a
  href="https://chatbotslife.com/evaluating-nlu-for-chatbots-b19ecf5a2124" target="_blank">this</a> article).
  This was also my 1st 'live' bot on MS Bot Framework and the 1st bot for Skype and Web.
</p>

<p>
  To make this bot I:
  => Read through >25 plays by L.P. from <a href="http://doslidy.org.ua/" target="_blank">this</a> source,
  chose the most popular quotes (got ~140 of them);
  => Took the most popular requests from Dialogflow's Smalltalk and assigned quotes from L.P.'s plays as
  responses to those requests;
  => Contacted with Les Podervianky's representative to discuss copyright moments and got an approval;
  => Draw stickers for all those quotes + separate stickers for the plays (~140 in total, this took up to 60%
  of time working on this project ;);
  => Copied, parsed and formatted the texts of the plays, downloaded and prepared the audios.
  => Created the bot itself on Node.js using Microsoft Bot Framework for 4 platforms (Telegram, Facebook,
  Skype, Web). Also wanted to make a version for Viber but their current policy doesn't allow that :(
  The bot is actually quite simple - after greeting each user's input is "fed" to NLU block which tries to
  respond with relevant quote. If no intens are triggered than a simple full-text search is made and user is
  presented with a list of plays in which his/her input was found. If no such phrases were found, user gets
  a default fallback response.
  => In this bot I used open source library for NLU - nlp.js inspired by the above-mentioned <a
  href="https://chatbotslife.com/evaluating-nlu-for-chatbots-b19ecf5a2124" target="_blank">article</a>. My
  conclusion for npl.js - a nice tool and could be used if third-party solutions are not allowed for some
  reasons but for production I would still use Dialogflow or LUIS.
  => Deployed the bot to an AWS EC2 instance. This bot is not using DB and ElasticSearch (thought these could
  be used and could improve the bot) and thus can be hosted on a single t2.micro instance which is free
  under free-tier
  plan.
</p>

<p>
  So far the bot had about 20 users from Facebook, ~10 from Telegram and a few from Skype and Web version.
</p>

<p>
  <a href="https://iuriid.github.io/public/img/pd_bot_0.png" target="_blank"><img src="https://iuriid.github.io/public/img/pd_bot_0.png"
  class="img-fluid img-thumbnail" style="max-width: 330px"></a>

  <a href="https://iuriid.github.io/public/img/pd_bot_2.png" target="_blank"><img src="https://iuriid.github.io/public/img/pd_bot_2.png"
  class="img-fluid img-thumbnail" style="max-width: 335px"></a>

  <a href="https://iuriid.github.io/public/img/pd_bot_3.png" target="_blank"><img src="https://iuriid.github.io/public/img/pd_bot_3.png"
  class="img-fluid img-thumbnail" style="max-width: 330px"></a>

  <a href="https://iuriid.github.io/public/img/pd_bot_1.png" target="_blank"><img src="https://iuriid.github.io/public/img/pd_bot_1.png"
  class="img-fluid img-thumbnail" style="max-width: 330px"></a>

  <a href="https://iuriid.github.io/public/img/pd_bot_5.png" target="_blank"><img src="https://iuriid.github.io/public/img/pd_bot_5.png"
  class="img-fluid img-thumbnail" style="max-width: 335px"></a>

  <a href="https://iuriid.github.io/public/img/pd_bot_6.png" target="_blank"><img src="https://iuriid.github.io/public/img/pd_bot_6.png"
  class="img-fluid img-thumbnail" style="max-width: 330px"></a>
</p>