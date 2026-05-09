const { Telegraf, Markup } = require('telegraf');
const http = require('http');

// KEEP-ALIVE SERVER (For Render)
http.createServer((req, res) => {
  res.write('LAZZ TECH MAINFRAME: ACTIVE');
  res.end();
}).listen(process.env.PORT || 3000);

const bot = new Telegraf(process.env.BOT_TOKEN);

// HELPER: Main Menu Markup
const mainMenu = () => {
  return Markup.inlineKeyboard([
    [Markup.button.callback('🚀 SERVICES', 'services'), Markup.button.callback('📂 PROJECTS', 'projects')],
    [Markup.button.callback('🛠 TECH STACK', 'stack'), Markup.button.url('⚡ WHATSAPP COMMS', 'https://wa.me/254106527992')],
    [Markup.button.url('🌐 WEB PORTFOLIO', 'https://lazztech.github.io')]
  ]);
};

// WELCOME: Personalized Greeting
bot.start((ctx) => {
  const name = ctx.from.first_name || 'Agent';
  const welcomeText = 
    `*⚡ LAZZ TECH NEURAL INTERFACE v4\\.0* ⚡\n` +
    `\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\n` +
    `*USER:* [${name}](tg://user?id=${ctx.from.id}) | *STATUS:* ONLINE\n` +
    `*ENGINEERING:* Networking \\| Dev \\| Infrastructure\n` +
    `\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\n\n` +
    `Welcome to the hub\\. Select an operation below to initialize my services:`;

  ctx.replyWithMarkdownV2(welcomeText, mainMenu());
});

// SERVICES SECTION
bot.action('services', (ctx) => {
  ctx.editMessageText(
    `*🛡️ MASTER SERVICES:* \n` +
    `\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\n` +
    `• *VPN Infrastructure:* High-speed VLESS/Reality/WireGuard configs\\.\n` +
    `• *VPS & Panels:* Linux server hardening & traffic management panels\\.\n` +
    `• *App/Web Dev:* React Native apps & custom web solutions\\.\n\n` +
    `*Ready to proceed?* Click the "WHATSAPP COMMS" button in the menu to finalize your order\\.`,
    { parse_mode: 'MarkdownV2', ...Markup.inlineKeyboard([[Markup.button.callback('🔙 BACK', 'start')]]) }
  );
});

// PROJECTS SECTION
bot.action('projects', (ctx) => {
  ctx.editMessageText(
    `*📂 PROJECT ARCHIVES:* \n` +
    `\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\n` +
    `1\\. *Paulah App:* Cloud-based photo storage (React Native/Firebase)\\.\n` +
    `2\\. *WhatsApp Brain:* Autonomous bot suite (Node\\.js/MongoDB)\\.\n` +
    `3\\. *Global Nodes:* VLESS/Reality tunneling architecture\\.\n\n` +
    `*Status:* All projects currently active and maintained\\.`,
    { parse_mode: 'MarkdownV2', ...Markup.inlineKeyboard([[Markup.button.callback('🔙 BACK', 'start')]]) }
  );
});

// TECH STACK
bot.action('stack', (ctx) => {
  ctx.editMessageText(
    `*🛠 TECH MASTER STACK:* \n` +
    `\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\n` +
    `*Languages:* JavaScript (Node\\.js), Bash\\.\n` +
    `*Platforms:* Linux, Render, GitHub Pages, Termux\\.\n` +
    `*Databases:* MongoDB, Firebase\\.\n` +
    `*Focus:* Network Security & High-Performance Automation\\.`,
    { parse_mode: 'MarkdownV2', ...Markup.inlineKeyboard([[Markup.button.callback('🔙 BACK', 'start')]]) }
  );
});

// BACK TO START
bot.action('start', (ctx) => {
  const name = ctx.from.first_name || 'Agent';
  ctx.editMessageText(
    `*⚡ LAZZ TECH NEURAL INTERFACE v4\\.0* ⚡\n` +
    `*USER:* [${name}](tg://user?id=${ctx.from.id}) | *STATUS:* ONLINE\n` +
    `Welcome back\\. Select an operation below:`,
    { parse_mode: 'MarkdownV2', ...mainMenu() }
  );
});

bot.launch();
     
