const TelegramBot = require('node-telegram-bot-api');
const Data = require('../models/data');
const token = '6035194347:AAG3L8hNHjpy254gkxpPNYt2xpDWQuIriLk';
const Questions = require("../models/questionModel");


const bot = new TelegramBot(token, { polling: true });
const sessionStore = {};

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
 
  if (!sessionStore[userId]) {
    const session = {
      userId: userId,
      sessionId: generateSessionId(),
      currentQuestionId: "BASE0",
      questionObj: null,
      data:[],
      stage: "0"
    };
    sessionStore[userId] = session;
    bot.sendMessage(chatId, 'Welcome! /start');
  } else {
     try{
      if (msg.text === '/start') {
        handleQuestion(userId,chatId);
      }else if(sessionStore[userId].stage==="0")
      {    
          if(sessionStore[userId].questionObj) {
                 if(sessionStore[userId].questionObj.options)
                 {
                  const len=sessionStore[userId].questionObj.options.length;
                  if(len===0)
                  {
                      sessionStore[userId].currentQuestionId=sessionStore[userId].questionObj.isText.childId;
                      const ans={
                          q_id:sessionStore[userId].questionObj.questionId,
                          statement:sessionStore[userId].questionObj.statement,
                          ans:msg.text
                      };
                      sessionStore[userId].data.push(ans);
                      handleQuestion(userId,chatId);
                  }
                 }else
                 {
                      sessionStore[userId].currentQuestionId=sessionStore[userId].questionObj.isText.childId;
                      const ans={
                          q_id:sessionStore[userId].questionObj.questionId,
                          statement:sessionStore[userId].questionObj.statement,
                          ans:msg.text
                      };
                      sessionStore[userId].data.push(ans);
                      handleQuestion(userId,chatId);
                 }
          }
      }
      if(sessionStore[userId].stage==="1")
      {
          bot.sendMessage(chatId, 'Please Share your email or mobile number!');
          sessionStore[userId].stage="3";
      }else if(sessionStore[userId].stage==="2")
      {
          bot.sendMessage(chatId, 'You do not need counseling!');
      }else if(sessionStore[userId].stage==="3")
      {
              if(isValidEmail(msg.text))
              {
                  const data ={ 
                       email:msg.text,
                       userId:userId, 
                       Counseling:true,
                       addictionType:sessionStore[userId].data[2].ans,
                       questions:sessionStore[userId].data
                      };
                      await Data.create(data);
                  bot.sendMessage(chatId, 'Thanks for sharing your email! Counselor will contact soon.');
              }else if(isValidIndianMobileNumber(msg.text))
              {
                  bot.sendMessage(chatId, 'Thanks for sharing your Mobile Number! Counselor will contact soon.');
              }
      }
     } catch(err){
      bot.sendMessage(chatId, 'Sorry, an error occurred while fetching the data.' + err.message);
     }
   

   
  }
});

function generateSessionId() {
  return Math.random().toString(36).substring(2, 15);
}
const handleQuestion= async(userId,chatId)=>{

    try {

      sessionStore[userId].questionObj = await Questions.findOne({ questionId: sessionStore[userId].currentQuestionId });

      const question = sessionStore[userId].questionObj.statement;
      const len = sessionStore[userId].questionObj.options.length;
      
      
      if (len > 0) {
        var inline_keyboard = [];

        const options = sessionStore[userId].questionObj.options;
        
        options.forEach((option, index) => {
          const button = {
            text: option.option,
            callback_data: option.childId
          };
        
          inline_keyboard.push([button]);
        });
        
        const updatedReplyMarkup = {
          reply_markup: {
              inline_keyboard: inline_keyboard
          }
      };
   //   console.log(updatedReplyMarkup)
        const message = `${question}\n`;
        bot.sendMessage(chatId, message,updatedReplyMarkup);
      } else {
        const message = `Question: ${question}`;
        bot.sendMessage(chatId, message);
      }
    } catch (error) {
      bot.sendMessage(chatId, 'Sorry, an error occurred while fetching the data.' + error.message);
    }
};

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return emailRegex.test(email);
  }

  function isValidIndianMobileNumber(mobileNumber) {
    const mobileNumberRegex = /^[6-9]\d{9}$/;
    
    return mobileNumberRegex.test(mobileNumber);
  }

 
  bot.on('callback_query', function onCallbackQuery(callbackQuery) {
    
    const userId = callbackQuery.from.id;
    const chatId = callbackQuery.message.chat.id;
    const action = callbackQuery.data;
    const message= callbackQuery.message;
    var ans=null;
    console.log(JSON.stringify(sessionStore[userId].data));
    for (const row of message.reply_markup.inline_keyboard) {
      for (const button of row) {
        if (button.callback_data === action) {
          ans = button.text;
          break;
        }
      }
      if (ans) {
        break;
      }
    }

    if(action==="Counseling")
    {
      sessionStore[userId].stage="1";
      bot.sendMessage(chatId, 'Please Share your email or mobile number!');
        sessionStore[userId].stage="3";
    }else if(action==="NoCounseling")
    {
      sessionStore[userId].sessionStore[userId].stage="2";
      bot.sendMessage(chatId, 'You do not need counseling!');
    }else
    {
      const temp={
        q_id:sessionStore[userId].questionObj.questionId,
        statement:message.text,
        ans:ans
    };
    const foundObject = sessionStore[userId].data.find(obj => obj === temp);
    if(!foundObject)
    {
      sessionStore[userId].data.push(temp);
      sessionStore[userId].currentQuestionId=action;
      console.log("Hello");
     handleQuestion(chatId,userId);
    }else{
      bot.sendMessage(chatId,"You have already answered this question.")
    }
    }
    
   
 
  });