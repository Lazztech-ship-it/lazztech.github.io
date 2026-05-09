const { Telegraf, Markup } = require('telegraf');
const http = require('http');

// KEEP-ALIVE SERVER (For Render Free Tier)
http.createServer((req, res) => {
  res.write('LAZZ TECH MAINFRAME: ACTIVE');
  res.end();
}).listen(process.env.PORT || 3000);

const bot = new Telegraf(process.env.BOT_TOKEN);

// HELPER: Get current time in EAT (Kenya Time)
const getFormattedTime = () => {
  return new Date().toLocaleString("en-GB", { timeZone: "Africa/Nairobi" });
};

bot.start((ctx) => {
  const name = ctx.from.first_name || 'Unknown_Entity';
  const uid = ctx.from.id;
  const time = getFormattedTime();

  const welcome = 
    `*⚡ LAZZ TECH NEURAL INTERFACE V3\\.0* ⚡\n` +
    `\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\n` +
    `*SCANNING USER\\.\\.\\.* \n` +
    `👤 *IDENTITY:* ${name}\n` +
    `🆔 *USER ID:* \`${uid}\` \n` +
    `⏰ *TIMESTAMP:* ${time}\n` +
    `📍 *LOCATION:* KENYA NODE \\(ACTIVE\\)\n` +
    `\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\\=\n\n` +
    `*ACCESS GRANTED\\.* Greetings, agent\\. I am the automated intelligence for *Lazz Tech Innovative Solutions*\\. \n\n` +
    `How shall we optimize your network or build your next infrastructure today?`;

  ctx.replyWithMarkdownV2(
    welcome,
    Markup.inlineKeyboard([
      [Markup.button.callback('📂 PROJECT ARCHIVES', 'projects')],
      [Markup.button.callback('🛠 CORE TECH STACK', 'stack')],
      [Markup.button.url('🌐 WEBFRAME PORTFOLIO', 'https://lazztech.github.io')],
      [Markup.button.url('🛡️ SECURE COMMS', 'https://t.me/Lazz1235')]
    ])
  );
});

// PROJECT LAB SECTION
bot.action('projects', (ctx) => {
  const projects = 
    `*📂 PROJECT LAB ANALYSIS:* \n` +
    `\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\n` +
    `🚀 *Paulah App:* High\\-security mobile storage built with React Native & Firebase Cloud Architecture\\.\n\n` +
    `🤖 *WhatsApp Cloud Brain:* Autonomous bot system running Node\\.js and MongoDB for real\\-time data sync\\.\n\n` +
    `🛰️ *Tunneling Architect:* Advanced deployment of VLESS, Reality, and WireGuard protocol layers on global VPS nodes\\.`;
  
  ctx.answerCbQuery();
  ctx.replyWithMarkdownV2(projects);
});

// TECH STACK SECTION
bot.action('stack', (ctx) => {
  const stack = 
    `*🛠 TECH MASTER CAPABILITIES:* \n` +
    `\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\\-\n` +
    `• *NETWORKING:* VLESS, VMess, Reality, SSH Tunneling, ISP Bug Hosting\\.\n` +
    `• *DEVELOPMENT:* Node\\.js, JavaScript, React Native, Bash Scripting\\.\n` +
    `• *DATABASE:* MongoDB, Firebase Cloud Storage\\.\n` +
    `• *PLATFORMS:* Linux VPS \\(Ubuntu/Debian\\), Termux, GitHub Pages\\.`;

  ctx.answerCbQuery();
  ctx.replyWithMarkdownV2(stack);
});

bot.launch();
console.log("Elite Lazz Tech Bot is Online...");
