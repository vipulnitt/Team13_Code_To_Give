const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const token = '6035194347:AAHsiJ29e49L8leJp_fOvC0IYRixhMGydaw';
const Questions = require("../models/questionModel");
const bot = new TelegramBot(token, { polling: true });

var id = "BASE0";
var questionObj;
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;

  if (msg.text === '/start') {
    bot.sendMessage(chatId, 'Welcome!');
    id = "BASE0";
  }else if(questionObj) {
    const len= questionObj.options.length;
    if(len>0)
    {
        const number = parseInt(msg.text.substring(1));
    console.log( JSON.stringify(questionObj));
      id = questionObj.options[number-1].childId;
    }
   }
  try {
    questionObj = await Questions.findOne({ questionId: id });

    console.log(JSON.stringify(questionObj));
    const question = questionObj.statement;
    const len= questionObj.options.length;
    console.log(len);
    if(len>0)
    {
    const options = questionObj.options.map((option, index) => (`/${index + 1}. ${option.option}`)).join('\n');
    const message = `Question: ${question}\n${options}`;
    bot.sendMessage(chatId, message);
    }else
    {
        const message = `Question: ${question}`;
        bot.sendMessage(chatId, message);
        id=questionObj.isText.childId;
    }
    
  } catch (error) {
    bot.sendMessage(chatId, 'Sorry, an error occurred while fetching the data.' + error.message);
  }
});
