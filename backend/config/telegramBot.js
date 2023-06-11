const TelegramBot = require('node-telegram-bot-api');
const Data = require('../models/data');
const token = '6035194347:AAG3L8hNHjpy254gkxpPNYt2xpDWQuIriLk';
const Questions = require("../models/questionModel");


const bot = new TelegramBot(token, { polling: true });
const sessionStore = {};

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  console.log(userId);
  if (!sessionStore[userId]||msg.text==='/restart') {
    const session = {
      userId: userId,
      sessionId: generateSessionId(),
      currentQuestionId: "0BASE0",
      questionObj: null,
      data:[],
      stage: "0"
    };
    console.log(msg);
    sessionStore[userId] = session;
    bot.sendMessage(chatId, 'Welcome! Your well-being is our top priority, and we assure you that your data will be secure. Our dedicated professionals are here to support you on your journey to recovery. Let us know how we can assist you in overcoming addiction and living a healthier life \n/start');
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
                  if(len>0)
                  {
                    bot.sendMessage(chatId,"Please select the options. /restart")
                  }
                  else if(len===0)
                  {
                       
                      sessionStore[userId].currentQuestionId="0"+sessionStore[userId].questionObj.isText.childId;
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
     if(sessionStore[userId].stage==="2")
      {
          bot.sendMessage(chatId, 'Thanks for sharing details /restart!');
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
                      if(data)
                      await Data.create(data);
                  bot.sendMessage(chatId, 'Thanks for booking appointment! Counselor will contact soon. /restart');
              }else
              {
                const data ={ 
                  email:msg.text,
                  userId:userId, 
                  Counseling:true,
                  addictionType:sessionStore[userId].data[2].ans,
                  questions:sessionStore[userId].data
                 };
                 if(data)
                 await Data.create(data);
                 bot.sendMessage(chatId, 'Thanks for booking appointment! Counselor will contact soon. /restart');
              }
      }
     } catch(err){
      bot.sendMessage(chatId, 'Sorry, an error occurred while fetching the data. /restart' );
     }
  }
});

function generateSessionId() {
  return Math.random().toString(36).substring(2, 15);
}
const handleQuestion= async(userId,chatId)=>{

    try {
    
      sessionStore[userId].questionObj = await Questions.findOne({ questionId: sessionStore[userId].currentQuestionId.substring(1) });

      const question = sessionStore[userId].questionObj.statement;
      const len = sessionStore[userId].questionObj.options.length;
      
      
      if (len > 0) {
        var inline_keyboard = [];

        const options = sessionStore[userId].questionObj.options;
        
        options.forEach((option, index) => {
          const button = {
            text: option.option,
            callback_data: index+option.childId
          };
        
          inline_keyboard.push([button]);
        });
        
        const updatedReplyMarkup = {
          reply_markup: {
              inline_keyboard: inline_keyboard
          }
      };

        const message = `${question}\n`;
        bot.sendMessage(chatId, message,updatedReplyMarkup);
      } else {
        const message = `${question}`;
        bot.sendMessage(chatId, message);
      }
    } catch (error) {
      bot.sendMessage(chatId, 'Sorry, an error occurred while fetching the data. /restart');
    }
};

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return emailRegex.test(email);
  }


 
  bot.on('callback_query', function onCallbackQuery(callbackQuery) {
    
    const userId = callbackQuery.from.id;
    const chatId = callbackQuery.message.chat.id;
    const action = callbackQuery.data;
    const message= callbackQuery.message;
    var ans=null;
    console.log(action+" "+JSON.stringify(message));
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

    if(sessionStore[userId].currentQuestionId.substring(1)==="COU01")
    {
      if(action.substring(1)==="booked")
      {
        sessionStore[userId].stage="1";
        bot.sendMessage(chatId, 'Please Share your contact Details! (Email or Mobile No.)');
          sessionStore[userId].stage="3";
      }else
      {
        const data ={ 
          email:"NotProvided",
          userId:userId, 
          Counseling:true,
          addictionType:sessionStore[userId].data[2].ans,
          questions:sessionStore[userId].data
         };
         sessionStore[userId].stage="2";
         bot.sendMessage(chatId, 'Thanks for Response! /restart');
         save(data);
      }
      
        
      
    } else
    {
    
      const temp={
        q_id:sessionStore[userId].questionObj.questionId,
        statement:message.text,
        ans:ans
    };
    console.log(ans);

    const foundObject = sessionStore[userId].data.find(obj => obj.statement === temp.statement);
    if(!foundObject)
    {
      sessionStore[userId].data.push(temp);
      sessionStore[userId].currentQuestionId=action;
     handleQuestion(chatId,userId);
    }else{
      bot.sendMessage(chatId,"You have already answered this question. /restart")
    }
    }
    
   
 
  });

  async function save(data)
  {
    if(data)
    await Data.create(data);

  }