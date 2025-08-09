const TelegramBot = require('node-telegram-bot-api');
const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const GAME_SHORT = 'coconutoss';
const GAME_URL = 'https://TheCryoai.github.io/coconut-toss-game/';

bot.onText(/\/game/, (msg) => {
  bot.sendGame(msg.chat.id, GAME_SHORT);
});

bot.on('callback_query', async (q) => {
  if (q.game_short_name === GAME_SHORT) {
    const url = `${GAME_URL}?chat_id=${q.message.chat.id}&message_id=${q.message.message_id}&user_id=${q.from.id}`;
    await bot.answerCallbackQuery(q.id, { url });
  } else {
    await bot.answerCallbackQuery(q.id, { text: 'Game not found' });
  }
});
