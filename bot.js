const { Telegraf, Markup } = require('telegraf');
const http = require('http');

// 1. CREATE A TINY WEB SERVER (To stay on Render's free tier)
http.createServer((req, res) => {
  res.write('Lazz Tech Bot is Online');
  res.end();
}).listen(process.env.PORT || 3000);

// 2. THE BOT LOGIC
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.replyWithMarkdownV2(
    `*SYSTEM ONLINE: Lazz Tech Hub* 🤖\n\nI am the automated assistant for the Advanced Systems Engineer\\.`,
    Markup.inlineKeyboard([
      [Markup.button.url('🌐 Visit Website', 'https://lazztech.github.io')],
      [Markup.button.url('💬 Contact Master', 'https://t.me/Lazz1235')]
    ])
  );
});

bot.launch();
console.log("Server and Bot are running...");

