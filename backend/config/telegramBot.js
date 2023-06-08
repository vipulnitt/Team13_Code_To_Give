const TelegramBot = require('node-telegram-bot-api');
const Data = require('../models/data');
const token = '6035194347:AAHsiJ29e49L8leJp_fOvC0IYRixhMGydaw';
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

     if (msg.text === '/start') {
     
    }else if(sessionStore[userId].stage==="0")
    {    
        if(sessionStore[userId].questionObj) {
               if(sessionStore[userId].questionObj.options)
               {
                const len=sessionStore[userId].questionObj.options.length;
                if(len>0)
                {
                    const number = parseInt(msg.text.substring(1));
                    sessionStore[userId].currentQuestionId=sessionStore[userId].questionObj.options[number-1].childId;
                    if(sessionStore[userId].questionObj.options[number-1].childId==="Counseling")
                    {
                        sessionStore[userId].stage="1";
                    }else if(sessionStore[userId].questionObj.options[number-1].childId==="NoCounseling")
                    {
                        sessionStore[userId].stage="2";
                    }
                    const ans={
                        q_id:sessionStore[userId].questionObj.questionId,
                        statement:sessionStore[userId].questionObj.statement,
                        ans:sessionStore[userId].questionObj.options[number-1].option
                    };
                    sessionStore[userId].data.push(ans);
                }else
                {
                    sessionStore[userId].currentQuestionId=sessionStore[userId].questionObj.isText.childId;
                    const ans={
                        q_id:sessionStore[userId].questionObj.questionId,
                        statement:sessionStore[userId].questionObj.statement,
                        ans:msg.text
                    };
                    sessionStore[userId].data.push(ans);
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
    }else
    {
        handleQuestion(userId,chatId);
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
        const options = sessionStore[userId].questionObj.options.map((option, index) => (`/${index + 1}_${option.option}`)).join('\n');
        const message = `${question}\n${options}`;
        bot.sendMessage(chatId, message);
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